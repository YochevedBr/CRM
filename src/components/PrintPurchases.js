import React from "react";
import ReactToPrint from "react-to-print";
import Button from '@material-ui/core/Button';
import firebase from './../firebase.js';
import Purchase from './Purchase'

// The component to print
class ComponentToPrint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: window.location.pathname.substring(17),
            purchases: [],
        };
    }

    componentDidMount(){
        // Keeps the previous call record id, in case purchase few apartments in the same call record
        localStorage.setItem('prev_call_id', '')
        var db = firebase.firestore();

        // Retrieves list of call records in the selected date, and there was a purchase in them
        db.collection("call_records")
        .where("date", "==", this.state.selectedDate)
        .where("purchased", "!=", [])
        .get()
        .then((snapshot)=>{
            // Keeps list of call records data with purchases
            var purchasesData = [];
            snapshot.forEach((doc) => {
                let x = doc.data()
                x.id = doc.id
                // In case of purchased few apartments in the same call record
                for(var i=0; i<x.purchased.length; i++){
                    purchasesData.push(x)
                }
            });
            
            this.setState({
                purchases: purchasesData
            });
        });
    }

    render() {       
        return (   
            <div>
                <br></br>
                <div style={{textAlign:'left',paddingLeft:'50px',paddingTop:'50px', fontSize:'30px',color:'#0044cc',fontSize:'24px'}}>Purchases on: {this.state.selectedDate} </div>
                <div style={{fontSize:'22px'}}></div>
                <div> 
                    {
                        // Pass data to child component
                        this.state.purchases.map((purchase, i) => 
                        < Purchase key = { i } purchase = { purchase }/>,
                    )} 
                </div> 
            </div>         
        );
    }
}

// Print the purchases report
class Print extends React.Component {     
    render() {
        return (
            <div>    
                <ReactToPrint
                    trigger={() => <Button id="btnPrint" variant="outlined" color="primary">PRINT</Button>}
                    content={() => this.componentRef}
                />   
                <ComponentToPrint ref={el => (this.componentRef = el)} />       
            </div>
        );
    }
}

export default Print;
