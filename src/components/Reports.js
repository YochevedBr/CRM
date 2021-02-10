
import React from "react"
import { BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import Purchases from './Purchases'
import CustomersReports from './CustomersReports'
import { withRouter } from 'react-router-dom';

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
                    
                    <button id="btnCustomers" onClick={() => {this.props.history.push('/customers_reports')}}>
                        CustomersReports
                    </button>
                    
                    <button id="btnPurchases" onClick={() => {this.props.history.push('/purchases')}}> 
                        Purchases
                    </button>
                        {/* <Switch>
                            <Route exact path="/customers_reports" component={CustomersReports} />
                            <Route exact path="/purchases" component={Purchases} />
                            <Route exact component={Error} />
                        </Switch> */}
                    </div>
                </Router>
            </div>
        )
    }
}
   

export default withRouter(Reports);