import React from 'react';
import {Link} from 'react-router-dom';
import './ProfileCard.css'

function ProfileCard({profile}){
    return (
        <>
            <Link to={`/profile/${profile._id}`}>
        <div className="profile-card">
            <div>
            {profile.name}
            
            </div>
            {profile.images[0] ? 
            <img src={`${profile.images[0]}`}></img>
            : <h3>No Photo Yet</h3>

            }
        </div>
        </Link>
        </>
    )
    
}




export default ProfileCard