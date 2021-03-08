import React from "react";
import ReactToPrint from "react-to-print";
import Button from '@material-ui/core/Button';
import $ from 'jquery'
import firebase from './../firebase.js';
import Purchase from './Purchase'

// import './PrintCustomer.css'

class ComponentToPrint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: window.location.pathname.substring(17),
            purchases: [],
        };
        // this.updateCallRecords = this.updateCallRecords.bind(this)
    }

    componentDidMount(){
        console.log(this.state.selectedDate)
        var db = firebase.firestore();
        db.collection("call_records")
        .where("date", "==", this.state.selectedDate)
        .where("purchased", "!=", [])
        .get()
        .then((snapshot)=>{
            var purchasesData = [];
            snapshot.forEach((doc) => {
                let x = doc.data()
                x.id = doc.id
                purchasesData.push(x)
                console.log("VVVVVVVVV"+x)


            });
            
            this.setState({
                purchases: purchasesData
            });
            // this.state.purchases = purchasesData

        });
    }
    
    render() {       
        return (   
            <div>
            <br></br>
            <h3> {this.state.selectedDate} </h3> 
            <div> {
                    this.state.purchases.map((purchase, i) => < Purchase key = { i }
                    purchase = { purchase }
                    />,
                )} 
            </div> 
            </div>         
        );
    }
}


class Print extends React.Component {     
    render() {
        return (
            <div>    
                <ReactToPrint
                    // trigger={() => <a href="#">PRINT</a>}
                    trigger={() => <Button id="btnPrint" variant="outlined" color="primary">PRINT</Button>}
                    content={() => this.componentRef}
                />   
                <ComponentToPrint ref={el => (this.componentRef = el)} />       
            </div>
        );
    }
}

export default Print;




























// import React from "react"
// import firebase from './../firebase.js';


// class Purchases extends React.Component{
//     constructor(props) {
//         super(props);
//         this.state = {
//             callRecords: ""
//         };
//         // this.updateState = this.updateState.bind(this);
//     }


//     componentDidMount(){
//         var db = firebase.firestore();
//         // Get all call records with purchase
//         db.collection("call_records")
//         // .where("agent_id", "==", localStorage.getItem("agent_id"))
//         .where("purchased", "!=", [])
//         .get()
//         .then((snapshot) => {
//             var callRecordsData = []
//             snapshot.forEach((doc) => {
//                 callRecordsData.push(doc.data())
//                 // console.log(doc.id, " => ", doc.data());
//             });
//             // this.setState({callRecords: Object.values(callRecordsData)})
//             console.log("^^^^^^^^^^", callRecordsData)

//         })
//         .catch((error) => {
//             console.log("Error getting documents: ", error);
//         });
//     }


//     render(){
//         return(
//             <div>
//                 <h3>Purchases</h3>
//                 {/* <div>{this.state.callRecords}</div> */}
//                 {/* <div>{
//                 Object.keys(this.state.callRecords).map((item, i) => (
//                     <li key={i}>
//                         <span >{ this.state.callRecords[i] }</span>
//                     </li>
//                 ))}
//             </div>  */}
//             </div>
//         )
//     }
// }
   

// export default Purchases