import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reserved By Syed</div>
      <div>
        <Link to={"https://www.facebook.com/share/qpf16q4G39CKZfYf/?mibextid=qi2Omg"} target="_blank">
          <FaFacebookF />
        </Link>
        
        <Link to={"https://www.linkedin.com/in/syed-jamal-ahmed-73b27618a/"} target="_blank">
          <FaLinkedin />
        </Link>
        <Link to={"https://www.instagram.com/syed_hasnat_au?igsh=MWhtajd1aGo5ZTA4NA=="} target="_blank">
          <RiInstagramFill />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;