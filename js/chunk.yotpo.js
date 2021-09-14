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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/js/modules/utils.js\");\n\n(0,_utils__WEBPACK_IMPORTED_MODULE_0__.waitFor)(function () {\n  return window.yotpo !== undefined;\n}, function () {\n  if ($('.yotpo.bottomLine.show-avg-score').length > 0) {\n    $('.yotpo.bottomLine.show-avg-score').each(function (i, el) {\n      (0,_utils__WEBPACK_IMPORTED_MODULE_0__.waitFor)(function () {\n        return $(el).find('.yotpo-display-wrapper').length > 0;\n      }, function () {\n        var stars = $(el).find('.yotpo-stars');\n\n        if (stars.length > 0) {\n          var rating = stars.find('.sr-only').text().split(' ')[0];\n          stars.after(\"<span class=\\\"rating-num text-body\\\">\".concat(rating, \" stars</span>\"));\n          var totalReviews = $(el).find('.text-m');\n          totalReviews.text(\"(\".concat(totalReviews.text().split(' ')[0], \")\"));\n        } else {\n          $(el).addClass('d-none');\n        }\n      });\n    });\n  }\n});\n\n//# sourceURL=webpack://cocoandeve-styleguides/./src/js/modules/yotpo.js?");

/***/ })

}]);