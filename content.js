document.documentElement.classList.remove('dark');

let customizeButton = document.createElement('button');
customizeButton.style.backgroundImage = 'url(' + chrome.runtime.getURL('customize-icon.png') + ')';
customizeButton.style.backgroundRepeat = 'no-repeat';
customizeButton.style.backgroundSize = 'contain';
customizeButton.style.backgroundPosition = 'center';
customizeButton.style.width = '48px';
customizeButton.style.height = '48px';
customizeButton.style.fontSize = '24px';
customizeButton.style.border = '1px solid purple';
customizeButton.onclick = function () {
    chrome.runtime.sendMessage({ message: 'open_new_tab', url: chrome.runtime.getURL('options.html') });
};

let div = document.getElementById('prompt-textarea').parentElement;

let wrapperDiv = document.createElement('div');
wrapperDiv.style.display = 'flex';
wrapperDiv.style.justifyContent = 'center';
wrapperDiv.style.alignItems = 'center';
div.appendChild(wrapperDiv);

div.parentElement.appendChild(customizeButton);

chrome.storage.sync.get(['color', 'backgroundColor', 'fontFamily'], function (items) {
    document.body.style.color = items.color;
    document.body.style.backgroundColor = items.backgroundColor;
    document.body.style.fontFamily = items.fontFamily;
});
