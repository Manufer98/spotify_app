import React, { useState } from 'react';
const SignUp = () => {
	
	const [nickName,setNickName]=useState("");
	const [email,setMail]=useState("");
	const [pass,setPass]=useState("");
	
	const handleSubmit = async ()  =>{

		const user={nickName: nickName,
        	email: email,
        	password: pass};

		
			fetch(`http://localhost:8080/api/v1/user`,
				{

				"Access-Control-Allow-Origin" : "*", 
				"Access-Control-Allow-Credentials" : true ,
		 		 method: 'POST',
		  		headers: { "Content-Type": "application/json" },
		  		body:JSON.stringify(user)
				})
			.then(response=>response.json())
			.then(data=>console.log(data))

		
    
  
	}

	
  return (
	<div className='Login'> 
	<div className="box">

	<h3>Logo</h3>
	<h3>Sign Up</h3>
	<h4>Nick Name</h4>
  	<input type="text" onChange={(e)=>setNickName(e.target.value)}/>
  	<h4>Mail</h4>
  	<input type="text" onChange={(e)=>setMail(e.target.value)}/>
  	<h4>Password</h4>
  	<input type="password" onChange={(e)=>setPass(e.target.value)}/>
  	</div>
  	<button onClick={()=>handleSubmit()}>Submit</button>
 
 


  
  
  


 </div>
  )
}

export default SignUp