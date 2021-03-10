import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button} from 'react-bootstrap';
import { useHistory } from "react-router";
import firebase from './../firebase';
import {storage} from "./../firebase"
import './UpdateOrAddApt.css'
import { useParams } from 'react-router-dom';





function UpdateOrAddApt(){
    const[price, setPrice] = useState("");
    const [location, setLocation] = useState("");
    const [floor, setFloor] = useState("");
    const [floors, setFloors] = useState("");
    const [rooms, setRooms] = useState("");
    const [status, setStatus] = useState("")
    const [pool, setPool] = useState("")
    const [yard, setYard] = useState("")
    const [porch, setPorch] = useState("")
    const [private_house, setPrivate] = useState("")
    const [sold, setSold] = useState("")
    const [correctDetails, setCorrectDetails] = useState(true)
    const allInputs = {imgUrl: ''}
    const [imageAsFile, setImageAsFile] = useState([])
    
    const history = useHistory();
    var db = firebase.firestore();
    // get the id of the apartment to edit
    let {aptID} = useParams()
    // if there is no id, the purpose is to add new apartment
    if (!aptID){
        aptID = 0
    }
    
    useEffect(() => {  
        // if the purpose is to edit existing apartment 
        if (aptID !== 0){
            // display all the existing data in the inputs form
            db.collection('products')
            .doc(aptID)
            .get()
            .then((doc) => {
                if (doc.exists){
                    setPrice(doc.data().price)
                    setLocation(doc.data().location)
                    setFloor(doc.data().floor)
                    setFloors(doc.data().floors)
                    setRooms(doc.data().rooms)
                    setStatus(doc.data().status)
                    setPool(doc.data().pool)
                    setYard(doc.data().yard)
                    setPorch(doc.data().porch)
                    setPrivate(doc.data().private)
                    setSold(doc.data().sold)
                    setImageAsFile([0])
                }
                else{
                    console.log("document doesn't exist")
                }
            });
        }
    }, []);

    // marking field as checked if it was checked
    function isChecked(info){
        return info === 'Yes'
    }

    // checking that all details entered
    function validateForm() {
        return price.length > 0 && location.length > 0 && floor.length > 0 && floors.length > 0 && rooms.length > 0 && status.length > 0 && imageAsFile.length > 0; 
    }

    // saving all images to imageAsFile object
    const handleImageAsFile = (e) => {
        const images = e.target.files
        setImageAsFile(imageAsFile => (images))
    }

    // generating id to new apartment
    let generateID = new Promise(function(myResolve, myReject){
        let size = 0;
        // if adding new apartment
        if (aptID === 0){
            db.collection('products').get().then(snap => {
                size = snap.size // return the collection size
                aptID = aptID + size + 1;
            });
        }
    })

    // save the new data in firebase 
    function saveToFirebase(){
            aptID = aptID.toString()
            db.collection('products').doc(aptID).set({
                id: aptID,
                sold: sold,
                price: price,
                location: location,
                floor: floor,
                floors: floors,
                rooms: rooms,
                status: status,
                pool: pool,
                yard: yard,
                porch: porch,
                private: private_house,
                images: []
            })
            .then(() => {
                if(imageAsFile === [] ) {  
                    console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
                }
                // saving the apartment new images in firebase storage
                for (let i = 0; i < imageAsFile.length; i ++){
                    storage.ref(`${aptID}/${imageAsFile[i].name}`).put(imageAsFile[i])
                }
                
                // go back to view all apartments
                history.push('/products')
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
    }

    function handleSubmit(event) {
        event.preventDefault();
    
        // generate id in case of new apartment
        generateID
        .then(
            // save all the data in firebase
            saveToFirebase()
        )  
    }

 
    return (
        <div class=" con justify-content-center">
        <br></br>
        <h5 style={{marginTop: "5px"}}>Apartment {aptID}</h5>
        <Container>
            <Row style={{width:"100%", margin:"0"}}>
                <div class="col-sm-10" style={{marginLeft: "7%"}}>
                    <Form className="form" onSubmit={handleSubmit}> 
                        <Form.Group controlId="formCategory1" style={{margin: "1px 0"}}>
                            <Form.Label style = {{float: "left", marginLeft: "2%", margin: "0px 0"}}>Price</Form.Label>
                            <Form.Control type="text" value={price} size="sm"
                                onChange={(e) => setPrice(e.target.value)}
                            /> 
                        </Form.Group>
                        <Form.Group controlId="formCategory1" style={{margin: "1px 0"}}>
                            <Form.Label style = {{float: "left", marginLeft: "2%", margin: "0px 0"}}>Location</Form.Label>
                            <Form.Control type="text" value={location} size="sm"
                                onChange={(e) => setLocation(e.target.value)}
                            /> 
                        </Form.Group>
                        <Form.Group controlId="formCategory2" style={{margin: "1px 0"}}>
                            <Form.Label style = {{float: "left", marginLeft: "2%", margin: "0px 0"}}>Floor</Form.Label>
                            <Form.Control type="number" value={floor} size="sm" 
                                onChange={(e) => setFloor(e.target.value)}
                            />          
                        </Form.Group>
                        <Form.Group controlId="formCategory2" style={{margin: "1px 0"}}>
                            <Form.Label style = {{float: "left", marginLeft: "2%", margin: "0px 0"}}>Number of Floors</Form.Label>
                            <Form.Control type="number" value={floors} size="sm"
                                onChange={(e) => setFloors(e.target.value)}
                            />          
                        </Form.Group>
                        <Form.Group controlId="formCategory2" style={{margin: "1px 0"}}>
                            <Form.Label style = {{float: "left", marginLeft: "2%", margin: "0px 0"}}>Number of Rooms</Form.Label>
                            <Form.Control type="number" value={rooms} size="sm" 
                                onChange={(e) => setRooms(e.target.value)}
                            />          
                        </Form.Group>
                        <Form.Group controlId="formCategory2" style={{margin: "1px 0"}}>
                            <Form.Label style = {{float: "left", marginLeft: "2%", margin: "0px 0"}}>Condition</Form.Label>
                            <Form.Control type="text" value={status} size="sm"
                                onChange={(e) => setStatus(e.target.value)}
                            />          
                        </Form.Group>
                        <fieldset>
                            <Form.Group as={Row}>
                                <Col sm={2}>
                                    <Form.Check
                                        type="checkbox"
                                        label="pool"
                                        name="formHorizontalRadios"
                                        id="formHorizontalRadios1"
                                        defaultChecked={isChecked(pool) ? 'checked' : ''}
                                        onClick={() => isChecked(pool) ? setPool('') : setPool('Yes')}
                                    />  
                                    <Form.Check
                                        type="checkbox"
                                        label="yard"
                                        name="formHorizontalRadios"
                                        id="formHorizontalRadios2"
                                        defaultChecked={isChecked(yard) ? 'checked' : ''}
                                        onClick={() => isChecked(yard) ? setYard('') : setYard('Yes')}
                                    /> 
                                    <Form.Check
                                        type="checkbox"
                                        label="porch"
                                        name="formHorizontalRadios"
                                        id="formHorizontalRadios3"
                                        defaultChecked={isChecked(porch) ? 'checked' : ''}
                                        onClick={() => isChecked(porch) ? setPorch('') : setPorch('Yes')}
                                    />  
                                    <Form.Check
                                        type="checkbox"
                                        label="private"
                                        name="formHorizontalRadios"
                                        id="formHorizontalRadios4"
                                        defaultChecked={isChecked(private_house) ? 'checked' : ''}
                                        onClick={() => isChecked(private_house) ? setPrivate('') : setPrivate('Yes')}
                                    />   
                                </Col>     
                            </Form.Group>
                        </fieldset>

                        <Form.Group controlId="formCategory2" style={{float: "right", marginLeft: "20%"}}>
                            <Form.Control 
                                type="file" 
                                text="Select Image"
                                multiple
                                onChange={handleImageAsFile}
                            />          
                        </Form.Group>
                        <h6 style={{display: !correctDetails ? 'block' : 'none', color: 'red'}}>Please anter valid details.</h6>
                        
                        <Button variant="outlined" color="primary" type="submit"disabled={!validateForm()}>{aptID ? 'Update' : 'Add' }</Button>
                    </Form>
                </div>
            </Row>
        </Container>
        </div>
    )
}

   
export default UpdateOrAddApt
