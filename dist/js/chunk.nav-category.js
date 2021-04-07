/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcocoandeve_styleguides"] = self["webpackChunkcocoandeve_styleguides"] || []).push([["nav-category"],{

/***/ "./src/js/modules/nav-category.js":
/*!****************************************!*\
  !*** ./src/js/modules/nav-category.js ***!
  \****************************************/
/***/ (() => {

eval("$(document).ready(function () {\n  var navCategory = $('.nav-category');\n\n  if (navCategory.length > 0) {\n    var linkSearch = navCategory.find('.link-search');\n\n    if (linkSearch) {\n      linkSearch.on('click', function () {\n        if ($(this).hasClass('opened')) {\n          $(this).removeClass('opened').addClass('text-primary');\n          navCategory.find('.search-box').addClass('d-none');\n        } else {\n          $(this).addClass('opened').removeClass('text-primary');\n          navCategory.find('.search-box').removeClass('d-none');\n        }\n      });\n      navCategory.find('.search-box__close').on('click', function () {\n        linkSearch.removeClass('opened').addClass('text-primary');\n        $(this).parents('.search-box').addClass('d-none');\n      });\n    }\n  }\n});\n\n//# sourceURL=webpack://cocoandeve-styleguides/./src/js/modules/nav-category.js?");

/***/ })

}]);