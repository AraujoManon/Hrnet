import React from 'react';

// Composant pour les contrôles en haut du tableau
// pageSize = nombre d'employés affichés par page (ex: 10, 25, 50)
// onPageSizeChange = fonction pour changer le nombre d'employés par page
// globalFilter = texte tapé dans la barre de recherche
// onGlobalFilterChange = fonction pour changer le texte de recherche
function TableControls({ pageSize, onPageSizeChange, globalFilter, onGlobalFilterChange }) {
  return (
    <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
      
      {/* Partie gauche : Sélecteur du nombre d'entrées */}
      <div>
        <label>
          Show{' '}
          <select
            value={pageSize}
            onChange={function(e) {
              // Quand on change le nombre, on appelle la fonction du parent
              onPageSizeChange(Number(e.target.value));
            }}
          >
            {/* On crée une option pour chaque taille : 10, 25, 50, 100 */}
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
      
      {/* Partie droite : Champ de recherche */}
      <div>
        <label>
          Search:{' '}
          <input
            type="text"
            value={globalFilter}
            onChange={function(e) {
              // Quand on tape, on appelle la fonction du parent
              onGlobalFilterChange(e.target.value);
            }}
          />
        </label>
      </div>
    </div>
  );
}

export default TableControls;