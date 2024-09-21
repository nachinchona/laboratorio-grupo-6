var es = false;
const audio = new Audio("https://p.scdn.co/mp3-preview/a7718f2e0bdad78f08cd7c9f3240ddb8374a5f32?cid=96d19b8fd5ab4cf0b06c69e802c925a1");

function reproducir() {
    if (!es) {
        audio.play();
    } else {
        audio.pause();
    }
}

audio.onplaying = function () {
    es = true;
};
audio.onpause = function () {
    es = false;
};