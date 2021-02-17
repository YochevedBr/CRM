import React from 'react';
import { Container, Row, Col, Form} from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import AddCallRecord from "./AddCallRecord"
// import {connect} from 'react-redux';
// import DefaultUserPic from "../uploads/team-male.jpg";
// const axios = require('axios');

import img from '../pictures/house-real-estate-logo.jpg'
import img1 from '../pictures/Purchases.jpg'

import { useParams } from 'react-router-dom';

function UpdateOrAddApt(){
    

    const {aptID} = useParams()
    // retrueve the correct apartment
    console.log('aptID ' + aptID)

    let data = [{},]
    if(aptID){
        data = [{ 
            ID: 0,
            image: img1,
            images: [img, img1, img, img1, img, img1, img],
            sold: 'sold',
            price: '1,500,000',
            Location: '153 Jaffo, Jerusalem',
            Floor: '2',
            Floors: '1',
            Rooms: 5,
            Status: 'renovated',
            Pool: 'No',
            Yard: 'Yes',
            Porch: 'Yes',
            Private: 'No',
        },]
    }
    

    function isChecked(info){
        return info === 'Yes'
    }

    function changeCheckBoxState(info)
    {
        if(isChecked(data[0][info])){
            data[0][info] = 'No'
        }
        else{
            data[0][info] = 'Yes'
        }
    }

    function AptHandler(){
        
    }

    return (
    <Container>
        <Row>
            <Col xs={6}>
                <h1>Apartment {data[0].ID}</h1>
                <br></br>
                <Form className="form">     
                    <Form.Group controlId="formCategory1">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" defaultValue={data[0].price}/> 
                    </Form.Group>
                    <Form.Group controlId="formCategory1">
                        <Form.Label>Location</Form.Label>
                        <Form.Control type="text" defaultValue={data[0].Location}/> 
                    </Form.Group>
                    <Form.Group controlId="formCategory2">
                        <Form.Label>Floor</Form.Label>
                        <Form.Control type="email" defaultValue={data[0].Floor} />          
                    </Form.Group>
                    <Form.Group controlId="formCategory2">
                        <Form.Label>Number of Floors</Form.Label>
                        <Form.Control type="email" defaultValue={data[0].Floors} />          
                    </Form.Group>
                    <Form.Group controlId="formCategory2">
                        <Form.Label>Number of Rooms</Form.Label>
                        <Form.Control type="email" defaultValue={data[0].Rooms} />          
                    </Form.Group>
                    <Form.Group controlId="formCategory2">
                        <Form.Label>Condition</Form.Label>
                        <Form.Control type="email" defaultValue={data[0].Status} />          
                    </Form.Group>
                    <fieldset>
                    <Form.Group as={Row}>
                        <Col sm={10}>
                            <Form.Check
                                type="checkbox"
                                label="pool"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios1"
                                defaultChecked={isChecked(data[0].Pool) ? 'checked' : ''}
                                onChange={changeCheckBoxState('Pool')}
                                />  
                            <Form.Check
                                type="checkbox"
                                label="yard"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios1"
                                defaultChecked={isChecked(data[0].Yard) ? 'checked' : ''}
                                onClick={changeCheckBoxState('Yard')}
                                /> 
                            <Form.Check
                                type="checkbox"
                                label="porch"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios1"
                                defaultChecked={isChecked(data[0].Porch) ? 'checked' : ''}
                                onClick={changeCheckBoxState('Porch')}
                                />  
                            <Form.Check
                                type="checkbox"
                                label="private"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios1"
                                defaultChecked={isChecked(data[0].Private) ? 'checked' : ''}
                                onClick={changeCheckBoxState('Private')}
                                />   
                        </Col>     
                    </Form.Group>
                    </fieldset>
                    <Button variant="outlined" color="primary" onClick={AptHandler}>{aptID ? 'Update' : 'Add'}</Button>
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
