import React from 'react';

// Composant pour la pagination en bas du tableau
// currentPage = page actuelle (commence à 0)
// pageSize = nombre d'employés par page
// totalItems = nombre total d'employés (après recherche)
// canPreviousPage = peut-on aller à la page précédente ?
// canNextPage = peut-on aller à la page suivante ?
// onPreviousPage = fonction pour aller à la page précédente
// onNextPage = fonction pour aller à la page suivante
function TablePagination({ 
  currentPage, 
  pageSize, 
  totalItems, 
  canPreviousPage, 
  canNextPage, 
  onPreviousPage, 
  onNextPage 
}) {
  // Calcul du premier employé affiché (ex: 1, 11, 21...)
  const startItem = currentPage * pageSize + 1;
  
  // Calcul du dernier employé affiché (ex: 10, 20, 30...)
  const endItem = Math.min((currentPage + 1) * pageSize, totalItems);
  
  return (
    <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      
      {/* Partie gauche : Texte informatif "Showing 1 to 10 of 50 entries" */}
      <div>
        Showing {startItem} to {endItem} of {totalItems} entries
      </div>
      
      {/* Partie droite : Boutons de navigation */}
      <div>
        {/* Bouton Previous */}
        <button
          onClick={onPreviousPage}
          disabled={!canPreviousPage}  // Désactivé si on est sur la première page
        >
          Previous
        </button>
        {' '}
        {/* Numéro de la page actuelle (on ajoute +1 car ça commence à 0) */}
        <span>
          {currentPage + 1}
        </span>
        {' '}
        {/* Bouton Next */}
        <button
          onClick={onNextPage}
          disabled={!canNextPage}  // Désactivé si on est sur la dernière page
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default TablePagination;