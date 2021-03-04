import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./CallRecord.css"

function CallRecord(props) {

    return(
        <div class='call' key={props.call.customer_id} style={{borderBottom: '2px solid #0044cc',borderRadius: '4px', width:'30%', 'marginLeft': 'auto', 'marginRight': 'auto', marginBottom:'10px'}}>
            <a style={{textDecoration: 'none', color: 'black'}} class="link-unstyled" href={`/call_details/${props.call.id}`}>
                <h5 style={{color:'gray', textAlign:'left'}}>{props.call.date}</h5>
                <h3 style={{textAlign:'left'}}>{props.call.customer_name}</h3>
            </a>
        </div>
    )
   

}

export default CallRecord