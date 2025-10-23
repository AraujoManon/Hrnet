import React from 'react';

function TableControls({ pageSize, onPageSizeChange, globalFilter, onGlobalFilterChange }) {
  return (
    <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
      {/* Sélecteur du nombre d'entrées à afficher */}
      <div>
        <label>
          Show{' '}
          <select
            value={pageSize}
            onChange={function(e) {
              onPageSizeChange(Number(e.target.value));
            }}
          >
            {[10, 25, 50, 100].map(function(size) {
              return (
                <option key={size} value={size}>
                  {size}
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
            value={globalFilter}
            onChange={function(e) {
              onGlobalFilterChange(e.target.value);
            }}
          />
        </label>
      </div>
    </div>
  );
}

export default TableControls;