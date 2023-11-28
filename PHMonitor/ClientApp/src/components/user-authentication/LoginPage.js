import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Auth } from 'aws-amplify';
import axios from 'axios';

export const LoginPage = () => {

	const handleDeleteAccount = async () => {
		if (
			window.confirm(
				'Are you sure you want to delete your account? This cannot be undone.'
            )
		) {
			try {
				const user = await Auth.currentAuthenticatedUser();
				const userId = user.attributes.sub;

				await Auth.deleteUser(user);

				await axios.delete(`/api/user/${userId}`);

				await Auth.signOut();

				// Redirect to home or a confirmation page
				window.location.href = '/';
			} catch (error) {
				console.error('Error deleting account:', error);
				// Display an error message to the user
			}
		}
	};

	return (
		<Authenticator signUpAttributes={['email', 'name']}>
			{({ signOut, user }) =>
				user ? (
					<div>
						<h1>Hello {user.username}</h1>
						<button onClick={signOut}>Sign out</button>
						<button onClick={handleDeleteAccount}>Delete Account</button>
					</div>
				) : (
					<div>Please sign in...</div>
				)
			}
		</Authenticator>
	);
};
