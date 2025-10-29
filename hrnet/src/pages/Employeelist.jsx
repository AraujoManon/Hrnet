// On importe React et les outils dont on a besoin
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
  // employees = liste de tous les employés
  const [employees, setEmployees] = useState([]);
  
  // globalFilter = ce qu'on tape dans la barre de recherche
  const [globalFilter, setGlobalFilter] = useState('');
  
  // sorting = comment le tableau est trié (ordre croissant/décroissant)
  const [sorting, setSorting] = useState([]);

  // useEffect = code qui s'exécute quand la page se charge
  useEffect(function() {
    // On récupère les employés sauvegardés dans le navigateur
    const savedEmployees = localStorage.getItem('employees');
    
    if (savedEmployees) {
      // On transforme le texte en données utilisables
      const parsedEmployees = JSON.parse(savedEmployees);
      console.log('Employés chargés:', parsedEmployees);
      setEmployees(parsedEmployees);
    } else {
      console.log('Aucun employé trouvé');
    }
  }, []); // [] = exécuter une seule fois au chargement

  // columns = définition des colonnes du tableau
  // useMemo = créer les colonnes une seule fois (optimisation)
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

  // Configuration du tableau avec toutes ses fonctionnalités
  const table = useReactTable({
    data: employees,              // Les données à afficher
    columns: columns,             // Les colonnes du tableau
    state: {
      globalFilter: globalFilter, // État de la recherche
      sorting: sorting,           // État du tri
    },
    onGlobalFilterChange: setGlobalFilter, // Fonction pour changer la recherche
    onSortingChange: setSorting,           // Fonction pour changer le tri
    globalFilterFn: 'includesString',      // Type de recherche (texte)
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),     // Active la recherche
    getSortedRowModel: getSortedRowModel(),         // Active le tri
    getPaginationRowModel: getPaginationRowModel(), // Active la pagination
    initialState: {
      pagination: {
        pageSize: 10, // 10 employés par page par défaut
      },
    },
  });

  // Ce qu'on affiche à l'écran
  return (
    <div id="employee-div" className="container">
      <h1>Current Employees</h1>
      
      {/* Contrôles en haut : nombre d'entrées et recherche */}
      <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
        
        {/* Sélecteur : combien d'employés afficher par page */}
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
        
        {/* Champ de recherche */}
        <div>
          <label>
            Search:{' '}
            <input
              type="text"
              value={globalFilter || ''}
              onChange={function(e) {
                setGlobalFilter(e.target.value);
              }}
              placeholder="Search all columns..."
            />
          </label>
        </div>
      </div>
      
      {/* Le tableau */}
      <table>
        {/* En-tête du tableau (titres des colonnes) */}
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
                      {/* Affiche le titre de la colonne */}
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {/* Affiche la flèche de tri */}
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
        
        {/* Corps du tableau (lignes d'employés) */}
        <tbody>
          {/* Si aucun employé, on affiche un message */}
          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: 'center', padding: '20px' }}>
                {globalFilter 
                  ? 'No matching employees found.' 
                  : 'No employees found. Please create an employee first.'}
              </td>
            </tr>
          ) : (
            // Sinon, on affiche chaque employé
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
      
      {/* Contrôles en bas : info sur les résultats et pagination */}
      <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* Texte : "Showing 1 to 10 of 50 entries" */}
        <div>
          Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )}{' '}
          of {table.getFilteredRowModel().rows.length} entries
          {globalFilter && ` (filtered from ${employees.length} total entries)`}
        </div>
        
        {/* Boutons Previous et Next */}
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
      
      {/* Lien pour retourner à l'accueil */}
      <div style={{ marginTop: '20px' }}>
        <a href="/">Home</a>
      </div>
    </div>
  );
}

export default EmployeeList;