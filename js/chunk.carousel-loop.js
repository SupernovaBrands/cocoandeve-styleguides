/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcocoandeve_styleguides"] = self["webpackChunkcocoandeve_styleguides"] || []).push([["carousel-loop"],{

/***/ "./src/js/modules/carousel-loop.js":
/*!*****************************************!*\
  !*** ./src/js/modules/carousel-loop.js ***!
  \*****************************************/
/***/ (() => {

eval("/* global screenLG */\n$(document).ready(function () {\n  if ($('.carousel--loop').length > 0) {\n    // moving element carousel item depending of items per slide\n    // triggered by bootstrap carousel slide event (when transition started)\n    $('.carousel--loop').on('slide.bs.carousel', function (e) {\n      var $e = $(e.relatedTarget);\n      var idx = $e.index();\n      var itemsPerSlide = $(this).data('slide-number') ? $(this).data('slide-number') : 3;\n      var totalItems = $(this).find('.carousel-item').length; // handling fix index for carousel when carousel-inner has elements with d-none\n\n      if (totalItems < idx) {\n        idx -= $(this).find('.carousel-inner .d-none').length;\n      }\n\n      if (screenLG > window.innerWidth) {\n        // set 1 for mobile\n        itemsPerSlide = 2;\n      }\n\n      if ($(this).find('.carousel--centered').length > 0) {\n        // add 1 element for negative offset of carousel inner\n        idx += 1; // special case for carousel centered we would need plus 1, as we have negative offset x on carousel-inner\n\n        if (e.direction === 'right') {\n          $(this).find(\".carousel-item:nth-child(\".concat($(this).find('.carousel-item.active').index() + 1 + itemsPerSlide, \")\")).addClass('carousel-item--last');\n        }\n      }\n\n      if (idx >= totalItems - (itemsPerSlide - 1)) {\n        var it = itemsPerSlide - (totalItems - idx);\n\n        for (var i = 0; i < it; i += 1) {\n          if (e.direction === 'left') {\n            $(this).find('.carousel-item').eq(i).appendTo($(this).find('.carousel-inner'));\n          } else {\n            $(this).find('.carousel-item').eq(0).appendTo($(this).find('.carousel-inner'));\n          }\n        }\n      }\n    });\n    $('.carousel--loop').on('slid.bs.carousel', function () {\n      $(this).find('.carousel-item--last').removeClass('carousel-item--last');\n    });\n  }\n});\n\n//# sourceURL=webpack://cocoandeve-styleguides/./src/js/modules/carousel-loop.js?");

/***/ }),

/***/ "./src/js/modules/cookies-banner.js":
/*!******************************************!*\
  !*** ./src/js/modules/cookies-banner.js ***!
  \******************************************/
/***/ (() => {

eval("/* global screenLG */\nfunction initCookieBanner(el) {\n  el.find('.collapse--cookie-banner').on('show.bs.collapse', function () {\n    var parentEl = el;\n    parentEl.find('[data-toggle=\"collapse\"]').addClass('d-none');\n    parentEl.find('.use-default').removeClass('d-none');\n    $('body').addClass('cookies-banner-show--expanded');\n  });\n  el.find('.use-default').click(function () {\n    var parentEl = el;\n\n    if (parentEl.find('#ads').prop('checked') && parentEl.find('#performance').prop('checked')) {\n      parentEl.find('.accept-cookie').click();\n    } else {\n      parentEl.find('#ads').prop('checked', true);\n      parentEl.find('#performance').prop('checked', true);\n    }\n  });\n  el.find('.accept-cookie').click(function () {\n    el.addClass('d-none');\n    $('body').removeClass('cookies-banner-show cookies-banner-show--expanded');\n  });\n  setTimeout(function () {\n    el.removeClass('d-none');\n    $('body').addClass('cookies-banner-show');\n  }, 2000); // same with shopify theme showing banner after 2 seconds\n}\n\n$(document).ready(function () {\n  if (window.innerWidth > screenLG) {\n    initCookieBanner($('.cookies-banner:not(.cookies-banner--bottom)'));\n  } else {\n    initCookieBanner($('.cookies-banner--bottom'));\n  }\n});\n\n//# sourceURL=webpack://cocoandeve-styleguides/./src/js/modules/cookies-banner.js?");

/***/ }),

