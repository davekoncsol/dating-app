import React from 'react';
import {Link} from 'react-router-dom';
import './Inbox.css'

function Inbox({user}){
    return (
        <>
       { console.log(user)}
            {user.conversations.map(convo =>
        <div className="inbox">
            <h1>{convo}</h1>
         
        </div>
        )}
        </>
    )
    
}




export default Inbox