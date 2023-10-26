import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { ApplicationPaths, QueryParameterNames } from './ApiAuthorizationConstants';
import authService from './AuthorizeService';

export default class AuthorizeRoute extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ready: false,
            authenticated: false
        };
    }

    componentDidMount() {
        // Subscribe to authentication changes
        this._subscription = authService.subscribe(() => this.authenticationChanged());
        // Check the current authentication state
        this.populateAuthenticationState();
    }

    componentWillUnmount() {
        // Unsubscribe from authentication changes when the component is unmounted
        authService.unsubscribe(this._subscription);
    }

    render() {
        const { ready, authenticated } = this.state;
        const { path } = this.props;

        // Construct the return URL based on the current path
        const returnUrl = new URL(path, window.location.origin).toString();
        // Construct the redirect URL for the login page with the return URL as a parameter
        const redirectUrl = `${ApplicationPaths.Login}?${QueryParameterNames.ReturnUrl}=${encodeURIComponent(returnUrl)}`;

        // Show a loading state until the authentication state is determined
        if (!ready) {
            return <div>Loading...</div>;
        }

        // If the user is authenticated, render the protected component
        // Otherwise, redirect to the login page
        const { element } = this.props;
        return authenticated ? element : <Navigate replace to={redirectUrl} />;
    }

    async populateAuthenticationState() {
        // Check if the user is authenticated
        const authenticated = await authService.isAuthenticated();
        // Update the component state
        this.setState({ ready: true, authenticated });
    }

    async authenticationChanged() {
        // Reset the component state when the authentication state changes
        this.setState({ ready: false, authenticated: false });
        // Re-check the authentication state
        await this.populateAuthenticationState();
    }
}
