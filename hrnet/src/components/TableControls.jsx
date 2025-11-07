// Composant pour afficher les contrôles du tableau
// (nombre d'entrées par page + barre de recherche)
function TableControls({ pageSize, onPageSizeChange, searchText, onSearchChange }) {
  return (
    <div className="table-controls">
      {/* Sélecteur du nombre d'entrées à afficher */}
      <div className="table-controls-entries">
        <span>Afficher</span>
        <select 
          value={pageSize} 
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
        <span>entrées</span>
      </div>
      
      {/* Champ de recherche */}
      <input
        type="text"
        placeholder="Rechercher..."
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}

export default TableControls;