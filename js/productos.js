document.addEventListener("DOMContentLoaded", () => {
  const contenedorProductos = document.getElementById("contenedor-productos");

  if (!contenedorProductos) return;

  fetch("../json/productos.json")
    .then(respuesta => respuesta.json())
    .then(productos => {
      contenedorProductos.innerHTML = "";

      productos.forEach(producto => {
        contenedorProductos.innerHTML += `
          <div class="producto-card">
            <div class="imagen-producto">
              <img src="${producto.imagen}" alt="${producto.nombre}">
            </div>

            <div class="contenido-producto">
              <span class="categoria">${producto.categoria}</span>
              <h3>${producto.nombre}</h3>
              <p>${producto.descripcion}</p>

              <div class="footer-producto">
                <span class="precio">S/ ${Number(producto.precio).toFixed(2)}</span>
                <button>Comprar</button>
              </div>
            </div>
          </div>
        `;
      });
    })
    .catch(error => {
      console.error("Error al cargar productos:", error);
      contenedorProductos.innerHTML = "<p>No se pudieron cargar los productos.</p>";
    });
});