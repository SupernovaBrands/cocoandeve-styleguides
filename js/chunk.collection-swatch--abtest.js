/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcocoandeve_styleguides"] = self["webpackChunkcocoandeve_styleguides"] || []).push([["collection-swatch--abtest"],{

/***/ "./src/js/modules/collection-swatch--abtest.js":
/*!*****************************************************!*\
  !*** ./src/js/modules/collection-swatch--abtest.js ***!
  \*****************************************************/
/***/ (() => {

eval("/* global screenLG */\n$('.btn-choose__swatch--abtest').click(function () {\n  if (window.innerWidth < screenLG) {\n    $('#collectionSwatchAbtest').modal({\n      show: true\n    });\n  } else {\n    $('#collectionSwatchModal').modal({\n      show: true\n    });\n  }\n});\n$('.product-form .variant-swatch').on('click', function () {\n  var attrFor = $(this).data('value');\n  var swatchContainers = $(this).closest('form').find('.product-swatch');\n  swatchContainers.each(function (i, el) {\n    var swatches = $(el).find('.variant-swatch');\n    var selected = swatches.filter(\"[data-value=\".concat(attrFor, \"]\"));\n\n    if (selected.length > 0) {\n      swatches.removeClass('border-primary');\n      selected.addClass('border-primary');\n      $(el).find('p').addClass('d-none').filter(\".swatch-label-\".concat(attrFor)).removeClass('d-none');\n    }\n  });\n});\n\n//# sourceURL=webpack://cocoandeve-styleguides/./src/js/modules/collection-swatch--abtest.js?");

/***/ })

}]);