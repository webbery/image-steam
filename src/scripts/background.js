import ext from "./utils/ext";
import { resource, getAllResourceDB, getCurrentActiveDB } from 'civet-extend'

// var connection = new WebSocket('ws://127.0.0.1:8013', 'civet-protocol');

let menu = {
  id: 'add-image',
  title: '添加到civet',
  contexts: ['image'] // https://developer.chrome.com/docs/extensions/reference/contextMenus/#type-ContextType
}

console.info(resource)
resource.onDownloadSuccess(function(id, params) {
  console.info(`download success[${id}]: ${params}`)
})
resource.onDownloadFail(function(id, params) {
  console.info(`download fail[${id}]: ${params}`)
})

ext.contextMenus.create(menu)
ext.contextMenus.onClicked.addListener(
  function(info, tab) {
    switch(info.menuItemId) {
      case 'add-image':
        console.info(info)
        resource.addByPath(info.srcUrl)
        break;
      default:
        break;
    }
  }
)

ext.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.action === "perform-save") {
      console.log("Extension Type: ", "/* @echo extension */");
      console.log("PERFORM AJAX", request.data);
      sendResponse({ action: "saved" });
    }
  }
);

window.getAllDB = function () {
  return getAllResourceDB()
}

window.getCurrentDB = function () {
  return getCurrentActiveDB()
}