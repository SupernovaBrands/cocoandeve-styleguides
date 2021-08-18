/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcocoandeve_styleguides"] = self["webpackChunkcocoandeve_styleguides"] || []).push([["carousel-swipe"],{

/***/ "./src/js/modules/carousel-swipe.js":
/*!******************************************!*\
  !*** ./src/js/modules/carousel-swipe.js ***!
  \******************************************/
/***/ (() => {

eval("$(document).ready(function () {\n  $('.carousel--swipe').each(function (index, carousel) {\n    var xDown = null;\n    var yDown = null;\n\n    function getTouches(evt) {\n      return evt.touches || evt.originalEvent.touches;\n    }\n\n    function handleTouchStart(evt) {\n      var firstTouch = getTouches(evt)[0];\n      xDown = firstTouch.clientX;\n      yDown = firstTouch.clientY;\n    }\n\n    function handleTouchMove(evt) {\n      if (!xDown || !yDown) {\n        return;\n      }\n\n      var xUp = evt.touches[0].clientX;\n      var yUp = evt.touches[0].clientY;\n      var xDiff = xDown - xUp;\n      var yDiff = yDown - yUp;\n\n      if (Math.abs(xDiff) > Math.abs(yDiff)) {\n        if (xDiff > 0) {\n          $(carousel).carousel('next');\n        } else {\n          $(carousel).carousel('prev');\n        }\n      } else {\n        xDown = null;\n        yDown = null;\n      }\n    }\n\n    carousel.addEventListener('touchstart', handleTouchStart, false);\n    carousel.addEventListener('touchmove', handleTouchMove, false);\n  });\n});\n\n//# sourceURL=webpack://cocoandeve-styleguides/./src/js/modules/carousel-swipe.js?");

/***/ })

}]);