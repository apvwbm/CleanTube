// Al cargar el popup, configurar el toggle según el estado guardado
document.addEventListener('DOMContentLoaded', function () {
    const toggleSwitch = document.getElementById('toggleReels');

    // Leer el estado guardado
    chrome.storage.sync.get(['cleanYoutubeEnabled'], function (result) {
        toggleSwitch.checked = result.cleanYoutubeEnabled || false;
    });

    // Manejar el cambio de estado del toggle
    toggleSwitch.addEventListener('change', function () {
        const isChecked = toggleSwitch.checked;

        // Guardar el nuevo estado
        chrome.storage.sync.set({ cleanYoutubeEnabled: isChecked }, function () {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                if (tabs[0]) {
                    chrome.tabs.sendMessage(tabs[0].id, { action: isChecked ? 'enable' : 'disable' });
                }
            });
        });
    });
});
