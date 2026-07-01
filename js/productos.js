document.addEventListener("DOMContentLoaded", () => {
  const contenedorProductos = document.getElementById("contenedor-productos");

  if (!contenedorProductos) return;

  let productosLista = [];

  fetch("../json/productos.json")
    .then(respuesta => respuesta.json())
    .then(productos => {
      productosLista = productos;
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
                <button class="btn-comprar" data-id="${producto.id}">
                  Comprar
                </button>
              </div>
            </div>
          </div>
        `;
      });

      const botonesComprar = document.querySelectorAll(".btn-comprar");

      botonesComprar.forEach(boton => {
        boton.addEventListener("click", () => {
          const idProducto = Number(boton.dataset.id);
          const producto = productosLista.find(item => item.id === idProducto);

          agregarAlCarrito(producto);
        });
      });
    })
    .catch(error => {
      console.error("Error al cargar productos:", error);
      contenedorProductos.innerHTML = "<p>No se pudieron cargar los productos.</p>";
    });
});

function agregarAlCarrito(producto) {
  if (!producto) return;

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const productoExistente = carrito.find(item => item.id === producto.id);

  if (productoExistente) {
    productoExistente.cantidad += 1;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      categoria: producto.categoria,
      descripcion: producto.descripcion,
      precio: Number(producto.precio),
      imagen: producto.imagen,
      cantidad: 1
    });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));

  alert("Producto agregado al carrito");
}