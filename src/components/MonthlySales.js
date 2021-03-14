import React from "react"
import firebase from './../firebase.js';
import { useState, useEffect } from "react";
import ReactLoading from 'react-loading'
import CanvasJSReact from './../canvasjs.react'
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function MonthlySales(){
    const [options, setOptions] = useState([]);

    useEffect(() => {
        var db = firebase.firestore();
        let dataPoints = []
        // initializing the amount of sales in each month
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
        // retrieve from firebase all the sales of the current year the agent did and map them by month
        db.collection("call_records")
        .where("agent_id", "==", localStorage.getItem('agent_id')) 
        .get()
        .then((calls) => {
            let counter = 0
            let today = new Date()
            calls.forEach(call => {
                // if some sale occured
                if (call.data().purchased){
                    // get the transaction date 
                    let date = new Date(call.data().date)
                    // if the sale occured this year
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
            // line chart 
            setOptions({
                animationEnabled: true,
                title:{
                    text: "Sales Per Month"
                },
                axisX: {
                    title: "timeline",
                    valueFormatString: "MMM",
                    interval: 1,
                    intervalType: "month"
                },
                axisY: {
                    title: "Number of Sales",
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
            {
                options ?
                    <div style={{alignItems: 'center', width: '85%', margin: 'auto'}}>
                        <h3 className='font'>Monthly Sales</h3>
                        <h5 className='font'>Here you can view your sales per month</h5>
                        <h5 className='font'>Always strive to do better!</h5>
                        <h5 className='font'>We count on you:)</h5>
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

export default MonthlySales