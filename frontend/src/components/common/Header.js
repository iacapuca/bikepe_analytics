import React from 'react';
import './Header.css';
import logo from './logo.png';

const Header = () => {
    return (
        <div className='Header'>
            <img src={logo} alt='logo' className='Header-logo'/>
            <div className="Nav-Item">
            <span>Mapa de Estações</span>
            </div>
        </div>
    );
}

export default Header;