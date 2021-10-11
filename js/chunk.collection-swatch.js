/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcocoandeve_styleguides"] = self["webpackChunkcocoandeve_styleguides"] || []).push([["collection-swatch"],{

/***/ "./src/js/modules/collection-swatch.js":
/*!*********************************************!*\
  !*** ./src/js/modules/collection-swatch.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/js/modules/utils.js\");\n/* global screenLG */\n\n$('.collection-swatch').on('click', '.collection-swatch__close', function () {\n  $('.collection-swatch').removeClass('show');\n});\n\nvar swatchRender = function swatchRender(target, content) {\n  if (content !== '') {\n    target.html(content);\n  }\n};\n\n$('.btn-choose__swatch').click(function () {\n  var btn = $(this);\n\n  if (window.innerWidth < screenLG) {\n    swatchRender($('.collection-swatch'), btn.siblings('.swatch-overlay').html());\n    $('.collection-swatch').addClass('show');\n    $('.collection-swatch > div').addClass('d-none');\n    var className = '.collection-swatch--overlay';\n    if ($(btn).hasClass('btn-choose__swatch-subscription')) className = '.collection-swatch--subscription';\n    $(className).removeClass('d-none');\n    (0,_utils__WEBPACK_IMPORTED_MODULE_0__.popopOver)();\n  } else {\n    swatchRender($('.collection-swatch__modal .modal-dialog'), btn.siblings('.swatch-overlay').html());\n    var id = '#collectionSwatchModal';\n    if ($(btn).hasClass('btn-choose__swatch-subscription')) id = '#collectionSubscriptionModal';\n    $(id).modal({\n      show: true\n    });\n    $(id).on('shown.bs.modal', function () {\n      return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.popopOver)();\n    });\n  }\n});\n\n//# sourceURL=webpack://cocoandeve-styleguides/./src/js/modules/collection-swatch.js?");

/***/ })

}]);