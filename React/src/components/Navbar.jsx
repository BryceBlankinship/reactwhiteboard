import React, { Component } from 'react';
import Button from './Buttons';
import { Profile } from './Auth';

export default class Navbar extends Component {

    handleHome = () => {

    }

    render(){
        return(
            <div className="navbar-container">
                <Button type="logo" onClick={this.handleHome}/>
                test
                <Profile/>
            </div>
        );
    }
}