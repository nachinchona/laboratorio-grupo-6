let estaReproducido = false;

// ya construidos para no hacer chequeo de undefined
let audio = new Audio;
let iconoActualPlay = document.createElement("img");
let iconoActualSilenciar = document.createElement("img");

function reproducir_preview(audioTag, iconoPlay, iconoSilenciar) {
    // si se reproduce otra cancion que no es la actual
    if (audio.currentSrc != audioTag.src) {
        audio.pause();

        // reiniciar botones de cancion anterior
        iconoActualPlay.src = "../resources/play-1003-svgrepo-com.svg";
        iconoActualSilenciar.src = "../resources/volume-up-solid-svgrepo-com.svg";
        
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
        iconoPlay.src = "../resources/pause-1006-svgrepo-com.svg";
    } else {
        audio.pause();
        iconoPlay.src = "../resources/play-1003-svgrepo-com.svg";
    }
    iconoActualPlay = iconoPlay;
    iconoActualSilenciar = iconoSilenciar;
}

function silenciar_preview(audioTag, icono) {
    // solo silencia/desilencia si la cancion es la actual
    if (audio.currentSrc == audioTag.src) {
        if (!audio.muted) {
            icono.src = "../resources/volume-off-solid-svgrepo-com.svg";
        } else {
            icono.src = "../resources/volume-up-solid-svgrepo-com.svg";
        }
        audio.muted = !audio.muted;
    }
}