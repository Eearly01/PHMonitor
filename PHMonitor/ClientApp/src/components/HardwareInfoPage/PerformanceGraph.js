import React from 'react';
import PropTypes from 'prop-types';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

function PerformanceGraph({ data, label, max, unit }) {
    const percentage = (data / max) * 100;

    const gradient = `conic-gradient(
        #007BFF ${data - 1}%,
        transparent ${data - 1}%,
        transparent ${data + 1}%,
        #007BFF ${data + 1}%
    )`;

    return (
        <div className="performance-graph">
            <div className="graph-header">{label}</div>
            <div className="graph-container">
                <CircularProgressbar
                    value={percentage}
                    text={`${data.toFixed(2)}${unit}`}
                    strokeWidth={10}
                    styles={buildStyles({
                        textColor: '#333',
                        pathColor: gradient,
                        trailColor: '#f0f0f0',
                    })}
                />
            </div>
        </div>
    );
}

//Type checking to remain thorough

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
