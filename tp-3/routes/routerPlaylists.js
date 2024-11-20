const express = require('express');
const routerPlaylists = express.Router();
const { crearPlaylist, editarPlaylist, obtenerPlaylistPorID, obtenerPlaylistsFiltro } = require('./controllers/controllerPlaylists');

routerPlaylists
    // Crea playlist
    .post('/api/playlist', crearPlaylist)

    // Edita playlist a través del body
    // Primero busca por idPlaylist y luego reemplaza su respectiva playlist por 
    .put('/api/playlist/:idPlaylist', editarPlaylist)

    // Obtiene playlist determinada por parámetro id
    .get('/api/playlist/:idPlaylist', obtenerPlaylistPorID)

    // Obtiene 3 playlists para realizar la paginación (a través de un botón 'Cargar más' se envían las faltantes)
    .get('/api/playlist', obtenerPlaylistsPaginadas)

module.exports = routerPlaylists;