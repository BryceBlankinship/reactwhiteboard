import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const authContext = createContext({});
export default function AuthContext(props){
    const [userObject, setUserObject] = useState();

    useEffect(() => {
        axios.get("https://reactwhiteboard.herokuapp.com/user", { withCredentials: true }).then(res => {
            setUserObject(res.data);
        });
    }, []);

    return(
        <authContext.Provider value={userObject}>{props.children}</authContext.Provider>
    );
}