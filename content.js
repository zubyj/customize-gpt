

document.documentElement.classList.remove('dark');

// When the tab is finished loading, add the mic button to the page
chrome.runtime.onMessage.addListener((request) => {
    if (request.message === 'tab_updated') {

        let customizeButton = document.createElement('button');
        customizeButton.style.textContent = 'Customize'
        customizeButton.style.backgroundImage = 'url(' + chrome.runtime.getURL('customize-icon.png') + ')';
        customizeButton.style.backgroundRepeat = 'no-repeat';
        customizeButton.style.backgroundSize = 'contain';
        customizeButton.style.width = '25px';
        customizeButton.style.height = '25px';
        customizeButton.style.borderRadius = '5px';
        customizeButton.style.margin = '0 auto';
        customizeButton.style.marginLeft = '90%';
        customizeButton.onclick = function () {
            chrome.runtime.sendMessage({ message: 'open_new_tab', url: chrome.runtime.getURL('options.html') });
        };

        let textArea = document.getElementById('prompt-textarea');
        textArea.parentElement.appendChild(customizeButton, textArea);

        chrome.storage.sync.get(['color', 'backgroundColor', 'fontFamily'], function (items) {
            document.body.style.color = items.color;
            document.body.style.backgroundColor = items.backgroundColor;
            document.body.style.fontFamily = items.fontFamily;
        });
    }
});
