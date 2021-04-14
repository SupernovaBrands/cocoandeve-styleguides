$(document).ready(function(){
  // listener click on swatch element to change value and label
  $(".item-swatch .item span").click(function(){
    var parent =$(this).parent();
    var form = $(this).parents('form');
    if (parent.data('available') == 'available') {
      form.find('.item').removeClass('active');
      form.find('input[name="id"]').val($(this).data('id'));
      parent.addClass('active');
      form.find('.shop-swatch label span').text($(this).data('val'));
    }
  })
});