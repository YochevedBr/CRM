import React from 'react'


function Call(props){
    return(
        <div>
            <p style={{border:'2px solid #0044cc',borderRadius: '8px', marginLeft:'50px', marginRight:'50px', borderStyle: 'inset'}}>
                <div style={{display: props.data.date ? 'flex' : 'none', padding:'10px 20px 10px 20px '}} >
                    <div className='p-responsive' style={{color:'#0044cc',paddingRight:'10px'}}>Date:</div><div className='p-responsive'>{props.data.date}</div>
                </div>
                <div style={{display: props.data.interested ? 'flex' : 'none', padding:'10px 20px 10px 20px '}}>
                    <div className='p-responsive' style={{color:'#0044cc',paddingRight:'10px'}}>Interested in:</div><div className='p-responsive'>{props.data.interested}</div>
                </div >
                <div style={{display: props.data.purchased == [] ? 'flex' : 'none', padding:'10px 20px 10px 20px '}}>
                    <div className='p-responsive' style={{color:'#0044cc',paddingRight:'10px'}}>Purchases:</div><div className='p-responsive'>{props.data.purchased ? props.data.purchased.join(', ') : props.data.purchased}</div>
                </div>
                <div style={{display: props.data.return ? 'flex' : 'none', padding:'10px 20px 10px 20px '}}>
                    <div className='p-responsive' style={{color:'#0044cc',paddingRight:'10px'}}>Return:</div><div className='p-responsive'>Yes</div>
                </div>
            </p>
        </div>
    )
}

export default Call
