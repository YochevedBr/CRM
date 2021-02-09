// import React from "react"
import NavBar, { ElementsWrapper } from 'react-scrolling-nav'
import { Link } from 'react-router-dom';
// import Customers from './Customers'

// class Navbar extends React.Component{

//     render() {
//         const navbarItems = [{
//             label: "Item 1",
//             target: <Redirect to="./Customers" />
//         }, {
//             label: "Item 2",
//             target: "item-2"
//         }, {
//             label: "Item 3",
//             target: "item-3"
//         }, {
//             label: "Item 4",
//             target: "item-4"
//         }, ]
//         return (
//             <div>
//                 <NavBar items={navbarItems} offset={-80} duration={500} delay={0}>
//                 </NavBar>
//                 <div className="container">
//                     <ElementsWrapper items={navbarItems}>
//                         <div name="item-1" className="item">item 1</div>
//                         <div name="item-2" className="item">item 2</div>
//                         <div name="item-3" className="item">item 3</div>
//                         <div name="item-4" className="item">item 4</div>
                        
//                     </ElementsWrapper>
//                 </div>
//             </div>
//         );
//     }
    
// }

// export default Navbar

// const Navbar = () => {
//     return (
//       <div>
//         <h5>NAVBAR</h5>
//         <ul>
//           <li><Link to="/Customers">costumers</Link></li>
//           {/* <li><Link to="/About">About</Link></li> */}
//            </ul>
//         <hr />
//       </div>
//     );
//   };
  
//   export default Navbar;

import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
  } from "react-router-dom";
  import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap'
//   import Home from './Home';
//   import AboutUs from './AboutUs';
//   import ContactUs from './ContactUs';
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
                                    <Nav.Link href="/">Home</Nav.Link>
                                    <Nav.Link href="/Customers">Contact Us</Nav.Link>
                                    <Nav.Link href="/Customers">About Us</Nav.Link>
                                    {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                    </NavDropdown> */}
                                    </Nav>
                                    <Form inline>
                                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                                    <Button variant="outline-success">Search</Button>
                                    </Form>
                                </Navbar.Collapse>
                            </Navbar>
                            <br />
                            <Switch>
                                <Route exact path="/">
                                    <HomePage />
                                </Route>
                                <Route exact path="/Customers">
                                    <Customers />
                                </Route>
                                <Route exact path="/Customers">
                                    <Customers />
                                </Route>
                            </Switch>
                        </Router>
                    </div>
                </div>
            </div>
        )  
    }
}

export default BootstrapNavbar;