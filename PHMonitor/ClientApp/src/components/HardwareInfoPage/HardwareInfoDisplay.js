import React from 'react';

function HardwareInfoDisplay({ hardware }) {
    // Grouping hardware based on 'hType'
    const groupedByHType = hardware.reduce((acc, curr) => {
        if (!acc[curr.hType]) {
            acc[curr.hType] = [];
        }
        acc[curr.hType].push(curr);
        return acc;
    }, {});

    return (
        <div>
            {Object.entries(groupedByHType).map(([hType, hardwareItems], idx) => (
                <div key={idx} className="hardware-category">
                    <h2 className="hardware-type-title">{hType}</h2>

                    {hardwareItems.map((h, hIdx) => (
                        <div key={hIdx} className="hardware-item">
                            <h3>{h.name}</h3>

                            {(() => {
                                const groupedBySensorType = h.sensors.reduce((acc, curr) => {
                                    if (!acc[curr.sensorType]) {
                                        acc[curr.sensorType] = [];
                                    }
                                    acc[curr.sensorType].push(curr);
                                    return acc;
                                }, {});

                                return Object.entries(groupedBySensorType).map(([sensorType, sensors], sIdx) => (
                                    <div key={sIdx}>
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
                    ))}
                </div>
            ))}
        </div>
    );
}

export default HardwareInfoDisplay;
