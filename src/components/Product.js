import React from 'react'
import Image from './Image'
import Location from './Location'
import Price from './Price'
import Sold from './Sold'

import './Product.css'


function Product(props){
    return(
        <div key={props.product.id} style={{'borderStyle': 'solid'}}>
            <a class="link-unstyled" href={`/apt_details/${props.product.id}`}>
                <Image src={props.product.image} width={'320'} height={'320'}/>
                <Location location={props.product.location}/>
                <div className='flex-container' style={{'position': 'relative'}}>
                    <Price class='flex-child' price={props.product.price}/>
                    <Sold class='flex-child' sold={props.product.sold}/>
                </div>
            </a>
        </div>
    )
}

export default Product