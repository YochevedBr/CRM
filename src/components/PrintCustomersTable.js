import React from "react";
import ReactToPrint from "react-to-print";
import Button from '@material-ui/core/Button';
import CustomersTable from './CustomersTable'

// The component to print
class ComponentToPrint extends React.Component {
    render() {
        return(
            // 'true' to in case of 'print' button
            <div style={{margin:"4px"}}><CustomersTable reports={true}/></div>
        )
    }
}

// Print the customers table
class Print extends React.Component {     
    render() {
        return (
            <div>    
                <ReactToPrint  
                    trigger={() => <Button id="btnPrint" variant="outlined" color="primary" style={{marginBottom: "4px", marginLeft: "4px", justifyContent: 'flex-end', float: "left", display: "flex"}}>PRINT Table</Button>}
                    content={() => this.componentRef}
                />   
                <ComponentToPrint ref={el => (this.componentRef = el)} />       
            </div>
        );
    }
}

export default Print;