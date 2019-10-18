import React from 'react';
import {Link} from 'react-router-dom';
import './Inbox.css'

function Inbox({user}){
    return (
        <>
       <div className="body">
       { console.log(user)}
            {user.conversations.map(convo =>
            <h1>{convo}</h1>
         
            )}
            </div>
        </>
    )
    
}




export default Inbox