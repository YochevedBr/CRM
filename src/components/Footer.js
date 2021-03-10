import React from 'react'
import './Footer.css'
import {storage} from "../firebase"
import { useState, useEffect } from "react";


function Footer(){

    const [img_instegram, setImg_instegram] = useState('');

    useEffect(() => {
        // for instegram icon
        storage
		.ref('/image to design/instegram.png')
		.getDownloadURL()
		.then((DownloadURL) => {
			setImg_instegram(DownloadURL)
		})
    }, []);

    return(

        <footer className="footer" style={{ backgroundColor: "#000033"}}>
        <h7 style={{color: '#ffffff'}}>Agent - interest the customer on our Instagram :) &nbsp;</h7>
        <a href=" https://www.instagram.com/yptb_real_estate" className="instagram social">
        <img src={img_instegram} alt="instegram" height={30} width={30}/>
        </a>
        <br></br>
        </footer>

   )
     

}

export default Footer;
        