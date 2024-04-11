import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo.jpg';
import auth from '../lib/auth-helper'

const PrivateLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log(auth)
   auth.clearJWT(()=>{
     window.location.href = '/'

   });
  };

  return (
    <>
      <div>
        <nav>
          <div className='container'>
            <Link to="/"><img src={Logo} alt="Company Logo" className="logo" width="60px" height="60px" /></Link>
            <Link to="/incidents"> <p>Incident Management System</p></Link>
            <Link to="/incidents">User</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </nav>
      </div>
      {children}
    </>
  );
}

export default PrivateLayout;
