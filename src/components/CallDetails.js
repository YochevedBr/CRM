import React from 'react'
import { useParams } from 'react-router-dom';

import Call from './Call'
import { useState, useEffect } from "react";
import firebase from './../firebase.js';


function CallDetails(){
    const {callID} = useParams()
    const [call, setCall] = useState([]);
    const [agent_name, setAgent_name] = useState("");
    const [customerName, setCustomerName] = useState('')
    // retrieve from database call by id

    useEffect(() => {
        var db = firebase.firestore();
        db.collection("call_records")
        .doc(callID)
        .get()
        .then((doc)=>{
            setCall(doc.data())
        }).then(
            db.collection("customers")
            .doc(call.customer_id)
            .get()
            .then((doc)=>{
                setCustomerName(doc.data().name)
            })
        )
        db.collection("agents")
        .doc(localStorage.getItem("agent_id"))
        .get()
        .then((doc)=>{
            setAgent_name(doc.data().name)
        });
    },[]);

    return(
        <div>
            <h2 style={{textAlign:'left', marginLeft: '52px'}}>{customerName}</h2>
            <Call data={call}></Call>
            <h5 style={{textAlign:'left', marginLeft: '52px'}}>Agent: {agent_name}</h5>
        </div>
    )
}

export default CallDetails
