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
  // Récupère la liste des employés depuis le store Redux
  const employees = useSelector((state) => state.employees.list);
  
  // État pour stocker le texte de recherche
  const [searchText, setSearchText] = useState('');
  
  // État pour stocker le tri des colonnes (quelle colonne, asc/desc)
  const [sorting, setSorting] = useState([]);

  // Définition des colonnes du tableau
  // Chaque colonne a un titre (header) et une clé (accessorKey)
  const columns = [
    { header: 'Prénom', accessorKey: 'firstName' },
    { header: 'Nom', accessorKey: 'lastName' },
    { header: 'Date début', accessorKey: 'startDate' },
    { header: 'Département', accessorKey: 'department' },
    { header: 'Date naissance', accessorKey: 'dateOfBirth' },
    { header: 'Rue', accessorKey: 'street' },
    { header: 'Ville', accessorKey: 'city' },
    { header: 'État', accessorKey: 'state' },
    { header: 'Code postal', accessorKey: 'zipCode' },
  ];

  // Configuration du tableau avec TanStack Table
  const table = useReactTable({
    data: employees,
    columns: columns,
    state: {
      globalFilter: searchText,
      sorting: sorting,
    },
    onGlobalFilterChange: setSearchText,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize: 10 },
    },
  });

  return (
    <div id="employee-div" className="container">
      <h1>Liste des Employés</h1>
      
      {/* Composant pour les contrôles (recherche + nombre d'entrées) */}
      <TableControls 
        pageSize={table.getState().pagination.pageSize}
        onPageSizeChange={(size) => table.setPageSize(size)}
        searchText={searchText}
        onSearchChange={setSearchText}
      />
      
      {/* Le tableau HTML */}
      <table>
        {/* En-tête du tableau */}
        <thead>
          {/* Boucle sur les groupes d'en-têtes */}
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {/* Boucle sur chaque colonne */}
              {headerGroup.headers.map((header) => {
                // Détermine la classe CSS selon le tri
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
                    {/* Affiche le nom de la colonne */}
                    {header.column.columnDef.header}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        
        {/* Corps du tableau */}
        <tbody>
          {/* Boucle sur chaque ligne (employé) */}
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {/* Boucle sur chaque cellule de la ligne */}
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {/* Affiche le contenu de la cellule */}
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Composant pour la pagination */}
      <TablePagination 
        currentPage={table.getState().pagination.pageIndex}
        totalPages={table.getPageCount()}
        totalItems={table.getFilteredRowModel().rows.length}
        canPrevious={table.getCanPreviousPage()}
        canNext={table.getCanNextPage()}
        onPrevious={() => table.previousPage()}
        onNext={() => table.nextPage()}
      />
      
      {/* Lien pour retourner à l'accueil */}
      <div>
        <Link to="/">Home</Link>
      </div>
    </div>
  );
}

export default EmployeeList;