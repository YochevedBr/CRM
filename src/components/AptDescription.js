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
        console.log('desc1: ' + props.description)
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
        console.log('description: ' + this.props.description)
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
            <div style={{'border': 'dotted', borderRadius: '8px', marginLeft: '5%'}}>
                <div style={{textAlign:'left',paddingLeft:'40px',paddingTop:'4%', fontSize:'30px',color:'black'}}>Apartment Details:</div>
                <div style={{display:'flex',padding:'20px 20px 10px 50px '}} >
                    <div style={{color:'#0044cc',paddingRight:'10px',fontSize:'22px'}}>ID:</div><div style={{fontSize:'22px'}}>{this.state.description.id}</div>
                </div>
                <div style={{display:'flex',padding:'20px 20px 10px 50px '}} >
                    <div style={{color:'#0044cc',paddingRight:'10px',fontSize:'22px'}}>Location:</div><div style={{fontSize:'22px'}}>{this.state.description.location}</div>
                </div>
                <div style={{display:'flex' ,padding:'10px 20px 10px 50px '}}>
                    <div style={{color:'#0044cc',paddingRight:'10px',fontSize:'22px'}}>Floor:</div><div style={{fontSize:'22px'}}>{this.state.description.floor}</div>
                </div >
                <div style={{display:'flex',padding:'10px 20px 10px 50px '}}>
                    <div style={{color:'#0044cc',paddingRight:'10px',fontSize:'22px'}}>Number of Floors:</div><div style={{fontSize:'22px'}}>{this.state.description.floors}</div>
                </div>
                <div style={{display:'flex',padding:'10px 20px 10px 50px '}}>
                    <div style={{color:'#0044cc',paddingRight:'10px',fontSize:'22px'}}>Number of Rooms:</div><div style={{fontSize:'22px'}}>{this.state.description.rooms}</div>
                </div>
                <div style={{display:'flex',padding:'10px 20px 10px 50px '}}>
                    <div style={{color:'#0044cc',paddingRight:'10px',fontSize:'22px'}}>Condition:</div><div style={{fontSize:'22px'}}>{this.state.description.status}</div>
                </div>
                <div style={{display:'flex',padding:'10px 20px 10px 50px '}}>
                    <div style={{color:'#0044cc',paddingRight:'10px',fontSize:'22px'}}>Pool:</div><div style={{fontSize:'22px'}}>{this.yesOrNo(this.state.description.pool) }</div>
                </div>
                <div style={{display:'flex',padding:'10px 20px 10px 50px '}}>
                    <div style={{color:'#0044cc',paddingRight:'10px',fontSize:'22px'}}>Yard:</div><div style={{fontSize:'22px'}}>{this.yesOrNo(this.state.description.yard)}</div>
                </div>
                <div style={{display:'flex',padding:'10px 20px 10px 50px '}}>
                    <div style={{color:'#0044cc',paddingRight:'10px',fontSize:'22px'}}>Porch:</div><div style={{fontSize:'22px'}}>{this.yesOrNo(this.state.description.porch)}</div>
                </div>
                <div style={{display:'flex',padding:'10px 20px 10px 50px '}}>
                    <div style={{color:'#0044cc',paddingRight:'10px',fontSize:'22px'}}>Private:</div><div style={{fontSize:'22px'}}>{this.yesOrNo(this.state.description.private)}</div>
                </div>
                
            </div>     
        );
    }
}


// class Example extends React.Component {     
//     render() {
//         const handleClick = () => {
//             alert("click")
//             console.log("kkkkkkkkkkkkkkk")
//         };

//         const buttonStyle= {
//             color: "primary",
//             padding: "10px",
//             paddingTop: "10px",
//             fontFamily: "Calibri",
//             textAlign: "left",
//             whiteSpace: "nowrap",
//             marginTop: "30px"
//             // display: "none"
//         }

//         return (
//             <div>
//                 <AptDescription ref={el => (this.componentRef = el)} />
//                 <ReactToPrint
//                     // trigger={() => <a href="#">PRINT</a>}
//                     trigger={() => <Button color="primary" onClick={handleClick}>PRINT</Button>} //style={buttonStyle}
//                     content={() => this.componentRef}
//                 />          
//             </div>
//         );
//     }
// }

export default AptDescription;
