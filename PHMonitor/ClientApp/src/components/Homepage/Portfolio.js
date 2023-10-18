import React from 'react';
import './Portfolio.css'; // Import the CSS file

function Portfolio() {
    return (
        <div className="portfolio">
            <header>
                <div className="header-content">
                    <div className="left-header">
                        <div className="h-shape"></div>
                        <div className="image">
                            <img src="img/portrait3.JPG" alt="Image has not Loaded" />
                        </div>
                    </div>
                    <div className="right-header">
                        <div className="name">
                            Hello, I'm <span>Elijah Early</span>
                            A Web Developer.
                        </div>
                        <p>
                            I am a web developer. Few things are more satisfying than having a
                            well-designed, presentable website. I very much enjoy parading my
                            accomplishments.
                        </p>
                        <div className="btn-con">
                            <a href="./img/Resume (1).pdf" target="_blank" className="main-btn">
                                <span className="btn-text">View Resume</span>
                                <span className="btn-icon"><i className="fas fa-download"></i></span>
                            </a>
                        </div>
                    </div>
                </div>
            </header>
            <main>
                <section className="section sec2 about" id="about">
                    <div className="main-title">
                        <h2>
                            About <span>me</span>
                            <span className="bg-text">my stats </span>
                        </h2>
                    </div>
                    <div className="about-container">
                        <div className="left-about">
                            <h4>Information About me</h4>
                            <p>
                                I began programming in high school and rekindled my love for it through General Assembly. During my free time, I play video games (almost any genre). When I have a weekend to spare, I am almost always backpacking through mountains. I enjoy staying active and even became a volunteer firefighter for 2 years after high school.
                            </p>
                            <div className="btn-con">
                                <a href="./img/Elijah Early's Resume.pdf" target="_blank" className="main-btn">
                                    <span className="btn-text">View Resume</span>
                                    <span className="btn-icon"><i className="fas fa-download"></i></span>
                                </a>
                            </div>
                        </div>
                        <div className="right-about">
                            <div className="about-item">
                                <div className="about-text">
                                    <p className="large-text">40+</p>
                                    <p className="small-text">Completed Projects <br /> High school-General Assembly</p>
                                </div>
                            </div>
                            <div className="about-item">
                                <div className="about-text">
                                    <p className="large-text">6+</p>
                                    <p className="small-text">Years of <br /> Experience</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section sec3 portfolio" id="portfolio">
                    <div className="main-title">
                        <h2>
                            My <span>Portfolio</span>
                            <span className="bg-text">my work </span>
                        </h2>
                    </div>
                    <p className="portfolio-text">
                        Please click on one of my projects
                    </p>
                    <div className="portfolios">
                        <div className="portfolio-item">
                            <div className="image">
                                <img src="./img/recipe_app.png" alt="Image not loaded" />
                            </div>
                            <div className="hover-items">
                                <h3>Meal Planner Project</h3>
                                <div className="icons">
                                    <a href="https://github.com/Eearly01/capstone-meal-planner" target="_blank" className="icon">
                                        <i className="fab fa-github"></i>
                                    </a>
                                    <a href="https://meal-planner-eearly.herokuapp.com/" target="_blank" className="icon">
                                        <i className="fa-sharp fa-solid fa-window-maximize"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* Add more portfolio items as needed */}
                    </div>
                </section>
            </main>
            <div className="controlls">
                <div className="control control-1 active-btn" data-id="home">
                    <i className="fas fa-home"></i>
                </div>
                <div className="control control-2" data-id="about">
                    <i className="fas fa-user"></i>
                </div>
                <div className="control control-3" data-id="portfolio">
                    <i className="fas fa-briefcase"></i>
                </div>
                <div className="control control-4" data-id="contact">
                    <i className="fas fa-envelope"></i>
                </div>
            </div>
            </div>
        
    );
}

export default Portfolio;
