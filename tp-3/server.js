const express = require("express");

const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../tp-3")));

app.use('/tp-3/css', express.static(path.join(__dirname, "../tp-3/css")));
app.use('/tp-3/json', express.static(path.join(__dirname, "../tp-3/json")));
app.use('/tp-3/js', express.static(path.join(__dirname, "../tp-3/js")));
app.use('/tp-3/resources', express.static(path.join(__dirname, "../tp-3/resources")));
app.use('/tp-3/html', express.static(path.join(__dirname, "../tp-3/html")));

const usuarios = JSON.parse(fs.readFileSync(path.join(__dirname, '/usuarios.json'), 'utf8'));
const index = fs.readFileSync(path.join(__dirname, '../tp-3/html/index.html'));
const playlistsHTML = fs.readFileSync(path.join(__dirname, '../tp-3/html/playlists.html'));
const faq = fs.readFileSync(path.join(__dirname, '../tp-3/html/faq.html'));
const contacto = fs.readFileSync(path.join(__dirname, '../tp-3/html/contacto.html'));

app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});

app.get('/contacto', (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.write(contacto);
  res.end();
});

app.get('/playlists', (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.write(playlistsHTML);
  res.end();
});

app.get('/faq', (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.write(faq);
  res.end();
});

app.get('/', (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.write(index);
  res.end();
});

app.post('/api/agregarplaylist', (req, res) => {
  const { id, name, description } = req.body;
  const json = JSON.stringify({ id, name, description });
  fs.writeFile(path.join(__dirname, `/json/${name}.json`), json, 'utf-8', () => { });
  res.json({ message: 'Playlist creada correctamente!', data: { id, name, description } });
});

app.put('/api/editarplaylist/:idPlaylist', (req, res) => {
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

app.get('/api/obtenerplaylist/:idPlaylist', (req,res) => {
  const idPlaylist = parseInt(req.params.idPlaylist);
  const playlists = loadPlaylists();
  const playlistIndex = playlists.findIndex(p => p.id === idPlaylist);
  if (playlistIndex == -1) {
    return res.status(404).json({ message: 'No se encontró la playlist' });
  }
  res.json({ message: 'Playlist obtenida!', playlist: playlists[playlistIndex] });
});

app.get('/api/obtenerplaylists', (req,res) => {
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
  console.log(`Example app listening on port ${port}!`);
});

function loadPlaylists() {
  const rutaJsons = path.join(__dirname, '/json');
  const files = fs.readdirSync(rutaJsons);
  return files.map(file => {
    const filePath = path.join(rutaJsons, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  });
}