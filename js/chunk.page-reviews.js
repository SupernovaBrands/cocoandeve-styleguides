/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcocoandeve_styleguides"] = self["webpackChunkcocoandeve_styleguides"] || []).push([["page-reviews"],{

/***/ "./src/js/modules/page-reviews.js":
/*!****************************************!*\
  !*** ./src/js/modules/page-reviews.js ***!
  \****************************************/
/***/ (() => {

eval("/* global screenLG */\nvar countReviewCard = function countReviewCard(categoryId) {\n  var cardRemaining = $(\".result-card.result-card__more.d-none[data-category=\\\"\".concat(categoryId, \"\\\"]\"));\n\n  if (categoryId === '#all') {\n    cardRemaining = $('.result-card.result-card__more.d-none');\n  }\n\n  return cardRemaining.length;\n};\n\nvar filterReview = function filterReview(targetId) {\n  $('.result-card').addClass('d-none');\n  $(\".result-card[data-category=\\\"\".concat(targetId, \"\\\"]\")).not('.result-card__more').removeClass('d-none');\n\n  if (targetId === '#all') {\n    $('.result-card').not('.result-card__more').removeClass('d-none');\n  }\n\n  if (targetId === '#body') {\n    $('.real-result__grid').removeClass('d-lg-block');\n  } else {\n    $('.real-result__grid').addClass('d-lg-block');\n  }\n\n  var cardRemaining = countReviewCard(targetId);\n\n  if (cardRemaining > 0) {\n    $('#real-result__show-more').removeClass('d-none');\n  } else {\n    $('#real-result__show-more').addClass('d-none');\n  }\n};\n\n$(document).ready(function () {\n  // review filter\n  $('#real-result__main-tab li').on('click', function () {\n    filterReview($(this).find('a').attr('href'));\n  });\n  $('#real-result__select').on('change', function () {\n    filterReview($(this).val());\n  });\n  $('#real-result__show-more').on('click', function (e) {\n    e.preventDefault();\n    var loadMoreItem = $(this).data('load-more');\n    var filterVal = $('#real-result__select').val();\n\n    if (window.innerWidth > screenLG) {\n      filterVal = $('#real-result__main-tab .active').attr('href');\n    }\n\n    var loadMoreElem = $(\".result-card.result-card__more.d-none[data-category=\\\"\".concat(filterVal, \"\\\"]\"));\n\n    if (filterVal === '#all') {\n      loadMoreElem = $('.result-card.result-card__more.d-none');\n    }\n\n    if (loadMoreElem.length > 0) {\n      loadMoreElem.each(function (k, v) {\n        if (k + 1 === loadMoreItem) return false;\n        return $(v).removeClass('result-card__more').removeClass('d-none');\n      });\n    }\n\n    var cardRemaining = countReviewCard(filterVal);\n\n    if (cardRemaining <= 0) {\n      $(this).addClass('d-none');\n    }\n  });\n});\n\n//# sourceURL=webpack://cocoandeve-styleguides/./src/js/modules/page-reviews.js?");

/***/ })

}]);