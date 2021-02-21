import React from "react"
import { useTable, useFilters, useSortBy} from 'react-table';
import { useHistory } from "react-router";
import { Container,Row,Col, Table, InputGroup, FormControl} from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import './CustomersTable.css';
import firebase from './../firebase.js';
import { keys } from "@material-ui/core/styles/createBreakpoints";
import { withRouter } from 'react-router'


import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";


function CustomersTable(props) {

        const reports = props.reports;
    
        const history = useHistory();
        

        const [showModal, setShow] = React.useState(false);
        const [Row, setRow] = React.useState("");


        const handleClose = () => setShow(false);
        const handleShow = (data) => {
            setShow(true);
            setRow(data)
        }
        const handleDelete = () => {
            setShow(false);
            firebase.database().ref('customers').orderByChild('email').equalTo(Row.email).once("value").then(function(snapshot) {
            snapshot.forEach(function(child) {
            child.ref.remove();
            })
        });
        }


        // buttons for each row
        const Actions = (props) =>{
            const reports = props.reports;
            const row = props.row;
            if(reports){
                return <Button variant="outlined" color="primary" onClick={() =>  {history.push({pathname:  "/print_customer"})}}>Print</Button>
            }
            else{
                return(
                    <div>
                        <Button variant="outlined" color="primary" 
                        onClick={() => {history.push({pathname: "/update_customer", rowDetails : row.original })}}>Edit</Button>{' '}
                        <Button variant="outlined" color="primary" 
                        onClick={() => handleShow(row.original)}>Delete</Button>
                    </div>
                )
            }  
        }
          
        const [data, setData] = React.useState([]);

        React.useEffect(() => {
            const customersRef = firebase.database().ref('customers');
            customersRef.on('value', (snapshot) => {
                var customersData = [];
                snapshot.forEach(snap => {
                    // console.log("key "+snap.key);
                    customersData.push(snap.val());
                });
                setData(customersData);
            });
        }, []);
        
        // const data = React.useMemo(() =>
        // [{  
        //     email: 'd@gmail.com',
        //     name: 'Ayaan',  
        //     phoneNumber: 27,
        //     },{  
        //     email: 'b@gmail.com',
        //     name: 'Yael',  
        //     phoneNumber: 25,
        //     },{  
        //     email: 'c@gmail.com', 
        //     name: 'Yael',  
        //     phoneNumber: 28,
        //     },{ 
        //     email: 'a@gmail.com', 
        //     name: 'Bracha',  
        //     phoneNumber: 26,
        //     },
        //     ],
        //     []
        // )   
        
        const columns = React.useMemo(() =>
        [
        {  
            Header: 'Email',  
            accessor: 'email',
            sortType: 'alphanumeric',
        },{  
            Header: 'Name',  
            accessor: 'name',
            sortType: 'alphanumeric',
        },{  
            Header: 'Phone Number',  
            accessor: 'phoneNumber', 
            sortType: 'basic',
        },{
            Header: 'Actions',
            id: 'click-me-button',
            Cell: ({row}) => (
                <div>
                    <Actions reports={reports} row={row} />
                    {/* <button onClick={() => handleEdit(row.original.email)}>🖊️</button>
                    <Button variant="outlined" color="primary" onClick={() => {history.push({pathname:  "/update_customer"})}}>Edit</Button>{' '}

                    <Button variant="outlined" color="primary" onClick={() => handleDelete(row.original.email)}>Delete</Button> */}
                </div>
            )
          }
        ],
        []
        )  
        
        const defaultColumn = React.useMemo(() => ({
              Filter: TextFilter,
        }),
        []
        )
            
        const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            rows,
            getRowProps,
            prepareRow,
        } = useTable(
            { columns, data, defaultColumn }, 
            useFilters,
            useSortBy,
            )
        
        return(
        <div>
        <Table striped bordered responsive bsStyle="default" style={{borderRadius: '5px', overflow: 'hidden'}} {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>
                                <div {...column.getSortByToggleProps()}>
                                    {column.render('Header')}
                                    <span>
                                        {/* Render the columns sort UI */}
                                        {column.isSorted ? (column.isSortedDesc ? ' 🔻' : ' 🔺') : ' ➖'}
                                    </span>
                                </div>
                                {/* Render the columns filter UI */}
                                <div>{column.canFilter ? column.render('Filter') : null}</div>
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>

                            })}
                        </tr>
                    )
                })}

            </tbody>
        </Table>

        <>
        <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>are you sure you want to delete {Row.name}?</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
            Cancle
            </Button>
            <Button variant="primary" onClick={handleDelete}>
            Yes
            </Button>
        </Modal.Footer>
        </Modal>
        </>
        </div>

        )
}


//   const handlePrint = (data) => {
//     console.log('this is:', data);
//     {history.push({pathname:  "/print_customer"})}
    
//   }

const handleEdit = (data) => {
    // console.log('this is:', data);
    // this.props.history.push('/customers_reports')
  }


function TextFilter({
    column: { filterValue, preFilteredRows, setFilter },
   }) {
   
    return (
        <InputGroup className="mb-3">
            <FormControl
                placeholder="Search..."
                value={filterValue || ''}
                onChange={e => {
                    setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
                }}
                // aria-label="Username"
                // aria-describedby="basic-addon1"
            />
        </InputGroup>
    )
   }

// export default CustomersTable

export default withRouter(CustomersTable);
