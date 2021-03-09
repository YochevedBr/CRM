
import React from "react"
import CustomersTable from "./CustomersTable"
import AddCustomer from "./AddCustomer"
import {Container, Row, Col} from 'react-bootstrap';



class Customers extends React.Component{
    componentDidMount(){
    }

    render(){
        return(
            <div>
                <h1 style={{margin:"0 auto"}}>Customers</h1>
                    <div style={{marginBottom: "4px", justifyContent: 'flex-end', float: "right", display: "flex"}}>
                        <AddCustomer />
                    </div>
                <CustomersTable reports={false}/>
            </div>
        )
    }
}
   

export default Customers