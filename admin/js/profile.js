$(document).ready(function (){
   const baseURL = "http://ecommerce.reworkstaging.name.ng/v2";
   const merchant = JSON.parse(localStorage.getItem("merchantDetails"));

   // display merchant name
   $('#profileName').text(merchant.first_name);

  //open edit profile details modal
  $('#profilePic').click(function(){
    $('#myModal').show();
  });

  //cancel modal
  $('#cancel').click(function(){
    $('#myModal').hide();
  });

  //opening password modal
  $('#ediT').click(function(){
    $('#myModal2').show();
  });

  //cancel modal2
  $('#cancel2').click(function(){
    $('#myModal2').hide();
  });
});