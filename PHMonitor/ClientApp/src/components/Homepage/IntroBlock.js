import React from 'react';
import './IntroBlock.css';

export const IntroBlock = () => {
    return (
        <div className="portfolio">
            <header>
                <div className="header-content">
                    <div className="left-header">
                        <div className="image">
                            <img src={require("./img/portrait3.JPG")} alt="Elijah Early" />
                        </div>
                    </div>
                    <div className="right-header">
                        <h1>Hello, I'm Elijah Early</h1>
                        <h2>A Web Developer & Hardware Enthusiast</h2>
                        <p>
                            With a foundation in programming from high school, I've honed my skills in HTML, CSS, JavaScript, and Java. My passion led me to General Assembly, where I not only learned but also contributed as a Teacher's Assistant. Post my tenure at General Assembly, I embarked on an exciting journey with CloudHWM, where I developed a hardware monitoring software.
                        </p>
                        <div className="btn-con">
                            <a href="./img/Elijah Early's Resume.pdf" target="_blank" rel="noreferrer" className="main-btn">
                                <span className="btn-text">View Resume</span>
                                <span className="btn-icon"><i className="fas fa-download"></i></span>
                            </a>
                        </div>
                    </div>
                </div>
            </header>
            <main>
                <section className="section about" id="about">
                    <h2>About My Journey</h2>
                    <div className="about-container">
                        <div className="left-about">
                            <h3>CloudHWM</h3>
                            <p>
                                At CloudHWM, I developed a hardware monitoring software that presents optimal hardware configurations by comparing the efficiency of various server components. My role involved pulling thermal performance data, creating an API/backend for data visualization, and developing a client-side application in React. I also utilized SQL Server on AWS for data management and trend analysis.
                            </p>
                        </div>
                        <div className="right-about">
                            <h3>Current Project</h3>
                            <p>
                                Post my contract at CloudHWM, I initiated a project to apply server monitoring concepts to personal hardware devices. The current version allows users to view their hardware data, but the ultimate goal is to enable data comparison across devices, assisting PC enthusiasts in making informed upgrade decisions.
                            </p>
                        </div>
                    </div>
                </section>
                <section className="section portfolio" id="portfolio">
                    <h2>Featured Project</h2>
                    <div className="portfolio-item">
                        <div className="image">
                            <img src="./img/recipe_app.png" alt="Hardware Monitor Project" />
                        </div>
                        <div className="hover-items">
                            <h3>Hardware Monitor</h3>
                            <p>
                                A personal hardware monitoring tool aimed at providing insights and comparisons for PC enthusiasts.
                            </p>
                            <div className="icons">
                                <a href="https://github.com/Eearly01/capstone-meal-planner" target="_blank" rel="noreferrer" className="icon">
                                    <i className="fab fa-github"></i>
                                </a>
                                <a href="https://meal-planner-eearly.herokuapp.com/" target="_blank" rel="noreferrer" className="icon">
                                    <i className="fa-sharp fa-solid fa-window-maximize"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
