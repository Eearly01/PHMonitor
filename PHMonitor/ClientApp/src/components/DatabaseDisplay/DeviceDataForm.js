import React, {useState} from 'react'

export const DeviceDataForm = ({ userId, existingDevice, hardwareData }) => {
	const [deviceData, setDeviceData] = useState({
		userId,
		deviceName: existingDevice ? existingDevice.deviceName : '', // User input
		deviceType: hardwareData?.find((h) => h.hType === 'Cpu')?.name || '', // Example: CPU name
		motherboard:
			hardwareData?.find((h) => h.hType === 'Motherboard')?.name || '',
		averageCoreTemp:
			hardwareData
				?.find((h) => h.hType === 'Cpu')
				?.sensors.find((s) => s.name === 'Core Average')?.value || 0,
		averageCoreVoltage:
			hardwareData
				?.find((h) => h.hType === 'Cpu')
				?.sensors.find(
					(s) => s.name === 'CPU Core' && s.sensorType === 'Voltage'
				)?.value || 0,
		totalLoadPercentage:
			hardwareData
				?.find((h) => h.hType === 'Cpu')
				?.sensors.find((s) => s.name === 'CPU Total' && s.sensorType === 'Load')
				?.value || 0,
		gpuCoreLoad:
			hardwareData
				?.find((h) => h.hType === 'Gpu')
				?.sensors.find((s) => s.name === 'GPU Core Load')?.value || 0,
		gpuCoreTemp:
			hardwareData
				?.find((h) => h.hType === 'Gpu')
				?.sensors.find(
					(s) => s.name === 'GPU Core' && s.sensorType === 'Temperature'
				)?.value || 0,
		busSpeed:
			hardwareData
				?.find((h) => h.hType === 'Cpu')
				?.sensors.find((s) => s.name === 'Bus Speed')?.value || 0,
		cpuPackage:
			hardwareData
				?.find((h) => h.hType === 'Cpu')
				?.sensors.find((s) => s.name === 'CPU Package ')?.value || 0,
	});

    const handleChange = (e) => {
			setDeviceData({ ...deviceData, [e.target.name]: e.target.value });
		};

		const handleSubmit = async (e) => {
			e.preventDefault();

			const endpoint = existingDevice
				? `/api/device/update/${deviceData.deviceName}` // Update endpoint
				: `/api/device/add`; // Add endpoint

			try {
				const response = await fetch(endpoint, {
					method: existingDevice ? 'PUT' : 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(deviceData),
				});

				if (response.ok) {
					console.log('Device data submitted successfully');
					// Redirect or update UI as needed
				} else {
					console.error('Error submitting device data:', response.statusText);
				}
			} catch (error) {
				console.error('Error submitting device data:', error);
			}
		};

		return (
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					name='deviceName'
					placeholder='Device Name'
					value={deviceData.deviceName}
					onChange={handleChange}
					required
				/>
				<input
					type='text'
					name='deviceType'
					value={deviceData.deviceType}
					readOnly
				/>
				<input
					type='text'
					name='motherboard'
					value={deviceData.motherboard}
					readOnly
				/>
				<input
					type='number'
					name='averageCoreTemp'
					value={deviceData.averageCoreTemp}
					readOnly
				/>
				<input
					type='number'
					name='averageCoreVoltage'
					value={deviceData.averageCoreVoltage}
					readOnly
				/>
				<input
					type='number'
					name='totalLoadPercentage'
					value={deviceData.totalLoadPercentage}
					readOnly
				/>
				<input
					type='number'
					name='gpuCoreLoad'
					value={deviceData.gpuCoreLoad}
					readOnly
				/>
				<input
					type='number'
					name='gpuCoreTemp'
					value={deviceData.gpuCoreTemp}
					readOnly
				/>
				<input
					type='number'
					name='busSpeed'
					value={deviceData.busSpeed}
					readOnly
				/>
				<input
					type='number'
					name='cpuPackage'
					value={deviceData.cpuPackage}
					readOnly
				/>
				<button type='submit'>Submit</button>
			</form>
		);
};
