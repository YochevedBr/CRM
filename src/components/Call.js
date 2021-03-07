import React from 'react'
import { useParams } from 'react-router-dom';


function Call(props){
    return(
        <div>
            <p style={{border:'2px solid #0044cc',borderRadius: '8px', marginLeft:'50px', marginRight:'50px', borderStyle: 'inset'}}>
                <div style={{display: props.data.date ? 'flex' : 'none', padding:'10px 20px 10px 20px '}} >
                    <div style={{color:'#0044cc',paddingRight:'10px',fontSize:'22px'}}>Date:</div><div style={{fontSize:'22px'}}>{props.data.date}</div>
                </div>
                <div style={{display: props.data.interested ? 'flex' : 'none', padding:'10px 20px 10px 20px '}}>
                    <div style={{color:'#0044cc',paddingRight:'10px',fontSize:'22px'}}>Interested in:</div><div style={{fontSize:'22px'}}>{props.data.interested}</div>
                </div >
                <div style={{display: props.data.purchased ? 'flex' : 'none', padding:'10px 20px 10px 20px '}}>
                    <div style={{color:'#0044cc',paddingRight:'10px',fontSize:'22px'}}>Purchases:</div><div style={{fontSize:'22px'}}>{props.data.purchased ? props.data.purchased.join(', ') : props.data.purchased}</div>
                </div>
                <div style={{display: props.data.return ? 'flex' : 'none', padding:'10px 20px 10px 20px '}}>
                    <div style={{color:'#0044cc',paddingRight:'10px',fontSize:'22px'}}>Return:</div><div style={{fontSize:'22px'}}>{props.data.return}</div>
                </div>
            </p>
        </div>
    )
}

export default Call
