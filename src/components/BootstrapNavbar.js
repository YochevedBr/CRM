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
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <Router>
                            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                                {/* <Navbar.Brand href="#home">React Bootstrap Navbar</Navbar.Brand> */}
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                {/* <Nav className="auto">‏ */}
                                    <Nav.Link href="/home_page">Home</Nav.Link>
                                    <Nav.Link href="/products">Products</Nav.Link>
                                    <Nav.Link href="/Customers">Customers</Nav.Link>
                                    <Nav.Link href="/call_records">Call Records</Nav.Link>
                                    <Nav.Link href="/reports">Reports</Nav.Link>

                                    <Nav.Link className="pl-2 ml-auto" href="/logout">Logout</Nav.Link>
                                {/* </Nav> */}
                                    
                                    {/* <Nav className="border-left pl-2 ml-auto">
                                        <Nav.Link href="/logout">Logout</Nav.Link>
                                    </Nav> */}

                                </Navbar.Collapse>
                            </Navbar>
                            <br />
                            
                        </Router>
                    </div>
                </div>
            </div>
        )  
    }
}

export default BootstrapNavbar;