import React, { useState, useEffect } from "react";
import "./CallRecord.css"
import firebase from './../firebase.js';

function CallRecord(props) {

    const [, setName] = useState('')
    const [interested, setInterested] = useState('')

    // Retrive the customer name
    useEffect(() => {
        var db = firebase.firestore();
        db.collection("customers")
        .doc(props.call.customer_id)
        .get()
        .then((doc)=>{
            setName(doc.data().name)
        });

        //Reduce interested detailes for design
        if(props.call.interested.length > 3){
            setInterested(props.call.interested.split(' ').slice(0,2).join(' ').concat('...'))
        }
        else{
            setInterested(props.call.interested.concat('...'))
        }
    },[]);

    return(
        <div class='call' key={props.call.customer_id} style={{borderBottom: '2px solid #0044cc',borderRadius: '4px', width:'70%', 'marginLeft': 'auto', 'marginRight': 'auto', marginBottom:'10px'}}>
            <a style={{textDecoration: 'none', color: 'black'}} class="link-unstyled" href={`/call_details/${props.call.id}`}>  
                <div className='flex-container' style={{'position': 'relative'}}>
                    <h8 className="side-title" style={{color:'gray', 'position': 'absolute', 'right': '0'}}>Interested: {interested}</h8>
                    <h4 className="main-title" style={{textAlign:'left'}}>{props.call.date}</h4>
                </div>
            </a>
        </div>
    )
}

export default CallRecord