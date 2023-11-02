import { Amplify, Auth } from 'aws-amplify';
import React, { useEffect } from 'react';

const ConfigureAmplify = () => {
    useEffect(() => {
        const configureAmplify = async () => {
            try {
                const response = await fetch('/api/configuration/auth-settings');
                const settings = await response.json();

                console.log(settings.Authority)

                Amplify.configure({
                    Auth: {
                        region: settings.Region,
                        userPoolId: settings.UserPoolId,
                        userPoolWebClientId: settings.ClientId,
                        oauth: {
                            domain: settings.Authority,
                            scope: settings.Scope.split(' '),
                            redirectSignIn: settings.RedirectUri,
                            redirectSignOut: settings.PostLogoutRedirectUri,
                            responseType: settings.ResponseType,
                        },
                    },
                });

                console.log('Amplify configured successfully');
            } catch (error) {
                console.error('Error configuring Amplify', error);
            }
        };

        configureAmplify();
    }, []);

    return null;
};

export async function signIn() {
    try {
        await Auth.federatedSignIn({ provider: 'Cognito' });
    } catch (error) {
        console.error('Error during sign in', error);
    }
}

export async function signOut() {
    try {
        await Auth.signOut();
    } catch (error) {
        console.error('Error during sign out', error);
    }
}

export async function getCurrentUser() {
    try {
        const user = await Auth.currentAuthenticatedUser();
        return user;
    } catch (error) {
        console.error('Error getting current user', error);
        return null;
    }
}

export default ConfigureAmplify;
