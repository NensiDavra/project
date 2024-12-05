import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

function Footer() {
  return (
    <div className="info">
      <footer className="footer">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/reseller">Reseller Program</Link>
          <Link to="/download">Download</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <div className="p">
          Address : B204, Sumel Business Park – 7, Odhav, Ahmedabad – 382415
          Email : info@digibulkmarketing.com 
          Phone : 1800 889 8358
        </div>
      </footer>
    </div>
  );
}

export default Footer;
