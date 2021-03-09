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

class AptDescription extends React.Component {
    constructor(props) {
        super(props);
        // query based on the apartment id
        this.state = {
            description: props.description
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.description !== this.props.description) {
            this.state.description = nextProps.description
        }
    }

    yesOrNo(state){
        return state ? 'Yes' : 'No'
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
     
        return (
            <div style={{border: "2px solid", borderColor: '#000066', borderRadius: '8px', marginLeft: '5%' , marginTop: "10%"}}>
                <div style={{textAlign:'center',paddingTop:'5%', fontSize:'24px',color:'#000066', fontFamily: "bold"}}>Apartment Details:</div>
                <div style={{display:'flex',paddingLeft: "40px", paddingTop: "15px"}} >
                    <div style={{color:'#000066',paddingRight:'10px',fontSize:'16px', fontFamily: "bold"}}>ID:</div><div style={{fontSize:'16px'}}>{this.state.description.id}</div>
                </div>
                <div style={{display:'flex',paddingLeft: "40px", paddingTop: "15px"}} >
                    <div style={{color:'#000066',paddingRight:'10px',fontSize:'16px' ,fontFamily: "bold"}}>Location:</div><div style={{fontSize:'16px'}}>{this.state.description.location}</div>
                </div>
                <div style={{display:'flex',paddingLeft: "40px", paddingTop: "15px"}} >
                    <div style={{color:'#000066',paddingRight:'10px',fontSize:'16px' ,fontFamily: "bold"}}>Floor:</div><div style={{fontSize:'16px'}}>{this.state.description.floor}</div>
                </div >
                <div style={{display:'flex',paddingLeft: "40px", paddingTop: "15px"}} >
                    <div style={{color:'#000066',paddingRight:'10px',fontSize:'16px' ,fontFamily: "bold"}}>Number of Floors:</div><div style={{fontSize:'16px'}}>{this.state.description.floors}</div>
                </div>
                <div style={{display:'flex',paddingLeft: "40px", paddingTop: "15px"}} >
                    <div style={{color:'#000066',paddingRight:'10px',fontSize:'16px' ,fontFamily: "bold"}}>Number of Rooms:</div><div style={{fontSize:'16px'}}>{this.state.description.rooms}</div>
                </div>
                <div style={{display:'flex',paddingLeft: "40px", paddingTop: "15px"}} >
                    <div style={{color:'#000066',paddingRight:'10px',fontSize:'16px' ,fontFamily: "bold"}}>Condition:</div><div style={{fontSize:'16px'}}>{this.state.description.status}</div>
                </div>
                <div style={{display:'flex',paddingLeft: "40px", paddingTop: "15px"}} >
                    <div style={{color:'#000066',paddingRight:'10px',fontSize:'16px' ,fontFamily: "bold"}}>Pool:</div><div style={{fontSize:'16px'}}>{this.yesOrNo(this.state.description.pool) }</div>
                </div>
                <div style={{display:'flex',paddingLeft: "40px", paddingTop: "15px"}} >
                    <div style={{color:'#000066',paddingRight:'10px',fontSize:'16px', fontFamily: "bold"}}>Yard:</div><div style={{fontSize:'16px'}}>{this.yesOrNo(this.state.description.yard)}</div>
                </div>
                <div style={{display:'flex',paddingLeft: "40px", paddingTop: "15px"}} >
                    <div style={{color:'#000066',paddingRight:'10px',fontSize:'16px',fontFamily: "bold"}}>Porch:</div><div style={{fontSize:'16px'}}>{this.yesOrNo(this.state.description.porch)}</div>
                </div>
                <div style={{display:'flex',paddingLeft: "40px", paddingTop: "15px"}} >
                    <div style={{color:'#000066',paddingRight:'10px',fontSize:'16px', fontFamily: "bold"}}>Private:</div><div style={{fontSize:'16px'}}>{this.yesOrNo(this.state.description.private)}</div>
                </div>
                <br></br>
                
            </div>     
        );
    }
}



export default AptDescription;
