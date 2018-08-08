chrome.browserAction.onClicked.addListener(function(activeTab)
{
    let newURL = "newtab.html";
    chrome.tabs.create({ url: newURL });
});