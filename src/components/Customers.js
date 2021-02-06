
import React from "react"
import CustomersTable from "./CustomersTable"

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
                    <button id="btnAdd">Add</button>
                    <button id="btnDelete">Delete</button>
                </div>
            </div>
        )
    }
}
   

export default Customers