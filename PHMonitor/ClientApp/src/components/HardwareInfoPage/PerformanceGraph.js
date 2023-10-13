import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, DoughnutController, RadialLinearScale } from 'chart.js';
import 'chartjs-plugin-annotation';

Chart.register(ArcElement, DoughnutController, RadialLinearScale);

function PerformanceGraph({ data, label, max }) {
    const chartData = {
        labels: [label],
        datasets: [
            {
                label: label,
                data: [data, max - data],
                backgroundColor: ['rgba(75,192,192,0.6)', 'rgba(220,220,220,0.2)'],
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                cutout: '80%',
            }
        ]
    };
    const parseData = parseFloat(data);

    const options = {
        plugins: {
            legend: {
                display: true,
            },
            annotation: {
                drawTime: 'afterDatasetsDraw', // This ensures the annotation is drawn after the dataset
                annotations: [
                    {
                        type: 'line',
                        mode: 'horizontal',
                        scaleID: 'y', // This refers to the Y-axis scale
                        value: data,
                        borderColor: 'rgba(75,192,192,1)',
                        borderWidth: 2,
                        position: 'end',
                        adjustScaleRange: true,
                        label: {
                            display: true,
                            content: `Value: ${parseData.toFixed(2)}`, // This will show the value with two decimal places. Adjust as needed.
                            position: 'start',
                            color: 'black',
                        }
                    }
                ]
            }
        },
        circumference: 90 * Math.PI,
        rotation: -45 * Math.PI
    };


    return (
        <div style={{ width: '30%' }}>
            <Doughnut data={chartData} options={options} />
        </div>
    );
}

export default PerformanceGraph;
