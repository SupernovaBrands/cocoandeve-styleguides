/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcocoandeve_styleguides"] = self["webpackChunkcocoandeve_styleguides"] || []).push([["blog-nav-tags"],{

/***/ "./src/js/modules/blog.js":
/*!********************************!*\
  !*** ./src/js/modules/blog.js ***!
  \********************************/
/***/ (() => {

eval("$('.blog-nav-tags a').on('click', function (e) {\n  if (e.target.id === 'how-to') {\n    e.preventDefault();\n    $('.how-to-wrapper').removeClass('d-none');\n    $('.article-list-wrapper').addClass('d-none');\n  }\n});\n\n//# sourceURL=webpack://cocoandeve-styleguides/./src/js/modules/blog.js?");

/***/ })

}]);