
    const preguntas = document.querySelectorAll(".preguntaEncabezado");
    
    preguntas.forEach(pregunta => {
        pregunta.addEventListener('click',() => {
            pregunta.nextElementSibling.classList.toggle('activo');
        })
    })

