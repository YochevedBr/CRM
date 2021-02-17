import React from "react"

import './SmallImage.css'

function SmallImage(props){
    return (
        <img onClick={(src) => {props.replaceImage(src)}} class='image' style={{'display': 'block'}} src={props.src} alt='' width="192" height="100"/>
    )
}


export default SmallImage