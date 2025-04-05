import React from 'react';
import '../../index.css';
import { faXTwitter, faFacebook, faInstagram, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const FooterSection = () => {
  return (
    <div id="footer">
      <div>Logo here</div>
      <ul id="footer-center-links">
        <li>About</li>
        <li>FAQs</li>
        <li>Contact Us</li>
        <li>Privacy Policy</li>
      </ul>
      <div id="social-media-icons">
        <FontAwesomeIcon icon={faFacebook} size="lg"/>
        <FontAwesomeIcon icon={faInstagram} size="lg"/>
        <FontAwesomeIcon icon={faXTwitter} size="lg"/>
        <FontAwesomeIcon icon={faLinkedin} size="lg"/>
        <FontAwesomeIcon icon={faYoutube} size="lg"/>
      </div>
    </div>
  )
}

export default FooterSection;
