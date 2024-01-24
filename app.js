const express = require('express');
const sequelize = require('./database');
const pokemonRoutes = require('./routes/pokemonRoutes');

const app = express();
app.use(express.json());

// synchnonisation des modèles Sequelize avec la base de données
sequelize.sync().then(() => {
    console.log('Connexion à la base de données établie et modèles synchronisés');
}).catch((error) => {
    console.error('Impossible de se connecter à la base de données:', error);
});

// appel des routes que j'ai creer dans un dans pokemon Routes
app.use('/pokemons', pokemonRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
