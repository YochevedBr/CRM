import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import './Login.css';

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    // if the details are correct:
    props.history.push('/bootstrap_navbar')
    // else:
    // props.history.push('/login')
  }

  function onSubmit(){
    console.log('onSubmit')
    return <h1>HELLO</h1>
    }
  
  // login form
  
  const login = 
  <div class="container h-100 border border-primary">
    <div class="row h-100 justify-content-center align-items-center">
        <div class="col-10 col-md-8 col-lg-6">
        {/* <div className="Login"> */}
          <Form onSubmit={handleSubmit}>
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
            <Form.Group size="lg" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
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