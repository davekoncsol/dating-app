import React from 'react';
import {Link} from 'react-router-dom';

function ProfileCard({profile}){
    return (
        <div>
            Name : {profile.name}
            <Link to={`/profile/${profile._id}`}>User Profile</Link>

        </div>
    )
    
}




export default ProfileCard