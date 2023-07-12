

document.documentElement.classList.remove('dark');

// When the tab is finished loading, add the mic button to the page
chrome.runtime.onMessage.addListener((request) => {
    if (request.message === 'tab_updated') {
        setTimeout(() => {
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
            textArea.parentElement.insertAdjacentElement('afterbegin', customizeButton);

            chrome.storage.sync.get(['color', 'backgroundColor', 'secondaryColor', 'fontFamily'], function (items) {
                document.body.style.color = items.color;
                document.body.style.backgroundColor = items.backgroundColor;
                document.body.style.fontFamily = items.fontFamily;

                let gradientColor = document.querySelectorAll('div.absolute.bottom-0.left-0')[0];
                gradientColor.classList.remove(...gradientColor.classList);

                let divs = document.querySelectorAll('div.text-gray-800');
                for (let i = 0; i < divs.length; i++) {
                    if (i % 2 == 0) {
                        divs[i].style.backgroundColor = items.secondaryColor;
                    }
                    else {
                        divs[i].style.backgroundColor = items.backgroundColor;
                    }
                    divs[i].style.color = items.color;
                }
            });

            textArea.style.color = 'black';
        }, 2000);
    }
});
