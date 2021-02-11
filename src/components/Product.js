import React from 'react'
import Image from './Image'
import Location from './Location'
import Price from './Price'
import Sold from './Sold'

import './Product.css'


function Product(props){
    console.log(props.product.id)
    return(
        <div key={props.product.id} style={{'borderStyle': 'solid'}}>
            <Image src={props.product.image}/>
            <Location location={props.product.location}/>
            <div className='flex-container' style={{'position': 'relative'}}>
                <Price class='flex-child' price={props.product.price}/>
                <Sold class='flex-child' sold={props.product.sold}/>
            </div>
        </div>
    )
}

export default Product