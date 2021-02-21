import React from "react"
import SmallImage from './SmallImage'

import img from '../pictures/house-real-estate-logo.jpg'
import img1 from '../pictures/Purchases.jpg'

import { Col } from 'react-bootstrap'
import { useState, useEffect } from "react";


import './SmallImages.css'

function SmallImages(props){
    const [images, setImages] = useState([])
    useEffect(() => {
        setImages(props.images)
    }, []);
    const render = 
        <Col class='col-md'>
            {console.log('SmallImages')}
            {console.log(props.images)}
            <div className='wrapper1' width='700'>
                {props.images.map((image, i) => <SmallImage replaceImage={props.replaceImage} key={i} src={image} />)}
            </div>
        </Col>  
    // demo 
    return ( 
          <>
          {props.images === undefined ? <h1>Loading...</h1> :  <render/>}
          </> 
    )
}


export default SmallImages