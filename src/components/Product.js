import React from 'react'
import Image from './Image'
import Location from './Location'
import Price from './Price'
import Sold from './Sold'

import './Product.css'

import { useState, useEffect } from "react";


function Product(props){
    const [product, setProduct] = useState({price:'', location:'',floor:'',floors:'',rooms:'',status:'',pool:'',yard:'', private_house:'', sold:'', images:[]})

    useEffect(() => {
        console.log('in useEffect')
        setProduct(props.product)
    }, [props]);
    // console.log('product component: ')
    // console.log(props.product)
    // console.log(props.product.images)
    // console.log('done')
    return(
        <>
        {console.log(product)}
        {console.log(product.location)}
        {console.log(product.images)}
        {
            product.images ?
            <div key={product.id} style={{'borderStyle': 'solid', background: "#ffffff"}}>
            <a style={{textDecoration: 'none', color: 'black'}} href={`/apt_details/${product.id}`}>
                <Image src={product.images[0]} width={'320'} height={'320'}/>
                <Location location={product.location}/>
                <div className='flex-container' style={{'position': 'relative'}}>
                    <Price class='flex-child' price={product.price}/>
                    <Sold class='flex-child' sold={product.sold}/>
                </div>
            </a>
            </div>
            : <h1>Loading...</h1>
        }
        </>
        
    )
}

export default Product