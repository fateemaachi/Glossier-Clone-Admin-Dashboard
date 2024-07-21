$(document).ready(function() {
  const $sideMenu = $('aside');
  const $menuBtn = $('#menu-btn');
  const $closeBtn = $('#close-btn');
  const $themeToggler = $('.theme-toggler');

  // Show sidebar
  $menuBtn.on('click', function() {
    $sideMenu.show();
  });

  // Close sidebar
  $closeBtn.on('click', function() {
    $sideMenu.hide();
  });

  // Change theme
  $themeToggler.on('click', function() {
    $('body').toggleClass('dark-theme-variables');
    $themeToggler.find('span').toggleClass('active');
  });
});