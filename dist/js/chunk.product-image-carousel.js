/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcocoandeve_styleguides"] = self["webpackChunkcocoandeve_styleguides"] || []).push([["product-image-carousel"],{

/***/ "./src/js/modules/carousels.js":
/*!*************************************!*\
  !*** ./src/js/modules/carousels.js ***!
  \*************************************/
/***/ (() => {

eval("// $('.product-image-carousel').on('slide.bs.carousel', function (e) {\n// \tvar $e = $(e.relatedTarget);\n// \tvar idx = $e.index();\n// \tconsole.log(\"IDX :  \" + idx);\n// \tvar itemsPerSlide = 8;\n// \tvar totalItems = $('.carousel-item').length;\n// \tif (idx >= totalItems-(itemsPerSlide-1)) {\n// \t\tvar it = itemsPerSlide - (totalItems - idx);\n// \t\tfor (var i=0; i<it; i++) {\n// \t\t\t// append slides to end\n// \t\t\tif (e.direction==\"left\") {\n// \t\t\t\t$('.carousel-item').eq(i).appendTo('.carousel-inner');\n// \t\t\t}\n// \t\t\telse {\n// \t\t\t\t$('.carousel-item').eq(0).appendTo('.carousel-inner');\n// \t\t\t}\n// \t\t}\n// \t}\n// });\n$('.product-image-carousel__indicator__item').on('click', function () {\n  var carousel = $(this).data('target');\n  var index = $(this).data('index');\n  console.log('here', carousel, index);\n  $(carousel).carousel(index - 1);\n});\n\n//# sourceURL=webpack://cocoandeve-styleguides/./src/js/modules/carousels.js?");

/***/ })

}]);