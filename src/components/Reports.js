import React from "react"
import Button from '@material-ui/core/Button';
import {Container, Row, Col, Image, ListGroup} from 'react-bootstrap';
import CustomersPic from '../pictures/CustomersReports2.jpg';
import PurchasesPic from '../pictures/Purchases.jpg';
import { withRouter } from 'react-router-dom';
import {storage} from "./../firebase"

import './Reports.css'

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

                {
                    this.state.customers && this.state.purchases && this.state.monthly && this.state.sales ?
                    <ListGroup className='p-4' as="ul">
                        <h3 className='font'> Reports </h3> 
                        <h5 className='font'>Here you can find diverse reports on your contribution to our company</h5> 
                        <ListGroup.Item className='my-3 rounded' action href={`/customers_reports`} style={{backgroundColor: '#072F5F'}}>
                            <img className='oval' src={this.state.customers} style={{marginTop: '0', marginBottom: '2%'}} width='10%' rounded />
                            <h5 className='font responsive' style={{color:'white', left: '0'}}>View our dedicated customers who use our servises to find their dream house</h5>
                        </ListGroup.Item>
                        <ListGroup.Item className='my-3 rounded' action href={`/purchases`} style={{backgroundColor: '#1261A0'}}>
                            <img className='oval' src={this.state.purchases} style={{backgroundColor: 'white', marginTop: '0'}} width='10%' rounded />
                            <br></br>
                            <br></br>
                            <h5 className='font responsive' style={{color:'white'}}>All sales our wonderful agents did</h5>
                        </ListGroup.Item>
                        <ListGroup.Item className='my-3 rounded' action href={`/num_of_purchases`} style={{backgroundColor: '#3895D3'}}>
                            <img className='oval' src={this.state.sales} style={{backgroundColor: 'white', marginTop: '0'}} width='10%' rounded />
                            <br></br>
                            <br></br>
                            <h5 className='font responsive' style={{color:'white'}}>Compare your achievements to other agents</h5>
                        </ListGroup.Item>
                        <ListGroup.Item className='my-3 rounded' action href={`/monthly_sales`} style={{backgroundColor: '#58CCED'}}>
                            <img className='oval' src={this.state.monthly} style={{backgroundColor: 'white', marginTop: '0'}} width='10%' rounded />
                            <br></br>
                            <br></br>
                            <h5 className='font responsive' style={{color:'white'}}>View your achievements in this year</h5>
                        </ListGroup.Item>
                    </ListGroup>            
                    : <h1>Loading...</h1> 
                }
            </>     
        )
    }
}
   

export default withRouter(Reports);