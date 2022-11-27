
const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');


const signToken = (id) => {
    return jwt.sign(
        { id }, 
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
}

const createSendToken = (user, statusCode, statusMessage, res) => {
    const token = signToken(user._id);

    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60* 60 * 1000  // *24hrs*60mins*60secs*1000msecs => to get ms-date
        ), 
        httpOnly: true,
    };

    if(process.env.NODE_ENV === 'production') 
        cookieOptions.secure = true; // if in production, set the cookie prop 'secure' to true

    res.cookie('jwt', token, cookieOptions);

    // removed password from the output
    user.password = undefined;

    res.status(statusCode).json({
        status: statusMessage,                               
        token,
        data: {
            user
        }
    });
}

const signup = catchAsync(async (req, res, next) => {
    // build the user as recieved so no one can denote themselves as an admin up front
    const newUser = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
    });

    createSendToken(newUser, 201, 'Account signup successful', res);
});


const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    // check email and password exist
    if(!email || !password) {
        return next(new AppError('Please provide email and password!', 400));
    }

    // check if user exists && password is correct
    // email: email
    // + adds the unretrievable password in this instance - need it for comparison
    const user = await User.findOne({ email }).select('+password') 
    
    // check indeed user *(if not cant run PW comparison & fails - throw error), if user - compare PW as follows
    // using userModel's correctPassword func to check if this PW @ login === stored user's PW
    if(!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password', 401));
    }

    createSendToken(user, 200, 'Successful logging in', res);
});

const protect = catchAsync(async (req, res, next) => {
    let token;
    // get the token and check if it exists
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if(!token) {
        return next(new AppError('Not logged in. Please login for access.', 401));
    }
    console.log(token)

    // verification: validate token signature
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    
    // check if user still exists
    const currentUser = await User.findById(decoded.id);

    if(!currentUser)
        return next(new AppError('The user that owns this token no longer exists!', 401));
    // check if user changed password after toekn was issued
    if(currentUser.changedPasswordAfter(decoded.iat)) {  // iat='issued at'
        return next(new AppError('User recently changed their password! Please log in agian', 401));
    }; 

    // Granted access to a protected route - set USER to the user used in the tests above (wo, it could be exploitable)
    req.user = currentUser;

    next();
});

const restrictTo = (...roles) => (req, res, next) => {
    // roles is an array ex: ['admin', 'team-leader', TODO: 'team-member] <--lookup actual is est.
    if(!roles.includes(req.user.role))
        return next(new AppError(`You don't have the permissions to perform this action`, 403));
    
    next();
};

const forgotPassword = catchAsync(async(req, res, next) => {
    // get user based on POST-ed email
    const user = await User.findOne({ email: req.body.email });
    if(!user) {
        return next(new AppError('There is no user with that email address.', 404));
    }

    // generate random reset token
    const resetToken = user.createPasswordResetToken(); //createPasswordResetToken
    await user.save({ validateBeforeSave: false });
    // send it to user's email
    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;

    const message = `Forgot your Password? Submit a PATCH request with your new password and password 
        confirmation to: ${resetURL}.\nIf you didn't send a request to change your password, please 
        ignore this email!`;
    
    try {
        await sendEmail({
            email: user.email,
            subject: 'Your password reset token (valid for 10 mins)',
            message
        });
    
        res.status(200).json({
            status: 'success',
            message: 'Token sent to email!',
        })
    } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });

        return next(new AppError('There was an error sending the email, try again later!', 500))
    }
})

const resetPassword = async (req, res, next) => {
    // get user based on token
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({ passwordResetToken: hashedToken, passwordResetExpires: { $gt: Date.now() } });

    // if token not expired, and is user, set new password
    if(!user)
        return next(new AppError('Token is invalid or has expired', 400))

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    
    // update changedPasswordAt property for the user
    // log the user in, send jwt 
    createSendToken(user, 200, 'Success resetting password', res);
}

const updatePassword = catchAsync(async (req, res, next) => {
    // get user from the collection
    const user = await User.findById(req.user.id).select('+password');
    
    // check if POSTed pw is corrcet
    if(!(await user.correctPassword(req.body.passwordCurrent, user.password)))
        return next(new AppError("Your current password didn't work there... try again", 401))
    
        // if so, update pw
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();

    // log user in (send jwt back to user)
    createSendToken(user, 200, 'Successful updating your password', res);
});

// TODO: create logout controller -> for userRoute & FE selection 
const logout = catchAsync(async (req, res, next) => {
    // needs to delete token/cookie so unenrolls logged-in user
})

module.exports = { signup, login, protect, restrictTo, forgotPassword, resetPassword, updatePassword }