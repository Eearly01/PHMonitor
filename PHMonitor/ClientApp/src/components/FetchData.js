import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService';
import HardwareInfoDisplay from './HardwareInfoPage/HardwareInfoDisplay';

export class FetchData extends Component {
    static displayName = FetchData.name;

    constructor(props) {
        super(props);
        this.state = { loading: true };
        this.refreshInterval = null; // Store the interval ID here
    }

    componentDidMount() {
        this.populateHardwareInfo();
        this.refreshInterval = setInterval(this.populateHardwareInfo.bind(this), 3000); // Re-fetch every 3 seconds
    }

    componentWillUnmount() {
        clearInterval(this.refreshInterval); // Clear the interval when the component is unmounted
    }

    render() {
        const { hardware, loading } = this.state;

        let contents;

        if (loading) {
            contents = <p><em>Loading...</em></p>;
        } else if (hardware) {
            contents = (
                <>
                    <HardwareInfoDisplay hardware={hardware} />
                    <button onClick={() => this.populateHardwareInfo()}>Refresh</button>
                </>
            );
        } else {
            contents = <p>Error: Unable to fetch hardware data.</p>;
        }

        return (
            <div>
                {contents}
            </div>
        );
    }

    async populateHardwareInfo() {
        const token = await authService.getAccessToken();
        try {
            const response = await fetch('api/hardware', {
                headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
            });
            if (response.status === 200) {
                const data = await response.json();
                console.log(data);

                if (data.hardware && Array.isArray(data.hardware) && data.hardware.length > 0) {

                    this.setState({  hardware: data.hardware, loading: false });
                } else {
                    console.error('No hardware data received.');
                    this.setState({ loading: false });
                }
            }

        } catch (error) {
            console.error('Error fetching data:', error);
            this.setState({ loading: false });
        }
    }

}
