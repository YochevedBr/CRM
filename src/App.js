
import { BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import Customers from './components/Customers'
import Reports from './components/Reports'
import Purchases from './components/Purchases'
import CustomersReports from './components/CustomersReports'
import CustomersDetails from './components/CustomersDetails'
import React, { Component } from "react";
import Login from './components/Login'
import Routes from './components/Routes'


function App() 
{
  return (
    <div className="App">

      {/* <Router>
        <div> */}
          {/* <Navigation /> */}
          {/* <button>
            <Link to="/">Home</Link>
          </button>
          <button> 
            <Link to="/customers">Customers</Link>
          </button>
          <button id="btnCustomers"> 
              <Link to="/customers_reports">CustomersReports</Link>
          </button>
          <button id="btnPurchases"> 
              <Link to="/purchases">Purchases</Link>
          </button>
          <button id="btnReports"> 
              <Link to="/reports">Reports</Link>
          </button>
         
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/customers" component={Customers} />
            <Route path="/update_customer" component={UpdateCustomer} />
            <Route path="/reports" component={Reports} />
            <Route path="/purchases" component={Purchases} />
            <Route path="/customers_reports" component={CustomersReports} />
            <Route path="/customers_reports" component={CustomersReports} />
            <Route path="/purchases" component={Purchases} />
            <Route path="/customers_details" component={CustomersDetails} />
            <Route component={Error} />
          </Switch>

        </div>
      </Router>} */}
      {/* <Login></Login> */}
      <Routes/>
      
    </div>
  );
}


const Home = () => (
  <div>
    <h1>Home Page</h1>
  </div>
)

export default App;
