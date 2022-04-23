import ext from "./utils/ext";
import storage from "./utils/storage";

var popup = document.getElementById("app");
storage.get('color', function(resp) {
  var color = resp.color;
  if(color) {
    popup.style.backgroundColor = color
  }
});

function selectResourceDB(resourceDB) {
  const currentElm = document.getElementById("activeDB")
  if (currentElm.innerText === resourceDB) return;
  currentElm.innerText = resourceDB
  usedDB = resourceDB
}

function bindClick(candidates) {
  for (let db of candidates) {
    const elm = document.getElementById('candidate_' + db)
    elm.onclick = function() {
      selectResourceDB(db)
    }
  }
}

var template = (candidates, active) => {
  let html = '<div class="dropdown-content">'
  for (let db of candidates) {
    html += '<a href="#" id="candidate_' + db + '">' + db + '</a>'
  }
  html += '</div>'
  return (`<div>默认保存资源库:</div>
  <div class="dropdown">
    <button class="dropbtn" id="activeDB">${active}</button>
    ${html}
  </div>
  `);
}

var renderMessage = (message) => {
  var displayContainer = document.getElementById("display-container");
  // displayContainer.innerHTML = `<p class='message'>${message}</p>`;
  displayContainer.innerHTML = `<p class='message'>${message}</p>`;
}

var renderBookmark = (data) => {
  var displayContainer = document.getElementById("display-container")
  var bg = ext.extension.getBackgroundPage();
  const active = bg.getCurrentDB()
  const dbs = bg.getAllDB()
  if(dbs && dbs.length) {
    var tmpl = template(dbs, active);
    displayContainer.innerHTML = tmpl;
    bindClick(dbs)
  } else {
    renderMessage("<div>未检测到Civet, 请确认已经启动</div>")
  }
}

ext.tabs.query({active: true, currentWindow: true}, function(tabs) {
  var activeTab = tabs[0];
  console.info('show data')
  ext.tabs.sendMessage(activeTab.id, { action: 'process-page' }, renderBookmark);
});

popup.addEventListener("click", function(e) {
  if(e.target && e.target.matches("#save-btn")) {
    e.preventDefault();
    var data = e.target.getAttribute("data-bookmark");
    ext.runtime.sendMessage({ action: "perform-save", data: data }, function(response) {
      if(response && response.action === "saved") {
        renderMessage("Your bookmark was saved successfully!");
      } else {
        renderMessage("Sorry, there was an error while saving your bookmark.");
      }
    })
  }
});

var optionsLink = document.querySelector(".js-options");
optionsLink.addEventListener("click", function(e) {
  e.preventDefault();
  ext.tabs.create({'url': ext.extension.getURL('options.html')});
})

ext.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  }
)
