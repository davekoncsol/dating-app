import React, { Component } from 'react';



const ProfilePage = (props) => {
console.log(props.match.params.id)

    const profile = props.profileUser(props.match.params.id)
    console.log(profile)

    return (
      <div className='body'>
          
        <h3>Name: {profile.name} </h3>
        <h3>Email: </h3>
        <h3></h3>
      </div>
    );
  }


export default ProfilePage;