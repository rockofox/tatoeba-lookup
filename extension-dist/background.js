function fetchDefinition(word, sourceLang, targetLang, sendResponse) {
    const hosts = ["https://tatoeba.elnu.com/", "https://tatoeba.elnu.com/"]
    const url = `${hosts[0]}?from=${sourceLang}&trans_filter=limit&query=${word}&sort=created&trans_to=${targetLang}&to=${targetLang}`;

    fetch(url, {mode: 'cors'})
        .then(response => response.json())
        .then(response => sendResponse(response))
        .catch(error => console.error(error));
    return true;  // Will respond asynchronously.
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action == "fetchDefinition") {
        return fetchDefinition(request.word, request.sourceLang, request.targetLang, sendResponse);
    }
});

