$(document).ready(function(){
  $("select[data-toggle='tab']").on('change', function(){
    var targetTab = $(this).val();
    $(".real-results .tab-pane").removeClass('show active');
    $(`#${targetTab}[role='tabpanel']`).addClass('show active');
  })
});
