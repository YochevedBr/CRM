import React, { useEffect, useState } from "react"
import { useTable, useFilters, useSortBy,} from 'react-table';
import { useHistory } from "react-router";
import { Container ,Row ,Col, Table, InputGroup, FormControl} from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import './CustomersTable.css';
import firebase from './../firebase.js';
import { keys } from "@material-ui/core/styles/createBreakpoints";
import { withRouter } from 'react-router'
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactToPrint from "react-to-print";


function CustomersTable(props) {
    const reports = props.reports;    
    const history = useHistory();
    
    const [showModal, setShow] = React.useState(false);
    const [Row, setRow] = React.useState("");
    const [data, setData] = React.useState([]);

    const [id, setId] = React.useState("")
    const [name, setName] = React.useState("1")
    const [phoneNumber, setPhoneNumber] = React.useState("2")
    const [email, setEmail] = React.useState("3")

    useEffect(() => {
        if(Row != ""){
        var db = firebase.firestore()
        // Get the current id
        db.collection("customers").where("email", "==", Row.email)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setId(doc.id)
                    setName(doc.data().name)
                    setPhoneNumber(doc.data().phoneNumber)
                    setEmail(doc.data().email)                
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            }); 
        }
    },[Row]);

    const handleClose = () => setShow(false)

    const handleShow = (data) => {
        setShow(true);
        setRow(data)
    }

    const handleDelete = () => {
                setShow(false);
                var db = firebase.firestore()

                    // Delete customer
                    db.collection("customers").doc(id).set({
                    name: name,
                    phoneNumber: phoneNumber,
                    email: email,
                    deleted: true
                }).then(() => {
                    window.location.reload();
                }).catch((error) => {
                    console.error("Error removing document: ", error);
                });               
                // db.collection("customers").doc(currentId).delete().then(() => {
                //     console.log("Document successfully deleted!");
                // }).catch((error) => {
                //     console.error("Error removing document: ", error);
                // });    
    }

    // Actions buttons for each row
    const Actions = (props) =>{
        var currentC = ""
        const reports = props.reports;
        const row = props.row;
        var db = firebase.firestore()
        db.collection("customers").where("email", "==", row.original.email)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    currentC = doc.id     
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
        });  

        if(reports){
            return <Button variant="outlined" color="primary" onClick={() =>  {history.push({pathname:  "/print_customer/" + currentC})}}>Print</Button>
        }
        else{
            return(
                <div>
                    <Button variant="outlined" color="primary" 
                    onClick={() => {history.push({pathname: "/update_customer/" + currentC})}}>Details</Button>{' '}
                    <Button variant="outlined" color="primary" 
                    onClick={() => handleShow(row.original)}>Delete</Button>
                </div>
            )
        }  
    }

    function TextFilter({column: { filterValue, preFilteredRows, setFilter },})
    { 
        return (
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Search..."
                    value={filterValue || ''}
                    onChange={e => {
                        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
                    }}
                />
            </InputGroup>
        )
    }
        
    // get customers data
    React.useEffect(() => {
        var db = firebase.firestore();
        // Get all customers that exist
        db.collection("customers")
        .where("deleted", "==", false)
        .get().then((querySnapshot) => {
            var customersData = [];
            querySnapshot.forEach((doc) => {
                customersData.push(doc.data())
            });
            setData(customersData);
        });
    }, []);        

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
                <div><Actions reports={reports} row={row} /></div>
            )
        }
    ],
    []
    )  
    
    const defaultColumn = React.useMemo(() => ({
            Filter: TextFilter,
    }),[])
        
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        getRowProps,
        prepareRow,
    } = useTable(
        { columns, data, defaultColumn}, 
        useFilters,
        useSortBy,
        )
        
    return(
        // <>
        // {
        // !data ? <h1>Loading...</h1> :
        <div>
            
            <Table striped bordered responsive bsStyle="default" {...getTableProps()}>
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
                <Modal.Body>Are you sure you want to delete {Row.name}?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    Cancel
                    </Button>
                    <Button variant="primary" onClick={handleDelete}>
                    Yes
                    </Button>
                </Modal.Footer>
            </Modal>
            </>

        </div>
        //  }
        //  </>
    )

}


export default withRouter(CustomersTable);


