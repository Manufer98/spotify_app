import React, { useState } from "react";
const SignUp = () => {
  const [nickName, setNickName] = useState("");
  const [email, setMail] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = async () => {
    const user = { nickName: nickName, email: email, password: pass };

    fetch(`http://localhost:8080/api/v1/user`, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <div className="signUp_Login">
      <div className="signUp_box">
        <h3>Sign Up</h3>
        <div className="form__group field">
          <input
            type="text"
            className="form__field"
            placeholder="Name"
            name="name"
            id="name"
            required
            onChange={(e) => setNickName(e.target.value)}
          />
          <label htmlFor="name" className="form__label">
            Nick Name
          </label>
        </div>
        {/* <h4>Nick Name</h4>
        <input type="text" onChange={(e) => setNickName(e.target.value)} /> */}
        <div className="form__group field">
          <input
            type="text"
            className="form__field"
            placeholder="Name"
            name="name"
            id="name"
            required
            onChange={(e) => setMail(e.target.value)}
          />
          <label htmlFor="name" className="form__label">
            Mail
          </label>
        </div>
        {/* <h4>Mail</h4>
        <input type="text" onChange={(e) => setMail(e.target.value)} /> */}
        <div className="form__group2 field2">
          <input
            type="password"
            className="form__field2"
            placeholder="Password"
            name="pass"
            id="pass"
            required
            onChange={(e) => setPass(e.target.value)}
          />
          <label htmlFor="pass" className="form__label2">
            Password
          </label>
        </div>
        {/* <h4>Password</h4>
        <input type="password" onChange={(e) => setPass(e.target.value)} /> */}
        <div className="signUp_buttons">
          <button onClick={() => handleSubmit()}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
