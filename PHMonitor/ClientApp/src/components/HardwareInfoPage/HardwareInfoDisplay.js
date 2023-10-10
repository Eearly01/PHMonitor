// HardwareInfoDisplay.js

import React from 'react';

function HardwareInfoDisplay({ hardware }) {
    return (
        <div>
            {(() => {
                <h1 className="hardware-title">{hardware[0].name}</h1>
                const items = [];
                for (let i = 1; i <= 5; i++) {
                    const h = hardware[i];
                    if (h) {
                        items.push(
                            <div key={i} className="hardware-item">
                                <h3>{h.name}</h3>
                                <ul>
                                    {h.sensors.map((s, sIdx) => (
                                        <li className="sensor-item" key={sIdx}>
                                            {s.name}: {s.value}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    }
                }
                return items;
            })()}
        </div>

    );
}

export default HardwareInfoDisplay;
