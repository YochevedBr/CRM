import React from 'react'
import Image from './Image'
import Location from './Location'
import Price from './Price'
import Sold from './Sold'
import './Product.css'

import { useState, useEffect } from "react";
import ReactLoading from 'react-loading'


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
                <div>
                <div className = "square" key={product.id} style={{ border: "solid 4px #e0e0d1", background: "#ffffff", borderRadius: "1%"}}>
                    <br></br>
                    
                    <a style={{textDecoration: 'none', color: 'black'}} href={`/apt_details/${product.id}`}>
                        <Image style={{'width': '30px', 'hight': '30px'}} src={product.images[0]} />
                        <h5 className='font' style={{'textIndent': "10px", 'textAlign': "justify", 'color': '#000066' }}>{product.location}</h5>
                        {/* <Location class='flex-child1' location={product.location}/> */}
                        <div className='flex-container' style={{'position': 'relative'}}>
                            <h6 className='font' style={{'textIndent': "10px", 'textAlign': "justify", 'color': '#000066'}}>{product.price} ILS</h6>
                            <Sold class='flex-child' sold={product.sold}/>
                           
                        </div>
                    </a>
                    </div>

                
                </div>
    
            : <div style={{display: 'flex', justifyContent: 'center'}}>
                    <ReactLoading type='bubbles' color="#000066" />
                </div>
        }
        </>
        
    )
}

export default Product