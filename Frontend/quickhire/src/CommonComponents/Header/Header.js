/**
 * Header component, sticks below the Navbar
 * @returns Header component
 */
import React from 'react';
import { Link } from 'react-router-dom';
import "./Header.css"; // Import your CSS file for styling

const Header = () => {
  return (
    <div className="header">
      <Link to="/category/programming" className="link-deco"><h3>Programming</h3></Link>
      <Link to="/category/photography" className="link-deco"><h3>Photography</h3></Link>
      <Link to="/category/Video and Animation" className="link-deco"><h3>Video and Animation</h3></Link>
      <Link to="/category/Graphics and Design" className="link-deco"><h3>Graphics and Design</h3></Link>
      <Link to="/category/Miscellaneous" className="link-deco"><h3>Miscellaneous</h3></Link>
    </div>
  );
}

export default Header;
