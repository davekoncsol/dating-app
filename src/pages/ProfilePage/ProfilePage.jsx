import React, { Component } from 'react';


class ProfilePage extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      // Initialize user if there's a token, otherwise null
      profile : this.componentDidUpdate
    };
  }


  async componentDidMount ()  {
    const profile = await this.props.getUserById(this.props.match.params.id)
    this.setState({ profile }); 
   }

shouldComponentUpdate() {
  return this.state.profile._id !== this.props.match.params.id
 }
  
 async componentDidUpdate() {
  const profile = await this.props.getUserById(this.props.match.params.id)
  this.setState({ profile }); 
 }



render(){

  
    return (
      <div className='body'>       
      {this.state.profile  ?   
      <div>   
        <h3>Name: {this.state.profile.name} </h3>
        <h3>Email: {this.state.profile.email} </h3>
       </div>    
:
<p>loading</p>
}
      </div>
    );
        
  }
}


export default ProfilePage;