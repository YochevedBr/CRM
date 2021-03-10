import React from 'react'
import { useParams } from 'react-router-dom';

import Call from './Call'
import { useState, useEffect } from "react";
import firebase from './../firebase.js';


function CallDetails(){
    console.log('CallDetails')
    const {callID} = useParams()
    const [call, setCall] = useState([]);
    const [agent_name, setAgent_name] = useState("");
    const [customerName, setCustomerName] = useState('')
    let tmp_call = []
    // retrieve from database call by id

    useEffect(() => {
        var db = firebase.firestore();
        db.collection("call_records")
        .doc(callID)
        .get()
        .then((doc)=>{
            // console.log('1')
            // console.log(doc.data())
            tmp_call = doc.data()
            setCall(doc.data())
            // console.log(call)
            // console.log('2')
        }).then(() => {
            // console.log(call)
            // console.log('3')
            // console.log(call)
            // console.log(call.customer_id)
            if (tmp_call !== 0){
                // console.log(call)
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
        db.collection("agents")
        .doc(localStorage.getItem("agent_id"))
        .get()
        .then((doc)=>{
            setAgent_name(doc.data().name)
        });
    },[]);

    return(
        <div>
            <h2 className='responsive' style={{textAlign:'left', marginLeft: '52px'}}>{customerName}</h2>
            <Call data={call}></Call>
            <h5 className='responsive' style={{textAlign:'left', marginLeft: '52px'}}>Agent: {agent_name}</h5>
        </div>
    )
}

export default CallDetails
