
import React from "react"
import Button from '@material-ui/core/Button';
import {Container, Row, Col, Image} from 'react-bootstrap';
import CustomersPic from '../pictures/CustomersReports2.jpg';
import PurchasesPic from '../pictures/Purchases.jpg';
import { BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import Purchases from './Purchases'
import CustomersReports from './CustomersReports'
import { withRouter } from 'react-router-dom';


class Reports extends React.Component{
    componentDidMount(){
    }

    render(){
        return(
            <div>
                <Container>
                    <h3 className='font'>Reports</h3>
                    <h5 className='font'>Here you can find dayly/monthly/yearly reports</h5>
                    <br></br>
                    <Row>
                        <Col>
                        <Image src={CustomersPic} rounded />
                        <br></br>
                        <Button style={{marginTop: '3%'}} variant="outlined" color="primary" onClick={() => this.props.history.push('/customers_reports')} >Customers Reports</Button>{' '}
                        </Col>
                        <Col>
                        <Image src={PurchasesPic} rounded />
                        <br></br>
                        <Button style={{marginTop: '3%'}} variant="outlined" color="primary" onClick={() => this.props.history.push('/purchases')} >Purchases</Button>
                        </Col>
                        <Col>
                        <Image src={PurchasesPic} rounded />
                        <br></br>
                        <Button style={{marginTop: '3%'}} variant="outlined" color="primary" onClick={() => this.props.history.push('/num_of_purchases')} >Number Of Purchases</Button>
                        </Col>
                        <Col>
                        <Image src={PurchasesPic} rounded />
                        <br></br>
                        <Button style={{marginTop: '3%'}} variant="outlined" color="primary" onClick={() => this.props.history.push('/monthly_sales')} >Monthly Sales</Button>
                        </Col>
                    </Row>
                </Container>
           
            </div>
            


        )
    }
}
   

export default withRouter(Reports);