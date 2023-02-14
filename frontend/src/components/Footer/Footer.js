import React from 'react';

function Footer() {
    let year = (new Date).getFullYear();

    return (
        <footer className="footer">
            <p className="footer__copyright">&#169; {year} Mesto Russia</p>
        </footer>
    );
}

export default Footer;