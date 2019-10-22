import React from 'react';
import {Link} from 'react-router-dom';
import './Inbox.css'

function Inbox({user, getConversationById}){
    return (
        <>
       <div className="body">
       { console.log(user)}
            {user.conversations.map(convo => {
        {console.log(getConversationById(convo)) }
            }
         
            )}
            </div>
        </>
    )
    
}




export default Inbox