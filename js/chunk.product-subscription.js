/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcocoandeve_styleguides"] = self["webpackChunkcocoandeve_styleguides"] || []).push([["product-subscription"],{

/***/ "./src/js/modules/product-subscription.js":
/*!************************************************!*\
  !*** ./src/js/modules/product-subscription.js ***!
  \************************************************/
/***/ (() => {

eval("var subscriptionVariant = $('.product-variant--subscription');\n$('#subscriptionCheckbox').on('change', function () {\n  subscriptionVariant.toggleClass('product-variant--subscription-selected', this.checked);\n  subscriptionVariant.find('input[type=\"radio\"]').prop('checked', true);\n});\n$('input[name=\"product-variant\"]').on('change', function () {\n  subscriptionVariant.removeClass('product-variant--subscription-selected');\n\n  if (!$(this).closest('.product-variant').hasClass('product-variant--subscription')) {\n    $('#subscriptionCheckbox').prop('checked', false);\n  }\n});\n\n//# sourceURL=webpack://cocoandeve-styleguides/./src/js/modules/product-subscription.js?");

/***/ })

}]);