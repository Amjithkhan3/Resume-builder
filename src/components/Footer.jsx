import React from 'react';
import { FaPhoneAlt, FaWhatsapp, FaInstagram, FaFacebookF } from "react-icons/fa";
import { MdAttachEmail } from "react-icons/md";

function Footer() {
  return (
    <div
      style={{ height: '300px', backgroundColor: 'black', color: 'white' }}
      className="d-flex justify-content-center align-items-center p-5 flex-column"
    >
      <h3>Contact Us</h3>
      <h5 className="fw-bolder">
        <MdAttachEmail /> resumebuilder@gmail.com
      </h5>
      <h5 className="fw-bolder">
        <FaPhoneAlt /> +91 9087654321
      </h5>

      <h4 className="mt-4">Connect With Us</h4>
      <div className="d-flex justify-content-center fs-4 my-3">
        <FaWhatsapp className="mx-3" />
        <FaInstagram className="mx-3" />
        <FaFacebookF className="mx-3" />
      </div>

      <p>Designed & built with ❤️ using React</p>
    </div>
  );
}

export default Footer;
