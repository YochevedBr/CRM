import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import firebase from './../firebase.js';

function SignUp(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [repeat_password, setRepeatPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0 && name.length > 0 && phone_number.length > 0 && repeat_password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    
    // checking that the email doesn't exist
    // retrieving the agents database
    const agentsRef = firebase.database().ref('agents');
    let exist = false
    agentsRef.on('value', (snapshot) => {
      const agents = snapshot.val()
      for (let agent in agents){
          // if email exists navigate to the login component
          if (agents[agent].email == email){
            exist = true
            props.history.push('/login')
            break
          }
      }
      // if email doesn't exist, add new agent to the database
      if (!exist){
        const agent = {
          name: name,
          email: email,
          phone: phone_number,
          password: password,
        }
        agentsRef.push(agent);
        
        props.history.push('/bootstrap_navbar')
      }
    })
  }
  
  // sign up form
  const signUp = 
  <div class="container h-100 border border-primary">
    <div class="row h-100 justify-content-center align-items-center">
        <div class="col-10 col-md-8 col-lg-6">
        {/* <div className="Login"> */}
          <Form onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
            <Form.Group size="lg" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    autoFocus
                    type="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </Form.Group>
            <Form.Group size="lg" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                autoFocus
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="phone_number">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                    autoFocus
                    type="phone_number"
                    value={phone_number}
                    onChange={(e) => setPhoneNumber(e.target.value)}
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
            <Form.Group size="lg" controlId="repeat_password">
              <Form.Label>Repeat Password</Form.Label>
              <Form.Control
                type="password"
                value={repeat_password}
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
            </Form.Group>
            <Button block size="lg" type="submit" disabled={!validateForm()}>
              Sign Up
            </Button>
          </Form>
        {/* </div> */}
        </div>
        </div>
        </div>  

  return (
    // display NavBar if submitted
    <>
    {signUp}
    </>
  );

}

export default SignUp;