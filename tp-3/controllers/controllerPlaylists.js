const { type } = require('express/lib/response');
const { loadPlaylists, writePlaylist } = require('../models/loadPlaylists');

const crearPlaylist = (req, res) => {
    const { id, name, description } = req.body;
    const json = JSON.stringify({ id, name, description });

    if (typeof id == "string" && id > 0) {
        return res.status(400).json({ message: 'Id invalida' });
    }
    const variasPlaylists = loadPlaylists();
    for (let playlist of variasPlaylists) {
        if (playlist.id == id) {
            return res.status(400).json({ message: 'Id ya existente' });
        }
    }

    writePlaylist(`playlist-${id}.json`);
    res.json({ message: 'Playlist creada correctamente!', data: { id, name, description } });

};

const editarPlaylist = (req, res) => {
    const idPlaylist = parseInt(req.params.idPlaylist);
    const { name, description } = req.body;
    const playlists = loadPlaylists();
    const playlistIndex = playlists.findIndex(p => p.id === idPlaylist);
    if (!idPlaylist) {
        return res.status(400).json({ message: 'Id no especificada' });
    }

    if (playlistIndex == -1) {
        return res.status(404).json({ message: 'No se encontró la playlist' });
    }

    if (typeof name !== "String" && idPlaylist < 1) {
        return res.status(400).json({ message: 'Nombre Invalido' });
    }

    if (typeof description !== "String") {
        return res.status(400).json({ message: 'Descripcion Invalida' });
    }

    if (name) playlists[playlistIndex].name = name;
    if (description) playlists[playlistIndex].description = description;

    const updatedPlaylist = playlists[playlistIndex];
    const rutaJsons = path.join(__dirname, '/public/json');
    const filePath = path.join(rutaJsons, `playlist-${updatedPlaylist.id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(updatedPlaylist, null, 2), 'utf-8');
    res.json({ message: 'Playlist actualizada correctamente!', playlist: updatedPlaylist });
};

const obtenerPlaylistPorID = (req, res) => {
    const idPlaylist = parseInt(req.params.idPlaylist);
    const playlists = loadPlaylists();
    const playlistIndex = playlists.findIndex(p => p.id === idPlaylist);
    if (!idPlaylist) {
        return res.status(400).json({ message: 'Id no especificada' });
    }

    if (playlistIndex == -1) {
        return res.status(404).json({ message: 'No se encontró la playlist' });
    }
    res.json({ message: 'Playlist obtenida!', playlist: playlists[playlistIndex] });
};

const obtenerPlaylistsPaginadas = (req, res) => {
    const from = parseInt(req.query.from);
    if (!from || isNaN(from)) {
        return res.status(404).json({ message: 'Parámetros query no especificados' });
    }

    let ultimaID;
    const playlists = loadPlaylists();
    let playlistsEncontradas = [];
    playlists.sort((a, b) => a.id - b.id);
    let i = 0
    while (i < playlists.length) { //peor caso tuvo que iterar toda la coleccion de playlists
        let playlist = playlists[i]; //agarro una
        if (playlist.id > from) {
            if ((i + 1) % 3 == 0) {
                if (i !== playlist.length - 1) {
                    ultimaID = playlist.id;
                } else {
                    ultimaID = NaN;
                }
                playlistsEncontradas.push(playlist);
            }
            i++;
        }
    }
    
    if (playlistsEncontradas.length === 0) {
        return res.status(404).json({ message: 'No se encontraron playlists' });
    }

    res.json({ message: 'Playlists obtenidas!', playlists: playlistsEncontradas, ultimaID: ultimaID });

};

module.exports = { crearPlaylist, editarPlaylist, obtenerPlaylistPorID, obtenerPlaylistsPaginadas };