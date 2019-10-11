import React, { Component } from 'react';
import ProfileCard from '../../components/ProfileCard/ProfileCard'
import './AllProfilePages.css'

class AllProfilesPage extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      // Initialize user if there's a token, otherwise null
      profiles : null
    };
  }


  async componentDidMount ()  {
    const profiles = await this.props.getAllUsers()
    this.setState({ profiles }); 
   }


render(){
    return (
      <div className='body'>       
      {this.state.profiles  ?   
      <div className='profile-list'>
      {this.state.profiles.map(profile =>
      <ProfileCard
        key={profile._id}
        profile={profile}
      />
    ) }
    </div>
:
<p>loading</p>
}
      </div>
    );
        
  }
}


export default AllProfilesPage;