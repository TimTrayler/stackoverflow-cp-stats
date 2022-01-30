
const statsNavItem = document.createElement('li')

function injectStats() {
    chrome.storage.sync.get(['copyPastes', 'copyPasteLength'], function(result) {
        if(result.copyPastes != null && result.copyPasteLength != null) {
            statsNavItem.innerHTML = `
                <ol class="nav-links">
                    <li class="d-flex ai-center ac-center jc-space-between ml8 mt24 mb4">
                        <div class="flex--item tt-uppercase fs-fine fc-light">Stats</div>
                        <div class="flex--item">
                            <a href="javascript:window.postMessage('resetCopyPastes', '*')" class="s-link p12 fc-black-500 h:fc-black-800 js-gps-track" role="button">
                                <svg aria-hidden="true" class="svg-icon iconInfoSm" width="20" height="15" viewBox="0 0 21 21"><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/></svg>
                            </a>
                        </div>
                    </li>
                    <li class="ps-relative">
                        <a class="pl8 nav-links--link">
                            <div class="d-flex ai-center">
                                <div class="fs-fine fc-light">
                                    Copies: ${result.copyPastes} <br/>
                                    Copied characters: ${result.copyPasteLength} <br/>
                                    Average copy length: ${Math.round((parseInt(result.copyPasteLength ?? "0") / parseInt(result.copyPastes ?? "0"))*100)/100} <br/>
                                </div>
                            </div>
                        </a>
                    </li>
                </ol>
            `

            document.querySelector("nav > .nav-links").append(statsNavItem)
        }

    })
}


injectStats()

window.addEventListener("message", function(e) {
    if (e.data === "resetCopyPastes") {
        chrome.storage.sync.set({copyPastes: 0, copyPasteLength: 0})
        injectStats()
    } else if(e.data === "updateCopyPastes") {
        injectStats()
    }
})
