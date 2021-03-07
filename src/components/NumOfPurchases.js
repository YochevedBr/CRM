import React from "react"
import Product from "./Product"
import Button from '@material-ui/core/Button';
import firebase from './../firebase.js';
import { useState, useEffect } from "react";
// var CanvasJSReact = require('./../canvasjs.react');
import CanvasJSReact from './../canvasjs.react'
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function NumOfPurchases(props){
    const [options, setOptions] = useState([]);
    useEffect(() => {
        var db = firebase.firestore();
        console.log('1')
        db.collection("agents")
        .get()
        .then((snapshot) => {
            console.log('2')
            let dataPoints = []
            snapshot.forEach(doc => {
                console.log('3')
                db.collection("call_records")
                .where("agent_id", "==", doc.id) 
                .get()
                .then((calls) => {
                    console.log('4')
                    let purchases = 0
                    let counter = 0
                    calls.forEach(call => {
                        console.log('5')
                        if (call.data().purchased){
                            console.log('6')
                            purchases += call.data().purchased.length
                        }
                        counter += 1
                        // console.log('1:' + counter)
                        // console.log('2:' + calls.size)
                        if (counter === calls.size){
                            console.log('7')
                            console.log(doc.id + ': ' + purchases)
                            let point = {
                                y: purchases,
                                label: localStorage.getItem('agent_id') === doc.id ? 'You are here' : 'Others'
                            }
                            dataPoints.push(point)
                        }
                        console.log('3:' + dataPoints.length)
                        console.log('4:' + snapshot.size)
                        // if (dataPoints.length === snapshot.size){
                            
                        // }
                    })
                }).then(() => {
                    console.log('8')
                    setOptions({
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
            <div>
                {console.log(options)}
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