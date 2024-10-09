import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} Nilesh Ranjan. No rights reserved.</p>
            <p className="footer-info">Built with ❤️ using React.</p>
            <p className="footer-links">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a> |
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"> LinkedIn</a>
            </p>
        </footer>
    );
};

export default Footer;

// rel="noopener noreferrer"=>By using rel="noopener" ensure that the new page does 
// not have access to the window.opener object, thus preventing it from manipulating the original page.
