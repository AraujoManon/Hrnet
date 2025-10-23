import React from 'react';

function TablePagination({ 
  currentPage, 
  pageSize, 
  totalItems, 
  canPreviousPage, 
  canNextPage, 
  onPreviousPage, 
  onNextPage 
}) {
  const startItem = currentPage * pageSize + 1;
  const endItem = Math.min((currentPage + 1) * pageSize, totalItems);
  
  return (
    <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      {/* Information sur les entrées affichées */}
      <div>
        Showing {startItem} to {endItem} of {totalItems} entries
      </div>
      
      {/* Boutons de pagination */}
      <div>
        <button
          onClick={onPreviousPage}
          disabled={!canPreviousPage}
        >
          Previous
        </button>
        {' '}
        <span>
          {currentPage + 1}
        </span>
        {' '}
        <button
          onClick={onNextPage}
          disabled={!canNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default TablePagination;