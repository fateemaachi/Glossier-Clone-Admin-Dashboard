$(document).ready(function() {
  const baseURL = "http://ecommerce.reworkstaging.name.ng/v2";
  const merchant = JSON.parse(localStorage.getItem('merchantDetails'));
  let valid = false;
  const modal = $("#myModal");

  function validateFields (data) {
    if(data.name === "" && data.image === ""){
      valid = false;
    } else {
      valid = true;
    }
  }
  $("#addCat").on('click', function(){
    const data = {
      merchant_id: merchant.id,
      name: $("#catName").val().trim().toLowerCase(),
      image: $("#catImage").val().trim().toLowerCase(),
    }
    validateFields(data);

    if(valid) {
      $.ajax({
        url:`${baseURL}/categories`,
        method: "POST",
        data: data,
        success: function(){
          alert("Category added successfully")
          modal.hide()
          getCategories()
        }
      })
    }
  })

  function getCategories() {
    $.ajax({
      url: `${baseURL}/categories?merchant_id=${merchant.id}`,
      method: "GET",
      success: function (response) {
        displayCategories(response);
        console.log(response)
      },
    });
  }
  getCategories()

  function displayCategories(categ) {
    const display = $("#categoryTable");
    display.empty();

    categ.map((cat) => {
      display.append(`<tr>
      <td class="flex justify-center"><img src="${cat.image}" alt="${cat.name}" class="catImage"></td>
      <td class="primary">${cat.name}</td>
    </tr>`);
    });
  }
})