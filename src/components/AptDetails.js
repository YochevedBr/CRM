import React from 'react'
import { useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import img from '../pictures/house-real-estate-logo.jpg'
import img1 from '../pictures/Purchases.jpg'

import AptDescription from './AptDescription'
import SmallImages from './SmallImages'
import Image from './Image'

import { useHistory } from "react-router";

import './Product.css'

import { Container, Row, Col } from 'react-bootstrap'


function AptDetails(){
    const {aptID} = useParams()

    // retrieve the correct apartment by query
    
    const history = useHistory()
    // demo 
    let data = React.useMemo(() =>
    [{  
        image: img1,
        images: [img, img1, img, img1, img, img1, img],
        sold: 'sold',
        location: 'Jaffa, Jrusalem',
        price: '1,500,000',
        id: '0',
    },])

    function image(){
        return data[0].image
    }

    function replaceImage(src){
        console.log('replaceImage')
        console.log(data[0].image)
        data[0].image = src.target.src
        console.log(data[0].image)
    }

    console.log(data[0].id)
    return(
        <div>
            {/* <div className='flex-container' style={{'position': 'relative'}}> */}
            <Container className='no-marginLR no-padding'>
                <Row>
                    <Col xs={4}>
                        <AptDescription class='flex-child' id={aptID}></AptDescription>
                        <Button variant="outlined" color="primary" onClick={() => {history.push({pathname:  `/update_apt/${data[0].id}`})}}>Edit</Button>
                    </Col>
                    {/* <div style={{marginLeft:'15%', marginTop:'3%'}}> */}
                    <Col xs={8}>
                        <Container>
                            <Row>
                                <Col>
                                    <Image src={image()} width={'800'} height={'500'}></Image>
                                </Col>
                            </Row>
                            <br></br>
                            <Row>
                                <SmallImages replaceImage={replaceImage} images={data[0].images}></SmallImages>
                            </Row>
                        </Container>
                    {/* </div> */}
                    </Col>
                </Row>
            </Container>
            {/* </div> */}
        </div>
    )
}

export default AptDetails