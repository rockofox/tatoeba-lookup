function fetchDefinition(word, sourceLang, targetLang, sendResponse) {
    const url = `https://tatoeba.org/eng/api_v0/search?from=${sourceLang}&trans_filter=limit&query=${word}&sort=created&trans_to=${targetLang}&to=${targetLang}`;
    console.log(url);

    fetch(url)
        .then(response => response.json())
        .then(data => sendResponse(data))
        .catch(error => console.error(error));

    return true;  // Will respond asynchronously.
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action == "fetchDefinition") {
        return fetchDefinition(request.word, request.sourceLang, request.targetLang, sendResponse);
    }
});

