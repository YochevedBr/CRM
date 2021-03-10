import React from "react";
import ReactToPrint from "react-to-print";
import Button from '@material-ui/core/Button';
import $ from 'jquery'
import firebase from './../firebase.js';
import './PrintCustomer.css'

class ComponentToPrint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // Takes the current customer id from the path
            currentId: window.location.pathname.substring(16),
            fullName: '',
            phoneNumber: '',
            email: '',
        };
        this.updateState = this.updateState.bind(this)
        this.updateCallRecords = this.updateCallRecords.bind(this)
    }
    
    // Update the states
    updateState(){
        // Retrive current customer data
        var docRef = firebase.firestore().collection("customers").doc(this.state.currentId)
        docRef.get().then((doc) => {
            if (doc.exists) {
                this.setState({
                    fullName : doc.data().name,
                    email : doc.data().email,
                    phoneNumber : doc.data().phoneNumber
                    }
                )
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    // Update the list of call records of current customer
    updateCallRecords(){
        var db = firebase.firestore()
        let call_record = []
        let call_records_list = []
        let count = 0
        // Retrives all call records of current customer
        db.collection("call_records").where("customer_id", "==", this.state.currentId)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // Keeps the values of call record
                    call_record[0] = doc.data().date
                    call_record[1] = doc.data().interested
                    call_record[2] = doc.data().purchased
                    call_record[3] = doc.data().return
                    call_records_list[count] = call_record
                    // Append call records list to 'callRecordsList' div by jquery
                    $( ".callRecordsList" ).append("<p class = 'callRecord' id='"+count+"' style={{border:'2px solid #0044cc',borderRadius: '8px', marginLeft:'50px', marginRight:'50px', borderStyle: 'inset'}}></p>")
                    $( "#" + count +"" ).append( "<div class='Details'><div class='key'>Date: </div><div class='value' style={{fontSize:'22px'}}>"+call_records_list[count][0]+"</div></div>" )
                    $( "#" + count +"" ).append( "<div class='Details'><div class='key'>Interested: </div><div class='value' style={{fontSize:'22px'}}>"+call_records_list[count][1]+"</div></div>" );
                    $( "#" + count +"" ).append( "<div class='Details'><div class='key'>Purchased: </div><div class='value' style={{fontSize:'22px'}}>"+call_records_list[count][2]+"</div></div>" );
                    $( "#" + count +"" ).append( "<div class='Details'><div class='key'>Return: </div><div class='value' style={{fontSize:'22px'}}>"+call_records_list[count][3]+"</div></div>" );
                    // To list of call records
                    count = count + 1
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }

    componentDidMount(){
        // Retrieve the contents of a single document 
        this.updateState(); 
        this.updateCallRecords()    
    }
    
    render() {       
        return (        
            <div>
                <div style={{textAlign:'left',paddingLeft:'40px',paddingTop:'50px', fontSize:'30px',color:'black'}}>Customer Details:</div>
                <div style={{display:'flex',padding:'20px 20px 10px 50px '}} >
                    <div style={{color:'#0044cc',paddingRight:'10px',fontSize:'22px'}}>Full Name:</div><div style={{fontSize:'22px'}}>{this.state.fullName}</div>
                </div>
                <div style={{display:'flex' ,padding:'10px 20px 10px 50px '}}>
                    <div style={{color:'#0044cc',paddingRight:'10px',fontSize:'22px'}}>Phone Number:</div><div style={{fontSize:'22px'}}>{this.state.phoneNumber}</div>
                </div >
                <div style={{display:'flex',padding:'10px 20px 10px 50px '}}>
                    <div style={{color:'#0044cc',paddingRight:'10px',fontSize:'22px'}}>Email:</div><div style={{fontSize:'22px'}}>{this.state.email}</div>
                </div>
                <div style={{display:'flex',padding:'10px 20px 10px 50px '}}>
                    <div style={{color:'#0044cc',paddingRight:'10px',fontSize:'22px'}}>Call Record:</div><div style={{fontSize:'22px'}}></div>
                </div>
                <div class = 'callRecordsList'></div>
            </div>     
        );
    }
}

// To print the reports, print the component: 'ComponentToPrint'
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
