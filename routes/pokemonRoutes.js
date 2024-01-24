const express = require('express');
const Pokemon = require('../models/pokemon');
const router = express.Router();

// Obtenir tous les Pokémon
router.get('/', async (req, res) => {
    try {
        const pokemons = await Pokemon.findAll();
        res.json(pokemons);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Obtenir un Pokémon par ID
router.get('/:id', async (req, res) => {
    try {
        const pokemon = await Pokemon.findByPk(req.params.id);
        if (pokemon) {
            res.json(pokemon);
        } else {
            res.status(404).send('Pokémon not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Créer un nouveau Pokémon
router.post('/', async (req, res) => {
    try {
        const newPokemon = await Pokemon.create(req.body);
        res.status(201).json(newPokemon);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Mettre à jour un Pokémon
router.put('/:id', async (req, res) => {
    try {
        const pokemon = await Pokemon.findByPk(req.params.id);
        if (pokemon) {
            await pokemon.update(req.body);
            res.json(pokemon);
        } else {
            res.status(404).send('Pokémon not found');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Supprimer un Pokémon
router.delete('/:id', async (req, res) => {
    try {
        const pokemon = await Pokemon.findByPk(req.params.id);
        if (pokemon) {
            await pokemon.destroy();
            res.status(204).send();
        } else {
            res.status(404).send('Pokémon not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
