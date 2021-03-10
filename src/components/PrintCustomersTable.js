import React, { useRef } from "react";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import Button from '@material-ui/core/Button';
import CustomersTable from './CustomersTable'

class ComponentToPrint extends React.Component {
    render() {
        return(
            <div><CustomersTable reports={true}/></div>
        )
    }
}

// Print the customers table
class Print extends React.Component {     
    render() {
        return (
            <div>    
                <ReactToPrint
                    trigger={() => <Button id="btnPrint" variant="outlined" color="primary" style={{marginBottom: "4px", marginLeft: "40px", justifyContent: 'flex-end', float: "right", display: "flex"}}>PRINT Table</Button>}
                    content={() => this.componentRef}
                />   
                <ComponentToPrint ref={el => (this.componentRef = el)} />       
            </div>
        );
    }
}

export default Print;