import React, { Component } from 'react';

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            subject: '',
            message: ''
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        // You can send this data to your server for email handling here
        const { name, email, subject, message } = this.state;
        const data = { name, email, subject, message };

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.status === 200) {
                // Email sent successfully
                alert('Email sent successfully!');
                this.setState({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                });
            } else {
                // Handle email sending error
                alert('Failed to send email. Please try again later.');
            }
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }

    render() {
        const { name, email, subject, message } = this.state;

        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={this.handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={this.handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Subject:</label>
                    <input
                        type="text"
                        name="subject"
                        value={subject}
                        onChange={this.handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Message:</label>
                    <textarea
                        name="message"
                        value={message}
                        onChange={this.handleChange}
                        required
                    />
                </div>
                <div>
                    <button type="submit">Send Email</button>
                </div>
            </form>
        );
    }
}

export default Contact;
