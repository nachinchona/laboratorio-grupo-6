const express = require("express");

const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'public')))

// Crea playlist
app.post('/api/playlist', (req, res) => {
  const { id, name, description } = req.body;
  const json = JSON.stringify({ id, name, description });
  fs.writeFile(path.join(__dirname, `/public/json/${name}.json`), json, 'utf-8', () => { });
  res.json({ message: 'Playlist creada correctamente!', data: { id, name, description } });
});

// Edita playlist a través del body
// Primero busca por idPlaylist y luego reemplaza su respectiva playlist por 
app.put('/api/playlist/:idPlaylist', (req, res) => {
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
  const rutaJsons = path.join(__dirname, '/json');
  const filePath = path.join(rutaJsons, `playlist-${updatedPlaylist.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(updatedPlaylist, null, 2), 'utf-8');
  res.json({ message: 'Playlist actualizada correctamente!', playlist: updatedPlaylist });
});

// Obtiene playlist determinada por parámetro id
app.get('/api/playlist/:idPlaylist', (req,res) => {
  const idPlaylist = parseInt(req.params.idPlaylist);
  const playlists = loadPlaylists();
  const playlistIndex = playlists.findIndex(p => p.id === idPlaylist);
  if (playlistIndex == -1) {
    return res.status(404).json({ message: 'No se encontró la playlist' });
  }
  res.json({ message: 'Playlist obtenida!', playlist: playlists[playlistIndex] });
});

// Obtiene playlist determinada por query cantidad y from (cuantas y desde que id)
app.get('/api/playlist', (req,res) => {
  const cantidad = parseInt(req.query.cantidad) || 0;
  const from = parseInt(req.query.from) || 0;
  const playlists = loadPlaylists();
  let iter = 0;
  let playlistsEncontradas = [];
  for (let playlist of playlists) {
    if (playlist.id > from && iter < cantidad) {
      playlistsEncontradas.push(playlist);
    }
    iter++;
  }
  if (playlistsEncontradas == []) {
    return res.status(404).json({ message: 'No se encontraron playlists' });
  }
  res.json({ message: 'Playlists obtenidas!', playlists: playlistsEncontradas });
});


app.listen(port, function () {
  console.log(`SpotiFAI en http://localhost:${port} !`);
});

function loadPlaylists() {
  const rutaJsons = path.join(__dirname, '/public/json');
  const files = fs.readdirSync(rutaJsons);
  return files.map(file => {
    const filePath = path.join(rutaJsons, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  });
}