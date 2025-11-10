# 👥 HRnet - Gestion des Employés

<div align="center">

![React](https://img.shields.io/badge/React-19.1.1-61dafb?style=flat-square&logo=react)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2.9.2-764abc?style=flat-square&logo=redux)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646cff?style=flat-square&logo=vite)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

**Application React moderne de gestion des employés avec formulaire de création et tableau interactif.**

[Installation](#-installation) • [Utilisation](#-utilisation) • [Technologies](#-technologies) • [Fonctionnalités](#-fonctionnalités)

</div>

---

## ✨ Fonctionnalités

- 📝 **Formulaire de création** - Ajout d'employés avec validation
- 📊 **Tableau interactif** - Affichage, tri et recherche des employés
- 🔄 **Gestion d'état Redux** - State management performant
- 🎨 **Interface moderne** - Design épuré et responsive
- ⚡ **Performance optimale** - Build avec Vite
- 🔍 **Recherche et filtres** - Filtrage avancé des données

## 🚀 Installation

### Prérequis

- Node.js ≥ 18.0.0
- npm ≥ 9.0.0

### Étapes
```bash
# Cloner le projet
git clone https://github.com/AraujoManon/Hrnet.git
cd hrnet

# Installer les dépendances
npm install

# Lancer en développement
npm run dev
```

L'application sera accessible sur **http://localhost:5173**

## 📦 Scripts disponibles
```bash
# Développement
npm run dev

# Build de production
npm run build

# Prévisualiser le build
npm run preview

# Linter
npm run lint
```

## 🛠️ Technologies

| Technologie | Version | Usage |
|-------------|---------|-------|
| **React** | 19.1.1 | Framework UI |
| **Redux Toolkit** | 2.9.2 | Gestion d'état globale |
| **React Router** | 7.9.4 | Navigation SPA |
| **TanStack Table** | 8.21.3 | Tableau de données avancé |
| **Vite** | 7.1.7 | Build tool ultra-rapide |

## 📂 Structure du projet
```
hrnet/
├── src/
│   ├── components/     # Composants réutilisables
│   ├── pages/          # Pages de l'application
│   ├── store/          # Configuration Redux
│   ├── utils/          # Fonctions utilitaires
│   └── App.jsx         # Composant principal
├── public/             # Fichiers statiques
└── package.json        # Dépendances
```

## 💡 Utilisation

### Créer un employé

1. Accédez à la page d'accueil
2. Remplissez le formulaire avec les informations de l'employé
3. Cliquez sur "Save" pour ajouter l'employé

### Consulter la liste des employés

1. Accédez à "Current Employees"
2. Utilisez la barre de recherche pour filtrer
3. Triez les colonnes en cliquant sur les en-têtes
4. Modifiez le nombre d'entrées affichées

## 🎯 Fonctionnalités du tableau

- ✅ Tri multi-colonnes
- ✅ Recherche globale
- ✅ Pagination
- ✅ Nombre d'entrées configurable (10, 25, 50, 100)
- ✅ Export des données (à venir)

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/amelioration`)
3. Commit les changements (`git commit -m 'Ajout fonctionnalité'`)
4. Push vers la branche (`git push origin feature/amelioration`)
5. Ouvrir une Pull Request

## 📝 Changelog

### v1.0.0 (2025)
- 🎉 Version initiale
- ✨ Formulaire de création d'employés
- 📊 Tableau interactif avec TanStack Table
- 🔄 Intégration Redux Toolkit

## 📄 Licence

MIT © [Araujo Manon](https://github.com/AraujoManon)

---

<div align="center">

**Développé avec ❤️ par Manon Araujo**


</div>