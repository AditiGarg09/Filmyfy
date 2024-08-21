import { useState } from "react";
import { Link } from "react-router-dom";
import image from "../../images/headerLogo.png";

const Header = () => {
  return (
    <>
      <div className="header">
        <Link to="/">
          <div className="logo">
            <img width="50px" src={image} />
          </div>
        </Link>
        <div className="navItems">
          <ul>
            <li>
              <Link to="/" className="headerButton">
                Home
              </Link>
            </li>
            <li>
              <Link to="/aboutUs" className="headerButton">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contactUs" className="headerButton">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
