import React, { Component, useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import dotenv from 'dotenv';
import './auth.css';

import Button from './Buttons';
import axios from 'axios';
import { authContext } from '../contexts/AuthContext';

dotenv.config();

export default class Auth extends Component {
    constructor(props){
        super(props);

        this.state = {
            signup: false,
            signin: false,
            guest: false
        }
    }

    /** In case I add my own auth server
    handleSignup = () => {
        this.setState({ signup: true });
    }

    handleSignin = () => {
        this.setState({ signin: true });
    }
    */

    handleGoogle = () => {
        window.open("https://reactwhiteboard.herokuapp.com/auth/google", "_self");
    }

    handleGithub = () => {
        window.open("https://reactwhiteboard.herokuapp.com/auth/github", "_self");
    }

    handleGuest = () => {
        this.setState({ guest: true });
    }

    handleLogout = () => {
        axios.get("https://reactwhiteboard.herokuapp.com/auth/logout", { withCredentials: true }).then(res => {
            if(res.data){
                window.location.href = "/";
            }
        });
    }

    render(){
        if(this.state.signup === true){
            return <Navigate to="/signup"/>
        }else if(this.state.signin === true){
            return <Navigate to="/signin"/>
        }else if(this.state.guest === true){
            return <Navigate to="/guest"/>
        }

        return(
            <div className="auth-outer-container">
                <div className="auth-container">
                    {this.props.greeting}
                
                {/* In case I decide to implement my own Auth server down the road

                    <label className='auth-divider-label'>Connect with us (experimental)</label>
                    <hr className='auth-divider'></hr>

                    <Button type='small' title='Sign up' fontSize='20px' onClick={this.handleSignup}/>
                    <Button type='small' title='Sign in' fontSize='20px' onClick={this.handleSignin}/>

                    <label className='auth-divider-label'>Use a third party</label>
                    <hr className='auth-divider'></hr>

                */}   

                    <Button type='small' title='Sign in with Github' fontSize='16px' onClick={this.handleGithub}/>
                    <p>(Github highly recommended)</p>
                    <Button type='small' title='Sign in with Google' fontSize='16px' onClick={this.handleGoogle}/>
                    <Button type='text' title='Continue as guest' fontSize='14px' onClick={this.handleGuest}/>

                    <Button type='small' title='Logout' fontSize='16px' onClick={this.handleLogout}/>
                </div>
            </div>
        );
    }
}

export function Signup(){
    const [signUp, setSignUp] = useState(true);
    
    const createAccount = () => {

    }

    const goBack = () => {
        setSignUp(false);
    }

    return signUp ? (
        <div className="auth-outer-container">
            <div className="auth-container">
                <h1>Sign up</h1>
                <input placeholder='Email'></input>
                <input placeholder='Password'></input>
                <Button type='small' title='Sign up' fontSize='14px' onClick={createAccount}/>
                <Button type='text' title='Not trying to create an account? Go back.' fontSize='14px' onClick={goBack}/>
            </div>
        </div>
    ) : <Navigate to="/"/>;
}

export function Signin(){
    const [signIn, setSignIn] = useState(true);

    const authenticateUser = () => {

    }

    const goBack = () => {
        setSignIn(false);
    }

    return signIn ? (
        <div className="auth-outer-container">
            <div className="auth-container">
                <h1>Sign in</h1>
                <input placeholder='Email'></input>
                <input placeholder='Password'></input>
                <Button type='small' title='Sign in' fontSize='14px' onClick={authenticateUser}/>
                <Button type='text' title='Not trying to sign in? Go back.' fontSize='14px' onClick={goBack}/>
            </div>
        </div>
    ) : <Navigate to="/"/>;
}

export function Profile(){
    const user = useContext(authContext);
    console.log(user);
    return(
        <>
            profile
        </>
    );
}