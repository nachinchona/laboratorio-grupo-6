const express = require("express");

const app = express();
const port = 3000;
const path = require('path');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'public')))

const routerPlaylists = require("./routes/routerPlaylists");
app.use("/api/playlist/", routerPlaylists);

app.listen(port, function () {
  console.log(`SpotiFAI en http://localhost:${port} !`);
});