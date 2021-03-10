import React from "react"
import firebase from './../firebase.js';
import { useState, useEffect } from "react";
import ReactLoading from 'react-loading'
import CanvasJSReact from './../canvasjs.react'
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function NumOfPurchases(){
    const [options, setOptions] = useState([]);
    
    useEffect(() => {
        // retrieving from firebase all the sales made by all agents 
        // and map them by each agent
        var db = firebase.firestore();
        db.collection("agents")
        .get()
        .then((snapshot) => {
            let dataPoints = []
            snapshot.forEach(doc => {
                db.collection("call_records")
                .where("agent_id", "==", doc.id) 
                .get()
                .then((calls) => {
                    let purchases = 0
                    let counter = 0
                    calls.forEach(call => {
                        // if there was purchase
                        if (call.data().purchased){
                            // add to counter
                            purchases += call.data().purchased.length
                        }
                        counter += 1
                        if (counter === calls.size){
                            let point = {
                                y: purchases,
                                label: localStorage.getItem('agent_id') === doc.id ? 'You are here' : 'Agent'
                            }
                            dataPoints.push(point)
                        }
                    })
                }).then(() => {
                    // bar chart
                    setOptions({
                        dataPointWidth: 35,
                        animationEnabled: true,
                        theme: "light2",
                        title:{
                            text: "Total Number of Sales"
                        },
                        axisX: {
                            title: "Agents",
                            reversed: true,
                        },
                        axisY: {
                            title: "Number of Sales",
                            includeZero: true,
                            interval: 1,
                        },
                        data: [{
                            type: "bar",
                            dataPoints: dataPoints
                        }]
                    })
                })        
            }); 
        })
    }, []);

    return (
        <>
            {
                options ?
                    <div style={{alignItems: 'center', width: '85%', margin: 'auto'}}>
                        <h3 className='font'>Sales Amount</h3>
                        <h5 className='font'>Here you can compare yourself to the rest of our agents</h5>
                        <br></br>
                        <CanvasJSChart options = {options}/>
                    </div> 
                : 
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <ReactLoading type='bubbles' color="#000066" />
                    </div>
            } 
        </>
    )
}


export default NumOfPurchases