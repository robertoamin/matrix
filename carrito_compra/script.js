const addToCartButtons = document.querySelectorAll(".product-grid_btn");
const productDetailsSection = document.getElementById("product-details");
const productDetailsInfo = document.getElementById("product-details-info");
const backToProductsLink = document.getElementById("back-to-products");

// Evento clic para cada botón "Agregar al carrito"
addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Ocultar la sección de productos
    document.querySelector(".product-grid").style.display = "none";

    // Mostrar la sección de detalles del producto
    productDetailsSection.style.display = "block";

    // Obtener el nombre y precio del producto seleccionado
    const productName = button.parentElement.querySelector(".product-grid_name").textContent;
    const productPrice = button.parentElement.querySelector(".product-grid_price").textContent;

    // Mostrar los detalles del producto en la sección de detalles
    const productHTML = `
      <h2>${productName}</h2>
      <p>Precio: ${productPrice}</p>
      <!-- Agregar más detalles del producto aquí si es necesario -->
    `;
    productDetailsInfo.innerHTML = productHTML;
  });
});

// Evento clic para volver a la lista de productos
backToProductsLink.addEventListener("click", () => {
  // Mostrar la sección de productos nuevamente
  document.querySelector(".product-grid").style.display = "grid";

  // Ocultar la sección de detalles del producto
  productDetailsSection.style.display = "none";
});
