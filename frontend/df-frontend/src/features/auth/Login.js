import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setCredentials } from './authSlice';
import { useLoginMutation } from './authApiSlice';


const Login = () => {
    const userRef = useRef();
    const errRef = useRef();
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();

    useEffect(() => {
        userRef.current.focus(); // sets the focus right away to the user ref'd 
    }, []); // only want this to run when the component loads, used [] empty dependencies arr

    useEffect(() => {
        // set err back to empty bc it might mean we've seen an errmsg AND NOW hide/erase it means we're changing dep arr vals
        setErrMsg('');
    }, [user, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userData = await login({ user, pwd }).unwrap() //enables data read here so we can use try/catch block to handle 
            dispatch(setCredentials({ ...userData, user })) // 1st is to get jwt, 2nd is to pass user from state
            setUser(''); // reset
            setPwd(''); // ""
            navigate('/welcome'); // navigate away from login form
        } catch (err) {
            if(err?.originalStatus) {
                setErrMsg('Missing Username or Password');
            } else if(!err?.status === 400) {
                setErrMsg('No Server Response');
            } else if(!err?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    };

    const handleUserInput = (e) => setUser(e.target.value);
    const handlePwdInput = (e) => setPwd(e.target.value);

    const content = isLoading ? <h1>loading...</h1> : (
        <section className="login">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-label="error-message"></p>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username: </label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    value={user}
                    onChange={handleUserInput}
                    autoComplete="off"
                    required
                    />

                <label htlmlFor="password">Password: </label>
                <input
                    type="password"
                    id="password"
                    onChange={handlePwdInput}
                    value={pwd}
                    required
                    />

                <button type='submit'>Submit</button>
            </form>
        </section>
    )

    return content;
}

export default Login;