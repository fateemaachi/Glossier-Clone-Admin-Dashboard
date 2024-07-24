$(document).ready(function () {
  const baseURL = "http://ecommerce.reworkstaging.name.ng/v2";
  const merchant = JSON.parse(localStorage.getItem("merchantDetails"));
  let valid = false;
  const modal = $("#myModal");
  let categoryId = "";
  let categories = [];

  function validateFields(data) {
    if (data.name === "" && data.image === "") {
      valid = false;
    } else {
      valid = true;
    }
  }
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

  function displayCategories(categ) {
    const display = $("#categoryTable");
    display.empty();

    categ.map((cat) => {
      display.append(`<tr data-id="${cat.id}" class="catItem">
      <td class="flex justify-center"><img src="${cat.image}" alt="${cat.name}" class="catImage"></td>
      <td class="primary">${cat.name}</td>
    </tr>`);
    });
  }

  $(document).on("click", ".catItem", function () {
    const id = $(this).data("id");

    const categoryExists = categories.find((item) => item.id === id);
    if (categoryExists) {
      $("#catName").val(categoryExists.name);
      $("#catImage").val(categoryExists.image);
      modal.show();
      categoryId = id;
      $("#addCat").html("Update Category");
    }
  });
});
