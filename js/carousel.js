$(document).ready(function(){
  var itemPerRow = 5;

  // carousel multiple items
  $('.carousel--multiple-items').each(function(){
    $(this).find('.carousel-item').html($(this).find(".carousel-item__child").clone());
    $(this).find('.carousel-item').each(function(i,el){
      // find temporary element
      $(el).find(".carousel-item__child").each(function(idx, childEl){
        if (idx < i) {
          $(childEl).removeClass('d-flex').addClass('temporary-element');
        }
      });

      // moving element child to each carousel item so all carousel item would has all contents
      var appearsItem = $(el).find(".carousel-item__child:not(.temporary-element)").length;
      if (appearsItem < itemPerRow) {
        var moveItem = Math.abs(appearsItem - itemPerRow);
        $(el).find(".carousel-item__child.temporary-element").each(function(idx,childEl){
          if (idx < moveItem) {
            $(childEl).removeClass('temporary-element').addClass('d-flex').appendTo($(el));
          }
        });
      }
    });
  });

  // remove all temporary element;
  $(".carousel-item__child.temporary-element").remove();
});