

document.documentElement.classList.remove('dark');

// When the tab is finished loading, add the mic button to the page
chrome.runtime.onMessage.addListener((request) => {
    if (request.message === 'tab_updated') {

        let customizeButton = document.createElement('button');
        customizeButton.style.width = '28px';
        customizeButton.style.height = '28px';
        customizeButton.style.textContent = 'Customize'
        customizeButton.style.backgroundImage = 'url(' + chrome.runtime.getURL('customize-icon.png') + ')';
        customizeButton.style.backgroundRepeat = 'no-repeat';
        customizeButton.style.backgroundSize = 'contain';
        customizeButton.style.backgroundPosition = 'center';
        customizeButton.style.margin = '0';
        customizeButton.onclick = function () {
            chrome.runtime.sendMessage({ message: 'open_new_tab', url: chrome.runtime.getURL('options.html') });
        };


        let textArea = document.getElementById('prompt-textarea');
        // insert customize button adjacent to text area
        textArea.parentElement.insertAdjacentElement('afterbegin', customizeButton);

        chrome.storage.sync.get(['color', 'backgroundColor', 'fontFamily'], function (items) {
            document.body.style.color = items.color;
            document.documentElement.style.color = items.color;
            document.documentElement.style.backgroundColor = items.backgroundColor;
            document.body.style.backgroundColor = items.backgroundColor;
            document.body.style.fontFamily = items.fontFamily;
        });
    }
});
