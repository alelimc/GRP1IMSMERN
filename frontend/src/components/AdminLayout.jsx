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
            <Link to="/admin"><img src={Logo} alt="Company Logo" className="logo" width="60px" height="60px" /></Link>
            <Link to="/admin"> <p>Incident Management System</p></Link>
            <Link to="/admin/incidents">Admin</Link>
            <Link to="/admin/users">Users</Link>
            <Link to="/admin/incidents">Incidents</Link>
            <Link to="/admin/profile">Profile</Link>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </nav>
      </div>
      {children}
    </>
  );
}

export default PrivateLayout;
