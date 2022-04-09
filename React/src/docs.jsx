import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class DocumentationPage extends Component {
    render(){
        return(
            <>
                <h1>Positions API Documentation</h1>
                <p>HTTP Methods Allowed: GET, POST, PATCH, DELETE</p>
                <p>API Currently in development, awaiting deployment.</p>
                <Link to="/">Home</Link>
            </>
        );
    }
}