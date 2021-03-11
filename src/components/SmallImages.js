import React from "react"
import SmallImage from './SmallImage'
import { Col } from 'react-bootstrap'
import './SmallImages.css'
import ReactLoading from 'react-loading'


class SmallImages extends React.Component{

    render(){
        return ( 
            <>
                {
                    this.props.images === undefined ? 
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <ReactLoading type='bubbles' color="#000066" />
                        </div>
                    :  
                        <Col className='col-md' key={this.props.images}>

                            <div className='wrapper1' width='700'>
                                {this.props.images.map((image, i) => <SmallImage replaceImage={this.props.replaceImage} key={i} src={image} />)}
                            </div>
                        </Col>  
                }
            </> 
        )
    }
}

export default SmallImages