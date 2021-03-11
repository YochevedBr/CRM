import React from 'react'
import { useParams } from 'react-router-dom';
import Call from './Call'
import { useState, useEffect } from "react";
import firebase from './../firebase.js';
import ReactLoading from 'react-loading'


function CallDetails(){
    // the call id
    const {callID} = useParams()
    const [call, setCall] = useState([]);
    const [agent_name, setAgent_name] = useState("");
    const [customerName, setCustomerName] = useState('')
    let tmp_call = []
    
    useEffect(() => {
        // retrieving the call details from firebase
        var db = firebase.firestore();
        db.collection("call_records")
        .doc(callID)
        .get()
        .then((doc)=>{
            tmp_call = doc.data()
            setCall(doc.data())
        }).then(() => {
            if (tmp_call !== 0){
                // retrieving the client name that participated in the call
                db.collection("customers")
                .doc(tmp_call.customer_id)
                .get()
                .then((doc)=>{
                    if (doc.exists){
                        setCustomerName(doc.data().name)
                    }
                })
            }  
        })
        // retrieving the agent name that participated in the call
        db.collection("agents")
        .doc(localStorage.getItem("agent_id"))
        .get()
        .then((doc)=>{
            setAgent_name(doc.data().name)
        });
    },[]);

    return(
        <>
            {
                call.length != 0 && agent_name && customerName ?
                    <div>
                        <h2 className='responsive' style={{textAlign:'left', marginLeft: '52px'}}>{customerName}</h2>
                        <Call data={call}></Call>
                        <h5 className='responsive' style={{textAlign:'left', marginLeft: '52px'}}>Agent: {agent_name}</h5>
                    </div>
                :
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <ReactLoading type='bubbles' color="#000066" />
                    </div>
            }
        </>    
    )
}

export default CallDetails
