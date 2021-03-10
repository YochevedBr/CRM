
import React from "react"
import PrintCustomersTable from "./PrintCustomersTable"
import"../App.css"
import { withRouter } from 'react-router-dom';

class CustomersReports extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div>
                <h1 style={{margin:"0 auto"}}>Customers Report</h1>
                {/* Show the customers table with button to print table */}
                <PrintCustomersTable/>
            </div>
        )
    }
}
   
export default withRouter(CustomersReports);

