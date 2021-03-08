import React from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import './UpdateCustomer.css'
import Button from '@material-ui/core/Button';
import AddCallRecord from "./AddCallRecord";
import firebase from './../firebase.js';
import $ from 'jquery';  
import Modal from "react-bootstrap/Modal";

class UpdateCustomer extends React.Component {
    constructor(props){
        super(props);
        this.state={
            emptyName: false,
            emptyPhone: false,
            emptyEmail: false,
            showModal: false,
            currentId: window.location.pathname.substring(17),
            currentName: '',
            username:'',
            phonenumber:'',
            email:'',
        }
        this.updateState = this.updateState.bind(this);
        this.updateHandler = this.updateHandler.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    updateState(){
        var docRef = firebase.firestore().collection("customers").doc(this.state.currentId)
        docRef.get().then((doc) => {
            if (doc.exists) {  
                this.setState({
                    username : doc.data().name,
                    email : doc.data().email,
                    phonenumber : doc.data().phoneNumber
                    }
                )
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    handleClose(){
        this.setState({showModal: false})
    }

    updateHandler(){
        var db = firebase.firestore()

        let update_name = $(".txtUser").val()
        let update_phone = $(".txtNumber").val()
        let update_email = $(".txtEmail").val()

        // In case of an empty field, leave the previous values 
        if( update_name == '' ) {
            this.setState({emptyName: true})
        }
        if( update_phone == '' ) {
            this.setState({emptyPhone: true})
        }
        if( update_email == '' ) {
            this.setState({emptyEmail: true})
        }

        // All the fields not empty
        if(update_name!='' && update_phone!='' && update_email!='' ){
            // Update exist document in collection "customers"
            db.collection("customers").doc(this.state.currentId).set({
                email: update_email,
                name: update_name,
                phoneNumber: update_phone
            })
            .then(() => {
                this.setState({showModal: true})
                console.log("Document successfully update!");
            })
            .catch((error) => {
                console.error("Error update document: ", error);
            });
        }
    }

    componentDidMount(){
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
                                <Form.Control onChange={(e) => this.setState({emptyName: false})} className="txtUser" type="text" defaultValue={this.state.username}/> 
                            </Form.Group>
                            <h6 style={{display: this.state.emptyName ? 'block' : 'none', color: 'red'}}>Empty Field‏</h6>
                            <Form.Group controlId="formCategory1">
                                <div className="label">
                                <Form.Label>Phone Number</Form.Label>
                                </div>
                                <Form.Control onChange={(e) => this.setState({emptyPhone: false})} className="txtNumber" type="text" defaultValue={this.state.phonenumber}/> 
                            </Form.Group>
                            <h6 style={{display: this.state.emptyPhone ? 'block' : 'none', color: 'red'}}>Empty Field‏</h6>
                            <Form.Group controlId="formCategory2">
                                <div className="label">
                                <Form.Label>Email</Form.Label>
                                </div>
                                <Form.Control onChange={(e) => this.setState({emptyEmail: false})} className="txtEmail" type="email" defaultValue={this.state.email} />          
                            </Form.Group>
                            <h6 style={{display: this.state.emptyEmail ? 'block' : 'none', color: 'red'}}>Empty Field‏</h6>
                            <Button variant="outlined" color="primary" onClick={this.updateHandler}>Update</Button>
                            {/* Pass Customer Id to child component - AddCallRecord */}
                            <AddCallRecord dataFromParentId = {this.state.currentId} dataFromParentName ={this.state.username}/> 
                        </Form>
                    </Col>
                </Row>
                <Modal show={this.state.showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Customer details have been updated</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleClose}>Close</Button>                   
                    </Modal.Footer>
                </Modal>
            </Container>   
        )
    }
}
   
export default UpdateCustomer
