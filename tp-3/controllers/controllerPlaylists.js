const { loadPlaylists, writePlaylist } = require('../models/loadPlaylists');

const crearPlaylist = (req, res) => {
    const { id, name, description } = req.body;
    const json = JSON.stringify({ id, name, description });
    writePlaylist(`playlist-${id}.json`);
    res.json({ message: 'Playlist creada correctamente!', data: { id, name, description } });
};

const editarPlaylist = (req, res) => {
    const idPlaylist = parseInt(req.params.idPlaylist);
    const { name, description } = req.body;
    const playlists = loadPlaylists();
    const playlistIndex = playlists.findIndex(p => p.id === idPlaylist);
    if (playlistIndex == -1) {
        return res.status(404).json({ message: 'No se encontró la playlist' });
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
    if (playlistIndex == -1) {
        return res.status(404).json({ message: 'No se encontró la playlist' });
    }
    res.json({ message: 'Playlist obtenida!', playlist: playlists[playlistIndex] });
};

const obtenerPlaylistsPaginadas = (req, res) => {
    const from = parseInt(req.query.from);
    if (!from) {
        return res.status(404).json({ message: 'parámetros query no especificados' });
    }
    let ultimaID;
    const playlists = loadPlaylists();
    let iter = 0;
    let playlistsEncontradas = [];
    playlists.sort((a, b) => a.id - b.id);
    console.log(playlists);
    for (let playlist of playlists) {
        if (playlist.id > from) {
            if (iter <= 2) {
                playlistsEncontradas.push(playlist);
            }
            iter++;
            if (iter == 3) {
                ultimaID = playlist.id;
            }
        }
    }
    if (playlistsEncontradas == []) {
        return res.status(404).json({ message: 'No se encontraron playlists' });
    }
    res.json({ message: 'Playlists obtenidas!', playlists: playlistsEncontradas, ultimaID: ultimaID });
};

module.exports = { crearPlaylist, editarPlaylist, obtenerPlaylistPorID, obtenerPlaylistsPaginadas };