import React from "react"
import './HomePage.css'
import './GeneralStyle.css'
import './PrintCustomer.css'

import $ from 'jquery';  
import Button from '@material-ui/core/Button';
import firebase from './../firebase.js';

// import instegram from '../pictures/instegram.png'// import instegram from '../pictures/instegram.png'
import {storage} from "./../firebase"
import { useState, useEffect } from "react";


function HomaPage() {
	const [img_logo, setImg_logo] = useState('');
	const [img_instegram, setImg_instegram] = useState('');

	// Agent profil
	const [agentName, setAgentName] = useState('');
	const [agentPhone, setAgentPhone] = useState('');
	const [agentEmail, setAgentEmail] = useState('');
	// To open/ close the form
	const [flagToggle, setFlagToggle] = useState(false);

	useEffect(() => {
		// Retriving from firebase storage the background image
		storage
		.ref('/image to design/yptb.PNG')
		.getDownloadURL()
		.then((DownloadURL) => {
			setImg_logo(DownloadURL)
		})
		storage
		.ref('/image to design/instegram.png')
		.getDownloadURL()
		.then((DownloadURL) => {
			setImg_instegram(DownloadURL)
		})

		// To agent profil form
		var db = firebase.firestore();
		if(!flagToggle){
			// Opens the form
			$("#btnProfil").click(function(){
				var agentId = localStorage.getItem("agent_id")
				db.collection("agents")
					.doc(agentId)
					.get()
					.then((doc) => {
						setAgentEmail(doc.id)
						setAgentName(doc.data().name)
						setAgentPhone(doc.data().phone)
					})
					.catch((error) => {
						console.log("Error getting agent document:", error);
					});
				$("#form").toggle();
				// Next time on press close the form
				setFlagToggle(true)
			})
		}
		else{
			// Closes the form
			$("#form").toggle();
			setFlagToggle(false)
		}
        

	},[]);
	

	const homePage =
		<div className="background">
			<img style={{'display': 'block', 'marginLeft': 'auto', 'marginRight': 'auto'}} src={img_logo} alt='' width='100%'/>
			<div className="social-container">
				{/* <h8>yptbrealestate@gmail.com</h8> */}
				{/* <br></br> */}
				<h7 style={{color: '#000066'}}>Agent - interest the customer on our Instagram :) &nbsp;</h7>
				<a href=" https://www.instagram.com/yptb_real_estate" className="instagram social">
					<img src={img_instegram} alt="instegram" height={30} width={30}/>
				</a>
				<br></br>
				<br></br>
			</div>
		</div>
           
	return(
		<>
		<form >
			<Button id="btnProfil" variant="outlined" color="primary" style={{marginTop: "4px", marginLeft: "40px"}}>Agent Profil</Button>
		</form>
		<form class="font" id="form" style={{border:'4px solid  #00004d', borderStyle: 'inset', display:'none', marginLeft:'50px', marginRight:'50px'}}>
			<div class='Details'><div class='key'>Name: </div><div class='value' style={{fontSize:'22px'}}>{agentName}</div></div>
			<div class='Details'><div class='key'>Email: </div><div class='value' style={{fontSize:'22px'}}>{agentEmail}</div></div>
			<div class='Details'><div class='key'>Phone Number: </div><div class='value' style={{fontSize:'22px'}}>{agentPhone}</div></div>
		</form>
		{homePage}
		</>
	);
    
}
export default HomaPage