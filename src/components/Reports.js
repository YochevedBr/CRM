
import React from "react"
import { BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import Purchases from './Purchases'
import CustomersReports from './CustomersReports'


class Reports extends React.Component{
    componentDidMount(){
    }

    render(){
        return(
            <div>
                <h3>Reports</h3>
                <br></br>
                <Router>
                    <div>
                    <button id="btnCustomers"> 
                        <Link to="/customers_reports">CustomersReports</Link>
                    </button>
                    <button id="btnPurchases"> 
                        <Link to="/purchases">Purchases</Link>
                    </button>
                        <Switch>
                            <Route exact path="/customers_reports" component={CustomersReports} />
                            <Route exact path="/purchases" component={Purchases} />
                            <Route exact component={Error} />
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}
   

export default Reports