# Mini-Jeu pour Madame

Une application web interactive et ludique créée avec React et Vite.

## 🚀 Déploiement sur Vercel

1. **Installer les dépendances**
   ```bash
   npm install
   ```

2. **Lancer en développement**
   ```bash
   npm run dev
   ```
   Ouvrez [http://localhost:5173](http://localhost:5173)

3. **Déployer sur Vercel**
   - Connectez votre repository GitHub à Vercel
   - Ou utilisez la CLI Vercel :
     ```bash
     npm i -g vercel
     vercel
     ```

## 📁 Structure du projet

- `src/` - Code source React
  - `App.jsx` - Composant principal avec gestion des écrans
  - `screens/` - Composants d'écrans (Intro, Games, Final)
  - `index.css` - Styles globaux et animations
- `index.html` - Point d'entrée HTML

## 🎮 Fonctionnalités

- Système d'écrans sans routing (transitions fluides)
- Mini-jeu de clic rapide
- Quiz interactif
- Choix d'activités
- Invitation finale avec gestion des réponses
- Sauvegarde de progression (localStorage)
- Design responsive et animations fluides

## 🛠️ Technologies

- React 18
- Vite
- Tailwind CSS
- JavaScript (pas de TypeScript)

## 🎨 Transitions

- Fade in/out
- Slide (gauche/droite)
- Scale
- Animations CSS personnalisées
