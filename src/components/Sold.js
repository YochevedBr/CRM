import React from "react"

function Sold(props){
    return (
        <h4 style={{display: props.sold ? 'block' : 'none', 'backgroundColor': 'gray', 'position': 'absolute', 'right': '0'}} >SOLD</h4>
    )

}

export default Sold