import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button} from 'react-bootstrap';
//import Button from '@material-ui/core/Button';
import { useHistory } from "react-router";

import firebase from './../firebase';
import {storage} from "./../firebase"

import img from '../pictures/house-real-estate-logo.jpg'
import img1 from '../pictures/Purchases.jpg'
import { useParams } from 'react-router-dom';
// import {connect} from 'react-redux';
// import DefaultUserPic from "../uploads/team-male.jpg";
// const axios = require('axios');


function UpdateOrAddApt(){

    const[price, setPrice] = useState("");
    const [location, setLocation] = useState("");
    const [floor, setFloor] = useState("");
    const [floors, setFloors] = useState("");
    const [rooms, setRooms] = useState("");
    const [status, setStatus] = useState("")
    const [pool, setPool] = useState("")
    const [yard, setYard] = useState("")
    const [porch, setPorch] = useState("")
    const [private_house, setPrivate] = useState("")
    const [sold, setSold] = useState("")

    const [correctDetails, setCorrectDetails] = useState(true)

    const allInputs = {imgUrl: ''}
    const [imageAsFile, setImageAsFile] = useState('')
    const [imageAsUrl, setImageAsUrl] = useState(allInputs)

    const history = useHistory();
    var db = firebase.firestore();
    let {aptID} = useParams()
    if (!aptID){
        aptID = 0
    }
    
    useEffect(() => {    
        if (aptID !== 0){
            db.collection('products')
            .doc(aptID)
            .get()
            .then((doc) => {
                if (doc.exists){
                    setPrice(doc.data().price)
                    setLocation(doc.data().location)
                    setFloor(doc.data().floor)
                    setFloors(doc.data().floors)
                    setRooms(doc.data().rooms)
                    setStatus(doc.data().status)
                    setPool(doc.data().pool)
                    setYard(doc.data().yard)
                    setPorch(doc.data().porch)
                    setPrivate(doc.data().private)
                    setSold(doc.data().sold)
                }
                else{
                    console.log("document doesn't exist")
                }
            });
        }
    }, []);

    let generateID = new Promise(function(myResolve, myReject){
        let size = 0;
        if (aptID === 0){
            db.collection('products').get().then(snap => {
                size = snap.size // will return the collection size
                aptID = aptID + size + 1;
             });
        }
    })

    // let addOrUpdateFirestore = new Promise(function(myResolve, myReject){
    //     aptID = aptID.toString()
    //     db.collection('products').doc(aptID).set({
    //         id: aptID,
    //         image: img1,
    //         images: [img, img1, img, img1, img, img1, img],
    //         sold: sold,
    //         price: price,
    //         location: location,
    //         floor: floor,
    //         floors: floors,
    //         rooms: rooms,
    //         status: status,
    //         pool: pool,
    //         yard: yard,
    //         porch: porch,
    //         private: private_house,
    //     })
    //     .then(() => {
    //         // history.push('/products')
    //         console.log('addOrUpdateFirestore')
    //     })
    //     .catch((error) => {
    //         console.error("Error writing document: ", error);
    //     });
    // })
    
    // function allFilled(){
    //     // if (isNaN(price) || price*1 <= 0){
    //     //     return false
    //     // }
    //     // if (typeof(location) !== 'string' || location.length < 2){
    //     //     return false
    //     // }
    //     // if (isNaN(floor)){
    //     //     return false
    //     // }
    //     // if (isNaN(floors) || floors*1 <= 0){
    //     //     return false
    //     // }
    //     // if (isNaN(rooms) || rooms*1 <= 0){
    //     //     return false
    //     // }
    //     // if (typeof(status) !== 'string' || status.length < 2){
    //     //     return false
    //     // }

    //     return true
    // }
    
    function b(){
            aptID = aptID.toString()
            db.collection('products').doc(aptID).set({
                id: aptID,
                // image: img1,
                // images: [img, img1, img, img1, img, img1, img],
                sold: sold,
                price: price,
                location: location,
                floor: floor,
                floors: floors,
                rooms: rooms,
                status: status,
                pool: pool,
                yard: yard,
                porch: porch,
                private: private_house,
            })
            .then(() => {
                if(imageAsFile === '' ) {  
                    console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
                }
                const uploadTask = storage.ref(`${aptID}/${imageAsFile.name}`).put(imageAsFile)
                history.push('/products')
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
    }

    function handleSubmit(event) {
        event.preventDefault();
        // if (allFilled()){
        // generateID.then(() => {
        // console.log('generate id: ' + aptID)
        // let size = 0;
        // if (aptID === 0){
        //     db.collection('products').get().then(snap => {
        //         size = snap.size // will return the collection size
        //         aptID = aptID + size + 1;
        //         console.log('IN generate id: ' + aptID)
        //      });
        // }
        generateID
        .then(
            b()
        )
        
        // console.log('add or update: ' + aptID)

        //     aptID = aptID.toString()
        //     db.collection('products').doc(aptID).set({
        //         id: aptID,
        //         image: img1,
        //         images: [img, img1, img, img1, img, img1, img],
        //         sold: sold,
        //         price: price,
        //         location: location,
        //         floor: floor,
        //         floors: floors,
        //         rooms: rooms,
        //         status: status,
        //         pool: pool,
        //         yard: yard,
        //         porch: porch,
        //         private: private_house,
        //     })
        //     .then(() => {
        //         console.log('image: ' + aptID)
        //         console.log(aptID)
        //         console.log('still out')
        //         if(imageAsFile === '' ) {  
        //             console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
        //         }
        //         console.log('in')
        //         const uploadTask = storage.ref(`${aptID}/${imageAsFile.name}`).put(imageAsFile)
        //         history.push('/products')
        //     })
        //     .catch((error) => {
        //         console.error("Error writing document: ", error);
        //     });
        // }
        // )
        // }
        // else{
        //     setCorrectDetails(false)
        // }    
    }

    function isChecked(info){
        return info === 'Yes'
    }

    function validateForm() {
        return price.length > 0 && location.length > 0 && floor.length > 0 && floors.length > 0 && rooms.length > 0 && status.length > 0; 
    }

    const handleImageAsFile = (e) => {
        const image = e.target.files[0]
        setImageAsFile(imageAsFile => (image))
    }
 
    return (
    <Container>
        <Row>
            <Col xs={6}>
                <h1>Apartment {aptID}</h1>
                <br></br>
                <Form className="form" onSubmit={handleSubmit}> 
                    <Form.Group controlId="formCategory1">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        /> 
                    </Form.Group>
                    <Form.Group controlId="formCategory1">
                        <Form.Label>Location</Form.Label>
                        <Form.Control type="text" value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        /> 
                    </Form.Group>
                    <Form.Group controlId="formCategory2">
                        <Form.Label>Floor</Form.Label>
                        <Form.Control type="number" value={floor} 
                            onChange={(e) => setFloor(e.target.value)}
                        />          
                    </Form.Group>
                    <Form.Group controlId="formCategory2">
                        <Form.Label>Number of Floors</Form.Label>
                        <Form.Control type="number" value={floors} 
                            onChange={(e) => setFloors(e.target.value)}
                        />          
                    </Form.Group>
                    <Form.Group controlId="formCategory2">
                        <Form.Label>Number of Rooms</Form.Label>
                        <Form.Control type="number" value={rooms} 
                            onChange={(e) => setRooms(e.target.value)}
                        />          
                    </Form.Group>
                    <Form.Group controlId="formCategory2">
                        <Form.Label>Condition</Form.Label>
                        <Form.Control type="text" value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        />          
                    </Form.Group>
                    <fieldset>
                    <Form.Group as={Row}>
                        <Col sm={10}>
                            <Form.Check
                                type="checkbox"
                                label="pool"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios1"
                                defaultChecked={isChecked(pool) ? 'checked' : ''}
                                onClick={() => isChecked(pool) ? setPool('') : setPool('Yes')}
                            />  
                            <Form.Check
                                type="checkbox"
                                label="yard"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios2"
                                defaultChecked={isChecked(yard) ? 'checked' : ''}
                                onClick={() => isChecked(yard) ? setYard('') : setYard('Yes')}
                            /> 
                            <Form.Check
                                type="checkbox"
                                label="porch"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios3"
                                defaultChecked={isChecked(porch) ? 'checked' : ''}
                                onClick={() => isChecked(porch) ? setPorch('') : setPorch('Yes')}
                            />  
                            <Form.Check
                                type="checkbox"
                                label="private"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios4"
                                defaultChecked={isChecked(private_house) ? 'checked' : ''}
                                onClick={() => isChecked(private_house) ? setPrivate('') : setPrivate('Yes')}
                            /> 
                            <Form.Check
                                type="checkbox"
                                label="sold"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios5"
                                defaultChecked={isChecked(sold) ? 'checked' : ''}
                                onClick={() => isChecked(sold) ? setSold('') : setSold('Yes')}
                            />    
                        </Col>     
                    </Form.Group>
                    </fieldset>
                    <Form.Group controlId="formCategory2">
                        <Form.Label>images</Form.Label>
                        <Form.Control 
                        type="file" 
                        multiple
                        onChange={handleImageAsFile}
                        />          
                    </Form.Group>
                    <h6 style={{display: !correctDetails ? 'block' : 'none', color: 'red'}}>Please anter valid details.</h6>
                    <Button variant="outlined" type="submit" color="primary" disabled={!validateForm()}>{aptID ? 'Update' : 'Add' }</Button>
                </Form>
            </Col>
        </Row>
    </Container>
    )
}


const mapStatetoProps=(state)=>{
    return{
        user_id:state.user.userDetails.userid,
        username:state.user.userDetails.username,
       email:state.user.email,
       profileImage: state.user.profileImage,
       msg:state.user.msg
    }
   }
   
   
export default UpdateOrAddApt
