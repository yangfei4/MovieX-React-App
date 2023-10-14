import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.scss';

const NavBar = () => {
    return (
      <div className='NavBarContainer'>
        <a href="/" className='AppLogo'>
          <i className="fa fa-film"></i>
          <span className='AppTitle'> MovieX</span>
        </a>
        <nav className='NavBar'>
          <div className='NavButtons'>
            <NavLink className="NavLink" to='/'>Home</NavLink>
            <NavLink className="NavLink" to='/search'>Search</NavLink>
          </div>
        </nav>
      </div>
    );
};

export default NavBar;