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
        console.log('constructor')

    }

    updateState(){
        var docRef = firebase.firestore().collection("customers").doc(this.state.currentId)
        docRef.get().then((doc) => {
            if (doc.exists) {  
                // if(doc.data().name){
                //     this.setState({ username: doc.data().name });
                //     console.log('in if in update state non empty name')
                // }
                // if(doc.data().email){
                //     this.setState({ email: doc.data().email });
                //     console.log('in if in update state non empty email')
                // }
                // if(doc.data().phoneNumber)
                //     this.setState({ phonenumber: doc.data().phoneNumber });

                this.setState({
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

    handleClose(){
        this.setState({showModal: false})
    }

    updateHandler(){
        console.log('updateHandler')
        var db = firebase.firestore()
        // Keeps the previous values  
        // let prev_name = ""
        // let prev_phone = ""
        // let prev_email = ""
        // console.log('111111111')

        // db.collection("customers").doc(this.state.currentId).get()
        //     .then((doc) => {
        //         if (doc.exists) {
        //             prev_name = doc.data().name
        //             prev_phone = doc.data().phoneNumber
        //             prev_email = doc.data().email
        //             console.log(' 1 111111111/222222222')

        //             console.log('prev in if doc:')
        //             console.log(prev_name)
        //             console.log(prev_phone)
        //             console.log(prev_email)    
        //         }
        //         else{
        //             console.log("No such document!");
        //         }
        //     })
        //     .catch((error) => {
        //         console.log("Error getting documents: ", error);
        //     });

        // console.log('-----before update-----')
        // console.log(prev_name)
        // console.log(prev_phone)
        // console.log(prev_email)

        // console.log('------after update jquery-----')
        // console.log($(".txtUser").val())
        // console.log($(".txtNumber").val())
        // console.log($(".txtEmail").val())
        // console.log('222222222222')

        let update_name = $(".txtUser").val()
        let update_phone = $(".txtNumber").val()
        let update_email = $(".txtEmail").val()

        // In case of an empty field, leave the previous values 
        if( $(".txtUser").val() == '' ) {
            // update_name = prev_name
            this.setState({emptyName: true})
            console.log('*********' + this.state.emptyName)
            // this.state.emptyName = true

            // $(".txtUser").val(update_name)
        }
        if( $(".txtNumber").val() == '' ) {
            // update_phone = prev_phone
            this.state.emptyPhone = true
            console.log('*********' + this.state.emptyPhone)


            // $(".txtNumber").val(update_phone)
        }
        if( $(".txtEmail").val() == '' ) {
            // update_email = prev_email
            this.state.emptyEmail = true
            console.log('*********' + this.state.emptyEmail)


            // $(".txtEmail").val(update_email)
        }
        // console.log('333333333')

      
        // console.log('-----after check if empty-----')
        // console.log(update_name)
        // console.log(update_phone)
        // console.log(update_email)

        if(!this.state.emptyName && !this.state.emptyPhone && !this.state.emptyPhone){
            console.log('in ffff')
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
            // console.log('44444444444')
        }
        
    }

    componentDidMount(){
        // Retrieve the contents of a single document 
        this.updateState(); 
        console.log('componentDidMount')
    }

    render(){
        console.log('render')
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
                                <Form.Control onChange={(e) => this.state.emptyName=false} className="txtUser" type="text" defaultValue={this.state.username}/> 
                            </Form.Group>
                            <h6 style={{display: this.state.emptyName ? 'block' : 'none', color: 'red'}}>Empty Field‏</h6>
                            <Form.Group controlId="formCategory1">
                                <div className="label">
                                <Form.Label>Phone Number</Form.Label>
                                </div>
                                <Form.Control onChange={(e) => this.state.emptyPhone=false} className="txtNumber" type="text" defaultValue={this.state.phonenumber}/> 
                            </Form.Group>
                            <h6 style={{display: this.state.emptyPhone ? 'block' : 'none', color: 'red'}}>Empty Field‏</h6>
                            <Form.Group controlId="formCategory2">
                                <div className="label">
                                <Form.Label>Email</Form.Label>
                                </div>
                                <Form.Control className="txtEmail" type="email" defaultValue={this.state.email} />          
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
