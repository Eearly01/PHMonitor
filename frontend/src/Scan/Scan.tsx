import React, { useEffect, useState } from 'react';

const Scan = () => {
	const si = require('systeminformation');
	const os = require('os');
	const osUtil = require('os-utils');

	let [cpuTemp, setCpuTemp] = useState([0, 0]);
	let [cpuUsage, setCpuUsage] = useState([0, 0]);
	let [cpuMemory, setCpuMemory] = useState([0, 0]);
	const cpuSpeed = si.cpu.speed;
	const cpuModel = si.system().model;

	const scanHandler = async () => {
		const temperature = await si.cpuTemperature();
		setCpuTemp([temperature.main, temperature.max]);

		const memory = [os.totalmem(), os.freemem()];
		setCpuMemory(memory);

		const usage = await osUtil.cpuUsage();
		const free = await osUtil.cpuFree();
		setCpuUsage([usage, free]);
	};

	useEffect(() => {
		// You can use this effect to run any initialization code if needed
	}, []);

	return (
		<div>
			<button onClick={scanHandler}>Scan</button>
			<div>
				<h2>CPU Information:</h2>
				<p>Model: {cpuModel}</p>
				<p>
					Temperature: {cpuTemp[0]}°C / {cpuTemp[1]}°C (Max)
				</p>
				<p>
					Usage: {cpuUsage[0]}% (Used) / {cpuUsage[1]}% (Free)
				</p>
				<p>
					Memory: {cpuMemory[0] / 1024 / 1024} MB (Total) /{' '}
					{cpuMemory[1] / 1024 / 1024} MB (Free)
				</p>
				<p>Speed: {cpuSpeed} GHz</p>
			</div>
		</div>
	);
};

export default Scan;
