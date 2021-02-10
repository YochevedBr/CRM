import React from "react"
import ReactDOM from 'react-dom';
import Image from "./Image"
import Price from "./Price"
import Location from "./Location"


class Products extends React.Component {
    componentDidMount() {}

    render() {
        return ( 
            <div>
                <h3> Products </h3> 
                {/* <div>
                    <button id="btnAddApartment" onClick={() => this.props.history.push('/customers_reports')} >+</button>
                </div> */}
            </div>
        )
    }
}


export default Products