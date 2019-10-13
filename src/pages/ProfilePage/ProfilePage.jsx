import React, { Component } from 'react';
import './ProfilePage.css';


class ProfilePage extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      // Initialize user if there's a token, otherwise null
      profile : 'c',
      formData:  {message: ''}
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
  
  

formRef = React.createRef();

handleMessage = e => {
  e.preventDefault();
  console.log(this.state.formData)
  this.props.handleMessage(this.state.formData);
  
};

handleChange = e => {
  const formData = {...this.state.formData, [e.target.name]: e.target.value};
  this.setState({
    formData,
    invalidForm: !this.formRef.current.checkValidity()
  });
};


  
  render(){
    
  
    return (
      <div className='body'>       
    {this.state.profile  ?   
        <div className="profile-full">  
          <div> 
            <h1>Meet {this.state.profile.name} </h1>
            <h3>Email: {this.state.profile.email} </h3>
            <h3>About Me: {this.state.profile.aboutMe} </h3>
          </div>
    {this.state.profile.images ?
          <div className="profile-full-photos">
            <h1>Meet {this.state.profile.name} </h1>
    {this.state.profile.images.map(x => 
      
          <img src={`${x}`}></img>
      
      )}
          </div>
        : <h1>no photos yet</h1>  
        }

        {this.state.profile._id !== this.props.user._id ?
          <div>
            

           

            <form ref={this.formRef} autoComplete="off" onSubmit={this.handleMessage}>
            <label>Message User</label>
            <input
              className="form-control"
              name="message"
              value={this.state.formData.message}
              onChange={this.handleChange}
              
            />
           <button
            type="submit"
            className="btn btn-xs"
            disabled={this.state.invalidForm}
          >
            Send Message
          </button>
              </form> 
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