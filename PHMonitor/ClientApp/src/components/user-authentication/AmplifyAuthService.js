import { Auth, Hub } from 'aws-amplify';

class AmplifyAuthService {
    async signIn(username, password) {
        try {
            const user = await Auth.signIn(username, password);
            // Handle the successful sign in here
            console.log('Sign in successful', user);
        } catch (error) {
            console.error('Error signing in', error);
            // Handle the error here
        }
    }

    async signOut() {
        try {
            await Auth.signOut();
            window.location.reload();
        } catch (error) {
            console.error('Error signing out', error);
        }
    }

    async isAuthenticated() {
        try {
            await Auth.currentAuthenticatedUser();
            return true;
        } catch (error) {
            return false;
        }
    }

    async getUser() {
        try {
            const user = await Auth.currentAuthenticatedUser();
            return user.attributes;
        } catch (error) {
            return null;
        }
    }

    subscribe(callback) {
        return Hub.listen('auth', ({ payload: { event, data } }) => {
            switch (event) {
                case 'signIn':
                case 'signOut':
                    return callback();
                default:
                    return;
            }
        });
    }

    unsubscribe(subscription) {
        Hub.remove('auth', subscription);
    }
}

const authService = new AmplifyAuthService();
export default authService;
