import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
  } from "react-router-dom";
import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap'
import Customers from './Customers'
import HomePage from './HomePage'

class BootstrapNavbar extends React.Component{

    render(){
        return(
            
                <Router>
                    <Navbar variant="dark" expand="lg" sticky="top" style={{background: '#ffffff', borderTop:"3px solid #00004d"}}>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav.Link href="/home_page" style={{color: '#000066'}}>Home</Nav.Link>
                            <Nav.Link href="/products" style={{color: '#000066'}}>Products</Nav.Link>
                            <Nav.Link href="/Customers" style={{color: '#000066'}}>Customers</Nav.Link>
                            <Nav.Link href="/call_records" style={{color: '#000066'}}>Call Records</Nav.Link>
                            <Nav.Link href="/reports" style={{color: '#000066'}}>Reports</Nav.Link>

                            <Nav.Link className="pl-2 ml-auto" href="/logout" style={{color: '#000066'}}>Logout</Nav.Link>
                      

                        </Navbar.Collapse>
                    </Navbar>
                    
    
                </Router>
           
        )  
    }
}

export default BootstrapNavbar;