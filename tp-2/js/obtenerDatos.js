const urls = [
    'http://127.0.0.1:3000/tp-2/json/asadito-cumbiero.json',
    'http://127.0.0.1:3000/tp-2/json/pop-mix.json',
    'http://127.0.0.1:3000/tp-2/json/rock-ingles.json',
    'http://127.0.0.1:3000/tp-2/json/rock-nacional.json',
    'http://127.0.0.1:3000/tp-2/json/exitos-argentina.json',
    'http://127.0.0.1:3000/tp-2/json/edm-hits.json',
    'http://127.0.0.1:3000/tp-2/json/electronica.json',
    'http://127.0.0.1:3000/tp-2/json/pop-up.json'
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

    var descripcion = document.createElement("span");
    descripcion.textContent = datos.description;
    barraPlaylist.appendChild(descripcion);

    barraPlaylist.appendChild(botonDesplegar);

    agregarCanciones(datos, canciones);

    playlist.appendChild(barraPlaylist);
    playlist.appendChild(canciones);

    playlists.appendChild(playlist);
}

function agregarCanciones(datos, canciones) {

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

        for (var artista of track.artists) {
            var nombresArtistas = document.createElement("h5");
            nombresArtistas.textContent += artista.name;
        }

        var contenedorCancionE = document.createElement("div");
        contenedorCancionE.className = "infoCancionEX";
        contenedorCancionE.appendChild(nombreCancion)


        var contenedorNombres = document.createElement("div");
        contenedorNombres.className="infoCancion";
        contenedorNombres.appendChild(contenedorCancionE);
        contenedorNombres.appendChild(nombresArtistas);
        
        cancion.appendChild(imagenCancion);
        cancion.appendChild(contenedorNombres);
        if (track.explicit) {
            contenedorCancionE.innerHTML += '<svg class="explicito" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#666"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" /><path d="M15 15h-4v-2h4v-2h-4V9h4V7H9v10h6z" /></svg>'
        }
        
        var botonDesplegar = document.createElement("div");
        botonDesplegar.className = "botonDesplegar";
        botonDesplegar.innerHTML = '<label><input type="checkbox"><svg width="30" height="30" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 18L24 30L36 18" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg></label>';

        if (track.preview_url != null) {
            var preview = document.createElement("audio");
            preview.volume = 0.2;
            preview.controls = true;
            var previewSource = document.createElement("source");
            previewSource.src = track.preview_url;
            preview.appendChild(previewSource);
            cancion.appendChild(preview);
        }

        cancion.appendChild(botonDesplegar);

/*
        var labelPopular = document.createElement("label");
        var barrita = document.createElement("meter");
        barrita.max = 100;
        barrita.min = 0;
        labelPopular.appendChild(barrita);
        var popularidad = track.popularity;
        labelPopular.textContent = "Popularidad:";
        barrita.value = popularidad;
        cancion.appendChild(labelPopular);
*/

        

        canciones.appendChild(cancion);
    }
}

