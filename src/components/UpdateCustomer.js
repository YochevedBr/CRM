import React from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import './UpdateCustomer.css'
import Button from '@material-ui/core/Button';
import AddCallRecord from "./AddCallRecord";
import firebase from './../firebase.js';
import $ from 'jquery';  
import Modal from "react-bootstrap/Modal";
import CustomerCallRecord from './CustomerCallRecord'

// Component to update customer details
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
            calls:[],
        }
        this.updateState = this.updateState.bind(this);
        this.updateHandler = this.updateHandler.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    // Update the states
    updateState(){
        // Retrives the customer with 'currentId'
        var docRef = firebase.firestore().collection("customers").doc(this.state.currentId)
        docRef.get().then((doc) => {
            if (doc.exists) {  
                this.setState({
                    // Keeps the values of customer
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

    // Close the modal of message
    handleClose(){
        this.setState({showModal: false})
    }

    // On press on 'Update' button
    updateHandler(){
        var db = firebase.firestore()
        // Retrives the value from the fields
        let update_name = $(".txtUser").val()
        let update_phone = $(".txtNumber").val()
        let update_email = $(".txtEmail").val()

        // In case of an empty field, leave the previous values 
        if( update_name === '' ) {
            this.setState({emptyName: true})
        }
        if( update_phone === '' ) {
            this.setState({emptyPhone: true})
        }
        if( update_email === '' ) {
            this.setState({emptyEmail: true})
        }

        // All the fields not empty
        if(update_name!=='' && update_phone!=='' && update_email!=='' ){
            // Update exist document in collection "customers"
            db.collection("customers").doc(this.state.currentId).set({
                email: update_email,
                name: update_name,
                phoneNumber: update_phone,
                deleted: false
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
        var db = firebase.firestore();

        // display the call-records of the customer
        db.collection("call_records")
        .where("customer_id", "==", this.state.currentId)
        .get()
        .then((snapshot)=>{
            var callsData = [];
            snapshot.forEach((doc) => {
                let x = doc.data()
                x.id = doc.id
                callsData.push(x)
            }); 
              
            callsData = callsData.sort(custom_sort);
            this.setState({calls: callsData})
        });
    }

    render(){
            return (
            <Container>
                <Row>
                    <Col sm>
                        <h1 className='font'>C</h1>
                        <Form style={{width: "90%"}}>     
                            <p>{this.state.msg}</p>
                            <Form.Group controlId="formCategory1">
                                <div className="label">
                                <Form.Label>Name</Form.Label>
                                </div>
                                <Form.Control onChange={(e) => this.setState({emptyName: false})} className="txtUser" type="text" defaultValue={this.state.username}/> 
                            </Form.Group>
                            <h6 style={{display: this.state.emptyName ? 'block' : 'none', color: 'red'}}>Empty Field‏</h6>
                            <Form.Group controlId="formCategory2">
                                <div className="label">
                                <Form.Label>Phone Number</Form.Label>
                                </div>
                                <Form.Control 
                                    type="tel"
                                    placeholder="Format: 123-4567890 / 12-3456789"
                                    pattern="[0-9]{2,3}-[0-9]{7}"
                                    onChange={(e) => this.setState({emptyPhone: false})} 
                                    className="txtNumber"  
                                    defaultValue={this.state.phonenumber}/> 
                            </Form.Group>
                            <h6 style={{display: this.state.emptyPhone ? 'block' : 'none', color: 'red'}}>Empty Field‏</h6>
                            <Form.Group controlId="formCategory3">
                                <div className="label">
                                <Form.Label>Email</Form.Label>
                                </div>
                                <Form.Control onChange={(e) => this.setState({emptyEmail: false})} className="txtEmail" type="email" defaultValue={this.state.email} />          
                            </Form.Group>
                            <h6 style={{display: this.state.emptyEmail ? 'block' : 'none', color: 'red'}}>Empty Field‏</h6>
                            <Button className="btn-inline" variant="outlined" color="primary" onClick={this.updateHandler}>Update</Button>
                            {/* Pass Customer Id to child component - AddCallRecord */}
                            <div style={{margin: "4px"}}>
                                <AddCallRecord className="btn-inline" dataFromParentId = {this.state.currentId} dataFromParentName ={this.state.username}/> 
                            </div>
                        </Form>
                    </Col>
                    <Col sm>
                    <div>
                        <br></br>
                        <h5 className='font'> CallRecords </h5> 
                        <br></br>
                        <div> {
                            this.state.calls.map((call, i) => < CustomerCallRecord key = { i } call = { call }/>)
                            } 
                        </div> 
                    </div> 
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


function custom_sort(a, b) {
     let x = new Date(b.date).getTime()
     let y = new Date(a.date).getTime()
     return new Date(b.date).getTime() > new Date(a.date).getTime() ? 1 : -1
 }