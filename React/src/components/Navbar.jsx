import React, { Component } from 'react';
import Button from './Buttons';
import './navbar.css';

export default class Navbar extends Component {

    handleHome = () => {

    }

    render(){
        return(
            <div className='center'>
                <ul className='navbar'>
                    <li><Button type="logo" onClick={this.handleHome}/></li>
                    <NavbarButton onClick={this.props.createCard}>Create Card</NavbarButton>
                    <NavbarButton onClick={this.props.renameWhiteboard}>Rename Whiteboard</NavbarButton>
                    <NavbarButton position='right'><Profile/></NavbarButton>
                </ul>
            </div>
        );
    }
}


function NavbarButton(props){
    return(
        <li className={props.position} onClick={props.onClick}>{props.children}</li>
    );
}

function Profile(){
    
}