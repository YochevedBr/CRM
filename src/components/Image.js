import React from "react"

function Image(props){
    return (
        <img style={{'display': 'block', 'marginLeft': 'auto', 'marginRight': 'auto'}} src={props.src} alt='' width="320" height="320"/>
    )

}


export default Image