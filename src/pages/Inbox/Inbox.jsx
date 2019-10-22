import React from 'react';
import {Link} from 'react-router-dom';
import './Inbox.css'

function Inbox({user, getConversationById}){
    return (
        <>
       <div className="body">
            {user.conversations.map(convo => 
        <h1>{getConversationById(convo).then(res=>res.message)}</h1>
        )}
            </div>
        </>
    )
    
}




export default Inbox