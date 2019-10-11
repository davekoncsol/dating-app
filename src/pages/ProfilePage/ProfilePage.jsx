import React, { Component } from 'react';
import './ProfilePage.css';

class ProfilePage extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      // Initialize user if there's a token, otherwise null
      profile : 'c'
    };
  }
  
  
  async componentDidMount ()  {
    const profile = await this.props.getUserById(this.props.match.params.id)
    this.setState({ profile }); 
    
    
  }
  

async  componentDidUpdate() {
  console.log('hittin')
  if(this.props.match.params.id !== this.state.profile._id ){
    const profile =  await this.props.getUserById(this.props.match.params.id)
    this.setState({ profile }); 
  }
}
  
  
  
  render(){
    
  
    return (
      <div className='body'>       
    {this.state.profile  ?   
        <div className="profile-full">  
          <div> 
            <h3>Name: {this.state.profile.name} </h3>
            <h3>Email: {this.state.profile.email} </h3>
            <h3>About Me: {this.state.profile.aboutMe} </h3>
          </div>
    {this.state.profile.images ?
          <div className="profile-full-photos">
    {this.state.profile.images.map(x => 
      
          <img src={`${x}`}></img>
      
      )}
          </div>
        : <h1>no photos yet</h1>  
        }

        {this.state.profile._id !== this.props.user._id ?
          <div>
            <h1>Message User</h1>

            <form action="/" id="usrform">
  
           <input type="submit">
            </input>
              </form>
              <textarea rows="4" cols="50" name="comment" form="usrform"></textarea>
          </div>
        : <h1> Edit Profile</h1>

        }

        </div>    
:
<p>loading</p>
}
      </div>
    );
        
  }
}


export default ProfilePage;