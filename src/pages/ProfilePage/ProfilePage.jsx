import React, { Component } from 'react';


class ProfilePage extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      // Initialize user if there's a token, otherwise null
      profile : 'c'
    };
  }
  
  getParams()  {
    return this.props.match.params.id
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
    console.log('run')
  
    return (
      <div className='body'>       
      {this.state.profile  ?   
      <div>   
        <h3>Name: {this.state.profile.name} </h3>
        <h3>Email: {this.state.profile.email} </h3>

    {this.state.profile.images ?
    
    this.state.profile.images.map(x => 
      
      <img src={`${x}`}></img>
      
      )
      : <h1>no photos yet</h1>  
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