import React, { useState, useEffect } from 'react';
import authorizeService from './user-authentication/AuthorizeService';
import HardwareInfoDisplay from './HardwareInfoPage/HardwareInfoDisplay';

const FetchData = () => {
    const [hardware, setHardware] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHardwareInfo = async () => {
            const token = await authorizeService.getAccessToken();
            try {
                const response = await fetch('api/hardware', {
                    headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
                });
                if (response.ok) {
                    const data = await response.json();
                    if (data.hardware && Array.isArray(data.hardware) && data.hardware.length > 0) {
                        setHardware(data.hardware);
                    } else {
                        setError('No hardware data received.');
                    }
                } else {
                    setError(`Error: ${response.statusText}`);
                }
            } catch (err) {
                setError(`Error fetching data: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchHardwareInfo();
        const intervalId = setInterval(fetchHardwareInfo, 6000);
        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);

    if (loading) return <p><em>Loading...</em></p>;
    if (error) return <p>{error}</p>;
    if (hardware) return <HardwareInfoDisplay hardware={hardware} />;
    return <p>Error: Unable to fetch hardware data.</p>;
};

export default FetchData;
