document.addEventListener("DOMContentLoaded", () => {
  const carritoBody = document.getElementById("carrito-body");
  const subtotalCarrito = document.getElementById("subtotal-carrito");
  const envioCarrito = document.getElementById("envio-carrito");
  const totalCarrito = document.getElementById("total-carrito");

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  function mostrarCarrito() {
    carritoBody.innerHTML = "";

    if (carrito.length === 0) {
      carritoBody.innerHTML = `
        <tr>
          <td colspan="5" class="carrito-vacio">
            Tu carrito está vacío
          </td>
        </tr>
      `;

      subtotalCarrito.textContent = "S/ 0.00";
      envioCarrito.textContent = "S/ 0.00";
      totalCarrito.textContent = "S/ 0.00";
      return;
    }

    let subtotal = 0;

    carrito.forEach(producto => {
      const subtotalProducto = Number(producto.precio) * Number(producto.cantidad);
      subtotal += subtotalProducto;

      carritoBody.innerHTML += `
        <tr>
          <td class="producto-col">
            <div class="producto-info">
              <img class="producto-img" src="${producto.imagen}" alt="${producto.nombre}">
              <div>
                <h4>${producto.nombre}</h4>
                <p class="text-sm">${producto.categoria}</p>
              </div>
            </div>
          </td>

          <td>S/ ${Number(producto.precio).toFixed(2)}</td>

          <td>
            <div class="cantidad-control">
              <button onclick="cambiarCantidad(${producto.id}, -1)">-</button>
              <input type="number" value="${producto.cantidad}" min="1" readonly>
              <button onclick="cambiarCantidad(${producto.id}, 1)">+</button>
            </div>
          </td>

          <td class="subtotal-text">S/ ${subtotalProducto.toFixed(2)}</td>

          <td>
            <button class="btn-eliminar" onclick="eliminarProducto(${producto.id})">
              🗑️
            </button>
          </td>
        </tr>
      `;
    });

    const envio = subtotal > 0 ? 15 : 0;
    const total = subtotal + envio;

    subtotalCarrito.textContent = `S/ ${subtotal.toFixed(2)}`;
    envioCarrito.textContent = `S/ ${envio.toFixed(2)}`;
    totalCarrito.textContent = `S/ ${total.toFixed(2)}`;
  }

  window.cambiarCantidad = function(id, cambio) {
    const producto = carrito.find(item => item.id === id);

    if (!producto) return;

    producto.cantidad += cambio;

    if (producto.cantidad <= 0) {
      carrito = carrito.filter(item => item.id !== id);
    }

    guardarCarrito();
    mostrarCarrito();
  };

  window.eliminarProducto = function(id) {
    carrito = carrito.filter(item => item.id !== id);
    guardarCarrito();
    mostrarCarrito();
  };

  mostrarCarrito();
});