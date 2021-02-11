
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
                <Container>
                    <h1 style={{margin:"0 auto"}}>Customers</h1>
                    <Row className="spacing">
                        <div style={{marginBottom: "4px", justifyContent: 'flex-end', float: "right", display: "flex"}}>
                            <AddCustomer />
                        </div>
                        <CustomersTable reports={false}/>
                    </Row>
                </Container>
                
                {/* <div>
                    <button id="btnAdd" onClick={() => this.props.history.push('/customers_reports')} >+</button>
                </div> */}
            </div>
        )
    }
}
   

export default Customers