import React from "react"
import Product from "./Product"
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router";
import firebase from './../firebase.js';
import {storage} from "./../firebase"
import { useState, useEffect } from "react";

import './Products.css'


function Products(){
    const history = useHistory();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // retrieving the apartments from firestore
        var db = firebase.firestore();
        let allData = []
        db.collection("products")
        .get()
        .then((snapshot) => {
            // for each apartment, retrieve all the related images from firebase storage
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
                            // savind all images for each apartment
                            fullDoc.images.push(downloadURL)
                            // if all apartment images were saved, add the apartment details to allData
                            if (fullDoc.images.length === list.items.length){
                                allData.push(fullDoc) 
                            }
                            // if allData contains details on all the apartments, set the apartments state
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
            <br></br>
            <h3 className='font'> All Our Properties </h3>
            <br></br>
            <Button variant="outlined" color="primary" onClick={() => {history.push({pathname:  `/add_apt`})}}>
                Add Apartment
            </Button>
            <br></br>
            <br></br>
            <div className='wrapper' style={{marginLeft: '10%', marginRight: '10%'}}>
                {products.map((product, i) => <Product key={i} product={product} />)}
            </div>
            <br></br>
          
        </div>
    )
}


export default Products