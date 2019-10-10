import React from 'react';
import {Link} from 'react-router-dom';

function ProfileCard({profile}){
    return (
        <>
        <div className="profile-card">
            <div>
            Name : {profile.name}
            <Link to={`/profile/${profile._id}`}>User Profile</Link>
            </div>
            {profile.images[0] ? 
            <img src={`${profile.images[0]}`}></img>
            : <h3>No Photo Yet</h3>

            }
        </div>
        </>
    )
    
}




export default ProfileCard