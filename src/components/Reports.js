import React from "react"
import Button from '@material-ui/core/Button';
import {Container, Row, Col, Image} from 'react-bootstrap';
import CustomersPic from '../pictures/CustomersReports2.jpg';
import PurchasesPic from '../pictures/Purchases.jpg';
import { withRouter } from 'react-router-dom';
import {storage} from "./../firebase"

class Reports extends React.Component{
    constructor(){
        super()
        this.state = {
            customers: '',
            monthly: '',
            purchases: '',
            sales: ''
        }
    }

    componentDidMount(){
        storage
		.ref('/image to design/reports/customers_table.png')
		.getDownloadURL()
		.then((DownloadURL) => {
            console.log('hello')
            this.setState({customers: DownloadURL})
        }).then(() => {
            storage
            .ref('/image to design/reports/monthly.png')
            .getDownloadURL()
            .then((DownloadURL) => {
                this.setState({monthly: DownloadURL})
            }).then(() => {
                storage
                .ref('/image to design/reports/purchases.png')
                .getDownloadURL()
                .then((DownloadURL) => {
                    this.setState({purchases: DownloadURL})
                }).then(() => {
                    storage
                    .ref('/image to design/reports/sales.jpg')
                    .getDownloadURL()
                    .then((DownloadURL) => {
                        this.setState({sales: DownloadURL})
                    })  
                })
            })
        })        
    }

    render(){
        return(
                <>
                {console.log('1: ' + this.state.customers)}
                {console.log('2: ' + this.state.purchases)}
                {console.log('3: ' + this.state.monthly)}
                {console.log('4: ' + this.state.sales)}
                    {
                        this.state.customers && this.state.purchases && this.state.monthly && this.state.sales ?
                        
                        <Container>
                <br></br>
                <h3 className='font'>Reports</h3>
                <h5 className='font'>Here you can find dayly/monthly/yearly reports</h5>
                <br></br>
                <Row md={2} className='justify-content center'>
                    <Col style={{backgroundColor: '#000077'}}>
                        <a style={{textDecoration: 'none', color: 'black'}} href={`/customers_reports`}>
                            <img className='oval' src={this.state.customers} width='30%' rounded />
                            <br></br>
                            <h5 className='font' style={{color:'white'}}>View our dedicated customers who use our servises to fing their dream house</h5>
                        </a>
                    </Col>
                    <Col style={{backgroundColor: '#000099'}}>
                        <a style={{textDecoration: 'none', color: 'black'}} href={`/purchases`}>
                            <img className='oval' src={this.state.purchases} style={{backgroundColor: 'white'}} width='30%' rounded />
                            <br></br>
                            <h5 className='font' style={{color:'white'}}>All sales our wonderful agents did</h5>
                        </a>
                    </Col>
                    <Col style={{backgroundColor: '#000099'}}>
                        <a style={{textDecoration: 'none', color: 'black'}} href={`/num_of_purchases`}>
                            <img className='oval' src={this.state.sales} width='30%' rounded />
                            <br></br>
                            <h5 className='font' style={{color:'white'}}>Compare your achivments to other agents</h5>
                        </a>
                    </Col>
                    <Col style={{backgroundColor: '#0000cc'}}>
                        <a style={{textDecoration: 'none', color: 'black'}} href={`/monthly_sales`}>
                            <img className='oval' src={this.state.monthly} style={{backgroundColor: 'white'}} width='30%' rounded />
                            <br></br>
                            <h5 className='font' style={{color:'white'}}>View your achivments in this year</h5>
                        </a>
                    </Col>
                </Row>
            </Container>
            
            : <h1>Loading...</h1> 
                    }
                </>     
        )
    }
}
   

export default withRouter(Reports);