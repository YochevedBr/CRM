import React from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import './UpdateCustomer.css'
import Button from '@material-ui/core/Button';
import AddCallRecord from "./AddCallRecord";
import firebase from './../firebase.js';
import $ from 'jquery';  

class UpdateCustomer extends React.Component {
    constructor(props){
        super(props);
        this.state={
            currentId: window.location.pathname.substring(17),
            username:'',
            phonenumber:'',
            email:'',
        }
        this.updateState = this.updateState.bind(this);
    }

    updateState(){
        var docRef = firebase.firestore().collection("customers").doc(this.state.currentId)
        docRef.get().then((doc) => {
            if (doc.exists) {
                // Edit text field
                // this.state.name = doc.data().name
                // this.state.email = doc.data().email
                // this.state.phonenumber = doc.data().phoneNumber
                this.setState({
                    currentId : this.state.currentId.substring(17),
                    username : doc.data().name,
                    email : doc.data().email,
                    phonenumber : doc.data().phoneNumber
                    }
                )
                // $(".txtUser").val(this.state.name)
                // $(".txtNumber").val(this.state.phonenumber)
                // $(".txtEmail").val(this.state.email)
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

    }

    componentDidMount(){
        // this.state.currentId = this.state.currentId.substring(17)
        console.log('currentId')
        console.log(this.state.currentId)
        // Retrieve the contents of a single document 
        this.updateState();       
    }

    render(){
            return (
            <Container>
                <Row>
                    <Col xs={6}>
                        <h1>Customer</h1>
                        <Form>     
                            <p>{this.state.msg}</p>
                            <Form.Group controlId="formCategory1">
                                <div className="label">
                                <Form.Label>Name</Form.Label>
                                </div>
                                <Form.Control className="txtUser" type="text" defaultValue={this.state.username}/> 
                            </Form.Group>
                            <Form.Group controlId="formCategory1">
                                <div className="label">
                                <Form.Label>Phone Number</Form.Label>
                                </div>
                                <Form.Control className="txtNumber" type="text" defaultValue={this.state.phonenumber}/> 
                            </Form.Group>
                            <Form.Group controlId="formCategory2">
                                <div className="label">
                                <Form.Label>Email</Form.Label>
                                </div>
                                <Form.Control className="txtEmail" type="email" defaultValue={this.state.email} />          
                            </Form.Group>
                            <Button variant="outlined" color="primary" onClick={this.UpdateProfileHandler}>Update</Button>
                            {/* Pass Customer Id to child component - AddCallRecord */}
                            <AddCallRecord dataFromParentId = {this.state.currentId} dataFromParentName ={this.state.username}/> 
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}
   
export default UpdateCustomer
