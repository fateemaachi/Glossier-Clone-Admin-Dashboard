$(document).ready(function () {
  const baseURL = "http://ecommerce.reworkstaging.name.ng/v2";
  const merchant = JSON.parse(localStorage.getItem("merchantDetails"));
  let valid = false;
  const modal = $("#myModal");
  let categoryId = "";
  let categories = [];

  //close modal
  $("#cancelDel").on("click", function () {
    $("#confirmDelete").hide();
  });

  //validate fields
  function validateFields(data) {
    if (data.name === "" && data.image === "") {
      valid = false;
    } else {
      valid = true;
    }
  }

  //add categories to modal
  $("#addCat").on("click", function () {
    const data = {
      merchant_id: merchant.id,
      name: $("#catName").val().trim().toLowerCase(),
      image: $("#catImage").val().trim().toLowerCase(),
    };
    validateFields(data);

    if (valid) {
      if ($("#addCat").text() === "Update Category" && categoryId !== "") {
        $.ajax({
          url: `${baseURL}/categories/${categoryId}`,
          method: "PUT",
          data: data,
          success: function (response) {
            console.log(response);
            alert("Category updated successfully");
            modal.hide();
            getCategories();
            $("#catName").val("");
            $("#catImage").val("");
            categoryId = "";
            $("#addCat").html("Add Category");
          },
        });
      } else {
        $.ajax({
          url: `${baseURL}/categories`,
          method: "POST",
          data: data,
          success: function () {
            alert("Category added successfully");
            modal.hide();
            getCategories();
          },
        });
      }
    }
  });

  // to get all categories
  function getCategories() {
    $.ajax({
      url: `${baseURL}/categories?merchant_id=${merchant.id}`,
      method: "GET",
      success: function (response) {
        displayCategories(response);
        categories = response;
      },
    });
  }
  getCategories();

  //dispay categories on webpage
  function displayCategories(categ) {
    const display = $("#categoryTable");
    display.empty();

    categ.map((cat) => {
      display.append(`<tr data-id="${cat.id}" class="catItem">
      <td class="flex justify-center"><img src="${cat.image}" alt="${cat.name}" class="catImage"></td>
      <td class="primary">${cat.name}</td>
      <td class="primary"><i class="fa-regular fa-pen-to-square edit"></i><i class="fa-solid fa-trash delete" style="color: #e21212;margin-left:20px"></i></td>
    </tr>`);
    });
  }

  //edit categories
  $(document).on("click", ".edit", function () {
    const id = $(this).closest('.catItem').data("id");
    const categoryExists = categories.find((item) => item.id === id);
    if (categoryExists) {
      $("#catName").val(categoryExists.name);
      $("#catImage").val(categoryExists.image);
      modal.show();
      categoryId = id;
      $("#addCat").html("Update Category");
    }
  });

  //delete categories
  $(document).on("click", ".delete", function () {
    const id = $(this).closest('.catItem').data("id");

    const categoryExists = categories.find((item) => item.id === id);
    if (categoryExists) {
      $("#confirmDelete").show();
      categoryId = id;
    }
  });

  // check if catgeory has products
  $.ajax({
    url:`${baseURL}/categories/${categoryId}/products`,
    method: 'GET',
    success: function(response){
      if(response.length > 0){
        alert('Category cannot be deleted as it has a product attached.');
        $('#confirmDelete').hide();
      } else{
        //delete categories
        $.ajax({
          url: `${baseURL}/categories/${categoryId}`,
          method: "DELETE",
          success: function (res) {
            console.log(res)
            alert("Category deleted successfully");
            categoryId = "";
            $("#confirmDelete").hide();
            getCategories();
          }
        });
      }
    }
  });
  
  // $("#deleteCat").click(function () {
  //   $.ajax({
  //     url: `${baseURL}/categories/${categoryId}`,
  //     method: "DELETE",
  //     success: function (res) {
  //       console.log(res)
  //       alert("Category deleted successfully");
  //       categoryId = "";
  //       $("#confirmDelete").hide();
  //       getCategories();
  //     }
  //   })
  // })

  //logout and move to home page
  $("#logout").on("click", function () {
    localStorage.removeItem("merchantDetails");
    window.location.href = "login.html";
  });
});
