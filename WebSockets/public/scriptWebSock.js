window.onload = function(){
    const socket = io.connect();

    // Referencia a elementos del DOM
    const inputBusq = document.getElementById('inputBusq');
    const botonBusq = document.getElementById('botonBusq');
    const comicsContainer = document.getElementById('comicsContainer');

    // Escucha del evento 'click' en el botón de búsqueda
    botonBusq.addEventListener('click', function() {
        const characterName = inputBusq.value.trim();
        if (characterName) {
            socket.emit('buscarPersonaje', { name: characterName });
        }
    });

    // Escucha de eventos emitidos por el servidor
    socket.on('personajeEncontrado', function(data) {
        mostrarComics(data.comics);
    });

    socket.on('errorBusqueda', function(mensaje) {
        console.error(mensaje);
        // Mostrar algún mensaje de error o realizar alguna acción
    });

    function mostrarComics(comics) {
        comicsContainer.innerHTML = ''; // Limpiar resultados anteriores
        comics.forEach(function(comic) {
            const comicElement = document.createElement('div');
            comicElement.className = 'comic';
            comicElement.innerHTML = `
                <img src="${comic.thumbnail.path}.${comic.thumbnail.extension}" alt="${comic.title}">
                <p>${comic.title}</p>
            `;
            comicsContainer.appendChild(comicElement);
        });
    }
};