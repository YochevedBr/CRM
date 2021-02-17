import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import firebase from './../firebase.js';
// import './Login.css';

function Login(props) {
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
    
    // checking that the user is in the system
    // retrieving the agents database
    const agentsRef = firebase.database().ref('agents');
    let exist = false
    let exist1 = false
    let exist2 = false

    agentsRef.on('value', (snapshot) => {
      const agents = snapshot.val()
      for (let agent in agents){
          // if email exists navigate to the login component
          if (agents[agent].email == email){
            exist1 = true  
          }
          if (agents[agent].password == password){
            exist2 = false  
          }
          exist = exist1 && exist2
          if (exist){
            props.history.push('/bootstrap_navbar')
            break
          }    
      }
      // if email doesn't exist, add new agent to the database
      if (!exist){
        setEmail('')
        setPassword('')
        if (!exist1){
          setWrongEmail(true)
        }
        else{
          setWrongPassword(true)
        }
      }
    })
  }
  
  // login form
  
  const login = 
  <div class="container h-100 border border-primary">
    <div class="row h-100 justify-content-center align-items-center">
        <div class="col-10 col-md-8 col-lg-6">
        {/* <div className="Login"> */}
          <Form onSubmit={handleSubmit} onChange={handleChange}>
          <h1>Login</h1>
            <Form.Group size="lg" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                autoFocus
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <h6 style={{display: wrongEmail ? 'block' : 'none', color: 'red'}}>The email entered doesn’t match any account. Sign up for an account.</h6>
            <Form.Group size="lg" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <h6 style={{display: wrongPassword ? 'block' : 'none', color: 'red'}}>The password you’ve entered is incorrect. Forgot Password?‏</h6>
            <Button block size="lg" type="submit" disabled={!validateForm()}>
              Login
            </Button>
            <p class="copyright">Not a member?<a href='/sign_up'>sign up</a>.</p>
          </Form>
        {/* </div> */}
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

export default Login;