import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import firebase from './../firebase.js';



function Purchase(props) {

    const [price, setPrice] = useState([]);
    const [apartmentId, setApartmentId] = useState([]);
    const [location, setLocation] = useState([]);
    const [customerName, setCustomerName] = useState([]);
    const [agentName, setAgentName] = useState([]);


    useEffect(async () => {
        
        console.log("purchases: "+props.purchase.purchased)
        var db = firebase.firestore();
        var idArr = []
        var priceArr = []
        var locationArr = []
        for(var i=0; i<props.purchase.purchased.length; i++){
                    
            db.collection("products")
            .doc(props.purchase.purchased[i])
            .get()
            .then((snapshot)=>{
              idArr[i] = snapshot.data().id
              priceArr[i] = snapshot.data().price
              locationArr[i] = snapshot.data().location
              setApartmentId(idArr)
              setPrice(priceArr)
              setLocation(locationArr)
              console.log("JJJJJJJJ"+idArr[i], priceArr[i], locationArr[i])


              
              db.collection("customers")
                .doc(props.purchase.customer_id)
                .get()
                .then((snapshot)=>{
                    setCustomerName(snapshot.data().name)
                    console.log("*****"+customerName)
                    db.collection("agents")
                    .doc(props.purchase.agent_id)
                    .get()
                    .then((snapshot)=>{
                        setAgentName(snapshot.data().name)
                        console.log("))))))))"+agentName)
                    });
                });
            });


        }

        setApartmentId(idArr)
        setPrice(priceArr)
        setLocation(locationArr)
        console.log("::::::::"+apartmentId, price, location)


        // db.collection("customers")
        // .doc(props.purchase.customer_id)
        // .get()
        // .then((snapshot)=>{
        //     setCustomerName(snapshot.data().name)
        //     console.log(customerName)
        // });

        // db.collection("agents")
        // .doc(props.purchase.agent_id)
        // .get()
        // .then((snapshot)=>{
        //     setAgentName(snapshot.data().name)
        //     console.log(agentName)
        // });
       
    },[]);
    

    
    return(
        
        <div class='purchase' key={props.purchase.customer_id} style={{borderBottom: '2px solid #0044cc',borderRadius: '4px', width:'30%', 'marginLeft': 'auto', 'marginRight': 'auto', marginBottom:'10px'}}>
            <div style={{textDecoration: 'none', color: 'black'}} class="link-unstyled">
                {/* <div style={{color:'gray', textAlign:'left'}}>{props.purchase.purchased}</div> */}
                <div style={{textAlign:'left'}}>Apartment ID: {apartmentId}</div>
                <div style={{textAlign:'left'}}>Location:  {location}</div>
                <div style={{textAlign:'left'}}>Price: {price}</div>
                <div style={{textAlign:'left'}}>Customer: {customerName}</div>
                <div style={{textAlign:'left'}}>Agent: {agentName}</div>
            </div>
        </div>
    )
   

}

export default Purchase