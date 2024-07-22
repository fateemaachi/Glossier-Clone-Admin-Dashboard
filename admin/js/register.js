$(document).ready(function () {
  const baseURL = "http://ecommerce.reworkstaging.name.ng/v2";

  // The input event triggers whenever the user types or modifies the input field content.
  $("#fName, #lName, #email2, #password").on("click", function () {
    $(this).css("border-bottom", "0.5px solid black");
  });

  //Added blur event handlers to the input fields to call validateInput function when the user clicks out of an input field after typing.
  $("#fName, #lName, #email2, #password").on("blur", function () {
    validateInput($(this));
  });

  // number checkbox visibility and validation
  $("#tick3").click(function () {
    if ($("#tick3").is(":checked")) {
      $("#cbMsg").show();
      $(".number").show();
    } else {
      $("#cbMsg").hide();
      $(".number").hide();
    }

    // Function to validate phone number on blur event
    $("#number").blur(function () {
      validatePhoneNumber();
    });
  });

  // Function to validate phone number input
  function validatePhoneNumber(phoneNumber) {
    const phoneRegex =
      /^\+?\d{1,3}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{3,}[-.\s]?\d{4,}$/;
    // Regex for 10-digit number

    // Remove any non-numeric characters from input
    phoneNumber = phoneNumber.replace(/\D/g, "");

    if (phoneRegex.test(phoneNumber)) {
      $("#number").css("border-bottom", "0.5px solid #ccc");
      $("#errNum").hide();
      return true;
    } else {
      $("#number").css("border-bottom", "0.5px solid red");
      $("#errNum").show();
      return false;
    }
  }

  // The submit event handler for #regForm remains intact, performing the form validation and submission logic
  $("#regForm").on("submit", function (event) {
    event.preventDefault();
    let phone = $("#number").val();
    let otherNum = $("#numbers").val();
    let validPhone = validatePhoneNumber(phone);
    let numbers = [];

    if (validPhone) {
      numbers.push(phone);
    }
    if (otherNum !== "") {
      numbers.push(otherNum);
    }

    let valid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let formData = {
      first_name: $("#fName").val(),
      last_name: $("#lName").val(),
      email: $("#email2").val(),
      phone: $("#number").val(),
      store_name: $("#storeName").val(),
      descp: $("#descp").val(),
      icon: $("#icon").val(),
      banner: $("#banner").val(),
      phones: numbers,
      password: $("#password").val(),
    };

    // Validation for first name
    if (formData.first_name === "") {
      valid = false;
      $("#errfName").show();
      $("#fName").css("border-bottom", "0.5px solid red");
    }

    // Validation for last name
    if (formData.last_name === "") {
      valid = false;
      $("#errlName").show();
      $("#lName").css("border-bottom", "0.5px solid red");
    }

    // Validation for email
    if (formData.email === "" || !emailRegex.test(formData.email)) {
      valid = false;
      $("#errEmail").show();
      $("#email2").css("border-bottom", "0.5px solid red");
    }

    if (formData.store_name === "") {
      valid = false;
      $("#errsName").show();
      $("#storeName").css("border-bottom", "0.5px solid red");
    }
    if (formData.descp === "") {
      valid = false;
      $("#errDescp").show();
      $("#descp").css("border-bottom", "0.5px solid red");
    }
    // Validation for password
    if (formData.password === "") {
      valid = false;
      $("#errPass").show();
      $("#password").css("border-bottom", "0.5px solid red");
    } else if (formData.password < 8) {
      valid = false;
      $("#errPass2").show();
      $("#password").css("border-bottom", "0.5px solid red");
    }
    if (validPhone) {
      valid = true;
    } else {
      valid = false;
    }

    //validation for checkbox
    if (!$("#tick").prop("checked")) {
      valid = false;
      $("#cbErr").css("display", "block");
    }

    if (valid) {
      $.ajax({
        url: `${baseURL}/merchants`,
        method: "POST",
        data: formData,
        success: function (response) {
          localStorage.setItem("merchantDetails", JSON.stringify(response));
          alert("Registration successful");
          resetForm(); // Reset form after successful submission
          window.location.href = "index.html";
        },
      });
    }
    $("#fName").val("");
    $("#lName").val("");
    $("#email2").val("");
    $("#password").val("");
  });

  // Handle click event on the checkbox
  $("#tick").click(function () {
    if ($(this).prop("checked")) {
      $("#cbErr").hide(); // Hide error message when checkbox is checked
    }
  });

  // validateInput function checks the input field value and shows the corresponding error message (errorField) and applies red border if the field is empty.
  function validateInput(inputField) {
    let errorField;
    switch (inputField.attr("id")) {
      case "fName":
        errorField = $("#errfName");
        break;
      case "lName":
        errorField = $("#errlName");
        break;
      case "email2":
        errorField = $("#errEmail");
        break;
      case "password":
        errorField = $("#errPass");
        break;
    }

    if (inputField.val() === "") {
      errorField.show();
      inputField.css("border-bottom", "0.5px solid red");
    } else {
      errorField.hide();
      inputField.css("border-bottom", "none");
    }
  }

  // Function to reset form state (hide all errors and reset borders)
  function resetForm() {
    $("#errfName, #errlName, #errEmail, #errPass, #errPass2, #cbErr").hide();
    $("#fName, #lName, #email2, #password, #number").css(
      "border-bottom",
      "0.5px solid black"
    );
    $("#tick").prop("checked", false);
    $("#cbMsg, .number").hide();
  }
});
