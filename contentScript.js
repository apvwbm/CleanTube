// Función para eliminar contenedores según el texto del span
function removeElementsByText(text) {
    const spans = document.querySelectorAll('span');

    spans.forEach(function (span) {
        if (span.textContent.trim() === text) {
            const dismissibleContainer = span.closest('#dismissible');
            if (dismissibleContainer) {
                dismissibleContainer.remove();
            }
        }
    });
}

// Función para eliminar tanto Shorts como Últimas noticias
function cleanYouTube() {
    removeElementsByText('Shorts');
    removeElementsByText('Últimas noticias');
    removeElementsByText('Last news');
}

// Configurar un observador para detectar cambios en el DOM
const observer = new MutationObserver(function (mutationsList) {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            cleanYouTube(); // Ejecutar la limpieza cada vez que haya cambios en el DOM
        }
    }
});

// Observar el contenedor principal de YouTube
const targetNode = document.body;
const config = { childList: true, subtree: true }; // Observar todos los nodos hijos y subárboles

// Iniciar el observador
observer.observe(targetNode, config);

// Escuchar mensajes del popup
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'enable') {
        cleanYouTube();
        location.reload();
    } else if (request.action === 'disable') {
        location.reload();
    }
});
