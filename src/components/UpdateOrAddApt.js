import React, { useState } from "react";
import { Container, Row, Col, Form, Button} from 'react-bootstrap';
//import Button from '@material-ui/core/Button';
import AddCallRecord from "./AddCallRecord"
import Products from './Products'
import { useHistory } from "react-router";


import firebase from './../firebase.js';
import img from '../pictures/house-real-estate-logo.jpg'
import img1 from '../pictures/Purchases.jpg'
// import { useParams } from 'react-router-dom';
// import {connect} from 'react-redux';
// import DefaultUserPic from "../uploads/team-male.jpg";
// const axios = require('axios');


function UpdateOrAddApt(){

    const[price, setPrice] = useState("");
    const [Location, setLocation] = useState("");
    const [Floor, setFloor] = useState("");
    const [Floors, setFloors] = useState("");
    const [Rooms, setRooms] = useState("");
    const [Status, setStatus] = useState("")
    // checkbox
    const [Pool, setPool] = useState("")
    const [Yard, setYard] = useState("")
    const [Porch, setPorch] = useState("")
    const [Private, setPrivate] = useState("")
    const [Sold, setSold] = useState("")

    const history = useHistory();


    // let {aptID} = useParams()
    let aptID = 0;
    
    function handleSubmit(event) {
        event.preventDefault();
        const apartmentReff = firebase.database().ref('apartment');
        const apartment = {
            ID: aptID,
            Image: img1,
            Images: [img, img1, img, img1, img, img1, img],
            Sold: Sold,
            Price: price,
            Location: Location,
            Floor: Floor,
            Floors: Floors,
            Rooms: Rooms,
            Status: Status,
            Pool: Pool,
            Yard: Yard,
            Porch: Porch,
            Private: Private,
        }
        apartmentReff.push(apartment);
    
        history.push('/products')

    }

    function isChecked(info){
        return info === 'Yes'
    }

    function changeCheckBoxState(info)
    { 
    //   if(info == "Pool"){
    //     if(isChecked(Pool))
    //         setPool("No")
    //     else setPool("Yes")
    //   }
    //   else if(info == "Yard"){
    //     if(isChecked(Yard))
    //         setYard("No")
    //     else setYard("Yes")
    //   }
    //   else if(info == "Porch"){
    //     if(isChecked(Porch))
    //         setPorch("No")
    //     else setPorch("Yes")
    //   }
    //   else if(info == "Private"){
    //     if(isChecked(Private))
    //         setPrivate("No")
    //     else setPrivate("Yes")
    //   }
    //   else if(info == "Sold"){
    //     if(isChecked(Sold))
    //         setSold("No")
    //     else setSold("Yes")
    //   }    
    }

    function validateForm() {
        return price.length > 0 && Location.length > 0 && Floor.length > 0 && Floors.length > 0 && Rooms.length > 0 && Status.length > 0;
     
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
                        <Form.Control type="text" defaultValue={Location}
                            onChange={(e) => setLocation(e.target.value)}
                        /> 
                    </Form.Group>
                    <Form.Group controlId="formCategory2">
                        <Form.Label>Floor</Form.Label>
                        <Form.Control type="number" defaultValue={Floor} 
                            onChange={(e) => setFloor(e.target.value)}
                        />          
                    </Form.Group>
                    <Form.Group controlId="formCategory2">
                        <Form.Label>Number of Floors</Form.Label>
                        <Form.Control type="number" defaultValue={Floors} 
                            onChange={(e) => setFloors(e.target.value)}
                        />          
                    </Form.Group>
                    <Form.Group controlId="formCategory2">
                        <Form.Label>Number of Rooms</Form.Label>
                        <Form.Control type="number" defaultValue={Rooms} 
                            onChange={(e) => setRooms(e.target.value)}
                        />          
                    </Form.Group>
                    <Form.Group controlId="formCategory2">
                        <Form.Label>Condition</Form.Label>
                        <Form.Control type="text" defaultValue={Status}
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
                                defaultChecked={isChecked(Pool) ? 'checked' : ''}
                                onClick={changeCheckBoxState("Pool")}
                            />  
                            <Form.Check
                                type="checkbox"
                                label="yard"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios1"
                                defaultChecked={isChecked(Yard) ? 'checked' : ''}
                                onClick={changeCheckBoxState('Yard')}
                            /> 
                            <Form.Check
                                type="checkbox"
                                label="porch"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios1"
                                defaultChecked={isChecked(Porch) ? 'checked' : ''}
                                onClick={changeCheckBoxState('Porch')}
                            />  
                            <Form.Check
                                type="checkbox"
                                label="private"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios1"
                                defaultChecked={isChecked(Private) ? 'checked' : ''}
                                onClick={changeCheckBoxState('Private')}
                            /> 
                            <Form.Check
                                type="checkbox"
                                label="sold"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios1"
                                defaultChecked={isChecked(Sold) ? 'checked' : ''}
                                onClick={changeCheckBoxState('Sold')}
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
