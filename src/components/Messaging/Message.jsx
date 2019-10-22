import React from 'react';
import {Link} from 'react-router-dom';
import './Message.css'

function Message({convo, getConversationById}){
    return (
        <>
           
        <div className="message">
        {getConversationById(convo).then(res=>
            res.sender
            )}
        </div>
        
        </>
    )
    
}




export default Message