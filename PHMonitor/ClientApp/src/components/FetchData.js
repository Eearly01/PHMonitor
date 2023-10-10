import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService';

export class FetchData extends Component {
    static displayName = FetchData.name;

    constructor(props) {
        super(props);
        this.state = { temperature: null, loading: true };
    }

    componentDidMount() {
        this.populateHardwareInfo();
    }

    render() {
        const { temperature, loading } = this.state;

        let contents = loading ? (
            <p><em>Loading...</em></p>
        ): <p>Finished</p>;

        return (
            <div>
                {contents}
            </div>
        );
    }

    async populateHardwareInfo() {
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

                const firstHardware = data.hardware[0];
                const firstSensor = firstHardware?.Sensors[0];
                const temperature = firstSensor?.Value || null;

                this.setState({ temperature, loading: false });
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
