import React from "react"
import { useTable, useFilters, useSortBy} from 'react-table';
import { useHistory } from "react-router";
import { Container,Row,Col, Table, InputGroup, FormControl } from 'react-bootstrap';
import Button from '@material-ui/core/Button';



function CustomersTable(props) {
    
        const history = useHistory();

        // build table
        const data = React.useMemo(() =>
        [{  
            name: 'Ayaan',  
            phone: 27,
            email: 'd@gmail.com',
            },{  
            name: 'Yael',  
            phone: 25,
            email: 'b@gmail.com',
            },{  
            name: 'Yael',  
            phone: 28,
            email: 'c@gmail.com', 
            },{  
            name: 'Bracha',  
            phone: 26,
            email: 'a@gmail.com',
            },
            ],
            []
        )    

        const columns = React.useMemo(() =>
        [
        {  
            Header: 'Name',  
            accessor: 'name',
            sortType: 'alphanumeric',
        },{  
            Header: 'Phone Number',  
            accessor: 'phone', 
            sortType: 'basic',
        },{  
            Header: 'Email',  
            accessor: 'email',
            sortType: 'alphanumeric',
        },
        {
            Header: 'Actions',
            id: 'click-me-button',
            Cell: ({row}) => (
                <div>
                    {/* <button onClick={() => handleEdit(row.original.email)}>🖊️</button> */}
                    <Button variant="outlined" color="primary" onClick={() => {history.push({pathname:  "/update_customer"})}}>Edit</Button>{' '}

                    <Button variant="outlined" color="primary" onClick={() => handleDelete(row.original.email)}>Delete</Button>
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
            <Container>
                <Row>
                    <Col>
                    <Table  striped bordered hover responsive bsStyle="default" style={{borderRadius: '5px', overflow: 'hidden'}} {...getTableProps()}>
                        <thead>
                            {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                            {column.render('Header')}
                                            <span>
                                                {/* Render the columns sort UI */}
                                                {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : '  '}
                                            </span>
                                            
                                            {/* Render the columns filter UI */}
                                            <div>{column.canFilter ? column.render('Filter') : null}
                                            </div>
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
                </Col>
            </Row>
        </Container>
        
        )
}

const handleDelete = (data) => {
    console.log('this is:', data);
    // const r = this.state.rows.map((row) => data===row.original.email? {...row, show: !row.show}: row)
    // this.setState({
    //   rows: r
    // })
    
  }

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

export default CustomersTable