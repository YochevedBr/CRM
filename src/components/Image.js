import React from "react"


function Image(props){
    return (
        <img style={{'display': 'block', 'marginLeft': 'auto', 'marginRight': 'auto', 'borderRadius':"6px", 'boxShadow':"0px 0px 2px 2px #999"}} src={props.src} alt='' width={'320'} height={'320'}/>
    )
}


export default Image