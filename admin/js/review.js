$(document).ready(function () {
  const baseURL = "http://ecommerce.reworkstaging.name.ng/v2";
  const merchant = JSON.parse(localStorage.getItem("merchantDetails"));
  const user = JSON.parse(localStorage.getItem('formData')) || {};
//   const productId = urlParams.get("id");
  
  let reviews = [];


  // Fetch product reviews
  function getProducts() {
    $.ajax({
      url: `${baseURL}/products?merchant_id=${merchant.id}`,
      method: "GET",
      success: function (response) {
        getProductIds(response.data);
      },
    });
  }
  getProducts()

  function getProductIds (data) {
    let productIds = [];
    data.forEach(item => {
        productIds.push({id: item.id, like: item.like})
    })
    getProductReviews(productIds);
    // console.log(reviews)
    
  }

  function getProductReviews(data) {
    data.map(item => {
        $.ajax({
            url: `${baseURL}/reviews?product_id=${item.id}`,
            method: "GET",
            success: function (response) {
              reviews.push({reviews: response, productId: item.id, productLike: item.like});
              
    displayReviews()
            },
          });
          
    })
    
}


  // Display product reviews
  function displayReviews() {
      const reviewTable = $('#reviews');
      reviewTable.empty();

    
      reviews.map(item => {
        // console.log(item)
        //   const userName = item.user ? `${item.user.first_name} ${item.user.last_name}` : "Anonymous";
        reviewTable.append(`
            <tr data-id=${item.productId}>
                <td>${item.productId}</td>
                <td>
                    ${item.reviews.length === 0 ?  "No review" : item.reviews.map(review =>
                        `<p data-id=${review.id}>${review.text}</p>`
                   )}</td>
                <td>${item.productLike}</td>
            </tr>`
        );
        // item.reviews.map(review => {
        //         reviewTable.append(`
        //             <tr data-id=${review.id}>
        //                 <td>${item.productId}</td>
        //                 <td>${review.text.length === 0 ? "No review" : review.text}</td>
        //                 <td>${item.productLike}</td>
        //             </tr>`
        //         );
        //     })
       
      });
  }

  // Initial fetch of reviews
//   getProductReviews();
//   displayReviews()
});

