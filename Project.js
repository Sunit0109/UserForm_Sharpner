const productForm = document.getElementById("productForm");
const apiURL =
  "https://crudcrud.com/api/f5f4f0708842426c9edf8e02179db6e7/products";

// Fetch products on page load
window.addEventListener("DOMContentLoaded", fetchProducts);

productForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const productName = document.getElementById("productName").value;
  const sellingPrice = document.getElementById("sellingPrice").value;
  const category = document.getElementById("category").value;

  const product = {
    name: productName,
    price: sellingPrice,
    category: category,
  };

  // Add product to API
  addProductAPI(product);
  productForm.reset();
});

// Function to add product to API and display it in the UI
function addProductAPI(product) {
  fetch(apiURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  })
    .then((response) => response.json())
    .then((data) => {
      addProductToUI(data.name, data.price, data.category, data._id);
    })
    .catch((error) => console.error("Error adding product:", error));
}

// Function to fetch products from API
function fetchProducts() {
  fetch(apiURL)
    .then((response) => response.json())
    .then((products) => {
      products.forEach((product) => {
        addProductToUI(
          product.name,
          product.price,
          product.category,
          product._id
        );
      });
    })
    .catch((error) => console.error("Error fetching products:", error));
}

// Function to display product in the UI
function addProductToUI(name, price, category, id) {
  let list;

  if (category === "food") {
    list = document.getElementById("foodList");
  } else if (category === "electronics") {
    list = document.getElementById("electronicsList");
  } else if (category === "clothes") {
    list = document.getElementById("clothesList");
  }

  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${name}</td>
    <td>${price}</td>
    <td><button onclick="deleteProduct('${id}', this)">Delete</button></td>
  `;
  list.appendChild(row);
}

// Function to delete product from API and UI
function deleteProduct(id, button) {
  fetch(`${apiURL}/${id}`, {
    method: "DELETE",
  })
    .then(() => {
      const row = button.parentElement.parentElement;
      row.parentElement.removeChild(row);
    })
    .catch((error) => console.error("Error deleting product:", error));
}
