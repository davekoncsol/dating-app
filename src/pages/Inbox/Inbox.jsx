import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Inbox.css'
import Message from '../../components/Messaging/Message'
import { userInfo } from 'os';

// function Inbox({user, getConversationById}){
//     return (
//         <>
//        <div className="body">
//             {user.conversations.map(convo => 
//         <Message convo={convo}
//         getConversationById={getConversationById}
//         />
//         )}
//             </div>
//         </>
//     )
    
// }


class Inbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
          // Initialize user if there's a token, otherwise null
          conversations : [],
          formData:  {
            message: '',
            
        }
        };
      }

async componentDidMount() {
    if(this.props.conversations){
        let convos = []
         await this.props.conversations.map(convo => 
              this.props.getUserById(convo.receiver).then(res =>
                
              [convo , res.images[0]]
               ).then(res=> 
                convos.push(res)
                     
            ))
        this.setState({
         conversations: convos
                })
                    
}

}

render() {
    return(
       <>
        <div className='body'>
           
            {console.log(this.state.conversations)}
        {this.state.conversations.map(convo => 
        <div>

      <img src ={`${convo[1]}`}></img>
     <h1>{convo[0].message}</h1>
          
    
           
               
        </div>
          )}

        </div>
        </>
    )



}
}






export default Inbox



// async componentDidMount ()  {
//     const profiles = await this.props.getAllUsers()
//     this.setState({ profiles }); 
//    }


// render(){
//     return (
//       <div className='body'>       
//       {this.state.profiles  ?   
//       <div className='profile-list'>
//       {this.state.profiles.map(profile =>
//       <ProfileCard
//         key={profile._id}
//         profile={profile}
//       />
//     ) }
//     </div>
// :
// <p>loading</p>
// }
//       </div>
//     );
        
//   }
// }
