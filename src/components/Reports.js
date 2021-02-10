
import React from "react"
import Button from '@material-ui/core/Button';



class Reports extends React.Component{
    componentDidMount(){
    }

    render(){
        return(
            <div>
                <h3>Reports</h3>
                <br></br>
                <Button variant="outlined" color="primary" onClick={() => this.props.history.push('/customers_reports')} >Customers Reports</Button>{' '}
                <Button variant="outlined" color="primary" onClick={() => this.props.history.push('/purchases')} >Purchases</Button>
            </div>
        )
    }
}
   

export default Reports