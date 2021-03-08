import ReactDOM from 'react-dom';
import { BrowserRouter as Router,
    Switch,
    Route,
    useParams,
    Redirect, } from "react-router-dom";
import Customers from './Customers'
import Reports from './Reports'
import Purchases from './Purchases'
import Products from './Products'
import CustomersReports from './CustomersReports'
import CustomersDetails from './CustomersDetails'
import HomePage from './HomePage'
import CallRecords from './CallRecords'
import UpdateCustomer from './UpdateCustomer'
import PrintCustomer from './PrintCustomer'
import BootstrapNavbar from './BootstrapNavbar'
import AptDetails from './AptDetails'
import UpdateOrAddApt from './UpdateOrAddApt'
import CallDetails from './CallDetails'
import Login from './Login'
import SignUp from './SignUp'
import NumOfPurchases from './NumOfPurchases'
import MonthlySales from './MonthlySales'
import PrintPurchases from './PrintPurchases'

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
            
                <Route path="/logout">
                    <Login/>

                </Route>
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
                <Route path="/print_customer">
                    <BootstrapNavbar/>
                    <PrintCustomer/>
                </Route>
                <Route exact path="/apt_details">
                    <BootstrapNavbar/>
                    <AptDetails/>
                </Route>
                <Route path="/apt_details/:aptID">
                    <BootstrapNavbar/>
                    <AptDetails/>
                </Route>
                <Route path="/update_apt/:aptID">
                    <BootstrapNavbar/>
                    <UpdateOrAddApt/>
                </Route>
                <Route path="/add_apt">
                    <BootstrapNavbar/>
                    <UpdateOrAddApt/>
                </Route>
                <Route path="/print_purchases">
                    <BootstrapNavbar/>
                    <PrintPurchases/>
                </Route>
                <Route path="/call_details/:callID">
                    <BootstrapNavbar/>
                    <CallDetails/>
                </Route>
                <Route path="/num_of_purchases">
                    <BootstrapNavbar/>
                    <NumOfPurchases/>
                </Route>
                <Route path="/monthly_sales">
                    <BootstrapNavbar/>
                    <MonthlySales/>
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