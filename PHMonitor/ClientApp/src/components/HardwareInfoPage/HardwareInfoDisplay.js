import React from 'react';
import PerformanceGraph from './PerformanceGraph';
import './HardwareInfo.css';

function HardwareInfoDisplay({ hardware }) {
    // Grouping hardware based on 'hType'
    const groupedByHType = hardware.reduce((acc, curr) => {
        if (!acc[curr.hType]) {
            acc[curr.hType] = [];
        }
        acc[curr.hType].push(curr);
        return acc;
    }, {});

    //Data for Top Performance Graph
    const cpuHardware = hardware.find(h => h.hType === "Cpu");
    const cpuTotalLoad = cpuHardware.sensors.find(s => s.name === "CPU Total")?.value || [];
    const coreAverageTemp = cpuHardware.sensors.find(s => s.name === "Core Average")?.value || [];
    const cpuCoreVoltage = cpuHardware.sensors.find(s => s.name.startsWith("CPU Core") && s.sensorType === "Voltage")?.value || [];
    //console.log(cpuTotalLoad)
  
    return (

        <div>
            <div>
                <div className="graph-container">
                    <div className='hardware-graph'>
                        <PerformanceGraph data={cpuTotalLoad} label="CPU Total Load" max={100} unit='%' />
                    </div>
                    <div className='hardware-graph'>
                        <PerformanceGraph data={coreAverageTemp} label="Core Average Temperature/100C" max={100} unit='C' />
                    </div>
                    <div className='hardware-graph'>
                        <PerformanceGraph data={cpuCoreVoltage} label="CPU Core Voltage/1.35" max={1.35} unit='V' />
                    </div>
                </div>
            </div>
            {Object.entries(groupedByHType).map(([hType, hardwareItems], idx) => (
                <div key={idx} className="hardware-category">
                    <h2 className="hardware-type-title">{hType}</h2>

                    {hardwareItems.map((h, hIdx) => (
                        <div key={hIdx} >
                            <h3>{h.name}</h3>
                            <div className="hardware-item">
                                {(() => {
                                    const groupedBySensorType = h.sensors.reduce((acc, curr) => {
                                        if (!acc[curr.sensorType]) {
                                            acc[curr.sensorType] = [];
                                        }
                                        acc[curr.sensorType].push(curr);
                                        return acc;
                                    }, {});

                                    return Object.entries(groupedBySensorType).map(([sensorType, sensors], sIdx) => (
                                        <div key={sIdx} className='sensor-container'>
                                            <h4>{sensorType}</h4>
                                            <ul>
                                                {sensors.map((s, ssIdx) => (
                                                    <li className="sensor-item" key={ssIdx}>
                                                        {s.name}: {s.value}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ));
                                })()}
                            </div>

                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default HardwareInfoDisplay;
