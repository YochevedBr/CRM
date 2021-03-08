import React from 'react'
import { useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import img from '../pictures/house-real-estate-logo.jpg'
import img1 from '../pictures/Purchases.jpg'

import AptDescription from './AptDescription'
import SmallImages from './SmallImages'
import Image from './Image'

import { useHistory } from "react-router";

import { Container, Row, Col } from 'react-bootstrap'
import firebase from './../firebase.js';
import {storage} from "./../firebase"

import { useState, useEffect } from "react";



function AptDetails(){
    let {aptID} = useParams()
    // retrieve the correct apartment by query
    
    const history = useHistory()
    const [data, setData] = useState([]);

    useEffect(() => {  
        var db = firebase.firestore();
        db.collection("products")
        .doc(aptID)
        .get()
        .then((doc) => {
            storage
            .ref(aptID)
            .listAll()
            .then((list) => {
                let fullDoc = doc.data()
                list.items.forEach((imageRef) => {
                    imageRef
                    .getDownloadURL()
                    .then((downloadURL) => {
                        fullDoc.images.push(downloadURL)
                        if (fullDoc.images.length === list.items.length){
                            fullDoc.image = fullDoc.images[0]
                            setData(fullDoc);
                        } 
                    })
                })
            })
        });
    }, []);

    // when small image is clicked the big image is change to the small image
    function replaceImage(src){
        let dataCopy = JSON.parse(JSON.stringify(data))
        dataCopy.image = src.target.src
        setData(dataCopy)
    }

    return(
        <>
        {
            !data.images ? <h1>Loading...</h1> :
        <div>
            <Container className='no-marginLR no-padding'>
                <Row>
                    <Col xs={4}>
                        <AptDescription class='flex-child' description={data}></AptDescription>
                        <Button variant="outlined" color="primary" onClick={() => {history.push({pathname:  `/update_apt/${data.id}`})}}>Edit</Button>
                    </Col>
                    <Col xs={8}>
                        <Container>
                            <Row>
                                <Col>
                                    <Image src={data.image} width={'800'} height={'500'}></Image>
                                </Col>
                            </Row>
                            <br></br>
                            <Row>
                                <SmallImages replaceImage={replaceImage} images={data.images}></SmallImages>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </div>
        }
        </>
    )
}

export default AptDetails