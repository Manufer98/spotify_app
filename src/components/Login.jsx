import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./Login.css";

import { useNavigate } from "react-router-dom";
import { update } from "../redux/userSlice";

function Login() {
  const [email, setMail] = useState("");
  const [pass, setPass] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    getStudents();
  }, []);

  //console.log(users);

  const getStudents = async () => {
    try {
      const us = await fetch("http://localhost:8080/api/v1/user");
      const user = await us.json();
      setUsers(user);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async () => {
    fetch(`http://localhost:8080/api/v1/user/auth/${email}/${pass}`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data !== null) {
          dispatch(update({ name: "manu", email }));
          navigate("/");
        }
      });
  };

  return (
    <div className="login_Login">
      <div className="login_box">
        <h3>Login</h3>
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
            Email
          </label>
        </div>
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

        {/*  <h4>Mail</h4>
        <input type="text" onChange={(e) => setMail(e.target.value)} />
        <h4>Password</h4>
        <input type="password" onChange={(e) => setPass(e.target.value)} /> */}

        <div className="login_buttons">
          <button onClick={() => handleSubmit()}>Submit</button>
        </div>
        <div className="login_signUp">
          <h5>Or Sign Up</h5>
          <Link to={"/SignUp/"}>
            <button onClick={() => handleSubmit()}>Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
