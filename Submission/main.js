// page styling and responsive scripts

$(document).ready(function() {
  $(".nav-item a").on("click", function() {
    $(".navbar-nav").find(".active").removeClass("active");
    $(this).parent().addClass("active");
  });
});