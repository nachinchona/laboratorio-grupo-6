window.addEventListener('load', function () {
    document.getElementById('loaderCaja').style.display = 'none';
    document.getElementById('contenido').style.display = 'block';
});

var estaReproducido = false;
const audio = new Audio("https://p.scdn.co/mp3-preview/a7718f2e0bdad78f08cd7c9f3240ddb8374a5f32?cid=96d19b8fd5ab4cf0b06c69e802c925a1");
audio.volume = 0.2;

function reproducir() {
    if (!estaReproducido) {
        audio.play();
    } else {
        audio.pause();
    }
}

function silenciar() {
    audio.muted = !audio.muted;
}

audio.onplaying = function () {
    estaReproducido = true;
};
audio.onpause = function () {
    estaReproducido = false;
};
