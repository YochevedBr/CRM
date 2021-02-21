import React, { useState } from "react";
import { Container, Row, Col, Form, Button} from 'react-bootstrap';
//import Button from '@material-ui/core/Button';
import AddCallRecord from "./AddCallRecord"
import Products from './Products'
import { useHistory } from "react-router";

import firebase from './../firebase.js';
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
    // checkbox
    // const [Pool, setPool] = useState("")
    // const [Yard, setYard] = useState("")
    // const [Porch, setPorch] = useState("")
    // const [Private, setPrivate] = useState("")
    // const [Sold, setSold] = useState("")

    let pool = ''
    let yard = ''
    let porch = ''
    let private_house = ''
    let sold = ''


    const history = useHistory();
    var db = firebase.firestore();


    let {aptID} = useParams()
    if (!aptID){
        aptID = 0
    }

    let generateID = new Promise(function(myResolve, myReject){
        let size = 0;
        if (aptID == 0){
            db.collection('products').get().then(snap => {
                size = snap.size // will return the collection size
                aptID = aptID + size + 1;
             });
        }
    })

    function addOrUpdateFirestore(){
        aptID = aptID.toString() 
        db.collection('products').doc(aptID).set({
            id: aptID,
            image: img1,
            images: [img, img1, img, img1, img, img1, img],
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
            history.push('/products')
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
    } 
    
    function handleSubmit(event) {
        event.preventDefault();
        generateID.then(
            addOrUpdateFirestore()
        )
    }

    function isChecked(info){
        return info === 'Yes'
    }

    function validateForm() {
        return price.length > 0 && location.length > 0 && floor.length > 0 && floors.length > 0 && rooms.length > 0 && status.length > 0;
     
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
                        <Form.Control type="text" defaultValue={price}
                            onChange={(e) => setPrice(e.target.value)}
                        /> 
                    </Form.Group>
                    <Form.Group controlId="formCategory1">
                        <Form.Label>Location</Form.Label>
                        <Form.Control type="text" defaultValue={location}
                            onChange={(e) => setLocation(e.target.value)}
                        /> 
                    </Form.Group>
                    <Form.Group controlId="formCategory2">
                        <Form.Label>Floor</Form.Label>
                        <Form.Control type="number" defaultValue={floor} 
                            onChange={(e) => setFloor(e.target.value)}
                        />          
                    </Form.Group>
                    <Form.Group controlId="formCategory2">
                        <Form.Label>Number of Floors</Form.Label>
                        <Form.Control type="number" defaultValue={floors} 
                            onChange={(e) => setFloors(e.target.value)}
                        />          
                    </Form.Group>
                    <Form.Group controlId="formCategory2">
                        <Form.Label>Number of Rooms</Form.Label>
                        <Form.Control type="number" defaultValue={rooms} 
                            onChange={(e) => setRooms(e.target.value)}
                        />          
                    </Form.Group>
                    <Form.Group controlId="formCategory2">
                        <Form.Label>Condition</Form.Label>
                        <Form.Control type="text" defaultValue={status}
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
                                onClick={() => isChecked(pool) ? pool = '' : pool = 'Yes'}
                            />  
                            <Form.Check
                                type="checkbox"
                                label="yard"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios1"
                                defaultChecked={isChecked(yard) ? 'checked' : ''}
                                onClick={() => isChecked(yard) ? yard = '' : yard = 'Yes'}
                            /> 
                            <Form.Check
                                type="checkbox"
                                label="porch"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios1"
                                defaultChecked={isChecked(porch) ? 'checked' : ''}
                                onClick={() => isChecked(porch) ? porch = '' : porch = 'Yes'}
                            />  
                            <Form.Check
                                type="checkbox"
                                label="private"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios1"
                                defaultChecked={isChecked(private_house) ? 'checked' : ''}
                                onClick={() => isChecked(private_house) ? private_house = '' : private_house = 'Yes'}
                            /> 
                            <Form.Check
                                type="checkbox"
                                label="sold"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios1"
                                defaultChecked={isChecked(sold) ? 'checked' : ''}
                                onClick={() => isChecked(sold) ? sold = '' : sold = 'Yes'}
                            />    
                        </Col>     
                    </Form.Group>
                    </fieldset>
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
