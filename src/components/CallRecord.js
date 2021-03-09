import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./CallRecord.css"
import firebase from './../firebase.js';


function CallRecord(props) {
    console.log(props)
    const [name, setName] = useState('')
    useEffect(() => {
        var db = firebase.firestore();
        db.collection("customers")
        .doc(props.call.customer_id)
        .get()
        .then((doc)=>{
            setName(doc.data().name)
        });
    },[]);


    return(
        <div class='call' key={props.call.customer_id} style={{borderBottom: '2px solid #0044cc',borderRadius: '4px', width:'30%', 'marginLeft': 'auto', 'marginRight': 'auto', marginBottom:'10px'}}>
           {console.log(props.call)}
            <a style={{textDecoration: 'none', color: 'black'}} class="link-unstyled" href={`/call_details/${props.call.id}`}>  
                <div className='flex-container' style={{'position': 'relative'}}>
                    <h6 style={{color:'gray', 'position': 'absolute', 'right': '0'}}>{props.call.date}</h6>
                    <h3 style={{textAlign:'left'}}>{name}</h3>
                </div>
            </a>
        </div>
    )
   

}

export default CallRecord