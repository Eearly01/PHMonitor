import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService';

export class FetchData extends Component {
    static displayName = FetchData.name;

    constructor(props) {
        super(props);
        this.state = { temperature: null, loading: true };
    }

    componentDidMount() {
        this.populateCpuTemperature();
    }

    render() {
        const { temperature, loading } = this.state;

        let contents = loading ? (
            <p><em>Loading...</em></p>
        ) : (
            <div>
                <h1>CPU Temperature</h1>
                <p>The CPU temperature is: {temperature} °C</p>
            </div>
        );

        return (
            <div>
                {contents}
            </div>
        );
    }

    async populateCpuTemperature() {
        const token = await authService.getAccessToken();
        try {
            const response = await fetch('api/openhardware', {
                headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
            });

            if (response.status === 200) {
                const data = await response.json();
                this.setState({ temperature: data.temperature, loading: false });
            } else {
                console.error('API returned status code:', response.status);
                const responseText = await response.text();
                console.error('API response content:', responseText);
                this.setState({ loading: false });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            this.setState({ loading: false });
        }

    }
}
