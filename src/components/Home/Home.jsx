import React from "react";
import "./Home.css"
import {Link} from 'react-router-dom'


function Body(props) {
    return (
        <div className='body'>
            <div className="home-top-image">
                <h1>Find someone for you</h1>
            </div>
            <div className="home-content-1">
                <h1>Someone that gets you for who you are</h1>
            </div>
            <div className="home-middle-image">
            <h1>Someone that will last a lifetime</h1>
            </div>
            {/* <div className="home-content-2">
            
            </div> */}
            <div className="home-bottom-image"></div>
            <div className="home-content-3">
            <Link to='/signup'>
            <h1>SIGN UP NOW</h1>
            </Link>
            </div>
            
        </div>
    );
}

export default Body;


