
import React from "react"
import CustomersTable from "./CustomersTable"
import AddCustomer from "./AddCustomer"


class Customers extends React.Component{
    componentDidMount(){
    }

    render(){
        return(
            <div>
                <h3>Customers</h3>
                <br></br>
                <CustomersTable />
                <AddCustomer />
                <br></br>
                {/* <div>
                    <button id="btnAdd" onClick={() => this.props.history.push('/customers_reports')} >+</button>
                </div> */}
            </div>
        )
    }
}
   

export default Customers