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
                                    <Nav className="mr-auto">
                                    <Nav.Link href="/home_page">Home</Nav.Link>
                                    <Nav.Link href="/products">Products</Nav.Link>
                                    <Nav.Link href="/Customers">Customers</Nav.Link>
                                    <Nav.Link href="/call_records">Call Records</Nav.Link>
                                    <Nav.Link href="/reports">Reports</Nav.Link>
                                    {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                    </NavDropdown> */}
                                    </Nav>
                                    {/* <Form inline>
                                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                                    <Button variant="outline-success">Search</Button>
                                    </Form> */}
                                </Navbar.Collapse>
                            </Navbar>
                            <br />
                            {/* <Switch>
                                <Route exact path="/">
                                    <HomePage />
                                </Route>
                                <Route exact path="/Customers">
                                    <Customers />
                                </Route>
                                <Route exact path="/Customers">
                                    <Customers />
                                </Route>
                                <Route exact path="/Customers">
                                    <Customers />
                                </Route>
                                <Route exact path="/Customers">
                                    <Customers />
                                </Route>
                            </Switch> */}
                        </Router>
                    </div>
                </div>
            </div>
        )  
    }
}

export default BootstrapNavbar;