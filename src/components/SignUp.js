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
  const [wrongEmail, setWrongEmail] = useState(false)
  const [match, setMatch] = useState(true)


  function validateForm() {
    return email.length > 0 && password.length > 0 && name.length > 0 && phone_number.length > 0 && repeat_password.length > 0;
  }

  function handleChange(event) {
    setWrongEmail(false)
}

  function handleSubmit(event) {
    event.preventDefault();
    if (password !== repeat_password){
        setMatch(false)
    }
    else{
      var db = firebase.firestore();
      db.collection("agents")
      .doc(email)
      .get()
      .then((doc) => {
        if (doc.exists){
          setWrongEmail(true)
          setEmail("")
        }
        // if email doesn't exist, add new agent to the database
        else{
          db.collection('agents')
          .doc(email)
          .set({
            name: name,
            phone: phone_number,
            password: password,
          })
          .then(() => {
            localStorage.setItem('agent_id', email)
            props.history.push('/bootstrap_navbar')
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
        }
      });
    }
  }
  
  // sign up form
  const signUp = 
  <div class="container h-100 border border-primary">
    <div class="row h-100 justify-content-center align-items-center">
        <div class="col-10 col-md-8 col-lg-6">
        {/* <div className="Login"> */}
          <Form onSubmit={handleSubmit} onChange={handleChange}>
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
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <h6 style={{display: wrongEmail ? 'block' : 'none', color: 'red'}}>Please anter a valid email address.</h6>
            </Form.Group>
            <Form.Group size="lg" controlId="phone_number">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Format: 123-4567890 / 12-3456789"
                pattern="[0-9]{2,3}-[0-9]{7}"
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
                onChange={(e) => {
                  setMatch(true)
                  setRepeatPassword(e.target.value)
                }}
              />
            <h6 style={{display: !match ? 'block' : 'none', color: 'red'}}>not matching</h6> 
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