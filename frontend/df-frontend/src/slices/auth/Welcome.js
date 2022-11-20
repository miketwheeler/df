import { useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentToken } from "./authSlice";
import { Link } from 'react-router-dom';

import React from 'react'

// protected route
const Welcome = () => {
    const user = useSelector(selectCurrentUser);
    const token = useSelector(selectCurrentToken);

    const welcome = user ? `Welcome ${user}!` : "Welcome!";
    const tokenAbr = `${token.slice(0,9)}...`;

    const content = (
        <section className="welcome">
            <h1>{welcome}</h1>
            <p>Token: {tokenAbr}</p>
            <p><Link to="/dashboard">Go to Users List</Link></p>
        </section>
    )
  return content;
}

export default Welcome