
import React from "react"
import CustomersTable from "./CustomersTable"
import"../App.css"
import {Container, Row, Col} from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import {withRouter} from 'react-router-dom';

class CustomersReports extends React.Component{
    constructor(props) {
        super(props);
      }

    render(){

        return(
            <div>
                <h1 style={{margin:"0 auto"}}>Customers Report</h1>
                    <div style={{marginBottom: "4px", justifyContent: 'flex-end', float: "right", display: "flex"}}>
                        <Button variant="outlined" color="primary" onClick={() => this.props.history.push('/print_customer')}>Print</Button>
                    </div>
                <CustomersTable reports={true}/>
            </div>
        )
    }
}
   

// export default CustomersReports
export default withRouter(CustomersReports);

