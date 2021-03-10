import React, { useState, useEffect } from "react";
import firebase from './../firebase.js';
import './Purchase.css'

// Component to specific purchase
function Purchase(props) {
    const [customerName, setCustomerName] = useState([]);
    const [agentName, setAgentName] = useState([]);
    const [price, setPrice] = useState('');
    const [apartmentId, setApartmentId] = useState('');
    const [location, setLocation] = useState('');

    useEffect(() => {
        // Get the previous call record id from localStorage
        var prev_call_id = localStorage.getItem("prev_call_id")
        var index = 0
        var db = firebase.firestore();

        // In case that purchased several products in the same call record
        if(props.purchase.id == prev_call_id){
            index ++ // Show the purchase in the 'index' place
        }
        // In case that purchased one products in the call record
        else{
            index = 0
            localStorage.setItem('prev_call_id', props.purchase.id)
        }

        // Gets the product details
        db.collection("products")
        .doc(props.purchase.purchased[index])
        .get()
        .then((snapshot)=>{
          setApartmentId(snapshot.data().id)
          setPrice(snapshot.data().price)
          setLocation(snapshot.data().location)
        });

        // Gets the customer name
        db.collection("customers")
        .doc(props.purchase.customer_id)
        .get()
        .then((snapshot)=>{
            setCustomerName(snapshot.data().name)

            // Gets the agent name
            db.collection("agents")
            .doc(props.purchase.agent_id)
            .get()
            .then((snapshot)=>{
                setAgentName(snapshot.data().name)
            });
        });  
    },[]);
    
    return(
        // <div class='purchase' key={props.purchase.customer_id} style={{borderBottom: '2px solid #0044cc',borderRadius: '4px', width:'30%', 'marginLeft': 'auto', 'marginRight': 'auto', marginBottom:'10px'}}>
        <div class='purchase' key={props.purchase.customer_id} style={{borderRadius: '8px', border: '2px solid #0044cc', borderStyle: 'inset', marginLeft: '50px', marginRight: '50px'}}>
            <div style={{textDecoration: 'none', color: 'black'}} class="link-unstyled">
                {/* <div style={{color:'gray', textAlign:'left'}}>{props.purchase.purchased}</div> */}
                <div className='Details' ><div className='key' style={{}}>Apartment ID: </div><div className='value'>{apartmentId}</div></div>
                <div className='Details' ><div className='key' style={{}}>Location:  </div><div className='value'>{location}</div></div>
                <div className='Details' ><div className='key' style={{}}>Price: </div><div className='value'>{price}</div></div>
                <div className='Details' ><div className='key' style={{}}>Client: </div><div className='value'>{customerName}</div></div>
                <div className='Details' ><div className='key' style={{}}>Agent: </div><div className='value'>{agentName}</div></div>
            </div>
        </div>
    )
}

export default Purchase