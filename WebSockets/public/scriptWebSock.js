window.onload=function(){
    const socket = io.connect(window.location.origin);

    document.getElementById('botonBusq').addEventListener('click', function() {
        const nombrePersonaje = document.getElementById('inputBusq').value.trim();
        if(nombrePersonaje) {
            socket.emit('buscarPersonaje', { nombre: nombrePersonaje });
        }
    });

    socket.on('resultadoBusqueda', function(comics) {
        mostrarComics(comics);
    });

    socket.on('errorBusqueda', function(error) {
        console.error(error.message);
        alert(error.message); 
    });

    function mostrarComics(comics) {
        const contenedorComics = document.getElementById('comicsContainer');
        contenedorComics.innerHTML = ''; // neteja els anteriors resultats
    
        comics.forEach(comic => {
            const elementoComic = document.createElement('div');
            elementoComic.className = 'comic';
            elementoComic.innerHTML = `
                <img src="${comic.thumbnail.path}.${comic.thumbnail.extension}" alt="${comic.title}">
                <p>${comic.title}</p>
            `;
            contenedorComics.appendChild(elementoComic);
    
            if (elementoComic) { // comproba si existeix, si no, pot donar error 
                elementoComic.addEventListener('click', () => {
                    mostrarDetallesComic(comic);
                });
            }
        });
    }
    function mostrarDetallesComic(comic) {
        const comicDetalls = document.getElementById('comicDetalls');
        comicDetalls.textContent = `Descripció el comic: ${comic.title}.${comic.description}`;
    }
};
