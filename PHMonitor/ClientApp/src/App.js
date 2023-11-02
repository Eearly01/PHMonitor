import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import AuthorizeRoute from './components/user-authentication/AuthorizeRoute';
import { Layout } from './components/Layout';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
//import { withAuthenticator } from '@aws-amplify/ui-react';

import './custom.css';

Amplify.configure(awsconfig)

class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Routes>
                    
                    {AppRoutes.map((route, index) => {
                        const { element, requireAuth, ...rest } = route;
                        return <Route key={index} {...rest} element={requireAuth ? <AuthorizeRoute {...rest} element={element} /> : element} />;
                    })}
                </Routes>
            </Layout>
        );
    }
}

export default App;