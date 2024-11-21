const express = require('express');
const routerPlaylists = express.Router();
const { crearPlaylist, editarPlaylist, obtenerPlaylistPorID, obtenerPlaylistsPaginadas } = require('../controllers/controllerPlaylists');

routerPlaylists
    // Crea playlist
    .post('/', crearPlaylist)

    // Edita playlist a través del body
    // Primero busca por idPlaylist y luego reemplaza su respectiva playlist por 
    .put('/:idPlaylist', editarPlaylist)

    // Obtiene playlist determinada por parámetro id
    .get('/:idPlaylist', obtenerPlaylistPorID)

    // Obtiene 3 playlists para realizar la paginación (a través de un botón 'Cargar más' se envían las faltantes)
    .get('/', obtenerPlaylistsPaginadas);

module.exports = routerPlaylists;