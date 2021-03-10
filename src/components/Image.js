import React from "react"


function Image(props) {
    return ( <
        img style = {
            { 'display': 'block', 'marginLeft': 'auto', 'marginRight': 'auto', 'borderRadius': "3px" }
        }
        src = { props.src }
        alt = ''
        width = { '300' }
        height = { '240' }
        />
    )
}


export default Image