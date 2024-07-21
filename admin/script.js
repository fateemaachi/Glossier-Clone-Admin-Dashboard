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

  // // Get the modal
  // let $modal = $('#myModal');
  $('#addBtn').on('click', function(){
    $('#myModal').show();
  });
  
  //close modal
  $('#cancel').on('click', function(){
    $('#myModal').hide();
  })
 

  // When the user clicks anywhere outside of the modal, close it
  $(window).on('click', function(event) {
    if ($(event.target).is($modal)) {
      $modal.hide();
    }
  });

});