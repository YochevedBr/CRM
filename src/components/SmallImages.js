import React from "react"
import SmallImage from './SmallImage'

import img from '../pictures/house-real-estate-logo.jpg'
import img1 from '../pictures/Purchases.jpg'

import { Col } from 'react-bootstrap'


import './SmallImages.css'

function SmallImages(props){
    // demo 
    return ( 
        <Col class='col-md'>
            <div className='wrapper1' width='700'>
                {props.images.map((image, i) => <SmallImage replaceImage={props.replaceImage} key={i} src={image} />)}
            </div>
        </Col>     
    )
}


export default SmallImages