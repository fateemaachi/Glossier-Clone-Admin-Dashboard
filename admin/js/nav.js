$(document).ready(function () {
  $("#fragrance").hover(function () {
    $(this).addClass("activeNav");
    $(".fragrance").css("display", "grid");
  });
  $(".fragrance").mouseleave(function () {
    $(this).hide();
    $("#fragrance").removeClass("activeNav");
  });
  $("#bag").click(function () {
    $(".cartModal").show();
  });
  $("#close").click(function () {
    $(".cartModal").hide();
  });
  $(".logoContainer").hover(function () {
    $(".hideText").show().addClass("logoTextUp");
  });
  $(".logoContainer").mouseleave(function () {
    $(".hideText").removeClass("logoTextUp").hide();
  });
});
