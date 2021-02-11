import React from "react"

function Sold(props){
    return (
        // <div style={{position: absolute, left: 0}}>
            <h4 style={{display: props.sold ? 'block' : 'none', 'backgroundColor': 'gray', 'position': 'absolute', 'right': '0'}} >SOLD</h4>
        // </div>
    )

}

export default Sold