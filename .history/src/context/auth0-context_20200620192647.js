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
        isAuthenticated: false
    };
    config = {
        domain: process.env.REACT_APP_AUTH0_DOMAIN,
        client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
        redirect_uri: window.location.origin
    };

    componentDidMount() {
        this.initializeAuth0();
    }


    handleRedirectCallback = async () => {
      this.setState({ isLoading: true });
  
      await this.state.auth0Client.handleRedirectCallback();
      const user = await this.state.auth0Client.getUser();
  
      this.setState({ user, isAuthenticated: true, isLoading: false });
    };
    initializeAuth0 = async () => {
    
      const auth0Client = await createAuth0Client(this.config);
      this.setState({ auth0Client });

          // check to see if they have been redirected after login
    if (window.location.search.includes('code=')) {
      return this.handleRedirectCallback();
    }

    const isAuthenticated = await auth0Client.isAuthenticated();
    const user = isAuthenticated ? await auth0Client.getUser() : null;
    this.setState({ isLoading: false, isAuthenticated, user });

    };

    render() {
      const { auth0Client, isLoading, isAuthenticated, user } = this.state
        const { children } = this.props;

        const configObject = {
           isLoading,
          isAuthenticated,
          user,
           loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
           getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
           getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
           logout: (...p) => auth0Client.logout(...p)
          }; 

        return (
            <Auth0Context.Provider value={configObject}>
                {children}
            </Auth0Context.Provider>
        );
    }
}


