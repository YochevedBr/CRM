import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import firebase from './../firebase.js';
import {storage} from "./../firebase"

import './SignUp.css'
import './Login.css'

function SignUp(props) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone_number, setPhoneNumber] = useState("");
	const [password, setPassword] = useState("");
	const [repeat_password, setRepeatPassword] = useState("");
	const [wrongEmail, setWrongEmail] = useState(false)
	const [match, setMatch] = useState(true)
	const [img, setImg] = useState('');

	useEffect(() => {
		// retriving from firebase storage the background image
		storage
		.ref('/image to design/Hero-Front.png')
		.getDownloadURL()
		.then((DownloadURL) => {
			setImg(DownloadURL)
		})
	},[]);


	// checking there are no missing details
	function validateForm() {
		return email.length > 0 && password.length > 0 && name.length > 0 && phone_number.length > 0 && repeat_password.length > 0;
	}

	function handleChange(event) {
		// hiding the wrong email messages if it has been displayed 
		setWrongEmail(false)
	}

	function handleSubmit(event) {
		event.preventDefault();
		// if the the passwords not the same display error message and cancel the submition
		if (password !== repeat_password){
			setMatch(false)
		}
		else{
			// checking if the details match to existing agent
			var db = firebase.firestore();
			db.collection("agents")
			.doc(email)
			.get()
			.then((doc) => {
				// if agent exist display error message
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
						// saving the agent id in local storage for farther actions
						localStorage.setItem('agent_id', email)
						// go to homa page
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
		<div className='container'>
			<br></br>
			<br></br>
			<img style={{'display': 'block', 'marginLeft': 'auto', 'marginRight': 'auto'}} src={img} alt='' width='110%'/>
			<div class="row justify-content-center align-items-center" style={{position: "absolute", width: "450px",	left:"35%", 	top: "100px",alignItems:"center", border: "5px solid rgba(70, 70, 70, 0.16)", backgroundColor: 'white', opacity:'0.9'}}>
				<div class="col-sm-8">
					<h4 style={{color: '#000066'}}>Sign Up</h4>
					<Form onSubmit={handleSubmit} onChange={handleChange}>
						<br></br>
						<Form.Group controlId="name">
							<Form.Label>Name</Form.Label>
							<Form.Control
								autoFocus
								type="name"
								size="sm"
								borderColor="#000066"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId="email">
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="email"
								size="sm"
								borderColor="#000066"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<h6 style={{display: wrongEmail ? 'block' : 'none', color: 'red'}}>Please anter a valid email address.</h6>
						</Form.Group>
						<Form.Group controlId="phone_number">
							<Form.Label>Phone Number</Form.Label>
							<Form.Control
								type="tel"
								placeholder="Format: 123-4567890 / 12-3456789"
								pattern="[0-9]{2,3}-[0-9]{7}"
								size="sm"
								borderColor="#000066"
								value={phone_number}
								onChange={(e) => setPhoneNumber(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId="password">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								size="sm"
								borderColor="#000066"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId="repeat_password">
							<Form.Label>Repeat Password</Form.Label>
							<Form.Control
								type="password"
								size="sm"
								borderColor="#000066"
								value={repeat_password}
								onChange={(e) => {
								setMatch(true)
								setRepeatPassword(e.target.value)
								}}
							/>
							<h6 style={{display: !match ? 'block' : 'none', color: 'red'}}>not matching</h6> 
						</Form.Group>
						<br></br>
						<Button block type="submit"  size="sm" disabled={!validateForm()}  style={{background:"#000066", borderColor: "#000066"}}>
						Sign Up
						</Button>
						<br></br>
					</Form>
				</div>
			</div>
		</div>  

	return (
		<>
		{signUp}
		</>
	);

}

export default SignUp;