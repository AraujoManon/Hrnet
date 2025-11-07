import React from 'react';

// Composant pour afficher la pagination du tableau
// (boutons précédent/suivant + infos page)
function TablePagination({ 
  currentPage,    // Numéro de la page actuelle (commence à 0)
  totalPages,     // Nombre total de pages
  totalItems,     // Nombre total d'employés
  canPrevious,    // Peut-on aller à la page précédente ?
  canNext,        // Peut-on aller à la page suivante ?
  onPrevious,     // Fonction pour aller à la page précédente
  onNext          // Fonction pour aller à la page suivante
}) {
  return (
    <div className="table-pagination">
      {/* Nombre total d'employés trouvés */}
      <div className="table-pagination-info">
        Affichage de {totalItems} employés
      </div>
      
      {/* Boutons de navigation */}
      <div className="table-pagination-controls">
        {/* Bouton page précédente */}
        <button 
          onClick={onPrevious} 
          disabled={!canPrevious}
        >
          Précédent
        </button>
        
        {/* Affichage de la page actuelle */}
        <span>Page {currentPage + 1} sur {totalPages}</span>
        
        {/* Bouton page suivante */}
        <button 
          onClick={onNext} 
          disabled={!canNext}
        >
          Suivant
        </button>
      </div>
    </div>
  );
}

export default TablePagination;