import { BrowserRouter as Router,
    Switch,
    Route,} from "react-router-dom";
import Customers from './Customers'
import Reports from './Reports'
import Purchases from './Purchases'
import Products from './Products'
import CustomersReports from './CustomersReports'
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
import Footer from './Footer'

function routing(){
    return(
        <Router>
            <Switch>
                <Route path="/" component={Login} exact />
            
                <Route path="/logout">
                    <Login/>
                </Route>

                <Route path="/customers">
                    <BootstrapNavbar/>
                    <Customers/>
                    <Footer/>
                </Route>

                <Route path="/reports">
                    <BootstrapNavbar/>
                    <Reports/>
                    <Footer/>
                </Route>

                <Route path="/purchases">
                    <BootstrapNavbar/>
                    <Purchases/>
                    <Footer/>
                </Route>

                <Route path="/products">
                    <BootstrapNavbar/>
                    <Products/>
                    <Footer/>
                </Route>

                <Route path="/customers_reports">
                    <BootstrapNavbar/>
                    <CustomersReports/>
                    <Footer/>
                </Route>

                <Route path="/home_page">
                    <BootstrapNavbar/>
                    <HomePage/>
                </Route>

                <Route path="/call_records">
                    <BootstrapNavbar/>
                    <CallRecords/>
                    <Footer/>
                </Route>

                <Route path="/bootstrap_navbar">
                    <BootstrapNavbar/>
                    <HomePage/>
                    <Footer/>
                </Route>

                <Route path="/update_customer">
                    <BootstrapNavbar/>
                    <UpdateCustomer/>
                    <Footer/>
                </Route>

                <Route path="/print_customer">
                    <BootstrapNavbar/>
                    <PrintCustomer/>
                    <Footer/>
                </Route>

                <Route exact path="/apt_details">
                    <BootstrapNavbar/>
                    <AptDetails/>
                    <Footer/>
                </Route>

                <Route path="/apt_details/:aptID">
                    <BootstrapNavbar/>
                    <AptDetails/>
                    <Footer/>
                </Route>

                <Route path="/update_apt/:aptID">
                    <BootstrapNavbar/>
                    <UpdateOrAddApt/>
                    <Footer/>
                </Route>

                <Route path="/add_apt">
                    <BootstrapNavbar/>
                    <UpdateOrAddApt/>
                    <Footer/>
                </Route>

                <Route path="/print_purchases">
                    <BootstrapNavbar/>
                    <PrintPurchases/>
                    <Footer/>
                </Route>

                <Route path="/call_details/:callID">
                    <BootstrapNavbar/>
                    <CallDetails/>
                    <Footer/>
                </Route>

                <Route path="/num_of_purchases">
                    <BootstrapNavbar/>
                    <NumOfPurchases/>
                    <Footer/>
                </Route>

                <Route path="/monthly_sales">
                    <BootstrapNavbar/>
                    <MonthlySales/>
                    <Footer/>
                </Route>
                
                <Route path="/login" component={Login} />

                <Route path="/sign_up" component={SignUp} />
                
                <Route component={Error} />
            </Switch>
        </Router>
    );
}

export default routing;