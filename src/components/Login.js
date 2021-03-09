import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import firebase from './../firebase.js';
import {storage} from "./../firebase"
import { withRouter } from "react-router";
import { useState, useEffect } from "react";
import './Login.css'


function Login(props) {
	// clearing the local storage in case of returning from logout
	localStorage.clear()

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [wrongEmail, setWrongEmail] = useState(false)
	const [wrongPassword, setWrongPassword] = useState(false)
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
		return email.length > 0 && password.length > 0;
	}

	function handleChange(event) {
		// hiding the wrong email or password messages if they have been displayed 
		setWrongEmail(false)
		setWrongPassword(false)
	}
	
	function handleSubmit(event) {
		event.preventDefault();

		// checking that the details match to existing agent
		var db = firebase.firestore();
		db.collection("agents")
		.doc(email)
		.get()
		.then((doc) => {
		// if email (agent id) exist
		if (doc.exists){  
			// and if the password correct
			if (doc.data().password === password){
				// saving the agent id in local storage for farther actions
				localStorage.setItem('agent_id', email)
				// go to the home page
				props.history.push('/bootstrap_navbar')
			}
			//if the password is incorrect display wrong password message
			else{
				setPassword('')
				setWrongPassword(true)
			}
		}
		// if email doesn't exist display wrong email message
		else{
			setEmail('')
			setPassword('')
			setWrongEmail(true)
		}
		});
	}

	// login form
	const login =
		<div className='container'>
			<br></br>
			<br></br>
			<br></br>
			<br></br>
			<img style={{'display': 'block', 'marginLeft': 'auto', 'marginRight': 'auto'}} src={img} alt='' width='110%'/>
			<div class="row justify-content-center align-items-center" style={{position: "absolute", width: "450px", left:"35%", top: "150px", alignItems:"center", border: "5px solid rgba(70, 70, 70, 0.16)", backgroundColor: 'white', opacity:'0.9'}}>
				<div class="col-lg-8">
					<h4 style={{color: '#000066'}}>Login</h4>
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
		<>
		{login}
		</>
	);
}

export default withRouter(Login);
