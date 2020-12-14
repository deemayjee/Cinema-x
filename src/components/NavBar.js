import React from 'react'
import { NavLink } from "react-router-dom";

const NavBar = ({ searchTerm, handleSubmit, handleOnChange}) => {
    return (
        <div>
            <header>
                <div className="topnav">
                    <NavLink to="/popular">HOME</NavLink>
                    <NavLink to="/now_playing">NOW PLAYING</NavLink>
                    <NavLink to="/top_rated">TOP RATED</NavLink>
                    <NavLink to="/upcoming">UPCOMING</NavLink>
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

export default NavBar
