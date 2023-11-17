import React, { Component } from 'react';
import { IntroBlock } from './Homepage/IntroBlock';

export class Home extends Component {
	static displayName = Home.name;

	render() {
		return (
			<>
				<IntroBlock />
			</>
		);
	}
}
