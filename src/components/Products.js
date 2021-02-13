import React from "react"
import Product from "./Product"

import './Products.css'

import img from '../pictures/house-real-estate-logo.jpg'


function Products(){
    // demo 
    const data = React.useMemo(() =>
    [{  
        image: img,
        sold: 'sold',
        location: 'Jaffa, Jrusalem',
        price: '1,500,000',
        id: '0',
    },
    {  
        image: img,
        sold: '',
        location: 'Agripas, Jrusalem',
        price: '2,000,000',
        id: '1',
    },
    {  
        image: img,
        sold: '',
        location: 'Anilevich, Bnei Brak',
        price: '1,800,000',
        id: '2',
    },
    {  
        image: img,
        sold: 'sold',
        location: 'Hatorim, Jerusalem',
        price: '2,500,000',
        id: '3',
    },])
    

    
    return ( 
        <div>
            <h3> Products </h3>
            <div className='wrapper'>
                {data.map((product, i) => <Product key={i} product={product} />)}
            </div>     
        </div>
    )
}


export default Products