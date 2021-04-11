import ext from "./utils/ext";
import * as civet from 'civet-extend'
const cv = require('civet-extend')

// var connection = new WebSocket('ws://127.0.0.1:8013', 'civet-protocol');

let menu = {
  id: 'add-image',
  title: '添加到civet',
  contexts: ['image'] // https://developer.chrome.com/docs/extensions/reference/contextMenus/#type-ContextType
}

// console.info(ext)
console.info(civet)
console.info(cv)

ext.contextMenus.create(menu)
ext.contextMenus.onClicked.addListener(
  function(info, tab) {
    switch(info.menuItemId) {
      case 'add-image':
        console.info(info)
        civet.resource.load(info.srcUrl)
        // ext.tabs.create({})
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