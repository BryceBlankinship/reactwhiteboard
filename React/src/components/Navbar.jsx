import React, { Component } from 'react';
import Button from './Buttons';
import { Profile } from './Auth';
import './navbar.css';

export default class Navbar extends Component {

    handleHome = () => {

    }

    render(){
        return(
            <div className="navbar-container">
                <div className="navbar-item left">
                    <Button type="logo" onClick={this.handleHome}/>
                </div>
                <div className="navbar-item">
                    test
                </div>
                <div className="navbar-item">
                    <Profile/>
                </div>
            </div>
        );
    }
}