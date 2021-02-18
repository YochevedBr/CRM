import React from 'react'
import { useParams } from 'react-router-dom';

import Call from './Call'


function CallDetails(){
    const {callID} = useParams()
    // retrieve from database call by id

    const data = React.useMemo(() =>
    [{  
        id: 0,
        date: '10/01/2020',
        name: 'A',
        interested: 'The client interested in...',
        purchases: ['id1', 'id2'],
        return: '',
    },])

    let agentName = 'H'

    return(
        <div>
            <h2 style={{textAlign:'left', marginLeft: '52px'}}>{data[0].name}</h2>
            <Call data={data}></Call>
            <h5 style={{textAlign:'left', marginLeft: '52px'}}>Agent: {agentName}</h5>
        </div>
    )
}

export default CallDetails
