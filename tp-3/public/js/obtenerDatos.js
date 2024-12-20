let ultimaID = 0;

let botonCargar = document.getElementById('botonCargar');

obtenerPlaylists();
async function obtenerPlaylists() {
    const response = await fetch(`http://localhost:3000/api/playlist?from=${ultimaID + 1}`,
        {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json'
            }
        });
    const data = await response.json();
    if (data && data.playlists) {
        ultimaID = data.ultimaID - 1;
        data.playlists.map(playlist => agregarPlaylists(playlist));
    }
}

function agregarPlaylists(datos) {
    if (datos.tracks) {
        const cantCanciones = Object.keys(datos.tracks.items).length;
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
        nombrePlaylist.style.textShadow = "2px 2px 5px rgba(0, 0, 0, 0.8)";

        let inputDesplegar = document.createElement("input");
        inputDesplegar.type = "checkbox";

        let labelDesplegar = document.createElement("label");
        labelDesplegar.appendChild(inputDesplegar);

        let botonDesplegar = document.createElement("div");
        botonDesplegar.className = "botonDesplegar";
        /* botonDesplegar.innerHTML = '<label><input type="checkbox"><svg width="30" height="30" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 18L24 30L36 18" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg></label>'; */
        botonDesplegar.appendChild(labelDesplegar);

        let canciones = document.createElement("div");
        canciones.className = "canciones";

        barraPlaylist.appendChild(imagenPlaylist);
        barraPlaylist.appendChild(nombrePlaylist);

        let descripcion = document.createElement("span");
        descripcion.textContent = datos.description;
        barraPlaylist.appendChild(descripcion);

        barraPlaylist.appendChild(botonDesplegar);

        agregarCanciones(datos, canciones);

        inputDesplegar.addEventListener("change", function () {
            if (this.checked) {
                canciones.style.maxHeight = cantCanciones * 110 + "px";
            } else {
                canciones.style.maxHeight = 0;
            }
        })

        playlist.appendChild(barraPlaylist);
        playlist.appendChild(canciones);

        playlists.appendChild(playlist);
    } else {
        const playlists = document.getElementById("playlists");

        // lista con barraPlaylist y canciones
        let playlist = document.createElement("ul");
        playlist.className = "playlist";

        let barraPlaylist = document.createElement("div");
        barraPlaylist.className = "barraPlaylist";

        let imagenPlaylist = document.createElement("div");
        imagenPlaylist.className = "imagenfalsa";
        barraPlaylist.appendChild(imagenPlaylist);

        let nombrePlaylist = document.createElement("h3");
        nombrePlaylist.textContent = datos.name;
        nombrePlaylist.style.textShadow = "2px 2px 5px rgba(0, 0, 0, 0.8)";
        barraPlaylist.appendChild(nombrePlaylist);

        let descripcion = document.createElement("span");
        descripcion.textContent = datos.description;
        barraPlaylist.appendChild(descripcion);

        playlist.appendChild(barraPlaylist);

        playlists.appendChild(playlist);
    }
}

function agregarCanciones(datos, canciones) {
    for (let item of datos.tracks.items) {
        let track = item.track;

        let columnas = document.createElement("div");
        columnas.className = "columnasCancion";

        let cancion = document.createElement("li");
        cancion.className = "cancion";
        let nombreCancion = document.createElement("h3");
        nombreCancion.textContent = track.name;
        nombreCancion.style.fontWeight = "bold";
        let imagenCancion = document.createElement("img");
        imagenCancion.src = track.album.images[0].url;

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

            botonReproducir.appendChild(iconoPlay);
            reproducir.appendChild(botonReproducir);

            let silenciar = document.createElement("div");
            silenciar.className = "silenciar";
            let botonSilenciar = document.createElement("button");
            botonSilenciar.type = "button";
            let iconoSilenciar = document.createElement("img");
            iconoSilenciar.src = "../resources/volume-up-solid-svgrepo-com.svg";
            iconoSilenciar.className = "botonSilenciar";

            botonSilenciar.appendChild(iconoSilenciar);
            silenciar.appendChild(botonSilenciar);

            botonReproducir.addEventListener('click', function () { reproducir_preview(preview, iconoPlay, iconoSilenciar) });
            botonSilenciar.addEventListener('click', function () { silenciar_preview(preview, iconoSilenciar) });

            reproductor.appendChild(reproducir);
            reproductor.appendChild(silenciar);
            reproductor.appendChild(preview);
            cancion.appendChild(reproductor);
        }

        cancion.appendChild(botonDesplegar);

        let infoExtra = document.createElement("div");
        infoExtra.className = "infoExtra";

        //album
        let nombreAlbum = document.createElement("h3");
        nombreAlbum.textContent = "💿 " + track.album.name;
        infoExtra.appendChild(nombreAlbum);

        //fecha album
        let fechaAlbum = document.createElement("h4");
        fechaAlbum.textContent = "🗓️ " + track.album.release_date;
        infoExtra.appendChild(fechaAlbum);

        let labelPopular = document.createElement("label");
        let barrita = document.createElement("meter");
        barrita.max = 100;
        barrita.min = 0;

        labelPopular.appendChild(barrita);
        let popularidad = track.popularity;
        labelPopular.textContent = "📈 Popularidad: ";

        barrita.value = popularidad;
        infoExtra.appendChild(labelPopular);
        infoExtra.appendChild(barrita);

        columnas.appendChild(cancion);
        columnas.appendChild(infoExtra);

        canciones.appendChild(columnas);
    }
}

