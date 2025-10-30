import React, { useState, useEffect } from 'react';
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
  const [employees, setEmployees] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [loadError, setLoadError] = useState(null);

  // Chargement des données avec gestion d'erreurs complète
  useEffect(function() {
    try {
      const savedEmployees = localStorage.getItem('employees');
      
      // Si pas de données, ce n'est pas une erreur
      if (!savedEmployees) {
        console.log('Aucun employé trouvé dans localStorage');
        setEmployees([]);
        setLoadError(null);
        return;
      }
      
      // Parser le JSON
      const parsedEmployees = JSON.parse(savedEmployees);
      
      // Validation : vérifier que c'est un array
      if (!Array.isArray(parsedEmployees)) {
        throw new Error('Data is not an array');
      }
      
      // Validation : vérifier que chaque employé a les propriétés requises
      const isValid = parsedEmployees.every(function(emp) {
        return emp.firstName && emp.lastName && emp.department;
      });
      
      if (!isValid) {
        throw new Error('Some employees have missing required properties');
      }
      
      // Tout est bon, on charge les données
      console.log('Employés chargés avec succès:', parsedEmployees.length);
      setEmployees(parsedEmployees);
      setLoadError(null);
      
    } catch (error) {
      console.error('Erreur lors du chargement des employés:', error);
      
      // Sauvegarder le message d'erreur pour l'afficher
      setLoadError(error.message);
      
      // Réinitialiser avec un array vide pour que l'application continue
      setEmployees([]);
      
      // Nettoyer localStorage pour éviter que l'erreur se reproduise
      localStorage.removeItem('employees');
    }
  }, []);

  // Définition des colonnes
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

  // Configuration du tableau
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
      
      {/* Afficher le message d'erreur si le chargement a échoué */}
      {loadError && (
        <div style={{
          padding: '15px',
          marginBottom: '20px',
          backgroundColor: '#ffebee',
          color: '#c62828',
          borderRadius: '5px',
          border: '1px solid #ef5350'
        }}>
          <strong>Error loading data:</strong> {loadError}
          <br />
          <small>The corrupted data has been cleared. Starting with an empty employee list.</small>
        </div>
      )}
      
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
                  : loadError 
                    ? 'No employees available due to data error.'
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
        <a href="/">Home</a>
      </div>
    </div>
  );
}

export default EmployeeList;