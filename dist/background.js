/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**************************************!*\
  !*** ./src/background/background.ts ***!
  \**************************************/
chrome.runtime.onInstalled.addListener(() => {
    console.log("크롬익스텐션 설치됨");
});
chrome.bookmarks.onCreated.addListener(() => {
    console.log("북마크 생성시 실행됨");
});
chrome.bookmarks.onChanged.addListener(() => {
    console.log("북마크 수정시 실행됨");
});
chrome.bookmarks.onRemoved.addListener(() => {
    console.log("북마크 삭제시 실행됨");
});
// chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
//   console.log(msg);
//   console.log(sender);
//   sendResponse("Front the background Script");
// })

/******/ })()
;
//# sourceMappingURL=background.js.map