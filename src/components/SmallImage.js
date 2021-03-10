import React from "react"

import './SmallImage.css'

function SmallImage(props) {

    return ( 
        <img onClick = {(src) => { props.replaceImage(src) }}
                className = 'image'
                style = {{ 'display': 'block', 'borderRadius': "6px", 'boxShadow': "0px 0px 2px 2px #999" }}
                src = { props.src }
                alt = ''
        />
    )
}


export default SmallImage