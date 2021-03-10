import React from "react"
import CallRecord from './CallRecord'
import { useState, useEffect } from "react";
import firebase from './../firebase.js';
import ReactLoading from 'react-loading'


function CallRecords() {

    const [calls, setCalls] = useState([]);

    useEffect(() => {
        console.log('useEffect')
        console.log(localStorage.getItem("agent_id"))
        var db = firebase.firestore();
        db.collection("call_records")
        .where("agent_id", "==", localStorage.getItem("agent_id"))
        .get()
        .then((snapshot)=>{
            console.log(snapshot.docs)
            var callsData = [];
            snapshot.forEach((doc) => {
                let x = doc.data()
                x.id = doc.id
                console.log(x)
                callsData.push(x)

            });
            
            callsData = callsData.sort(custom_sort);
            setCalls(callsData)
        });
    },[]);

    function custom_sort(a, b) {
       //  console.log(new Date(b.date).getTime() - new Date(a.date).getTime())
        // return new Date(b.date).getTime() - new Date(a.date).getTime();
        let x = new Date(b.date).getTime()
        let y = new Date(a.date).getTime()
        return new Date(b.date).getTime() > new Date(a.date).getTime() ? 1 : -1
    }

    // data.sort(function (a, b) {
    //     return a.date.localeCompare(b.date);
    // });
    // let copyCalls = calls
    // copyCalls.sort(custom_sort);
    // setCalls(copyCalls)

    return (
        <>
            {
                calls.length != 0 ?
                    <div>
                        <br></br>
                        <h3 className='font'> Call Records </h3> 
                        <h5 className='font'> See your activity with our clients </h5> 
                        <br></br>
                        <br></br>
                        <div> 
                            {calls.map((call, i) => < CallRecord key = { i } call = { call }/>)} 
                        </div> 
                    </div>
                :
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <ReactLoading type='bubbles' color="#000066" />
                    </div>
            }
        </> 
        
            )
    }


export default CallRecords