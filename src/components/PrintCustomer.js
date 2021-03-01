import React from "react";
import ReactToPrint from "react-to-print";
import Button from '@material-ui/core/Button';
// import Form from 'react-bootstrap/Form'
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
import { Form, Row, Col, Table, Container } from 'react-bootstrap';
import { span } from 'bootstrap';
import PropTypes from "prop-types";
import $ from 'jquery'
import firebase from './../firebase.js';


class ComponentToPrint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentId: window.location.pathname.substring(16),
            fullName: '',
            phoneNumber: '',
            email: '',
            callRecord: ['10.02.20','14.05.19','17.08.18'],
            callRecordList: [['10.02.20','The customer intersted in ...', 'The product...','No'],
                            ['18.18.18','The customer intersted in ...', 'The product...','Yes'],
                            ['11.01.02','The customer intersted in ...', 'The product...','No']]
        };
        this.updateState = this.updateState.bind(this)
    }
    
    updateState(){
        var docRef = firebase.firestore().collection("customers").doc(this.state.currentId)
        docRef.get().then((doc) => {
            if (doc.exists) {
                this.setState({
                    // currentId : this.state.currentId.substring(16),
                    fullName : doc.data().name,
                    email : doc.data().email,
                    phoneNumber : doc.data().phoneNumber
                    }
                )
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    componentDidMount(){
        // this.state.currentId = this.state.currentId.substring(16)
        console.log('currentId')
        console.log(this.state.currentId)
        // Retrieve the contents of a single document 
        this.updateState();       
    }

    render() { 
        const style = {
            color: "DodgerBlue",
            // backgroundColor: "DodgerBlue",
            padding: "10px",
            paddingTop: "10px",
            fontFamily: "Calibri",
            textAlign: "left",
            whiteSpace: "nowrap",
            // display: "none"
        }
        //const {fullName, phoneNumber, email, callRecordList}=this.props
        
        // this.state = {
        //     fullName: 'Yael',
        //     phoneNumber: '058-3267782',
        //     email: 'yael@gmail.com'
        // };
     
        return (
            //hidden
            // <div style={style} >
            //     <h3>Customer Details:</h3>
            //     <h4>Name: </h4>Yael Neeman
            //     <h4>Phone Number: </h4>058-3267782
            //     <h4>Email: </h4>yaelneeman10@gmail.com
            //     <h4>Call Record List: </h4>
            //     <ul>
            //         <li>14.02.18</li>
            //         <li>02.07.20</li>
            //         <li>01.01.21</li>
            //     </ul>  
            // </div> 
            // <Form>
            //     <Form.Group as={Row} controlId="formPlaintextEmail">
            //         <Form.Label column sm="2" textAlign='right'>
            //             Full Name:
            //         </Form.Label>
            //         <Col sm="10">
            //             <Form.Control plaintext readOnly defaultValue="Yael Neeman"/>
            //         </Col>
            //     </Form.Group>
            //     <Form.Group as={Row} controlId="formPlaintextEmail">
            //         <Form.Label column sm="2">
            //             Phone Number:
            //         </Form.Label>
            //         <Col sm="10">
            //             <Form.Control plaintext readOnly defaultValue="058-3267782" />
            //         </Col>
            //     </Form.Group>
            //     <Form.Group as={Row} controlId="formPlaintextEmail">
            //         <Form.Label column sm="2">
            //             Email
            //         </Form.Label>
            //         <Col sm="10">
            //             <Form.Control plaintext readOnly defaultValue="yaelneeman10@gmail.com" />
            //         </Col>
            //     </Form.Group>
            // </Form>
            <div>
                <div style={{textAlign:'left',paddingLeft:'40px',paddingTop:'50px', fontSize:'30px',color:'black'}}>Customer Details:</div>
                <div style={{display:'flex',padding:'20px 20px 10px 50px '}} >
                    <div style={{color:'#0044cc',paddingRight:'10px',fontSize:'22px'}}>Full Name:</div><div style={{fontSize:'22px'}}>{this.state.fullName}</div>
                </div>
                <div style={{display:'flex' ,padding:'10px 20px 10px 50px '}}>
                    <div style={{color:'#0044cc',paddingRight:'10px',fontSize:'22px'}}>Phone Number:</div><div style={{fontSize:'22px'}}>{this.state.phoneNumber}</div>
                </div >
                <div style={{display:'flex',padding:'10px 20px 10px 50px '}}>
                    <div style={{color:'#0044cc',paddingRight:'10px',fontSize:'22px'}}>Email:</div><div style={{fontSize:'22px'}}>{this.state.email}</div>
                </div>
                <div style={{display:'flex',padding:'10px 20px 10px 50px '}}>
                    <div style={{color:'#0044cc',paddingRight:'10px',fontSize:'22px'}}>Call Record:</div><div style={{fontSize:'22px'}}></div>
                </div>
                <form class="form-floating">
                    <p class="round2" style={{border:'2px solid #0044cc',borderRadius: '8px', marginLeft:'50px', marginRight:'50px', borderStyle: 'inset'}}>
                        <div style={{display:'flex',padding:'10px 20px 10px 20px '}} >
                            <div style={{color:'#0044cc',paddingRight:'10px',fontSize:'22px'}}>Date:</div><div style={{fontSize:'22px'}}>{this.state.callRecordList[0][0]}</div>
                        </div>
                        <div style={{display:'flex' ,padding:'10px 20px 10px 20px '}}>
                            <div style={{color:'#0044cc',paddingRight:'10px',fontSize:'22px'}}>Interest in:</div><div style={{fontSize:'22px'}}>{this.state.callRecordList[0][1]}</div>
                        </div >
                        <div style={{display:'flex',padding:'10px 20px 10px 20px '}}>
                            <div style={{color:'#0044cc',paddingRight:'10px',fontSize:'22px'}}>Products purchased:</div><div style={{fontSize:'22px'}}>{this.state.callRecordList[0][2]}</div>
                        </div>
                        <div style={{display:'flex',padding:'10px 20px 10px 20px '}}>
                            <div style={{color:'#0044cc',paddingRight:'10px',fontSize:'22px'}}>Return:</div><div style={{fontSize:'22px'}}>{this.state.callRecordList[0][3]}</div>
                        </div>
                    </p>
                    <p class="round2" style={{border:'2px solid #0044cc',borderRadius: '8px', marginLeft:'50px', marginRight:'50px', borderWidth: '1px', borderStyle:'dotted'}}>
                        <div style={{display:'flex',padding:'10px 20px 10px 20px '}} >
                            <div style={{color:'#0044cc',paddingRight:'10px',fontSize:'22px'}}>Date:</div><div style={{fontSize:'22px'}}>{this.state.callRecordList[1][0]}</div>
                        </div>
                        <div style={{display:'flex' ,padding:'10px 20px 10px 20px '}}>
                            <div style={{color:'#0044cc',paddingRight:'10px',fontSize:'22px'}}>Interest in:</div><div style={{fontSize:'22px'}}>{this.state.callRecordList[1][1]}</div>
                        </div >
                        <div style={{display:'flex',padding:'10px 20px 10px 20px '}}>
                            <div style={{color:'#0044cc',paddingRight:'10px',fontSize:'22px'}}>Products purchased:</div><div style={{fontSize:'22px'}}>{this.state.callRecordList[1][2]}</div>
                        </div>
                        <div style={{display:'flex',padding:'10px 20px 10px 20px '}}>
                            <div style={{color:'#0044cc',paddingRight:'10px',fontSize:'22px'}}>Return:</div><div style={{fontSize:'22px'}}>{this.state.callRecordList[1][3]}</div>
                        </div>
                    </p>
                    <p class="round2" style={{marginLeft:'50px', marginRight:'50px', borderWidth: '1px', borderBottom: '6px solid #0044cc', backgroundColor: 'lightgrey'}}>
                        <div style={{display:'flex',padding:'10px 20px 10px 20px '}} >
                            <div style={{color:'#0044cc',paddingRight:'10px',fontSize:'22px'}}>Date:</div><div style={{fontSize:'22px'}}>{this.state.callRecordList[2][0]}</div>
                        </div>
                        <div style={{display:'flex' ,padding:'10px 20px 10px 20px '}}>
                            <div style={{color:'#0044cc',paddingRight:'10px',fontSize:'22px'}}>Interest in:</div><div style={{fontSize:'22px'}}>{this.state.callRecordList[2][1]}</div>
                        </div >
                        <div style={{display:'flex',padding:'10px 20px 10px 20px '}}>
                            <div style={{color:'#0044cc',paddingRight:'10px',fontSize:'22px'}}>Products purchased:</div><div style={{fontSize:'22px'}}>{this.state.callRecordList[2][2]}</div>
                        </div>
                        <div style={{display:'flex',padding:'10px 20px 10px 20px '}}>
                            <div style={{color:'#0044cc',paddingRight:'10px',fontSize:'22px'}}>Return:</div><div style={{fontSize:'22px'}}>{this.state.callRecordList[2][3]}</div>
                        </div>
                    </p>
                </form>
            </div>     
        );
    }
}


class Example extends React.Component {     
    render() {
        const handleClick = () => {
            alert("click")
            console.log("kkkkkkkkkkkkkkk")
        };

        const buttonStyle= {
            color: "primary",
            padding: "10px",
            paddingTop: "10px",
            fontFamily: "Calibri",
            textAlign: "left",
            whiteSpace: "nowrap",
            marginTop: "30px"
            // display: "none"
        }

        return (
            <div>    
                <ReactToPrint
                    // trigger={() => <a href="#">PRINT</a>}
                    trigger={() => <Button color="primary" onClick={handleClick}>PRINT</Button>} //style={buttonStyle}
                    content={() => this.componentRef}
                />   
                <ComponentToPrint ref={el => (this.componentRef = el)} />       
            </div>
        );
    }
}

export default Example;
