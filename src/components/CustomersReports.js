
import React from "react"
import CustomersTable from "./CustomersTable"
import"../App.css"
import {Container, Row, Col} from 'react-bootstrap';



class CustomersReports extends React.Component{
    componentDidMount(){
    }

    render(){
        return(
            <div>
                <Container>
                    <h1 style={{margin:"0 auto"}}>Customers Report</h1>
                    <Row className="spacing">
                        <CustomersTable reports={true}/>
                    </Row>
                </Container>
                
               
            </div>
        )
    }
}
   

export default CustomersReports