import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import "./Login.css";

import { useNavigate } from 'react-router-dom';
import { update } from '../redux/userSlice';


function Login() {
  const [email,setMail]=useState("");
  const [pass,setPass]=useState("");
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {

    getStudents();
  }, [])



  //console.log(users);

  const getStudents = async () => {
    try {
      const us = await fetch("http://localhost:8080/api/v1/user");
      const user = await us.json();
      setUsers(user)
    } catch (e) {

      console.log(e)

    }
  }

  const handleSubmit = async ()  =>{
    
  
      fetch(`http://localhost:8080/api/v1/user/auth/${email}/${pass}`,
      {
        method: 'POST',
        
        
      }
      
      ).then(response=>response.json()).then(data=>{
        if(data!==null){
          dispatch(update({ name:"manu" , email }));
          navigate('/');

        }
        
      }
        )

    


  }

  

  return (
	<div className='Login'>

    
    <div className="box">

      <h3>Logo</h3>
      <h3>Login</h3>
    <h4>Mail</h4>
    <input type="text" onChange={(e)=>setMail(e.target.value)}/>
    <h4>Password</h4>
    <input type="password" onChange={(e)=>setPass(e.target.value)}/>
    </div>
    <button onClick={()=>handleSubmit()}>Submit</button>
    <Link  to={"/SignUp/"}><button onClick={()=>handleSubmit()}>Sign Up</button></Link>
   

 
    
    
    


  </div>
  )
}

export default Login