import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.scss';

const NavBar = () => {
    return (
      <div className='NavBarContainer'>
        <a href="/" className='AppLogo'>
          <i className="fa fa-film"></i>
        </a>
        <nav className='NavBar'>
          <div className='NavButtons'>
            <NavLink className="NavLink" to='/'>Home</NavLink>
            <NavLink className="NavLink" to='/gallery'>Gallery</NavLink>
          </div>
        </nav>
      </div>
    );
};

export default NavBar;