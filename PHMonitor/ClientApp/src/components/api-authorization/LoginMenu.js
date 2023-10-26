import React, { Component, Fragment } from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import authService from './AuthorizeService';
import { ApplicationPaths } from './ApiAuthorizationConstants';

export class LoginMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            userName: null
        };
    }

    componentDidMount() {
        this._subscription = authService.subscribe(() => this.populateState());
        this.populateState();
    }

    componentWillUnmount() {
        authService.unsubscribe(this._subscription);
    }

    async populateState() {
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
        this.setState({
            isAuthenticated,
            userName: user && user.name
        });
    }

    render() {
        const { isAuthenticated, userName } = this.state;
        if (!isAuthenticated) {
            return this.anonymousView();
        } else {
            return this.authenticatedView(userName);
        }
    }

    authenticatedView(userName) {
        return (<Fragment>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to={ApplicationPaths.Profile}>Hello {userName}</NavLink>
            </NavItem>
            <NavItem>
                <NavLink className="text-dark" href="#" onClick={this.logout}>Logout</NavLink>
            </NavItem>
        </Fragment>);
    }

    anonymousView() {
        return (<Fragment>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to={ApplicationPaths.Register}>Register</NavLink>
            </NavItem>
            <NavItem>
                <NavLink className="text-dark" href="#" onClick={this.login}>Login</NavLink>
            </NavItem>
        </Fragment>);
    }

    login = () => {
        authService.signIn();
    }

    logout = () => {
        authService.signOut();
    }
}
