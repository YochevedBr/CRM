import React from "react"
import { useTable, useFilters, useSortBy} from 'react-table';
// import './customersTable.css'

function CustomersTable() {
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
            // accessor: 'actions',
            id: 'click-me-button',
            Cell: ({row}) => (
                <div>
                    <button onClick={() => handleEdit(row.original.email)}>🖊️</button>
                    <button onClick={() => handleDelete(row.original.email)}>🗑️</button>
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
            
            <table {...getTableProps()}>
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
            </table>
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
    console.log('this is:', data);
  }


function TextFilter({
    column: { filterValue, preFilteredRows, setFilter },
   }) {
   
    return (
      <input
        value={filterValue || ''}
        onChange={e => {
          setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
        }}
        placeholder={`Search...`}
      />
    )
   }

export default CustomersTable