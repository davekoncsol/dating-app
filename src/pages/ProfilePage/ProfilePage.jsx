import React, { Component } from 'react';



const ProfilePage = (props) => {
console.log(props.match.params.id)

    // const user = props.getUser(props.match.params.id)

    return (
      <div className='body'>
          
        <h3>Name: </h3>
        <h3>Email: </h3>
        <h3></h3>
      </div>
    );
  }


export default ProfilePage;