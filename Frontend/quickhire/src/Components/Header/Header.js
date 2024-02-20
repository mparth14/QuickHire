import React from 'react';
import { Link } from 'react-router-dom';
import "./Header.css"; // Import your CSS file for styling

const Header = () => {
  return (
    <div className="header">
      <Link to="/category" className="link-deco"><h3>Writing</h3></Link>
      <Link to="/category" className="link-deco"><h3 style={{color: "green"}}>Programming</h3></Link>
      <Link to="/category" className="link-deco"><h3>Photography</h3></Link>
      <Link to="/category" className="link-deco"><h3>Video and Animation</h3></Link>
      <Link to="/category" className="link-deco"><h3>Digital Marketing</h3></Link>
      <Link to="/category" className="link-deco"><h3>Others</h3></Link>
    </div>
  );
}

export default Header;
