import React, {useState} from 'react'
import { NavLink } from "react-router-dom";

const NavBar = ({ searchTerm, handleSubmit, handleOnChange, darkMode, setDarkMode }) => {

    return (
        <div>
            <header>
                <div className="topnav">
                    <NavLink to="/popular">HOME</NavLink>
                    <NavLink to="/now_playing">NOW PLAYING</NavLink>
                    <NavLink to="/top_rated">TOP RATED</NavLink>
                    <NavLink to="/upcoming">UPCOMING</NavLink>
                </div>
                <div className="toggle-container">
                    <span style={{ color: darkMode ? "grey" : "yellow", marginTop: "15px"}}>☀︎</span>
                    <span className="toggle">
                        <input
                        checked={darkMode}
                        onChange={() => setDarkMode(prevMode => !prevMode)}
                        id="checkbox"
                        className="checkbox"
                        type="checkbox"
                        />
                        <label htmlFor="checkbox" />
                    </span>
                    <span style={{ color: darkMode ? "slateblue" : "grey", marginTop: "15px"}}>☾</span>
                </div>
                <form onSubmit={handleSubmit}>
                <input 
                    className="search" 
                    type="search" 
                    placeholder="Search ..." 
                    value={searchTerm}
                    onChange={handleOnChange}
                />
                </form>

            </header>
        </div>
    )
}

export default NavBar;
