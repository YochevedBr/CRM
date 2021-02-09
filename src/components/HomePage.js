import React from "react"
import Navbar from "./Navbar"

class HomaPage extends React.Component{
    componentDidMount(){
    }

    render(){
        return(
            <div>
                {/* <Navbar /> */}
                <h1>HELLO</h1>
                <br></br>
                <div>
                    <button id="btnAdd">Add</button>
                    <button id="btnDelete">Delete</button>
                </div>
            </div>
        )
    }
}
   

export default HomaPage