
import React from "react"
import CustomersTable from "./CustomersTable"
// import { useHistory } from 'react-router-dom';


class Customers extends React.Component{
    componentDidMount(){
    }

    render(){
        return(
            <div>
                <h3>Customers</h3>
                <CustomersTable />
                <br></br>
                <div>
                    <button id="btnAdd" onClick={() => this.props.history.push('/customers_reports')} >+</button>
                </div>
            </div>
        )
    }
}


// const handlerAdd=() => {
//     console.log("Add Customer")
// }
   

export default Customers