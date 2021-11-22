/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcocoandeve_styleguides"] = self["webpackChunkcocoandeve_styleguides"] || []).push([["exit-intent-popup"],{

/***/ "./src/js/modules/exit-intent-popup.js":
/*!*********************************************!*\
  !*** ./src/js/modules/exit-intent-popup.js ***!
  \*********************************************/
/***/ (() => {

eval("// Exit Intent\n// Reference: https://medium.com/weekly-webtips/how-to-make-an-effective-exit-intent-popup-in-javascript-bf6051b4a6d4\n// import { setCookie, getCookie } from '~mod/utils';\nvar initExitIntent = function initExitIntent() {\n  var showPopup = function showPopup() {\n    $('#exit-intent-popup').modal('show'); // setCookie('exitIntentShown', true, 30);\n  };\n\n  var mouseEvent = function mouseEvent(e) {\n    var shouldShowExitIntent = !e.toElement && !e.relatedTarget && e.clientY < 10;\n\n    if (shouldShowExitIntent) {\n      // document.removeEventListener('mouseout', mouseEvent);\n      showPopup();\n    }\n  };\n\n  var popup = document.getElementById('exit-intent-popup'); // const opened = getCookie('exitIntentShown');\n\n  var opened = false;\n\n  if (popup && !opened) {\n    document.addEventListener('mouseout', mouseEvent);\n  }\n};\n\ninitExitIntent();\n\n//# sourceURL=webpack://cocoandeve-styleguides/./src/js/modules/exit-intent-popup.js?");

/***/ })

}]);