import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/navbar.css"


const Navbar = () => {
    return (
        <div className='navbar'>
            <div className="header"><Link to="/">Snake Safari</Link></div>
            <div className="collection"><Link to="/snakes">Snake Collection</Link></div>
            <div className="new"><Link to="/new">Add a Snake</Link></div>
        </div>
    );
};

export default Navbar;