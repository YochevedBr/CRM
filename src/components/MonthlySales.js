import React from "react"
import Product from "./Product"
import Button from '@material-ui/core/Button';
import firebase from './../firebase.js';
import { useState, useEffect } from "react";
// var CanvasJSReact = require('./../canvasjs.react');
import CanvasJSReact from './../canvasjs.react'
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function MonthlySales(){
    const [options, setOptions] = useState([]);

    useEffect(() => {
        var db = firebase.firestore();
        let dataPoints = []
        let dates = {
            "0": 0, 
            "1": 0, 
            "2": 0, 
            "3": 0, 
            "4": 0, 
            "5": 0, 
            "6": 0, 
            "7": 0, 
            "8": 0, 
            "9": 0, 
            "10": 0, 
            "11": 0, 
        }
        db.collection("call_records")
        .where("agent_id", "==", localStorage.getItem('agent_id')) 
        .get()
        .then((calls) => {
            let counter = 0
            let today = new Date()
            calls.forEach(call => {
                if (call.data().purchased){  
                    let date = new Date(call.data().date)
                    if (date.getUTCFullYear() == today.getUTCFullYear()){
                        date = date.getUTCMonth()
                        dates[date] += call.data().purchased.length
                    }                    
                }
                counter += 1
                if (counter === calls.size){
                    for (const [key, value] of Object.entries(dates)) {
                        let point = {
                            x: new Date(today.getFullYear(), key),
                            y: value,
                        }
                        dataPoints.push(point)
                    }
                    
                }
            })
        }).then(() => {
            setOptions({
                // dataPointWidth: 35,
                animationEnabled: true,
                // theme: "light2",
                title:{
                    text: "Sales Per Month"
                },
                axisX: {
                    title: "timeline",
                    valueFormatString: "MMM",
                    // gridThickness: 2
                    interval: 1,
                    intervalType: "month"
                },
                axisY: {
                    title: "Number of Sales",
                    // includeZero: true,
                    // labelFormatter: props.addSymbols
                },
                data: [{
                    type: "area",
                    lineThickness: 3,
                    dataPoints: dataPoints
                }]
            })
        })        
    }, []);

    return (
        <>
            {options ?
            <div style={{alignItems: 'center', width: '85%', margin: 'auto'}}>
                <h3 className='font'>Monthly Sales</h3>
                <h5 className='font'>Here you can your sales per month</h5>
                <h5 className='font'>always strive to do better!</h5>
                <h5 className='font'>we count on you:)</h5>
                <br></br>
                <CanvasJSChart options = {options}/>
            </div> 
            : <h1>Loading...</h1>
            } 
        </>
    )
}


export default MonthlySales