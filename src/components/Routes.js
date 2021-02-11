import ReactDOM from 'react-dom';
import { BrowserRouter as Router,
    Switch,
    Route,
    useParams,
    Redirect,
    Link } from "react-router-dom";
import Customers from './Customers'
import Reports from './Reports'
import Purchases from './Purchases'
import Products from './Products'
import CustomersReports from './CustomersReports'
import CustomersDetails from './CustomersDetails'
import HomePage from './HomePage'
import CallRecords from './CallRecords'
import UpdateCustomer from './UpdateCustomer'
import BootstrapNavbar from './BootstrapNavbar'
import Login from './Login'
import SignUp from './SignUp'

function routing(){
    return(
        <Router>

            {/* <Route path="/" component={MainLayout}>
            <IndexRoute component={Home} />
            <Route component={SearchLayout}>
                <Route path="users" component={UserList} />
                <Route path="widgets" component={WidgetList} />
            </Route> 
            </Route> */}
            <Switch>
                <Route path="/" component={Login} exact />
                
                <Route path="/customers">
                    <BootstrapNavbar/>
                    <Customers/>
                </Route>
                <Route path="/reports">
                    <BootstrapNavbar/>
                    <Reports/>
                </Route>
                <Route path="/purchases">
                    <BootstrapNavbar/>
                    <Purchases/>
                </Route>
                <Route path="/products">
                    <BootstrapNavbar/>
                    <Products/>
                </Route>
                <Route path="/customers_reports">
                    <BootstrapNavbar/>
                    <CustomersReports/>
                </Route>
                <Route path="/customers_details">
                    <BootstrapNavbar/>
                    <CustomersDetails/>
                </Route>
                <Route path="/home_page">
                    <BootstrapNavbar/>
                    <HomePage/>
                </Route>
                <Route path="/call_records">
                    <BootstrapNavbar/>
                    <CallRecords/>
                </Route>
                <Route path="/bootstrap_navbar">
                    <BootstrapNavbar/>
                    <HomePage/>
                </Route>
                <Route path="/update_customer">
                    <BootstrapNavbar/>
                    <UpdateCustomer/>
                </Route>
                <Route path="/login" component={Login} />
                <Route path="/sign_up" component={SignUp} />
                
                <Route component={Error} />
            </Switch>
        </Router>
    );
}
// ReactDOM.render(routing, document.getElementsByClassName('App'));

export default routing;