/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcocoandeve_styleguides"] = self["webpackChunkcocoandeve_styleguides"] || []).push([["yotpo"],{

/***/ "./src/js/modules/yotpo.js":
/*!*********************************!*\
  !*** ./src/js/modules/yotpo.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/js/modules/utils.js\");\n\n(0,_utils__WEBPACK_IMPORTED_MODULE_0__.waitFor)(function () {\n  return window.yotpo !== undefined;\n}, function () {\n  if ($('.yotpo-main-widget').length > 0) {\n    var title = $('.yotpo-main-widget').siblings('h2').detach();\n    $('.yotpo-main-widget .font-color-gray-darker').removeClass('font-color-gray-darker');\n    $('.write-review-button .yotpo-icon').remove();\n    $('.write-review-button').addClass('btn btn-lg btn-primary').removeClass('yotpo-default-button yotpo-icon-btn write-question-review-button write-button write-review-button');\n    $('.write-question-review-button-text').addClass('text-white');\n    $('.write-question-button').addClass('d-none');\n    $('.main-widget').addClass('row');\n    $('.bottom-line-items-container').closest('.yotpo-display-wrapper').addClass('col-12 col-lg-5 px-lg-g').prepend(title).append($('.write-question-review-buttons-container').detach()).append($('.write-review-wrapper.write-form').closest('form').detach());\n    $('.yotpo-nav-content').addClass('col-12 col-lg-7 px-lg-g');\n    $('.write-review-wrapper.write-form .yotpo-default-button').addClass('bg-primary rounded');\n  }\n\n  if ($('.yotpo.bottomLine.show-avg-score').length > 0) {\n    $('.yotpo.bottomLine.show-avg-score').each(function (i, el) {\n      var stars = $(el).find('.yotpo-stars');\n      var rating = stars.find('.sr-only').text().split(' ')[0];\n      stars.after(\"<span class=\\\"font-size-sm ml-1\\\">\".concat(rating, \"</span>\"));\n    });\n  }\n});\n\n//# sourceURL=webpack://cocoandeve-styleguides/./src/js/modules/yotpo.js?");

/***/ })

}]);