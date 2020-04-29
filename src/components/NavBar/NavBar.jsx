import React from "react";
import { Link } from 'react-router-dom';
import heartlogo from '../../images/hearts-43887_1280.png'

const NavBar = (props) => {
  function toggleWeavy(e) {
    console.log('click');
    console.log(props)
    console.log(e.target.innerText.toLowerCase());
    props.weavy.space("main").toggle({ type: e.target.innerText.toLowerCase(), key: `main-${e.target.innerText.toLowerCase()}` });

  };
  
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
        &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
        <Link onClick={toggleWeavy.bind(this)} className='weavy-messenger-btn'>Messenger</Link>
        
      </div>
      :
      <div className="NavBar">
        <Link to='/login' className='NavBar-link'>LOG IN</Link>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <Link to='/signup' className='NavBar-link'>SIGN UP</Link>
      </div>;
  
    return (
      
      <div className='NavBar'>
        <Link to='/'>
        <img src={`${heartlogo}`} alt={'heart-logo'}/>
        </Link>
        {nav}
      </div>

      
    );
  };

export default NavBar;
