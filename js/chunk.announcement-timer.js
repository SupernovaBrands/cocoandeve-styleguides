/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcocoandeve_styleguides"] = self["webpackChunkcocoandeve_styleguides"] || []).push([["announcement-timer"],{

/***/ "./src/js/modules/announcement-timer.js":
/*!**********************************************!*\
  !*** ./src/js/modules/announcement-timer.js ***!
  \**********************************************/
/***/ (() => {

eval("var getUtcTime = function getUtcTime(date) {\n  var now = new Date(date);\n  var utcTimestamp = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());\n  return utcTimestamp - 8 * 60 * 60 * 1000;\n};\n\nvar nowUtcTime = function nowUtcTime() {\n  var now = new Date();\n  var utcTimestamp = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());\n  return utcTimestamp - 8 * 60 * 60 * 1000;\n};\n\nvar startCount = function startCount(endAt) {\n  var end = new Date(getUtcTime(endAt));\n  var second = 1000;\n  var minute = second * 60;\n  var hour = minute * 60;\n  var day = hour * 24;\n  var timer;\n\n  var showRemaining = function showRemaining() {\n    var now = new Date();\n    var distance = end - now;\n\n    if (distance < 0) {\n      clearInterval(timer);\n      $('.announcement-bar__timer').addClass('d-none');\n      return;\n    }\n\n    var days = Math.floor(distance / day);\n    var hours = Math.floor(distance % day / hour);\n    var minutes = Math.floor(distance % hour / minute);\n    var seconds = Math.floor(distance % minute / second);\n    $('#timerDays').html(\"\".concat(days, \" \").concat(days > 1 ? '<span>Days</span>' : '<span>Day</span>'));\n    $('#timerHrs').html(\"\".concat(hours, \" \").concat(hours > 1 ? '<span>Hours</span>' : '<span>Hour</span>'));\n    $('#timerMin').html(\"\".concat(minutes, \"<span>Minutes</span>\"));\n    $('#timerSec').html(\"\".concat(seconds, \"<span>Seconds</span>\"));\n  };\n\n  timer = setInterval(showRemaining, 1000);\n};\n\n$(document).ready(function () {\n  // start & end from settings\n  var startDate = '2022-10-15 00:00:00';\n  var endDate = '2022-12-02 23:59:00';\n  var startAt = getUtcTime(\"\".concat(startDate.replace(' ', 'T'), \"Z\"));\n  var endAt = getUtcTime(\"\".concat(endDate.replace(' ', 'T'), \"Z\"));\n  var now = nowUtcTime();\n\n  if (now > startAt && now < endAt) {\n    startCount(\"\".concat(endDate.replace(' ', 'T'), \"Z\"));\n  } else {\n    console.log('expired');\n    $('.announcement-bar__timer').addClass('d-none');\n  }\n});\n\n//# sourceURL=webpack://cocoandeve-styleguides/./src/js/modules/announcement-timer.js?");

/***/ })

}]);