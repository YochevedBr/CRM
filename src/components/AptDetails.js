import React from 'react'
import { useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AptDescription from './AptDescription'
import SmallImages from './SmallImages'
import Image from './Image'
import { useHistory } from "react-router";
import { Container, Row, Col } from 'react-bootstrap'
import firebase from './../firebase.js';
import {storage} from "./../firebase"
import { useState, useEffect } from "react";

import ReactLoading from 'react-loading'


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
            !data.images ?
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <ReactLoading type='bubbles' color="#000066" />
                </div>
            :
        <div>
            <Container className='no-marginLR no-padding'>
                <Row style={{width: '100%', pading: '3px', margin: '3px'}}>
                    <Col xs={4}>
                        <AptDescription class='flex-child' description={data}></AptDescription>
                        <Button variant="outlined" color="#000066" onClick={() => {history.push({pathname:  `/update_apt/${data.id}`})}} style={{marginTop:"5px"}}>Edit</Button>
                  
                    </Col>
                    <Col xs={8}>
                        <Container className='ml-5'>
                            <Row style={{width: '100%', pading: '3px', margin: '3px'}}>
                                <Col>
                                    <br></br>
                                    <br></br>
                                    <Image src={data.image} width={'900'} height="auto" borderRadius="4px"></Image>
                                </Col>
                            </Row >
                            <br></br>
                            <Row style={{width: '100%', pading: '3px', margin: '3px'}}>
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

