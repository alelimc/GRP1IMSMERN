import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo.jpg';

export default function Layout({ isAuthenticated }) {
    return (
        <>
            <div>
                <nav>
                    <div className='container'>
                        <Link to="/"><img src={Logo} alt="Company Logo" className="logo" width="60px" height="60px" /></Link>
                        <Link to="/"> <p>Incident Management System</p></Link>
                        {isAuthenticated ? (
                            <Link to="/dashboard">Dashboard</Link> // Example private route link
                        ) : (
                            <Link to="/signin">Signin</Link> // Example public route link
                        )}
                    </div>    
                </nav>
            </div>
        </>
    );
}
