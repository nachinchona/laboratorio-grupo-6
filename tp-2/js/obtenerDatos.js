const urls = [
    'http://127.0.0.1:3000/tp-2/json/asadito-cumbiero.json',
    'http://127.0.0.1:3000/tp-2/json/pop-mix.json',
    'http://127.0.0.1:3000/tp-2/json/rock-ingles.json',
    'http://127.0.0.1:3000/tp-2/json/rock-nacional.json',
    'http://127.0.0.1:3000/tp-2/json/exitos-argentina.json',
    'http://127.0.0.1:3000/tp-2/json/edm-hits.json',
    'http://127.0.0.1:3000/tp-2/json/electronica.json'
];

Promise.all(urls.map(url => fetch(url)
    .then(response => response.json())))
    .then(arregloDatos => {
        arregloDatos.forEach(datos => {
            agregarPlaylists(datos);
        })
    })
    .catch(error => {
        console.error('Error al hacer fetch() a JSON', error);
    });

function agregarPlaylists(datos) {
    const playlists = document.getElementById("playlists");

    // lista con barraPlaylist y canciones
    var playlist = document.createElement("ul");
    playlist.className = "playlist";
    
    var barraPlaylist = document.createElement("div");
    barraPlaylist.className = "barraPlaylist";

    var imagenPlaylist = document.createElement("img");
    imagenPlaylist.src = datos.images[0].url;
    var nombrePlaylist = document.createElement("h3");
    nombrePlaylist.textContent = datos.name;
    var botonDesplegar = document.createElement("div");
    botonDesplegar.className = "botonDesplegar";
    botonDesplegar.innerHTML = '<label><input type="checkbox"><svg width="30" height="30" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 18L24 30L36 18" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg></label>';
    var canciones = document.createElement("div");
    canciones.className = "canciones";

    barraPlaylist.appendChild(imagenPlaylist);
    barraPlaylist.appendChild(nombrePlaylist);
    barraPlaylist.appendChild(botonDesplegar);

    agregarCanciones(datos,canciones);

    playlist.appendChild(barraPlaylist);
    playlist.appendChild(canciones);

    playlists.appendChild(playlist);
}

function agregarCanciones(datos,canciones) {

    for (var item of datos.tracks.items) {
        var track = item.track;

        var cancion = document.createElement("li");
        cancion.className = "cancion";
        var nombreCancion = document.createElement("h3");
        nombreCancion.textContent = track.name;       
        var imagenCancion = document.createElement("img");
        imagenCancion.src = track.album.images[0].url;
        var nombreAlbum = document.createElement("h5");
        nombreAlbum.textContent = track.album.name;

        cancion.appendChild(imagenCancion);
        cancion.appendChild(nombreCancion);
        cancion.appendChild(nombreAlbum); 

        canciones.appendChild(cancion);
    }
}