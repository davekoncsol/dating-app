import React from "react";
import { Link } from 'react-router-dom';
import heartlogo from '../../images/hearts-43887_1280.png'

const NavBar = (props) => {
  
    let nav = props.user ?
    
        <div className="NavBar">
        <Link to='/edit-profile' className='NavBar-link'>Edit Profile</Link>
        &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
        <Link to='' className='NavBar-link' onClick={props.handleLogout}>LOG OUT</Link>
        &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
        <span className='NavBar-welcome'>WELCOME, {props.user.name}</span>
        &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
        <Link to={`/profile/${props.user._id}`} className='NavBar-link'>My Profile</Link>
        &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
        <Link to={`/allprofiles/`} className='NavBar-link'>All Profiles</Link>
        &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
        <Link to={`/inbox/`} className='NavBar-link'>Inbox</Link>
      </div>
      :
      <div className="NavBar">
        <Link to='/login' className='NavBar-link'>LOG IN</Link>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <Link to='/signup' className='NavBar-link'>SIGN UP</Link>
      </div>;
  
    return (
      
      <div className='NavBar'>
        <img src={`${heartlogo}`}/>
        {nav}
      </div>

      
    );
  };

export default NavBar;
