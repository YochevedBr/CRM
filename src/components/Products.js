import React from "react"
import Product from "./Product"
import UpdateOrAddApt from './UpdateOrAddApt'
import Button from '@material-ui/core/Button';

import './Products.css'

import { useHistory } from "react-router";

import img from '../pictures/house-real-estate-logo.jpg'
import img1 from '../pictures/Purchases.jpg'

import firebase from './../firebase.js';
import {storage} from "./../firebase"
import { useState, useEffect } from "react";


function Products(){
    const history = useHistory();
    const [products, setProducts] = useState([]);
    let a = []
    useEffect(() => {
        var db = firebase.firestore();
        let allData = []
        db.collection("products")
        .get()
        .then((snapshot) => {
            snapshot.forEach(doc => {
                storage
                .ref(doc.id)
                .listAll()
                .then((list) => {
                    let fullDoc = doc.data()
                    fullDoc.images = []
                    list.items.forEach((imageRef) => {
                        imageRef
                        .getDownloadURL()
                        .then((downloadURL) => {
                            fullDoc.images.push(downloadURL)
                            if (fullDoc.images.length === list.items.length){
                                allData.push(fullDoc) 
                            }
                            if (allData.length === snapshot.size){
                                setProducts(allData)
                            }    
                        })
                    })
                })           
            }); 
        })
    }, []);

    return ( 
        <div style = {{background: "#f5f5f0"}}>
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