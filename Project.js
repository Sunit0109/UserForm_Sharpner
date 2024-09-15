const productForm = document.getElementById("productForm");

productForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const productName = document.getElementById("productName").value;
  const sellingPrice = document.getElementById("sellingPrice").value;
  const category = document.getElementById("category").value;

  addProduct(productName, sellingPrice, category);

  productForm.reset(); // Reset the form after submission
});

function addProduct(name, price, category) {
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
                <td><button onclick="deleteProduct(this)">Delete</button></td>
            `;
  list.appendChild(row);
}

function deleteProduct(button) {
  const row = button.parentElement.parentElement;
  row.parentElement.removeChild(row);
}