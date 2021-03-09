import React from 'react'
import Image from './Image'
import Location from './Location'
import Price from './Price'
import Sold from './Sold'
import './Product.css'

import { useState, useEffect } from "react";


function Product(props){
    const [product, setProduct] = useState({id:'', price:'', location:'',floor:'',floors:'',rooms:'',status:'',pool:'',yard:'', private_house:'', sold:'', images:[]})

    useEffect(() => {
        // setting the apartment details in case of update
        setProduct(props.product)
    }, [props]);
    
    return(
        <>
        {   
            product.images ?

            // -webkit-box-shadow: 0 8px 6px -6px #999;
            // -moz-box-shadow: 0 8px 6px -6px #999;
          
                <div className = "square" key={product.id} style={{ boxShadow: "1px 1px 2px 2px #999", background: "#ffffff"}}>
                    <a style={{textDecoration: 'none', color: 'black'}} href={`/apt_details/${product.id}`}>
                        <Image src={product.images[0]} width={'50'} height={'50'}/>
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