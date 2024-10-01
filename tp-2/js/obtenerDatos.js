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
    let playlist = document.createElement("ul");
    playlist.className = "playlist";

    let barraPlaylist = document.createElement("div");
    barraPlaylist.className = "barraPlaylist";

    let imagenPlaylist = document.createElement("img");
    imagenPlaylist.src = datos.images[0].url;
    let nombrePlaylist = document.createElement("h3");
    nombrePlaylist.textContent = datos.name;
    let botonDesplegar = document.createElement("div");
    botonDesplegar.className = "botonDesplegar";
    botonDesplegar.innerHTML = '<label><input type="checkbox"><svg width="30" height="30" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 18L24 30L36 18" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg></label>';
    let canciones = document.createElement("div");
    canciones.className = "canciones";

    barraPlaylist.appendChild(imagenPlaylist);
    barraPlaylist.appendChild(nombrePlaylist);

    let descripcion = document.createElement("span");
    descripcion.textContent = datos.description;
    barraPlaylist.appendChild(descripcion);

    barraPlaylist.appendChild(botonDesplegar);

    agregarCanciones(datos, canciones);

    playlist.appendChild(barraPlaylist);
    playlist.appendChild(canciones);

    playlists.appendChild(playlist);
}

function agregarCanciones(datos, canciones) {

    for (let item of datos.tracks.items) {
        let track = item.track;

        let cancion = document.createElement("li");
        cancion.className = "cancion";
        let nombreCancion = document.createElement("h3");
        nombreCancion.textContent = track.name;
        let imagenCancion = document.createElement("img");
        imagenCancion.src = track.album.images[0].url;
        let nombreAlbum = document.createElement("h5");
        nombreAlbum.textContent = track.album.name;

        let nombresArtistas;
        for (let artista of track.artists) {
            nombresArtistas = document.createElement("h5");
            nombresArtistas.textContent += artista.name;
        }

        let contenedorCancionE = document.createElement("div");
        contenedorCancionE.className = "infoCancionEX";
        contenedorCancionE.appendChild(nombreCancion)


        let contenedorNombres = document.createElement("div");
        contenedorNombres.className = "infoCancion";
        contenedorNombres.appendChild(contenedorCancionE);
        contenedorNombres.appendChild(nombresArtistas);

        cancion.appendChild(imagenCancion);
        cancion.appendChild(contenedorNombres);
        if (track.explicit) {
            contenedorCancionE.innerHTML += '<svg class="explicito" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#666"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" /><path d="M15 15h-4v-2h4v-2h-4V9h4V7H9v10h6z" /></svg>'
        }

        let botonDesplegar = document.createElement("div");
        botonDesplegar.className = "botonDesplegar";
        botonDesplegar.innerHTML = '<label><input type="checkbox"><svg width="30" height="30" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 18L24 30L36 18" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg></label>';

        if (track.preview_url != null) {
            let reproductor = document.createElement("div");
            reproductor.className = "reproductor";

            let preview = document.createElement("audio");
            preview.src = track.preview_url;

            let reproducir = document.createElement("div");
            reproducir.className = "reproducir";
            let botonReproducir = document.createElement("button");
            botonReproducir.type = "button";
            let iconoPlay = document.createElement("img");
            iconoPlay.src = "../resources/play-1003-svgrepo-com.svg";
            iconoPlay.className = "botonReproducir";
            botonReproducir.addEventListener('click', function () { reproducir_preview(preview,iconoPlay) });
            
            botonReproducir.appendChild(iconoPlay);
            reproducir.appendChild(botonReproducir);

            let silenciar = document.createElement("div");
            silenciar.className = "silenciar";
            let botonSilenciar = document.createElement("button");
            botonSilenciar.type = "button";
            let iconoSilenciar = document.createElement("img");
            iconoSilenciar.src = "../resources/volume-up-solid-svgrepo-com.svg";
            iconoSilenciar.className = "botonSilenciar";
            botonSilenciar.addEventListener('click', function () { silenciar_preview(preview,iconoSilenciar) });

            botonSilenciar.appendChild(iconoSilenciar);
            silenciar.appendChild(botonSilenciar);

            reproductor.appendChild(reproducir);
            reproductor.appendChild(silenciar);
            reproductor.appendChild(preview);
            cancion.appendChild(reproductor);

            /* 
            let preview = document.createElement("audio");
            preview.volume = 0.2;
            preview.controls = true;
            let previewSource = document.createElement("source");
            previewSource.src = track.preview_url;
            preview.appendChild(previewSource);
            cancion.appendChild(preview); 
            */
        }

        cancion.appendChild(botonDesplegar);

        /*
                let labelPopular = document.createElement("label");
                let barrita = document.createElement("meter");
                barrita.max = 100;
                barrita.min = 0;
                labelPopular.appendChild(barrita);
                let popularidad = track.popularity;
                labelPopular.textContent = "Popularidad:";
                barrita.value = popularidad;
                cancion.appendChild(labelPopular);
        */

        canciones.appendChild(cancion);
    }
}

let estaReproducido = false;

let audio = new Audio;
let iconoActual;

function reproducir_preview(audioTag, icono) {
    // si se reproduce otra cancion que no es la actual
    if (audio.currentSrc != audioTag.src) {
        audio.pause();
        if (iconoActual == undefined) {
            iconoActual = icono;
        }
        iconoActual.src = "../resources/play-1003-svgrepo-com.svg";
        audio = new Audio(audioTag.src);
        audio.volume = 0.2;
        estaReproducido = false;
        audio.onplaying = function () {
            estaReproducido = true;
        };
        audio.onpause = function () {
            estaReproducido = false;
        };

    }

    if (!estaReproducido) {
        audio.play();
        icono.src = "../resources/pause-1006-svgrepo-com.svg";
    } else {
        audio.pause();
        icono.src = "../resources/play-1003-svgrepo-com.svg";
    }
    iconoActual = icono;
}

function silenciar_preview(audioTag, icono) {
    if (audio.currentSrc == audioTag.src) {
        audio.muted = !audio.muted;
        if (audio.muted) {
            icono.src = "../resources/volume-off-solid-svgrepo-com.svg";
        } else {
            icono.src = "../resources/volume-up-solid-svgrepo-com.svg";
        }
    }
}

