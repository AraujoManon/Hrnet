import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import TableControls from '../components/TableControls';
import TablePagination from '../components/TablePagination';

function EmployeeList() {
  const employees = useSelector((state) => state.employees.list);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);

  const columns = React.useMemo(
    function() {
      return [
        { header: 'First Name', accessorKey: 'firstName' },
        { header: 'Last Name', accessorKey: 'lastName' },
        { header: 'Start Date', accessorKey: 'startDate' },
        { header: 'Department', accessorKey: 'department' },
        { header: 'Date of Birth', accessorKey: 'dateOfBirth' },
        { header: 'Street', accessorKey: 'street' },
        { header: 'City', accessorKey: 'city' },
        { header: 'State', accessorKey: 'state' },
        { header: 'Zip Code', accessorKey: 'zipCode' },
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
    globalFilterFn: 'includesString',
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
      
      <TableControls 
        pageSize={table.getState().pagination.pageSize}
        onPageSizeChange={(size) => table.setPageSize(size)}
        globalFilter={globalFilter || ''}
        onGlobalFilterChange={setGlobalFilter}
      />
      
      <table>
        <thead>
          {table.getHeaderGroups().map(function(headerGroup) {
            return (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(function(header) {
                  let sortClass = '';
                  if (header.column.getIsSorted() === 'asc') {
                    sortClass = 'sorted-asc';
                  } else if (header.column.getIsSorted() === 'desc') {
                    sortClass = 'sorted-desc';
                  }
                  
                  return (
                    <th 
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className={sortClass}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
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
                {globalFilter 
                  ? 'No matching employees found.' 
                  : 'No employees found. Please create an employee first.'}
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
      
      <TablePagination 
        currentPage={table.getState().pagination.pageIndex}
        pageSize={table.getState().pagination.pageSize}
        totalItems={table.getFilteredRowModel().rows.length}
        canPreviousPage={table.getCanPreviousPage()}
        canNextPage={table.getCanNextPage()}
        onPreviousPage={() => table.previousPage()}
        onNextPage={() => table.nextPage()}
      />
      
      <div style={{ marginTop: '20px' }}>
        <Link to="/">Home</Link>
      </div>
    </div>
  );
}

export default EmployeeList;