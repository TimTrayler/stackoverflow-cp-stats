
[...document.querySelectorAll(".s-prose")].slice(0, -1).forEach(x => x.addEventListener('copy', function(event) {
    chrome.storage.sync.get(['copyPastes', 'copyPasteLength'], function(result) {
        chrome.storage.sync.set({
            copyPastes: ((parseInt(result.copyPastes ?? "0")) + 1),
            copyPasteLength: ((parseInt(result.copyPasteLength ?? "0")) + document.getSelection().toString().length)
        })
    })

    window.postMessage("updateCopyPastes", "*")
}))
