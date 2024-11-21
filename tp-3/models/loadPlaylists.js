const path = require('path');
const fs = require('fs');

function loadPlaylists() {
    const rutaJsons = path.join(__dirname, '../public/json');
    const files = fs.readdirSync(rutaJsons);
    return files.map(file => {
        const filePath = path.join(rutaJsons, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(content);
    });
}

function writePlaylist(name) {
    fs.writeFile(path.join(__dirname, `/public/json/${name}.json`), 'utf-8', () => { });
}

module.exports = { loadPlaylists, writePlaylist };