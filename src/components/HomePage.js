import React from "react"
import './HomePage.css'
// import instegram from '../pictures/instegram.png'// import instegram from '../pictures/instegram.png'
import {storage} from "./../firebase"
import { useState, useEffect } from "react";


function HomaPage() {
	const [img_logo, setImg_logo] = useState('');
	const [img_instegram, setImg_instegram] = useState('');

	useEffect(() => {
		// retriving from firebase storage the background image
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
	},[]);
	

		const homePage =
			<div className="background">
				<img style={{'display': 'block', 'marginLeft': 'auto', 'marginRight': 'auto'}} src={img_logo} alt='' width='100%'/>
				<div className="social-container">
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
			{homePage}
			</>
		);
    
}
export default HomaPage