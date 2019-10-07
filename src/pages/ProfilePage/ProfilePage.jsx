import React, { Component } from 'react';



const ProfilePage = (props) => {


    const user = props.getUser(props.match.params.id)

    return (
      <div className='body'>
          
        <h3>Name: {user.name}</h3>
        <h3>Email: </h3>
        <h3></h3>
      </div>
    );
  }


export default ProfilePage;