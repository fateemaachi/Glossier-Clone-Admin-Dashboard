$(document).ready(function (){
   const baseURL = "http://ecommerce.reworkstaging.name.ng/v2";
   const merchant = JSON.parse(localStorage.getItem("merchantDetails"));

   // display merchant name
   $('#profileName').text(merchant.first_name);

  //open edit profile details modal
  $('#profilePic').click(function(){
   
    $('#fName').val(merchant.first_name);
    $('#lName').val(merchant.last_name);
    $('#email2').val(merchant.email);
    $('#number').val(merchant.phone);
    $('#storeName').val(merchant.store_name);
    $('#descp').val(merchant.descp);
    $('#icon').val(merchant.icon);
    $('#banner').val(merchant.banner);
    $('#state').val(merchant.state);
    $('#district').val(merchant.district);
    $('#twitter').val(merchant.social_media.x);
    $('#facebook').val(merchant.social_media.face_book);
    $('#instagram').val(merchant.social_media.instagram);
    $('#numbers').val(merchant.phones);

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

  //edit merchant details
  $('#add').on('click', function(){
    const info = {
      first_name: $('#fName').val().trim(),
      last_name: $('#lName').val().trim(),
      email: $('#email2').val().trim(),
      phone: $('#number').val().trim(),
      store_name: $('#storeName').val().trim(),
      descp: $('#descp').val().trim(),
      icon: $('#icon').val().trim(),
      banner: $('#banner').val().trim(),
      state: $('#state').val().trim(),
      district: $('#district').val().trim(),
      social_media: {
        x: $('#twitter').val().trim(),
        face_book: $('#facebook').val().trim(),
        instagram: $('#instagram').val().trim()
      },
      phones: $('#numbers').val().trim()
    }
    $.ajax({
      url: `${baseURL}/merchants/${merchant.id}`,
      method: 'PUT',
      data: info,
      success: function(data){
        localStorage.setItem('merchantDetails', JSON.stringify({...info, id:data.id}));
        alert('details updated successfully');
        $('#myModal').hide()
      }
    });
  });

  //edit merchant password
  $('#add2').on('click', function(){
    const pass ={
      old_password: $('#pass').val(),
      new_password: $('#pass2').val()
    }
    $.ajax({
      url: `${baseURL}/merchants/${merchant.id}/change-passwd`,
      method: 'PUT',
      data: pass,
      success: function(data){
        alert('password updated successfully');
        $('#myModal2').hide();
        console.log(data)
      }
    });
  });

  // dsiplay new details
  function loadDetails () {
   
    $('#firstName').text(merchant.first_name);
    $('#lastName').text(merchant.last_name);
    $('#email').text(merchant.email);
    $('#phone').text(merchant.phone);
    $('#Store').text(merchant.store_name);
    $('#Descp').text(merchant.descp);
    $('#Icon').text(merchant.icon);
    $('#Banner').text(merchant.banner);
    $('#State').text(merchant.state);
    $('#District').text(merchant.district);
    $('#Twitter').text(merchant.social_media.x);
    $('#Facebook').text(merchant.social_media.face_book);
    $('#Instagram').text(merchant.social_media.instagram);
    $('#Numbers').text(merchant.phones);
  }
  loadDetails()
  $("#logout").on("click", function () {
    localStorage.removeItem("merchantDetails");
    window.location.href = "login.html";
  });
});