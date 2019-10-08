import React, { Component } from 'react';




const ProfilePage = (props) => {
    const profile = props.getUserById(props.match.params.id);
    
    console.log(props.profileUser)
  
  

    return (
      <div className='body'>

        
        <h3>Name:  </h3>
        <h3>Email: </h3>
        <h3></h3>
      </div>
    );
  }


export default ProfilePage;