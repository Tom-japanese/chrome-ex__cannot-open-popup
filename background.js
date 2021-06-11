
/* ==================================================
アイコンクリック時の値の受け渡し処理
ブラウザを起動し直したら初期化する必要性があるなぁ…
閉じるときに初期化か開くときに初期化するような仕組みが必要
==================================================  */

// 状態保持（初期設定）
var isTranslate = false;

// 拡張機能のクリックを検知
chrome.browserAction.onClicked.addListener(function(tab) {
  // 真偽値の反転
  isTranslate = !isTranslate;
  // 状態をバッジとして表示する
  if (isTranslate){
    chrome.browserAction.setBadgeText({text : "ON" });
    console.log("クリックon");
    chrome.windows.getCurrent(function(window){
      var winId = window.id;
      chrome.storage.local.set({ 'currentWindowId': winId }, function() {});
    });
  }else{
    console.log("クリックoff");
    chrome.browserAction.setBadgeText({text: ""});
    chrome.storage.local.clear();
  }
});




/* ==================================================
別ウィンドウを開いたときに自動で閉じる
==================================================  */
chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,thisTab){ 

  chrome.storage.local.get('currentWindowId', function ( data ) {
    var winId = Object.values(data);
    if (Object.keys(data).length) {


      // 別ウィンドウを開いたときの処理
      if(changeInfo.status == "loading" && winId[0] !== thisTab.windowId){
        console.log(winId[0]);
        console.log(thisTab.windowId);
        alert("別ウィンドウです");
        console.log("別ウィンドウだよー");
        // chrome.windows.remove(thisTab.windowId);
    
      }
      
    }
  });

});




