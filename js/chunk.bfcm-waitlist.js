/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcocoandeve_styleguides"] = self["webpackChunkcocoandeve_styleguides"] || []).push([["bfcm-waitlist"],{

/***/ "./src/js/modules/bfcm-waitlist.js":
/*!*****************************************!*\
  !*** ./src/js/modules/bfcm-waitlist.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/js/modules/utils.js\");\n\nvar validForm = {\n  email: false,\n  phone: false\n};\n\nvar validateForm = function validateForm() {\n  var $form = $('#bfcm-waitlist__form');\n  var email = $form.find('#bfcm-waitlist__email');\n  var phone = $form.find('#bfcm-waitlist__phone');\n  var acceptedTerm = $('#bfcm-waitlist__toc').is(':checked');\n  validForm.email = false;\n  validForm.phone = false;\n\n  if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.validateEmail)($(email).val())) {\n    validForm.email = true;\n  }\n\n  if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.validatePhone)($(phone).val())) {\n    validForm.phone = true;\n  }\n\n  $form.find('.text-danger').addClass('d-none');\n\n  if (acceptedTerm && (validForm.email || validForm.phone)) {\n    $('#bfcm-waitlist__submit').prop('disabled', false);\n    return true;\n  }\n\n  $('#bfcm-waitlist__submit').prop('disabled', true);\n\n  if (!acceptedTerm) {\n    $('#toc-error').removeClass('d-none');\n  }\n\n  if (!validForm.email && $(email).val() !== '') {\n    $('#email-error').removeClass('d-none');\n  }\n\n  if (!validForm.phone && $(phone).val() !== '') {\n    $('#phone-error').removeClass('d-none');\n  }\n\n  return false;\n};\n\n$('#bfcm-waitlist__form').on('submit', function (e) {\n  e.preventDefault();\n\n  if (validateForm()) {\n    $(this).addClass('d-none');\n    $('.bfcm-waitlist__thank-you').removeClass('d-none');\n    $('.bfcm-waitlist__title').text($(this).data('thank-you-message'));\n\n    if (validForm.email) {// send email to bluecore and internal backend\n    }\n\n    if (validForm.phone) {// send phone to bluecore\n    }\n  }\n}); // listener of elements\n\n$('#bfcm-waitlist__country').on('change', function () {\n  var code = $(this).find(':selected').attr('data-code');\n  $('.bfcm-waitlist__country-label').html(\"+\".concat(code));\n});\n$('.bfcm-waitlist__shares--copy').on('click', function () {\n  (0,_utils__WEBPACK_IMPORTED_MODULE_0__.copyToClipboard)(this, $(this).data('copy'));\n});\n$('#bfcm-waitlist__phone, #bfcm-waitlist__email, #bfcm-waitlist__toc').on('change', function () {\n  validateForm();\n});\n\n//# sourceURL=webpack://cocoandeve-styleguides/./src/js/modules/bfcm-waitlist.js?");

/***/ })

}]);