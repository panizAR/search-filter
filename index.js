const searchInput = document.querySelector("#search");
const productsDOM = document.querySelector(".products");
const buttons = document.querySelectorAll(".btn");

let allProducts = [];

const filters = {
  searchItems: "",
};

document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/items")
    .then((res) => {
      allProducts = res.data;

      //   render products
      renderProducts(res.data, filters);
    })
    .catch((err) => {
      console.log(err);
    });
});

function renderProducts(_products, _filterd) {
  const filterProducts = _products.filter((p) => {
    return p.title.toLowerCase().includes(_filterd.searchItems.toLowerCase());
  });
  productsDOM.innerHTML = "";
  //   render DOM
  filterProducts.forEach((item, index) => {
    const productsDiv = document.createElement("div");
    productsDiv.classList.add("product");
    productsDiv.innerHTML = `
        <div class="img-container">
          <img src=${item.image} alt="p-${index}" />
        </div>
        <div class="product-des">
          <div class="products-price">${item.price}</div>
          <div class="products-title">${item.title}</div>
        </div>`;
    productsDOM.appendChild(productsDiv);
  });
}

searchInput.addEventListener("input", (e) => {
  filters.searchItems = e.target.value;
  renderProducts(allProducts, filters);
});

// filter base on btn
buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const filter = e.target.dataset.filter;
    filters.searchItems = filter;
    renderProducts(allProducts, filters);
  });
});
