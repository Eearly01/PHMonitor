import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DeviceDataForm } from './DeviceDataForm';
import { Auth } from 'aws-amplify';
import { useFetchHardwareData } from '../HardwareInfoPage/FetchHardwareInfo'; // Ensure this path is correct

export const DatabaseDisplay = () => {
	const [devices, setDevices] = useState([]);
	const [selectedDevice, setSelectedDevice] = useState(null);
	const [isAddingNew, setIsAddingNew] = useState(false);
	const [userId, setUserId] = useState(null);

	// Use FetchData hook to get hardware data
	const {
		hardware: hardwareData,
		loading: loadingHardware,
		error: errorHardware,
	} = useFetchHardwareData();

	useEffect(() => {
		const fetchUserAndDevices = async () => {
			try {
				const user = await Auth.currentAuthenticatedUser();
				const userId = user.attributes.sub; // 'sub' is the unique identifier for the user
				setUserId(userId);

				const response = await axios.get(`/api/device/user/${userId}`);
				setDevices(response.data);
			} catch (error) {
				console.error('Error fetching user data:', error);
			}
		};

		fetchUserAndDevices();
	}, []);

	const handleUpdateClick = (device) => {
		setSelectedDevice(device);
		setIsAddingNew(false);
	};

	const handleAddNewClick = () => {
		setSelectedDevice(null);
		setIsAddingNew(true);
	};

	if (loadingHardware) return <p>Loading hardware data...</p>;
	if (errorHardware) return <p>Error loading hardware data: {errorHardware}</p>;

	return (
		<div>
			{devices.map((device) => (
				<div key={device.deviceName}>
					<p>Name: {device.deviceName}</p>
					<p>Type: {device.deviceType}</p>
					<p>Motherboard: {device.motherboard}</p>
					<button onClick={() => handleUpdateClick(device)}>Update</button>
				</div>
			))}
			<button onClick={handleAddNewClick}>Add New Device</button>

			{isAddingNew && (
				<DeviceDataForm userId={userId} hardwareData={hardwareData} />
			)}
			{selectedDevice && (
				<DeviceDataForm
					userId={userId}
					existingDevice={selectedDevice}
					hardwareData={hardwareData}
				/>
			)}
		</div>
	);
};
