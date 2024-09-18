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
        // contenedor div a donde van todas las playlists dinamicamente
        const playlists = document.getElementById("playlists");

        arregloDatos.forEach(datos => {
            var playlist = document.createElement("ul");
            playlist.className = "playlist";
            var imagenPlaylist = document.createElement("img");
            imagenPlaylist.src = datos.images[0].url;
            var nombrePlaylist = document.createElement("h3");
            nombrePlaylist.textContent = datos.name;
            var fotoYNombre = document.createElement("div");
            fotoYNombre.appendChild(imagenPlaylist);
            fotoYNombre.appendChild(nombrePlaylist);
            var botonDesplegar = document.createElement("div");
            botonDesplegar.className = "botonDesplegar";
            botonDesplegar.innerHTML = '<label><input type="checkbox"><svg width="30" height="30" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 18L24 30L36 18" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg></label>';

            playlist.appendChild(fotoYNombre);
            playlist.appendChild(botonDesplegar);

            playlists.appendChild(playlist);
        })
    })
    .catch(error => {
        console.error('Error al hacer fetch() a JSON', error);
    });