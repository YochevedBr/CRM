import React from "react"
import Product from "./Product"
import UpdateOrAddApt from './UpdateOrAddApt'
import Button from '@material-ui/core/Button';

import './Products.css'

import { useHistory } from "react-router";

import img from '../pictures/house-real-estate-logo.jpg'
import img1 from '../pictures/Purchases.jpg'

import firebase from './../firebase.js';
import { useState, useEffect } from "react";


function Products(){
    const history = useHistory();
    var db = firebase.firestore();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        db.collection("products")
        .get()
        .then((snapshot) => {
        setProducts(snapshot.docs.map(doc => doc.data()));
      });
    }, []);

    return ( 
        <div>
            <h3> Products </h3>
            <div className='wrapper'>
                {products.map((product, i) => <Product key={i} product={product} />)}
            </div>
            <Button variant="outlined" color="primary" onClick={() => {history.push({pathname:  `/add_apt`})}}>
                Add Apartment
            </Button>
        </div>
    )
}


export default Products