/***/ "./src/js/modules/product-card.js":
/*!****************************************!*\
  !*** ./src/js/modules/product-card.js ***!
  \****************************************/
/***/ (() => {

eval("$(document).ready(function () {\n  // handle swatch selection on product carousel\n  if ($('.variant-swatch .variant-swatch__item span').length > 0) {\n    $('.variant-swatch .variant-swatch__item span').click(function () {\n      var parent = $(this).parent();\n      var mainParent = $(this).parents('.swatch-overlay');\n\n      if (parent.data('available') === 'available') {\n        mainParent.find('.variant-swatch__item').removeClass('active');\n        mainParent.find('button').data('variant-id', $(this).data('id'));\n        parent.addClass('active');\n        mainParent.find('span[data-swatch-label]').text($(this).data('val'));\n      }\n    });\n  }\n\n  if ($('.product-card button.add-to-cart').length > 0) {\n    $('.product-card button.add-to-cart').click(function () {\n      var _ = this;\n\n      var prevContent = $(this).html();\n      $(this).attr('disabled', 'disabled').html('<span class=\"spinner-border spinner-border-sm\" role=\"status\" aria-hidden=\"true\"></span>'); // remove spinner after 1 seconds, remove spinner should be after process xhr add to cart completed;\n\n      setTimeout(function () {\n        $(_).removeAttr('disabled').html(prevContent).blur();\n      }, 1000);\n    });\n  }\n\n  $('#product-upsell-2').on('click', function (e) {\n    if ($(e.target).hasClass('product-card__button')) {\n      e.preventDefault();\n    }\n  });\n});\n\n//# sourceURL=webpack://cocoandeve-styleguides/./src/js/modules/product-card.js?");

/***/ }),

/***/ "./src/js/modules/real-results.js":
/*!****************************************!*\
  !*** ./src/js/modules/real-results.js ***!
  \****************************************/
/***/ (() => {

eval("$(document).ready(function () {\n  // function filter results card based of data attribute category\n  var filterResults = function filterResults(category) {\n    var $realResults = $('#real-results');\n    $realResults.find('.nav-link.active').removeClass('active');\n    $realResults.find(\".nav-link[href='\".concat(category, \"']\")).addClass('active'); // remove current active class on carousel item\n\n    $realResults.find('.result-card.active').removeClass('active');\n\n    if (category === '#all') {\n      $realResults.find('.result-card.d-none').removeClass('d-none').addClass('carousel-item');\n      $realResults.find('.result-card').first().addClass('active');\n    } else {\n      $realResults.find('.result-card.d-none').removeClass('d-none').addClass('carousel-item');\n      $realResults.find(\".result-card[data-category!='\".concat(category, \"']\")).addClass('d-none').removeClass('carousel-item'); // make all active carousel items nears\n\n      $realResults.find(\".result-card:not('.d-none')\").appendTo('#real-results .carousel-inner');\n      $realResults.find(\".result-card[data-category='\".concat(category, \"']\")).first().addClass('active');\n    }\n  }; // Change tab by select on real result sections\n\n\n  if ($(\"select[data-toggle='select']\").length > 0) {\n    $(\"select[data-toggle='select']\").on('change', function () {\n      var targetFilter = $(this).val();\n      $(\"#real-results .nav-tabs .nav-link[href='\".concat(targetFilter, \"']\")).click();\n    });\n  } // listener tabs click to change the filter\n\n\n  if ($('#real-results .nav-tabs').length > 0) {\n    $('#real-results .nav-tabs .nav-link').click(function (e) {\n      var href = $(this).attr('href');\n      filterResults(href);\n      e.preventDefault();\n    });\n  }\n});\n\n//# sourceURL=webpack://cocoandeve-styleguides/./src/js/modules/real-results.js?");

/***/ })

}]);