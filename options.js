window.onload = function () {
    document.getElementById('apply').onclick = function () {
        let color = document.getElementById('color').value;
        let backgroundColor = document.getElementById('backgroundColor').value;
        let fontFamily = document.getElementById('fontFamily').value;
        let secondaryColor = document.getElementById('secondaryColor').value;

        chrome.storage.sync.set({ color, backgroundColor, secondaryColor, fontFamily }, function () {
            console.log('Options have been set.');
        });
    };
};
