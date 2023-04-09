import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { FaUserAlt } from 'react-icons/fa';
import logo from '../../assets/images/logo.svg';
import './Header.scss';

function Header() {
   return (
      <header className='header-container'>
         <div className='header-container__logo'>
            <img src={logo} alt='Logo' className='header-container__logo--img' />
            <h1 className='header-container__logo--title'>
               Wülen <span>| Happy Hour Finder</span>
            </h1>
         </div>
         <div className='header-container__row'>
            <div className='header-container__search'>
               <input type='text' placeholder='Type bar name or keyword...' className='header-container__search-input' />
               <button className='header-container__search-button'>
                  <FaSearch style={{ color: '#278C8C' }} />
               </button>
            </div>
            <div className='header-container__avatar'>
               <FaUserAlt style={{ color: '#278C8C' }} />
            </div>
         </div>
      </header>
   );
}

export default Header;
