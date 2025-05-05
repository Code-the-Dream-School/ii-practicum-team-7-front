import React, { useLayoutEffect } from 'react';
import logo from "../../images/logo1.png";
import { faXTwitter, faFacebook, faInstagram, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useLocation } from 'react-router-dom';


const FooterSection = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const routeStyles = {
    "/": { bg: "bg-ny-pink-light", text: "text-black", line: "border-gray-400" },
    "/login": { bg: "bg-ny-pink-light", text: "text-black", line: "border-gray-400" },
    "/register": { bg: "bg-ny-pink-light", text: "text-black", line: "border-gray-400" },
    "/jobs": { bg: "bg-ny-pink", text: "text-white", line: "line-white" },
  };

  const { bg, text, line } = routeStyles[currentPath] || { bg: "white", text: "text-black" };

  return (
    <>
    <div className={`px-16 py-8 ${bg} ${text} flex flex-col md:flex-row justify-between items-center gap-8`}>
      {/* Logo */}
      <Link to="/">
        <img src={logo} alt="logo" width="100px"/>
      </Link>

      {/* Links */}
      <ul className="flex flex-col md:flex-row gap-8 list-none text-sm items-center">
        <li>About</li>
        <li>FAQs</li>
        <li>Contact Us</li>
        <li>Privacy Policy</li>
      </ul>

      {/* Social Media */}
      <div className="flex gap-4">
        <FontAwesomeIcon icon={faFacebook} size="lg"/>
        <FontAwesomeIcon icon={faInstagram} size="lg"/>
        <FontAwesomeIcon icon={faXTwitter} size="lg"/>
        <FontAwesomeIcon icon={faLinkedin} size="lg"/>
        <FontAwesomeIcon icon={faYoutube} size="lg"/>
      </div>
    </div>

    <div className={`${bg} py-8 px-16`}>
      <div className={`${line} pb-12 border-t`}></div>
    </div>
  </>
  )
}

export default FooterSection;
