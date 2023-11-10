import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import { LoginPage } from './components/user-authentication/LoginPage';
import { LoginMenu } from './components/user-authentication/LoginMenu';
import {Amplify} from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

function App() {
	return (
		<Layout>
			<LoginMenu />
			<Routes>
				{AppRoutes.map((route, index) => (
					<Route key={index} {...route} />
				))}
				<Route path='/login' element={<LoginPage />} />
			</Routes>
		</Layout>
	);
}

export default App;
