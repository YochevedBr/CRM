import React from "react"
import CallRecord from './CallRecord'

function CallRecords(){
    let data = React.useMemo(() =>
    [{  
        id: 0,
        date: '10/05/2020',
        name: 'A',
    },
    {  
        id: 1,
        date: '10/01/2021',
        name: 'B',
    },
    {  
        id: 2,
        date: '10/05/2021',
        name: 'C',
    },
    {  
        id: 3,
        date: '10/01/2020',
        name: 'D',
    },])

    function custom_sort(a, b) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }

    // data.sort(function (a, b) {
    //     return a.date.localeCompare(b.date);
    // });

    data.sort(custom_sort);

    return(
        <div>
            <h3>CallRecords</h3>
            <div>
                {data.map((call, i) => <CallRecord key={i} call={call} />)}
            </div>
        </div>
    )
}
   

export default CallRecords