import React, { useState, useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);

  useEffect(function() {
    const savedEmployees = localStorage.getItem('employees');
    
    if (savedEmployees) {
      const parsedEmployees = JSON.parse(savedEmployees);
      console.log('Employés chargés:', parsedEmployees);
      setEmployees(parsedEmployees);
    } else {
      console.log('Aucun employé trouvé');
    }
  }, []);

  const columns = React.useMemo(
    function() {
      return [
        {
          header: 'First Name',
          accessorKey: 'firstName',
        },
        {
          header: 'Last Name',
          accessorKey: 'lastName',
        },
        {
          header: 'Start Date',
          accessorKey: 'startDate',
        },
        {
          header: 'Department',
          accessorKey: 'department',
        },
        {
          header: 'Date of Birth',
          accessorKey: 'dateOfBirth',
        },
        {
          header: 'Street',
          accessorKey: 'street',
        },
        {
          header: 'City',
          accessorKey: 'city',
        },
        {
          header: 'State',
          accessorKey: 'state',
        },
        {
          header: 'Zip Code',
          accessorKey: 'zipCode',
        },
      ];
    },
    []
  );

  const table = useReactTable({
    data: employees,
    columns: columns,
    state: {
      globalFilter: globalFilter,
      sorting: sorting,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    globalFilterFn: 'includesString',  // ⭐ Fonction de recherche
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div id="employee-div" className="container">
      <h1>Current Employees</h1>
      
      <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <label>
            Show{' '}
            <select
              value={table.getState().pagination.pageSize}
              onChange={function(e) {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[10, 25, 50, 100].map(function(pageSize) {
                return (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                );
              })}
            </select>
            {' '}entries
          </label>
        </div>
        
        <div>
          <label>
            Search:{' '}
            <input
              type="text"
              value={globalFilter || ''}
              onChange={function(e) {
                console.log('Recherche:', e.target.value);  // Debug
                setGlobalFilter(e.target.value);
              }}
              placeholder="Search all columns..."
            />
          </label>
        </div>
      </div>
      
      <table>
        <thead>
          {table.getHeaderGroups().map(function(headerGroup) {
            return (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(function(header) {
                  return (
                    <th 
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      style={{ cursor: 'pointer' }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getIsSorted()
                        ? header.column.getIsSorted() === 'desc'
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        
        <tbody>
          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: 'center', padding: '20px' }}>
                {globalFilter ? 'No matching employees found.' : 'No employees found. Please create an employee first.'}
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map(function(row) {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map(function(cell) {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      
      <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )}{' '}
          of {table.getFilteredRowModel().rows.length} entries
          {globalFilter && ` (filtered from ${employees.length} total entries)`}
        </div>
        
        <div>
          <button
            onClick={function() {
              table.previousPage();
            }}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </button>
          {' '}
          <span>
            {table.getState().pagination.pageIndex + 1}
          </span>
          {' '}
          <button
            onClick={function() {
              table.nextPage();
            }}
            disabled={!table.getCanNextPage()}
          >
            Next
          </button>
        </div>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <a href="/">Home</a>
      </div>
    </div>
  );
}

export default EmployeeList;