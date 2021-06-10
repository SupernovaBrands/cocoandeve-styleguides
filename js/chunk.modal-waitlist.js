/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcocoandeve_styleguides"] = self["webpackChunkcocoandeve_styleguides"] || []).push([["modal-waitlist"],{

/***/ "./src/js/modules/modal-waitlist.js":
/*!******************************************!*\
  !*** ./src/js/modules/modal-waitlist.js ***!
  \******************************************/
/***/ (() => {

eval("$(document).ready(function () {\n  $('#productWaitlist form').on('submit', function (e) {\n    var el = $(this);\n    var email = el.find('input[name=\"email\"]').val() || '';\n    var country = el.find('select[name=\"country\"]').val() || '';\n    var phoneNum = el.find('input[name=\"phone\"]').val() || '';\n    var tos = el.find('input[name=\"tos\"]').prop('checked');\n    var emailValid = email !== '' && window.validateEmail(email);\n    var countryValid = country !== '';\n    var phoneValid = phoneNum !== '' && window.validatePhone(phoneNum);\n    var validForm = (emailValid || countryValid && phoneValid) && tos;\n\n    if (!emailValid && !phoneValid && !countryValid) {\n      el.find('.email-error').removeClass('d-none');\n    }\n\n    if (!emailValid && !phoneValid) {\n      el.find('.phone-error').text('Please enter a valid phone number').removeClass('d-none');\n    }\n\n    if (!emailValid && phoneValid && !countryValid) {\n      el.find('.phone-error').text('Please enter a country').removeClass('d-none');\n    }\n\n    if (!tos) {\n      el.find('.terms-error').removeClass('d-none');\n    }\n\n    if (email !== '' && phoneNum !== '' && country !== '' && !phoneValid) {\n      validForm = false;\n      el.find('.phone-error').text('Please enter a valid phone number').removeClass('d-none');\n    }\n\n    if (!validForm) {\n      e.preventDefault();\n      return;\n    }\n\n    if (emailValid || phoneValid) {// const productId = $(this).data('product-id');\n      // will call function to send data to bluecore on shopify theme\n    }\n\n    $('#productWaitlist .subscribed').removeClass('d-none');\n    $(this).addClass('d-none');\n    $(this).parents('.modal-content').find('.modal-header p').addClass('d-none');\n    e.preventDefault();\n    e.preventDefault();\n  });\n  $('#productWaitlist form .custom-select').on('change', function () {\n    var val = $(this).val();\n    var maskingEl = $('#productWaitlist .masking-select');\n    var phoneCode = $(this).find(\"option[value='\".concat(val, \"']\")).data('code');\n    maskingEl.text(\"+\".concat(phoneCode)).addClass('selected');\n    $(this).trigger('mouseleave');\n  });\n});\n\n//# sourceURL=webpack://cocoandeve-styleguides/./src/js/modules/modal-waitlist.js?");

/***/ })

}]);