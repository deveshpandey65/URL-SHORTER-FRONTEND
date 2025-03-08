import React, { useState, forwardRef } from 'react';
import axios from 'axios';

const Contact = forwardRef((props, ref) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus('');

        try {
            const response = await axios.post('https://maild.netlify.app/api/mail', {
                to: email,
                subject: 'From Portfolio',
                text: `Name: ${name}\n\nMessage: ${message}`
            });

            console.log(response.data);
            setStatus('Message sent successfully! ✅');
            alert('Message Sent successfully');
        } catch (error) {
            console.error(error);
            setStatus('Failed to send message. ❌');
        } finally {
            setLoading(false);
            setName('');
            setEmail('');
            setMessage('');
        }
    };

    return (
        <div ref={ref} className="contact-form">
            <h2>Get in Touch</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    required
                />
                <br />
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                />
                <br />
                <label htmlFor="message">Message:</label>
                <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    name="message"
                    placeholder="Enter your message"
                    required
                />
                <br />
                <button type="submit" disabled={loading}>
                    {loading ? 'Sending...' : 'Send'}
                </button>
            </form>
            {status && <p>{status}</p>}
        </div>
    );
});

export default Contact;
