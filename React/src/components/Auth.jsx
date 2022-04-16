import React, { Component, useState } from 'react';
import { Navigate } from 'react-router-dom';
import dotenv from 'dotenv';
import { GoogleLogin } from 'react-google-login';
import './auth.css';

import Button from './Buttons';

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


    handleSignup = () => {
        this.setState({ signup: true });
    }

    handleSignin = () => {
        this.setState({ signin: true });
    }

    handleGuest = () => {
        this.setState({ guest: true });
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

                    <label className='auth-divider-label'>Connect with us (experimental)</label>
                    <hr className='auth-divider'></hr>

                    <Button type='small' title='Sign up' fontSize='20px' onClick={this.handleSignup}/>
                    <Button type='small' title='Sign in' fontSize='20px' onClick={this.handleSignin}/>

                    <label className='auth-divider-label'>Use a third party</label>
                    <hr className='auth-divider'></hr>

                    <GoogleLoginButton/>

                    <Button type='text' title='Continue as guest' fontSize='14px' onClick={this.handleGuest}/>
                </div>
            </div>
        );
    }
}


export function UserIcon(){
    const [active, setActive] = useState(false);

    return(
        <div className="profile-container">

        </div>
    );
}

const clientId = "853462108886-geg5b379q8p728m7drhv9nlaqmvlg38s.apps.googleusercontent.com"

export function GoogleLoginButton(){
    const success = () => {

    }

    const failure = () => {

    }

    return(
        <GoogleLogin
            clientId={clientId}
            buttonText="Login"
            onSuccess={success}
            onFailure={failure}
        />
    );
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