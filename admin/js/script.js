$(document).ready(function () {
  const baseURL = "http://ecommerce.reworkstaging.name.ng/v2";
  const merchant = JSON.parse(localStorage.getItem("merchantDetails"));
  let categories = [];
  let allProducts = [];
  let productId = ''
  const $sideMenu = $("aside");
  const $menuBtn = $("#menu-btn");
  const $closeBtn = $("#close-btn");
  const $themeToggler = $(".theme-toggler");
  const $modal = $("#myModal");

  // name setting
  $("#userName").text(merchant.first_name);

  //get categories
  $.ajax({
    url: `${baseURL}/categories?merchant_id=${merchant.id}`,
    method: "GET",
    success: function (response) {
      categories = response;
      displatCatFilter(response);
    },
  });

  // get product by id
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

  //get category of products by id
  function getCatProducts(id) {
    $.ajax({
      url: `${baseURL}/products?merchant_id=${merchant.id}&category_id=${id}`,
      method: "GET",
      success: function (response) {
        displayProducts(response.data);
      },
    });
  }

  // display dynamically populate product table
  function displayProducts(products) {
    const display = $("#productTable");
    display.empty();

    products.map((prod) => {
      display.append(`<tr class="productItem" data-id=${prod.id}>
      <td>${prod.title}</td>
      <td>${prod.price}</td>
      <td>${prod.descp}</td>
      <td class="warning">${prod.quantity}</td>
      <td class="action">
      <span class="material-symbols-outlined edit" style="font-size:16px;
      cursor: pointer;">
edit
</span>
<span class="material-symbols-outlined delete" style="font-size:16px; 
cursor: pointer;
color: red;">
delete
</span>
</td>
    </tr>`);
    });
  }

  //display category filter
  function displatCatFilter(categories) {
    const display = $("#catFilter");
    categories.map((cat) => {
      display.append(`
      <li class="cfilter" data-id=${cat.id}>${cat.name}</li>`);
    });
  }

  // show dropdown list of filter
  $(document).on("click", ".filterBtn", function () {
    $(".dropdown").toggle();
  });

  //filter category by id
  $(document).on("click", ".cfilter", function () {
    const id = $(this).data("id");
    getCatProducts(id);
    $(".dropdown").hide();
  });
  
  // filter category showing all products
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
  $("#addBtn").on("click", function () {
    $("#myModal").show();
    displayCat();
    $("#add").html("Add Product");
  });

  //close modal
  $("#cancel").on("click", function () {
    $("#myModal").hide();
  });

  // add product and edit product
  $("#add").on("click", function () {
    let images = [];
    let locations = [];
    let allLocations = document.querySelectorAll(".shipLocation");
    let allImages = document.querySelectorAll(".productImage");

    allImages.forEach((image) => {
      if (image.value !== "") {
        images.push(image.value.trim());
      }
    });
    allLocations.forEach((location) => {
      if (location.value !== "") {
        locations.push(location.value.trim());
      }
    });

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

    if ($("#add").text() === "Update Product" && productId !== ""){
      $.ajax({
        url: `${baseURL}/products/${productId}`,
        method: "PUT",
        data: data,
        success: function (){
          alert("Product added successfully");
          $modal.hide();
          getProducts()
          $("#add").html("Add Product");
        }

      })
    }else{
      $.ajax({
      url: `${baseURL}/products`,
      method: "POST",
      data: data,
      success: function () {
        alert("Product added successfully");
        $modal.hide();
        getProducts()
      },
    });
  }
  });

  //add second image
  $(document).on("click", ".addMoreImages", function () {
    const display = $("#photoContainer");

    display.append(`<input type="text" class="productImage" />`);
  });

  //add more shipping location
  $(document).on("click", ".addMoreShip", function () {
    const display = $("#shipContainer");

    display.append(`<input type="text" class="shipLocation" />`);
  });

  // When the user clicks anywhere outside of the modal, close it
  $(window).on("click", function (event) {
    if ($(event.target).is($modal)) {
      $modal.hide();
    }
  });

  //function to string boolean value
  function getStringValue(val) {
    if (val === true) {
      return "true";
    } else {
      return "false";
    }
  }

  //edit product
  $(document).on("click", ".edit", function () {
    displayCat();
    const id = $(this).closest('.productItem').data("id");
    const productExists = allProducts.find((item) => item.id === id);
    if (productExists) {
      console.log(productExists)
       $("#productName").val(productExists.title);
      $("#productDescription").val(productExists.descp);
       $("#productPrice").val(productExists.price);
       $("#productBrand").val(productExists.brand);
       $("#productQty").val(productExists.quantity);
      
      $("#currency").val(productExists.currency);
       $("#minQty").val(productExists.min_qty);
      $("#maxQty").val(productExists.max_qty);
      $("#discount").val(productExists.discount);
      $("#discountExpiration").val(productExists.discount_expiration);
       $("#refundPolicy").val(productExists.has_refund_policy);
       $("#hasDiscount").val(getStringValue( productExists.has_discount));
       $("#hasShipment").val(getStringValue( productExists.has_shipment));
      $("#hasVariation").val(productExists.has_variation);
       $("#categoryContainer").val(productExists.category.id);
      $modal.show();
      productId = id;
      $("#add").html("Update Product");

      
    }
  });

  // delete product
  $(document).on("click", ".delete", function () {
    const id = $(this).closest('.productItem').data("id");

    const productExists = allProducts.find((item) => item.id === id);
    if (productExists) {
      const reply = confirm('Are you sure you want to delete product');
      if (reply){
        $.ajax({
          url:`${baseURL}/products/${productExists.id}`,
          method: "DELETE",
          success: function(){
            alert('Product deleted successfully')
            getProducts()
          }

        })
      }
    }
  });


  //logout and move to home page
  $("#logout").on("click", function () {
    localStorage.removeItem("merchantDetails");
    window.location.href = "login.html";
  });
});
