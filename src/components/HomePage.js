import React from "react"
import './HomePage.css';
import img from '../pictures/logo.jpg'

class HomaPage extends React.Component{
    componentDidMount(){
    }

    render(){
        return(
                <>
                <img src={img} alt="Trulli" width="auto" height="auto"/>‏
                </>
        )
    }
}
   

export default HomaPage