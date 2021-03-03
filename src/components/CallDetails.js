import React from 'react'
import { useParams } from 'react-router-dom';

import Call from './Call'
import { useState, useEffect } from "react";
import firebase from './../firebase.js';


function CallDetails(){
    const {callID} = useParams()
    const [call, setCall] = useState([]);
    const [agent_name, setAgent_name] = useState("");
    // retrieve from database call by id

    useEffect(() => {
        var db = firebase.firestore();
        db.collection("call_records")
        .doc(callID)
        .get()
        .then((doc)=>{
            setCall(doc.data())
        });
        db.collection("agents")
        .doc(localStorage.getItem("agent_id"))
        .get()
        .then((doc)=>{
            setAgent_name(doc.data().name)
        });

    },[]);

    let agentName = 'H'

    return(
        <div>
            <h2 style={{textAlign:'left', marginLeft: '52px'}}>{call.customer_name}</h2>
            <Call data={call}></Call>
            <h5 style={{textAlign:'left', marginLeft: '52px'}}>Agent: {agent_name}</h5>
        </div>
    )
}

export default CallDetails
