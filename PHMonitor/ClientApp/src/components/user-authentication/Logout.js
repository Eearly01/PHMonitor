import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { QueryParameterNames, LogoutActions, ApplicationPaths } from './ApiAuthorizationConstants';

export class Logout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: undefined,
            isReady: false,
            authenticated: false
        };
    }

    async componentDidMount() {
        const action = this.props.action;
        switch (action) {
            case LogoutActions.Logout:
                this.logout(this.getReturnUrl());
                break;
            case LogoutActions.LogoutCallback:
                this.processLogoutCallback();
                break;
            case LogoutActions.LoggedOut:
                this.setState({ isReady: true, message: "You successfully logged out!" });
                break;
            default:
                throw new Error(`Invalid action '${action}'`);
        }

        this.populateAuthenticationState();
    }

    render() {
        const { isReady, message } = this.state;
        if (!isReady) {
            return <div></div>;
        }
        if (!!message) {
            return <div>{message}</div>;
        } else {
            const action = this.props.action;
            switch (action) {
                case LogoutActions.Logout:
                    return <div>Processing logout</div>;
                case LogoutActions.LogoutCallback:
                    return <div>Processing logout callback</div>;
                case LogoutActions.LoggedOut:
                    return <div>{message}</div>;
                default:
                    throw new Error(`Invalid action '${action}'`);
            }
        }
    }

    async logout(returnUrl) {
        try {
            await Auth.signOut();
            this.setState({ isReady: true, message: "You successfully logged out!" });
            this.navigateToReturnUrl(returnUrl);
        } catch (error) {
            console.error('Error during sign out', error);
            this.setState({ message: "An error occurred during logout. Please try again." });
        }
    }

    async processLogoutCallback() {
        // AWS Amplify handles logout directly and does not use a callback URL for logout
        this.setState({ isReady: true, message: "You successfully logged out!" });
    }

    async populateAuthenticationState() {
        try {
            await Auth.currentAuthenticatedUser();
            this.setState({ isReady: true, authenticated: true });
        } catch (error) {
            this.setState({ isReady: true, authenticated: false });
        }
    }

    getReturnUrl() {
        const params = new URLSearchParams(window.location.search);
        const fromQuery = params.get(QueryParameterNames.ReturnUrl);
        if (fromQuery && !fromQuery.startsWith(`${window.location.origin}/`)) {
            // This is an extra check to prevent open redirects.
            throw new Error("Invalid return url. The return url needs to have the same origin as the current page.")
        }
        return fromQuery || `${window.location.origin}${ApplicationPaths.LoggedOut}`;
    }

    navigateToReturnUrl(returnUrl) {
        window.location.replace(returnUrl);
    }
}
