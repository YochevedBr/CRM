import React from "react"
import './HomePage.css'
import './GeneralStyle.css'
import $ from 'jquery';  
import Button from '@material-ui/core/Button';
import firebase from './../firebase.js';
import { storage } from "./../firebase"
import { useState, useEffect } from "react";

function HomaPage() {

	const [instagramIcon, setInstagramIcon] = useState('');
	// Agent profil
	const [agentName, setAgentName] = useState('');
	const [agentPhone, setAgentPhone] = useState('');
	const [agentEmail, setAgentEmail] = useState('');
	// To open/ close the form
	const [flagToggle, setFlagToggle] = useState(false);
	// To responsivy backgroun image
	const [, setWindowWidth] = useState(window.innerWidth);
	const [backgroundDesktop, setBackgroundDesktop] = useState('');
	const [backgroundMobile, setBackgroundMobile] = useState('');
	const imageUrl = window.innerWidth >= 650 ? backgroundDesktop : backgroundMobile;

	useEffect(() => {
		const handleWindowResize = () => {
			setWindowWidth(window.innerWidth);
		};
		window.addEventListener('resize', handleWindowResize);
		
		// Retrive the images fron firestore storage
		storage
			.ref('/image to design/logo-desktop.jpg')
			.getDownloadURL()
			.then((DownloadURL) => {
				setBackgroundDesktop(DownloadURL)
		})
		storage
			.ref('/image to design/logo-mobile.jpg')
			.getDownloadURL()
			.then((DownloadURL) => {
				setBackgroundMobile(DownloadURL)
		})
		storage
			.ref('/image to design/instegram.png')
			.getDownloadURL()
			.then((DownloadURL) => {
				setInstagramIcon(DownloadURL)
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
				// Next time on press -> close the form
				setFlagToggle(true)
			})
		}
		else{
			// Closes the form
			$("#form").toggle();
			setFlagToggle(false)
		}
		// Resize the page
        return () => {            
			window.removeEventListener('resize', handleWindowResize);      
		}  

	},[]);

           
	return(
		<>
		 <div className="App" style={{backgroundImage: `url(${imageUrl})`}}>
            <div className="App-content">	
				<div className='font' id= 'desc'>
					<br></br>
					<h1 className='titleHome'>CityLights</h1>
					<h3 className='description'>‏A winning combination of experts and information in real estate‏</h3>
					<h6 className='description'>The company's staff and managers are among the first line of business real estate people and have rich </h6>
					<h6 className='description'>and professional experience in accompanying and executing many and varied real estate transactions.‏</h6>
				</div>
				<form >
					<Button id="btnProfil" variant="outlined" color="primary" style={{marginTop: "4px", marginLeft: "0px"}}>Agent Profile</Button>
				</form>
				<form class="font" id="form" style={{border:'4px solid  #00004d', borderStyle: 'inset', display:'none'}}>
					<div class='key'>Name:</div><div class='value'>{agentName} </div>
					<div class='key'>Email:</div><div class='value' >{agentEmail} </div>
					<div class='key'>Phone Number:</div><div class='value'>{agentPhone} </div>
				</form>
				<div className="social-container">
					<h7 style={{color: '#000066'}}>Agent - interest the customer on our Instagram :) &nbsp;</h7>
					<a href=" https://www.instagram.com/yptb_real_estate" className="instagram social">
						<img src={instagramIcon} alt="instegram" height={30} width={30}/>
					</a>
					<br></br>
					<br></br>
				</div>
            </div>
        </div>
		</>
	);
}

export default HomaPage