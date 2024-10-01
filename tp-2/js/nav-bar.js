let nav = document.getElementById("navegacion");

let logoTitulo = document.createElement("div");
logoTitulo.id = "logoTitulo";
let logo = document.createElement("img");
logo.id = "logo";
logo.src = "../resources/iconofai grande.png";
logo.alt = "SpotiFAI";
let titulo = document.createElement("h1");
titulo.textContent = "SpotiFAI";

logoTitulo.appendChild(logo);
logoTitulo.appendChild(titulo);

nav.appendChild(logoTitulo);

let lista = document.createElement("ul");

let inicio = document.createElement("li");
inicio.textContent = "Inicio";
let linkInicio = document.createElement("a");
linkInicio.className = "botonNav";
linkInicio.href = "index.html";
inicio.appendChild(linkInicio);
lista.appendChild(inicio);

let playlists = document.createElement("li");
playlists.textContent = "Playlists";
let linkPlaylists = document.createElement("a");
linkPlaylists.className = "botonNav";
linkPlaylists.href = "playlists.html";
playlists.appendChild(linkPlaylists);
lista.appendChild(playlists);

let faq = document.createElement("li");
faq.textContent = "FAQ";
let linkFAQ = document.createElement("a");
linkFAQ.className = "botonNav";
linkFAQ.href = "faq.html";
faq.appendChild(linkFAQ);
lista.appendChild(faq);

let contacto = document.createElement("li");
contacto.textContent = "Quiénes somos";
let linkContacto = document.createElement("a");
linkContacto.className = "botonNav";
linkContacto.href = "contacto.html";
contacto.appendChild(linkContacto);
lista.appendChild(contacto);

nav.appendChild(lista);