import React, { Component } from 'react';
import ProfileCard from '../../components/ProfileCard/ProfileCard'

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
      this.state.profiles.map(profile =>
      <ProfileCard
        key={profile._id}
        profile={profile}
      />
    ) 
:
<p>loading</p>
}
      </div>
    );
        
  }
}


export default AllProfilesPage;