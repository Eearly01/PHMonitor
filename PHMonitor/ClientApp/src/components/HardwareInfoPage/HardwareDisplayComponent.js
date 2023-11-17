import React from 'react';
import { useFetchHardwareData } from './FetchHardwareInfo';
import HardwareInfoDisplay from './HardwareInfoDisplay';

const HardwareDisplayComponent = () => {
	const { hardware, loading, error } = useFetchHardwareData();

	if (loading)
		return (
			<p>
				<em>Loading...</em>
			</p>
		);
	if (error) return <p>{error}</p>;
	if (hardware) return <HardwareInfoDisplay hardware={hardware} />;

	return <p>Error: Unable to fetch hardware data.</p>;
};

export default HardwareDisplayComponent;
