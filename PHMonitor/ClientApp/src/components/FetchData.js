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
        console.log('Access Token:', token); // Log the access token
        try {
            const response = await fetch('api/hardware', {
                headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
            });
            console.log('Response Status:', response.status); // Log the response status
            console.log(await response.json);
            if (response.status === 200) {
                const data = await response.json();
                console.log(data);
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
