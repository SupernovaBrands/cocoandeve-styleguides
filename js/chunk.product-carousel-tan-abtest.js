/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcocoandeve_styleguides"] = self["webpackChunkcocoandeve_styleguides"] || []).push([["product-carousel-tan-abtest"],{

/***/ "./src/js/modules/product-carousel-tan-abtest.js":
/*!*******************************************************!*\
  !*** ./src/js/modules/product-carousel-tan-abtest.js ***!
  \*******************************************************/
/***/ (() => {

eval("$('.product-carousel-tan-abtest').each(function (index, tabs) {\n  $(tabs).find('[data-toggle=\"tab\"]').on('shown.bs.tab', function (event) {\n    $('.carousel--scroll').each(function (index, carousel) {\n      carousel.classList.remove('d-none');\n      carousel.dispatchEvent(new CustomEvent('adjustThumb'));\n    });\n  });\n});\n\n//# sourceURL=webpack://cocoandeve-styleguides/./src/js/modules/product-carousel-tan-abtest.js?");

/***/ })

}]);