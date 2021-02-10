import React from "react"
import ReactDOM from 'react-dom';
import apartment from "../pictures/house-real-estate-logo.jpg"



class Image extends React.Component {
    componentDidMount() {}

    render() {
        return (
            <img src={apartment} alt="apartment" width="320" height="320"/>
    )
}
}


export default Image