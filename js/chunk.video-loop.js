/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcocoandeve_styleguides"] = self["webpackChunkcocoandeve_styleguides"] || []).push([["video-loop"],{

/***/ "./src/js/modules/video-loop.js":
/*!**************************************!*\
  !*** ./src/js/modules/video-loop.js ***!
  \**************************************/
/***/ (() => {

eval("$(document).ready(function () {\n  var _this = this;\n\n  $('.video-loop').each(function () {\n    $(_this).find('.video-loop__action').on('click', function () {\n      var video = $(this).parent().find('video')[0];\n\n      if (video.paused) {\n        video.play();\n        $(this).attr('aria-label', 'Pause');\n      } else {\n        video.pause();\n        $(this).attr('aria-label', 'Play');\n      }\n    });\n  });\n});\n\n//# sourceURL=webpack://cocoandeve-styleguides/./src/js/modules/video-loop.js?");

/***/ })

}]);