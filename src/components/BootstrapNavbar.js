import React from 'react'
import {
    BrowserRouter as Router,
  } from "react-router-dom";
import { Navbar,Nav } from 'react-bootstrap'
import './BootstrapNavbar.css'

class BootstrapNavbar extends React.Component{

    render(){
        return(
            <Router>                    
                <Navbar variant='light' callName="navbar" expand="lg" sticky="top" style={{background: '#ffffff', borderTop:"3px solid #00004d"}}>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav.Link className = "nav1" href="/home_page" style={{color: '#000066'}}>Home</Nav.Link>
                        <Nav.Link className = "nav2" href="/products" style={{color: '#000066'}}>Properties</Nav.Link>
                        <Nav.Link className = "nav3" href="/Customers" style={{color: '#000066'}}>Clients</Nav.Link>
                        <Nav.Link className = "nav4" href="/call_records" style={{color: '#000066'}}>Call Records</Nav.Link>
                        <Nav.Link className = "nav5" href="/reports" style={{color: '#000066'}}>Reports</Nav.Link>
                        <Nav.Link className="pl-2 ml-auto" href="/logout" style={{color: '#000066'}}>Logout</Nav.Link>
                    </Navbar.Collapse>
                </Navbar>
            </Router>   
        )  
    }
}

export default BootstrapNavbar;