/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcocoandeve_styleguides"] = self["webpackChunkcocoandeve_styleguides"] || []).push([["collection-swatch-abtest"],{

/***/ "./src/js/modules/collection-swatch-abtest.js":
/*!****************************************************!*\
  !*** ./src/js/modules/collection-swatch-abtest.js ***!
  \****************************************************/
/***/ (() => {

eval("/* global screenLG */\n$('.collection-swatch-abtest').on('click', '.collection-swatch__close', function () {\n  $('.collection-swatch-abtest').removeClass('show');\n});\n\nvar swatchRender = function swatchRender(target, content) {\n  if (content !== '') {\n    target.html(content);\n  }\n};\n\n$('.btn-choose__swatch-abtest').click(function () {\n  var btn = $(this);\n\n  if (window.innerWidth < screenLG) {\n    swatchRender($('.collection-swatch-abtest'), btn.siblings('.swatch-overlay').html());\n    $('.collection-swatch-abtest').addClass('show');\n    $('.collection-swatch-abtest > div').addClass('d-none');\n  } else if ($('html').hasClass('au-store')) {\n    swatchRender($('.collection-swatch-abtest__modal .modal-dialog'), btn.siblings('.swatch-overlay').html());\n    $('#collectionSwatchModal').modal({\n      show: true\n    });\n  }\n});\n\n//# sourceURL=webpack://cocoandeve-styleguides/./src/js/modules/collection-swatch-abtest.js?");

/***/ })

}]);