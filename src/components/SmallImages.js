import React from "react"
import SmallImage from './SmallImage'

import img from '../pictures/house-real-estate-logo.jpg'
import img1 from '../pictures/Purchases.jpg'

import { Col } from 'react-bootstrap'
import { useState, useEffect, useRef } from "react";


import './SmallImages.css'

class SmallImages extends React.Component{

    render(){

        return ( 
            <>
            {this.props.images === undefined ? 
            <h1>Loading...</h1> :  
            <Col className='col-md' key={this.props.images}>

                <div className='wrapper1' width='700'>
                    {this.props.images.map((image, i) => <SmallImage replaceImage={this.props.replaceImage} key={i} src={image} />)}
                </div>
            </Col>  
            }
            </> 
        )
    }
}


export default SmallImages