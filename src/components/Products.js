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
        // console.log('useEffect')
        db.collection("products")
        .get()
        .then((snapshot) => {
            let allData = []
            let fullDoc = []
            snapshot.forEach(doc => {
                fullDoc = doc.data()
                // console.log('data: ' + doc.data())
                // arr.push(doc.data())
                storage
                .ref(doc.id)
                .listAll()
                .then((list) => {
                    let images = []
                    // let fullDoc = doc.data()
                    fullDoc.images = []
                    list.items.forEach((imageRef) => {
                        imageRef
                        .getDownloadURL()
                        .then((downloadURL) => {
                            // console.log('1: ', downloadURL)

                            fullDoc.images.push(downloadURL)
                            // console.log('2: ', images)
                        })
                        // console.log('3: ', images)
                    })
                    // console.log('4: ', images)
                    // let fullDoc = doc.data()
                    // fullDoc.images = images
                    
                    // a.push(fullDoc)
                    // console.log(fireBaseUrl)
                    // setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
                })
            allData.push(fullDoc)    
            });
            
        // setProducts(snapshot.docs.map(doc => doc.data()));
        setProducts(allData)
        // console.log('END OF useEffect: ' + products) 
        });
    }, []);

    return ( 
        <div>
            <h3> Products </h3>
            <div className='wrapper'>
            {/* {console.log('before product component: ' + products)} */}
                {products.map((product, i) => <Product key={i} product={product} />)}
            </div>
            <Button variant="outlined" color="primary" onClick={() => {history.push({pathname:  `/add_apt`})}}>
                Add Apartment
            </Button>
        </div>
    )
}


export default Products