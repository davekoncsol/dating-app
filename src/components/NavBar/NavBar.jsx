import React from "react";


function NavBar(props) {
    return (
        <div className="NavBar">
            
            <div> LOGO</div>
            <ul>
                <li>
                    <a href="">Home</a>
                </li>
                <li>
                    <a href="">Profile</a>
                </li>
                <li>
                    <a href="">Login</a>
                </li>

            </ul>
        </div>
    );
}

export default NavBar;
