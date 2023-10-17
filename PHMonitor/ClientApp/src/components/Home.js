import React, { Component } from 'react';

class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <div className="home-container">
                <header>
                    <h1>Welcome to Your Hardware Benchmarking Platform</h1>
                </header>
                <section className="features">
                    <h2>Key Features</h2>
                    <ul>
                        <li>
                            <strong>Compare Hardware Performance:</strong> Benchmark your computer's hardware and compare it with others to discover what works best.
                        </li>
                        <li>
                            <strong>Real-time Monitoring:</strong> Monitor CPU and GPU performance in real-time and track temperature, voltage, and more.
                        </li>
                        <li>
                            <strong>Interactive Dashboards:</strong> Visualize benchmark results with interactive graphs and charts.
                        </li>
                        <li>
                            <strong>User-Friendly Interface:</strong> Easily navigate and explore hardware data with our intuitive interface.
                        </li>
                    </ul>
                </section>
                <section className="getting-started">
                    <h2>Getting Started</h2>
                    <p>Follow these steps to get started with our hardware benchmarking platform:</p>
                    <ol>
                        <li>
                            <strong>Log In:</strong> Log in to your account to access the benchmarking features.
                        </li>
                        <li>
                            <strong>Run Benchmarks:</strong> Run benchmark tests to assess your hardware's performance.
                        </li>
                        <li>
                            <strong>Compare Results:</strong> Compare your benchmark results with other users to find optimal hardware configurations.
                        </li>
                        <li>
                            <strong>Explore Data:</strong> Explore real-time hardware data and graphs to make informed decisions.
                        </li>
                    </ol>
                </section>
                <section className="technologies-used">
                    <h2>Technologies Used</h2>
                    <p>Our platform is built with the following technologies:</p>
                    <ul>
                        <li>
                            <strong>Backend:</strong> ASP.NET Core and C# for server-side code.
                        </li>
                        <li>
                            <strong>Frontend:</strong> React for client-side code.
                        </li>
                        <li>
                            <strong>Styling:</strong> Bootstrap for layout and styling.
                        </li>
                    </ul>
                </section>
            </div>
        );
    }
}

export default Home;
