
// imports
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');
const hpp = require('hpp');

// Error handling
const AppError = require('./server/utils/appError');
const globalErrorHandler = require('./server/controllers/errorController');

// routers
const userRouter = require('./server/routes/userRoutes');
const projectRouter = require('./server/routes/projectRoutes');
const reviewRouter = require('./server/routes/reviewRoutes');

// express app instance
const app = express();

// vars
const usersEndpoint = '/api/v1/users';
const projectsEndpoint = '/api/v1/projects';
const reviewsEndpoint = '/api/v1/reviews';


// Global midlewares - functions modify incomming data
// set security http headers
app.use(helmet()) // important to use early on in the stack

// dev logging
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')) // logger - if env is in development
}


// limit requests from same API
const limiter = rateLimit({
    max: 100, // max num requests for an IP
    windowMs: 60*60*1000, // 60min*60secs*1000ms => 1hr
    message: 'Too many requests from the IP, please try again in 1 hr.'
});

app.use('/api', limiter); // all routes


// body parser, reading data from body into req.body
app.use(express.json({
    limit: '10kb'  // limits the body payload in the request - whole express app
}));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize()); // looks at request string and their params to filter out malicious requests
app.use(xssClean()); // Data sanitization for cross-site-scripting (XSS)

// prevent param pollution - stops excess params (string insertion) into the query string
app.use(hpp({
    whitelist: [
        'duration',
        'ratingsAverage',
        'ratingsQuantity',
        'maxGroupSize',
        'difficulty',
        'price'
    ]
}));

// set up & add to app - dir for serving static files
app.use(express.static(`${__dirname}/public`));

//  middleware
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    // console.log(req.headers); // to track
    next();
})


// mounting a new router for a route
app.use(usersEndpoint, userRouter);
app.use(projectsEndpoint, projectRouter);
app.use(reviewsEndpoint, reviewRouter);

// middleware if no router reached - 'catch' bad route handling
app.all('*', (req, res, next) => {
    next(new AppError(`Cant find ${req.originalUrl} on this server!`, 404)); // emits the error down the chain in the app's call stack
})

app.use(globalErrorHandler);

module.exports = app;
