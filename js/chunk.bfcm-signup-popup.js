/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcocoandeve_styleguides"] = self["webpackChunkcocoandeve_styleguides"] || []).push([["bfcm-signup-popup"],{

/***/ "./src/js/modules/bfcm-signup-popup.js":
/*!*********************************************!*\
  !*** ./src/js/modules/bfcm-signup-popup.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/js/modules/utils.js\");\n/* global screenLG */\n\n$(window).on('load', function () {\n  $('#bfcmSignupPopupModal').modal('show');\n});\n$('#bfcm-signup-popup__country').on('change', function () {\n  var code = $(this).find(':selected').attr('data-code');\n  $('.bfcm-signup-popup__country-label').html(\"+\".concat(code));\n});\n$('.bfcm-signup-popup__form').on('submit', function (e) {\n  e.preventDefault();\n  var validEmail = false;\n  var validPhone = false;\n  var email = $(this).find('#bfcm-signup-popup__email');\n  var phone = $(this).find('#bfcm-signup-popup__phone');\n  $(this).find('.text-danger').addClass('d-none');\n\n  if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.validateEmail)($(email).val())) {\n    validEmail = true;\n  }\n\n  if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.validatePhone)($(phone).val())) {\n    validPhone = true;\n  }\n\n  if (validEmail || validPhone) {\n    $(this).addClass('d-none');\n    $('.bfcm-signup-popup__thank-you').removeClass('d-none').addClass('d-flex');\n    $('.bfcm-signup-popup__heading').addClass('invisible');\n\n    if (window.innerWidth > screenLG) {\n      $('.bfcm-signup-popup__heading').remove();\n    }\n\n    if (validEmail) {// code for send email to Backend\n    } else if (validPhone) {// code for send phone to smsbump\n    }\n  } else {\n    if (!validEmail) {\n      $('#email-error').removeClass('d-none');\n    }\n\n    if (!validPhone && $(phone).val() !== '') {\n      $('#phone-error').removeClass('d-none');\n    }\n  }\n});\n\n//# sourceURL=webpack://cocoandeve-styleguides/./src/js/modules/bfcm-signup-popup.js?");

/***/ })

}]);