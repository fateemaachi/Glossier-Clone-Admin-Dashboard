$(document).ready(function () {
  const baseURL = "http://ecommerce.reworkstaging.name.ng/v2";
  const merchant = JSON.parse(localStorage.getItem("merchantDetails"));
  let categories = [];
  let allProducts = [];
  const $sideMenu = $("aside");
  const $menuBtn = $("#menu-btn");
  const $closeBtn = $("#close-btn");
  const $themeToggler = $(".theme-toggler");
  const $modal = $("#myModal");

  // name setting

  $('#userName').text(merchant.first_name)  
  //get categories
  $.ajax({
    url: `${baseURL}/categories?merchant_id=${merchant.id}`,
    method: "GET",
    success: function (response) {
      categories = response;
      displatCatFilter(response);
    },
  });

  function getProducts() {
    $.ajax({
      url: `${baseURL}/products?merchant_id=${merchant.id}`,
      method: "GET",
      success: function (response) {
        allProducts = response.data;
        displayProducts(response.data);
      },
    });
  }

  getProducts();

  function getCatProducts(id) {
    $.ajax({
      url: `${baseURL}/products?merchant_id=${merchant.id}&category_id=${id}`,
      method: "GET",
      success: function (response) {
        displayProducts(response.data);
      },
    });
  }

  function displayProducts(products) {
    const display = $("#productTable");
    display.empty();

    products.map((prod) => {
      display.append(`<tr>
      <td>${prod.title}</td>
      <td>${prod.price}</td>
      <td>${prod.descp}</td>
      <td class="warning">${prod.quantity}</td>
    </tr>`);
    });
  }


  function displatCatFilter(categories) {
    const display = $("#catFilter");
    categories.map((cat) => {
      display.append(`
      <li class="cfilter" data-id=${cat.id}>${cat.name}</li>`);
    });
  }

  $(document).on("click", ".filterBtn", function () {
    $(".dropdown").toggle();
  });
  $(document).on("click", ".cfilter", function () {
    const id = $(this).data("id");
    getCatProducts(id);
    $(".dropdown").hide();
  });
  $(".showAllP").on("click", function () {
    displayProducts(allProducts);
    $(".dropdown").hide();
  });

  //display categories
  function displayCat() {
    const display = $("#categoryContainer");
    // display.empty();
    categories.map((cat) => {
      display.append(`<option value="${cat.id}">${cat.name}</option>`);
    });
  }

  // Show sidebar
  $menuBtn.on("click", function () {
    $sideMenu.show();
  });

  // Close sidebar
  $closeBtn.on("click", function () {
    $sideMenu.hide();
  });

  // Change theme
  $themeToggler.on("click", function () {
    $("body").toggleClass("dark-theme-variables");
    $themeToggler.find("span").toggleClass("active");
  });

  // // Get the modal
  // let $modal = $('#myModal');
  $("#addBtn").on("click", function () {
    $("#myModal").show();
    displayCat();
  });

  //close modal
  $("#cancel").on("click", function () {
    $("#myModal").hide();
  });

  $("#add").on("click", function () {
    let images = [];
    let locations = [];
    let location = $(".shipLocation").val();
    if (location !== "") {
      locations.push(location);
      console.log(locations);
    }

    let img = $("#productImage").val();

    if (img !== "") {
      images.push(img);
    }

    function getBoolValue(val) {
      if (val === "true") {
        return true;
      } else {
        return false;
      }
    }

    const data = {
      title: $("#productName").val().trim(),
      descp: $("#productDescription").val().trim(),
      price: parseInt($("#productPrice").val().trim()),
      brand: $("#productBrand").val().trim(),
      quantity: parseInt($("#productQty").val().trim()),
      images: images,
      currency: $("#currency").val(),
      min_qty: parseInt($("#minQty").val().trim()),
      max_qty: parseInt($("#maxQty").val().trim()),
      discount: parseInt($("#discount").val().trim()),
      discount_expiration: $("#discountExpiration").val(),
      has_refund_policy: getBoolValue($("#refundPolicy").val().toLowerCase()),
      has_discount: getBoolValue($("#hasDiscount").val().toLowerCase()),
      has_shipment: getBoolValue($("#hasShipment").val().toLowerCase()),
      has_variation: getBoolValue($("#hasVariation").val().toLowerCase()),
      shipping_locations: locations,
      attrib: [],
      category_id: $("#categoryContainer").val(),
      merchant_id: merchant.id,
    };
    $.ajax({
      url: `${baseURL}/products`,
      method: "POST",
      data: data,
      success: function (response) {
        alert("Product added successfully");
        $modal.hide();
      },
    });
  });

  // When the user clicks anywhere outside of the modal, close it
  $(window).on("click", function (event) {
    if ($(event.target).is($modal)) {
      $modal.hide();
    }
  });

  $("#logout").on("click", function () {
    localStorage.removeItem("merchantDetails");
    window.location.href = "login.html";
  });
});
