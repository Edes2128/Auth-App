// src/contexts/auth0-context.js

import React, { Component, createContext } from 'react';
import createAuth0Client from '@auth0/auth0-spa-js';

// create the context
export const Auth0Context = createContext();

// create a provider
export class Auth0Provider extends Component {
    state = {
        auth0Client: null,
        isLoading: true ,
    };
    config = {
        domain: process.env.REACT_APP_AUTH0_DOMAIN,
        client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
        redirect_uri: window.location.origin
    };

    componentDidMount() {
        this.initializeAuth0();
    }

    initializeAuth0 = async () => {
        const auth0Client = await createAuth0Client(this.config);
        this.setState({ auth0Client, isLoading: false });
    };

    render() {
        const { isLoading } = this.state; 
        const { children } = this.props;

        const configObject = { isLoading }; 

        return (
            <Auth0Context.Provider value={configObject}>
                {children}
            </Auth0Context.Provider>
        );
    }
}