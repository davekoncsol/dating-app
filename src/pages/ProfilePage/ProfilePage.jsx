import React, { Component } from 'react';
import userService from '../../utils/userService'




// const ProfilePage = (props) => {
//     const profile = props.getUserById(props.match.params.id);
    
//     console.log(profile.then(res => res.name))
  
//     return (
//       <div className='body'>
//       {profile ===true ? 
        
//         profile.map(x =>  
//         <h3>Name: {x.name} </h3>
       
//         )
// :
// <p>loading</p>
// }
//       </div>
//     );
        
//   }

class ProfilePage extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      // Initialize user if there's a token, otherwise null
      profile : null
    };
  }


  async componentDidMount ()  {
    const profile = await this.props.getUserById(this.props.match.params.id)
    this.setState({ profile });
  
    console.log(this.state)
   }


    // const profile = props.getUserById(props.match.params.id);
    
    // console.log(profile.then(res => res.name))
  
    render(){
    return (
      <div className='body'>       
      {this.state.profile  ?      
        <h3>Name: {this.state.pre.name} </h3>
       
      
:
<p>loading</p>
}
      </div>
    );
        
  }
}


export default ProfilePage;