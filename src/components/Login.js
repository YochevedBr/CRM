import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import './Login.css'
import img from '../pictures/house-real-estate-logo.jpg'//'../pictures/Hero-Front.png'
import firebase from './../firebase.js';

import { withRouter } from "react-router";


function Login(props) {

  localStorage.clear()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wrongEmail, setWrongEmail] = useState(false)
  const [wrongPassword, setWrongPassword] = useState(false)

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleChange(event) {
      setWrongEmail(false)
      setWrongPassword(false)
  }
  
  function handleSubmit(event) {
    event.preventDefault();

    var db = firebase.firestore();
    db.collection("agents")
    .doc(email)
    .get()
    .then((doc) => {
      if (doc.exists){  
        if (doc.data().password === password){
          localStorage.setItem('agent_id', email)
          props.history.push('/bootstrap_navbar')
        }
        else{
          setPassword('')
          setWrongPassword(true)
        }
      }
      // if email doesn't exist, 
      else{
        setEmail('')
        setPassword('')
        setWrongEmail(true)
      }
    });
  }

  // login form

  const login =
        <div style= {{backgroundImage: `url(${img})`}}>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <h4 style={{color: '#000066'}}>Login</h4>

        <div class="row justify-content-center align-items-center" style={{position: "absolute", width: "450px",	left:"35%", 	top: "150px",alignItems:"center", border: "5px solid rgba(70, 70, 70, 0.16)"}}>
          <div class="col-lg-8">
            <Form onSubmit={handleSubmit} onChange={handleChange}>
              <br></br>
              <Form.Group size="sm" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  autoFocus
                  type="email"
                  size="sm"
                  borderColor="#000066"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <h6 style={{display: wrongEmail ? 'block' : 'none', color: 'red'}}>The email entered doesn’t match any account. <a href='/sign_up'>Sign up for an account.</a></h6>
              <Form.Group size="sm" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  size="sm"
                  type="password"
                  borderColor="#000066"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <h6 style={{display: wrongPassword ? 'block' : 'none', color: 'red'}}>The password you’ve entered is incorrect. Forgot Password?‏</h6>
              <br></br>
              <Button block size="sm" type="submit" disabled={!validateForm()} style={{background:"#000066", borderColor: "#000066"}}>
                Login
              </Button>
             
              <p class="copyright" >Not a member?<a href='/sign_up'>sign up</a>.</p>
            </Form>
          </div>
        </div>
      </div>

  return (
    // display NavBar if submitted
    <>
    {login}
    </>
  );
}


export default withRouter(Login);
//export default Login;