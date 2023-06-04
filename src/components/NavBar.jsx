import React from 'react';
import { Link } from 'react-router-dom';
import "./NavBar.css";

const NavBar = () => {
  return (

	<header > 
    <div className='navbar'>
    
    <div className="blur"></div>
   
    <div className='home'>
    <h4>Artist Top 5</h4>
    
    <button><Link to={"/"}>Home</Link></button>
    <button><Link to={"/top5"}>Top 5</Link></button>
    </div>
    <div className='login'>
    <button ><Link to={"/Login/"}>Login</Link></button>
    <button>Sign Up</button>
    
    </div>
    
 
   
    </div>
    <div className="line"></div>
   
   
    
    </header >

  )
}

export default NavBar