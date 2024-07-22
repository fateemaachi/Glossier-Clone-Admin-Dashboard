$(document).ready(function(){
  const baseURL = "http://ecommerce.reworkstaging.name.ng/v2";
  // The input event triggers whenever the user types or modifies the input field content.
$('#email, #password').on('click', function() {
  $(this).css('border-bottom', '0.5px solid black');
});

//Added blur event handlers to the input fields to call validateInput function when the user clicks out of an input field after typing.
$('#email, #password').on('blur', function() {
  validateInput($(this));
});

// switch to registration page

// $('.fbtn3b').click(function(){
//   resetFormState(); // Reset form state before navigating
//   window.location.href = 'register.html'
// });

// let user = JSON.parse(localStorage.getItem("formData"));
//   console.log(user);

// The submit event handler for #regForm remains intact, performing the form validation and submission logic
$('#regForm').on('submit', function(event){
  event.preventDefault();

  

  // Get the values of the input fields
  const email = $('#email').val();
  const password = $('#password').val();

  let valid = true;

  // Validate fields
  if (email.trim() === '') {
    valid = false;
    $('#errEmail').show();
    $('#email').css('border-bottom', '0.5px solid red');
  }

  if (password.trim() === '') {
      valid = false;
      $('#errPass').show();
      $('#password').css('border-bottom', '0.5px solid red');
  }

   // Check username and password
//    if (valid && (email !== user.email || password !== user.password)) {
//     valid = false;
//    $('#errEmail').show();
//    $('#errPass').show();
//    $('#email').css('border-bottom', '0.5px solid red');
//    $('#password').css('border-bottom', '0.5px solid red');
// }

  if(valid){
    $.ajax({
      url: `${baseURL}/merchants/login`,
      method: "POST",
      data: {email, password},
      success: function (response) {
        localStorage.setItem("merchantDetails", JSON.stringify(response));
        alert("Login successful");
        window.location.href = "index.html";
      },
    });
  }
 
});

// validateInput function checks the input field value and shows the corresponding error message (errorField) and applies red border if the field is empty.
  function validateInput(inputField) {
    let errorField;
    switch (inputField.attr('id')) {
      case 'email':
          errorField = $('#errEmail');
          break;
      case 'password':
          errorField = $('#errPass');
          break;
    }

    if (inputField.val() === '') {
        errorField.show();
        inputField.css('border-bottom', '0.5px solid red');
    } else {
        errorField.hide();
        inputField.css('border-bottom', 'none');
    }
  }

   // Function to reset form state (hide all errors and reset borders)
   function resetFormState() {
    $('#errEmail, #errPass').hide();
    $('#email, #password').css('border-bottom', '0.5px solid black');
  }
});




