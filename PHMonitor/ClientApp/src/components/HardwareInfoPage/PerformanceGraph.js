import React from 'react';
import PropTypes from 'prop-types';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

function PerformanceGraph({ data, label, max, unit }) {
    const percentage = (data / max) * 100;

    // Linear interpolation function
    const lerp = (start, end, t) => start * (1 - t) + end * t;

    // Compute the RGB values based on the percentage
    const r = Math.round(lerp(0, 255, percentage / 100));
    const g = Math.round(lerp(123, 0, percentage / 100));
    const b = Math.round(lerp(255, 0, percentage / 100));

    const color = `rgb(${r}, ${g}, ${b})`;

    return (
        <div className="performance-graph">
            <div className="graph-header">{label}</div>
            <div className="graph-container">
                <CircularProgressbar
                    value={percentage}
                    text={`${data.toFixed(2)}${unit}`}
                    strokeWidth={10}
                    styles={buildStyles({
                        textColor: '#c5c6c7',
                        pathColor: color,
                        trailColor: '#c5c6c7',
                    })}
                />
            </div>
        </div>
    );
}

// Type checking to remain thorough
PerformanceGraph.propTypes = {
    data: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    max: PropTypes.number,
    unit: PropTypes.string
};

PerformanceGraph.defaultProps = {
    max: 100,
    unit: '%'
};

export default PerformanceGraph;
