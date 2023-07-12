chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url.includes('chat.openai.com')) {
        chrome.tabs.sendMessage(tabId, { message: 'tab_updated' });
    }
});

chrome.runtime.onMessage.addListener(
    function (request) {
        if (request.message === 'open_new_tab') {
            chrome.tabs.create({ url: request.url });
        }
    }
);
