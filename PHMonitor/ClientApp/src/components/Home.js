import React, { Component } from 'react';
import Portfolio from './Homepage/IntroBlock';
import Contact from './Homepage/Contact';

export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <>
                <Portfolio />
                <Contact />
            </>
        );
    }
}
