import React from "react"
import Product from "./Product"
import UpdateOrAddApt from './UpdateOrAddApt'
import Button from '@material-ui/core/Button';

import './Products.css'

import { useHistory } from "react-router";

import img from '../pictures/house-real-estate-logo.jpg'
import img1 from '../pictures/Purchases.jpg'


function Products(){
    const history = useHistory()
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
            <Button variant="outlined" color="primary" onClick={() => {history.push({pathname:  `/add_apt`})}}>
                Add Apartment
            </Button>
            {/* <div class='justify-content-center align-items-center' style={{marginBottom: "4px", justifyContent: 'flex-end', display: "flex"}}>
                <UpdateOrAddApt />
            </div>      */}
        </div>
    )
}


export default Products