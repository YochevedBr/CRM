import React from "react"
import Product from "./Product"
import Button from '@material-ui/core/Button';
import firebase from './../firebase.js';
import { useState, useEffect } from "react";
// var CanvasJSReact = require('./../canvasjs.react');
import CanvasJSReact from './../canvasjs.react'
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function NumOfPurchases(){
    const [options, setOptions] = useState([]);
    useEffect(() => {
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
                        if (call.data().purchased){
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
                            // labelFormatter: props.addSymbols
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
            {options ?
            <div style={{alignItems: 'center', width: '85%', margin: 'auto'}}>
                <CanvasJSChart options = {options}
                    /* onRef={ref => this.chart = ref} */
                />
            </div> 
            : <h1>Loading...</h1>
            } 
        </>
    )
}


export default NumOfPurchases