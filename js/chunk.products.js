/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcocoandeve_styleguides"] = self["webpackChunkcocoandeve_styleguides"] || []).push([["products"],{

/***/ "./src/js/modules/products.js":
/*!************************************!*\
  !*** ./src/js/modules/products.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sn_cart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sn-cart */ \"./src/js/modules/sn-cart.js\");\n/* global screenLG */\n\n$('.product-image-carousel__indicator__item').on('click', function () {\n  var carousel = $(this).data('target');\n  var selectedIndex = $(this).data('index');\n  $(carousel).carousel(selectedIndex - 1);\n  $('.product-image-carousel__indicator__item button').removeClass('border-primary').addClass('border-white');\n  $(this).find('button').addClass('border-primary').removeClass('border-white');\n  var parent = $(this).closest('.carousel');\n  var index = $(this).index();\n  var active = parent.find('.active').index();\n  var total = parent.find('.carousel-item').length;\n\n  if (total > 5) {\n    if (index - active === 4 && index < total - 1) {\n      $(parent).carousel(active + 1);\n    }\n\n    if (index === active && active !== 0) {\n      $(parent).carousel(active - 1);\n    }\n  }\n});\n$('.product-image-carousel__indicator').on('slide.bs.carousel', function (e) {\n  var $e = $(e.relatedTarget);\n  var index = $e.index();\n  var totalItems = $(this).find('.carousel-item').length;\n  var prevButton = $(this).children('button.sni__chevron-up');\n  var nextButton = $(this).children('button.sni__chevron-down');\n\n  if (index === 0) {\n    prevButton.attr('disabled', 'disabled');\n  } else {\n    prevButton.removeAttr('disabled');\n  }\n\n  if (index + 5 === totalItems) {\n    nextButton.attr('disabled', 'disabled');\n  } else {\n    nextButton.removeAttr('disabled');\n  }\n});\n\nif ($('.product-collapse__toggle').length > 0) {\n  var handleToggle = function handleToggle(open, el) {\n    var toggle = el.siblings('.product-collapse__toggle');\n\n    if (open) {\n      toggle.addClass('sni__minus').removeClass('sni__plus');\n    } else {\n      toggle.addClass('sni__plus').removeClass('sni__minus');\n    }\n  };\n\n  $('.product-collapse').on('show.bs.collapse', function () {\n    handleToggle(true, $(this));\n  }).on('hide.bs.collapse', function () {\n    handleToggle(false, $(this));\n  });\n}\n\n$('.product-form').on('submit', function (e) {\n  e.preventDefault();\n  var variantId = $(this).find('input[name=\"product-variant\"]:checked ~ label .product-swatch button.border-primary').data('id');\n  var quantity = parseInt($(this).find('input[name=\"quantity\"]').val(), 10);\n\n  if (variantId) {\n    _sn_cart__WEBPACK_IMPORTED_MODULE_0__.default.addItem(parseInt(variantId, 10), quantity);\n  }\n});\nvar mobileSwatch = $('.product-swatch-mobile');\n\nvar updateFormButton = function updateFormButton(form) {\n  var selected = form.find('[name=product-variant]:checked ~ label .variant-swatch.border-primary');\n\n  if (selected.hasClass('waitlist') && $('#product-waitlist-form-oos').hasClass('d-none')) {\n    form.find('.product-form-submit').addClass('d-none');\n    mobileSwatch.find('.scroll-to-element').removeClass('d-none');\n    $('#product-waitlist-form-oos').removeClass('d-none');\n  } else {\n    form.find('.product-form-submit').removeClass('d-none');\n    mobileSwatch.find('.scroll-to-element').addClass('d-none');\n    $('#product-waitlist-form-oos').addClass('d-none');\n  }\n\n  if (selected.hasClass('oos')) {\n    form.find('button[type=submit]').text('Out of Stock').attr('disabled', 'disabled');\n  } else {\n    form.find('button[type=submit]').text('Add to Cart').removeAttr('disabled');\n  }\n};\n\n$('.product-form .variant-swatch').on('click', function () {\n  var attrFor = $(this).data('value');\n  var swatchContainers = $(this).closest('form').find('.product-swatch');\n  swatchContainers.each(function (i, el) {\n    var swatches = $(el).find('.variant-swatch');\n    var selected = swatches.filter(\"[data-value=\".concat(attrFor, \"]\"));\n\n    if (selected.length > 0) {\n      swatches.removeClass('border-primary');\n      selected.addClass('border-primary');\n      $(el).find('p').addClass('d-none').filter(\".swatch-label-\".concat(attrFor)).removeClass('d-none');\n    }\n  });\n  updateFormButton($(this).closest('form'));\n});\n$('.product-form [name=product-variant]').on('change', function () {\n  var swatches = $(this).parent().find('.variant-swatch');\n\n  if (swatches.length > 1) {\n    mobileSwatch.find('.product-swatch-mobile__action').addClass('d-none');\n    mobileSwatch.find('.product-swatch-mobile__toggle').removeClass('d-none');\n  } else {\n    mobileSwatch.find('.product-swatch-mobile__action').removeClass('d-none');\n    mobileSwatch.find('.product-swatch-mobile__toggle').addClass('d-none');\n  }\n\n  updateFormButton($(this).closest('form'));\n});\n$('.product-swatch-mobile__collapse').on('show.bs.collapse', function () {\n  $(this).siblings('.product-swatch-mobile__action').removeClass('d-none');\n  $(this).siblings('.product-swatch-mobile__toggle').addClass('d-none');\n}).on('hide.bs.collapse', function () {\n  $(this).siblings('.product-swatch-mobile__action').addClass('d-none');\n  $(this).siblings('.product-swatch-mobile__toggle').removeClass('d-none');\n});\nvar mobileSwatchTrigger = document.querySelector('.product-swatch-mobile__trigger');\n\nif (mobileSwatchTrigger && mobileSwatch.length > 0) {\n  var observerCallback = function observerCallback(entries) {\n    if (window.innerWidth < screenLG) {\n      entries.forEach(function (entry) {\n        if (entry.isIntersecting) {\n          mobileSwatch.removeClass('show');\n          $('.product-swatch-mobile__collapse').collapse('hide');\n        } else {\n          mobileSwatch.addClass('show');\n        }\n      });\n    }\n  };\n\n  var observer = new IntersectionObserver(observerCallback);\n  observer.observe(mobileSwatchTrigger);\n}\n\n//# sourceURL=webpack://cocoandeve-styleguides/./src/js/modules/products.js?");

/***/ })

}]);