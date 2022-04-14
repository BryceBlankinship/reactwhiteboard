import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import './auth.css';

import Button from './Buttons';

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
                    <Button type='small' title='Sign up' fontSize='20px' onClick={this.handleSignup}/>
                    <Button type='small' title='Sign in' fontSize='20px' onClick={this.handleSignin}/>
                    <Button type='text' title='Continue as guest' fontSize='14px' onClick={this.handleGuest}/>
                </div>
            </div>
        );
    }
}

export function Signup(){
    return(
        <>
            welcome
        </>
    );
}

export function Signin(){
    return(
        <>
            hey there
        </>
    );
}