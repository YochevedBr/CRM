
import { BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import Customers from './components/Customers'
import Reports from './components/Reports'
import Purchases from './components/Purchases'
import CustomersReports from './components/CustomersReports'
import CustomersDetails from './components/CustomersDetails'
import React, { Component } from "react";
import Login from './components/Login'
import Routes from './components/Routes'

import './components/GeneralStyle.css'

function App() 
{
  return (
    <div className="App" style={{minHeight: '100%'}}>
      <Routes/>
    </div>
  );
}


// const Home = () => (
//   <div>
//     <h1>Home Page</h1>
//   </div>
// )

export default App;
