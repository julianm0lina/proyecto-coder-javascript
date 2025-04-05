class Producto {
    constructor(nombre, precio, cantidad) {
      this.id = Date.now();
      this.nombre = nombre;
      this.precio = precio;
      this.cantidad = cantidad;
      this.subtotal = this.calcularSubtotal();
    }
  
    calcularSubtotal() {
      return this.precio * this.cantidad;
    }
  }
  
  let productos = [];
  let carrito = [];
  
  document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("productos")) {
      productos = JSON.parse(localStorage.getItem("productos"));
    }
    if (localStorage.getItem("carrito")) {
      carrito = JSON.parse(localStorage.getItem("carrito"));
    }
    mostrarProductos();
    mostrarCarrito();
  });
  
  const form = document.getElementById("formulario-producto");
  
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  
    const nombre = document.getElementById("nombre").value;
    const precio = parseFloat(document.getElementById("precio").value);
    const cantidad = parseInt(document.getElementById("cantidad").value);
  
    if (nombre && !isNaN(precio) && !isNaN(cantidad)) {
      const nuevoProducto = new Producto(nombre, precio, cantidad);
      productos.push(nuevoProducto);
      localStorage.setItem("productos", JSON.stringify(productos));
      mostrarProductos();
      form.reset();
    } else {
      alert("Completá todos los campos correctamente.");
    }
  });
  
  function mostrarProductos() {
    const contenedor = document.getElementById("lista-productos");
    contenedor.innerHTML = "";
  
    productos.forEach((prod) => {
      const div = document.createElement("div");
      div.classList.add("producto");
      div.innerHTML = `
        <h3>${prod.nombre}</h3>
        <p>Precio: $${prod.precio}</p>
        <p>Cantidad: ${prod.cantidad}</p>
        <p>Subtotal: $${prod.subtotal}</p>
        <button data-id="${prod.id}">Agregar al carrito</button>
      `;
      contenedor.appendChild(div);
    });
  
    // Escuchar botones de "Agregar al carrito"
    const botonesAgregar = document.querySelectorAll(".producto button");
    botonesAgregar.forEach((boton) => {
      boton.addEventListener("click", () => {
        const idProducto = parseInt(boton.dataset.id);
        const producto = productos.find((p) => p.id === idProducto);
        agregarAlCarrito(producto);
      });
    });
  }
  
  function agregarAlCarrito(producto) {
    const item = carrito.find((p) => p.id === producto.id);
    if (item) {
      item.cantidad += 1;
      item.subtotal = item.precio * item.cantidad;
    } else {
      carrito.push({ ...producto, cantidad: 1, subtotal: producto.precio });
    }
  
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
  }
  
  function mostrarCarrito() {
    const contenedor = document.getElementById("carrito-contenido");
    const total = document.getElementById("total-carrito");
  
    contenedor.innerHTML = "";
  
    let totalCompra = 0;
  
    carrito.forEach((prod) => {
      const div = document.createElement("div");
      div.classList.add("item-carrito");
      div.innerHTML = `
        <p>${prod.nombre} x${prod.cantidad} - $${prod.subtotal}</p>
      `;
      contenedor.appendChild(div);
      totalCompra += prod.subtotal;
    });
  
    total.textContent = `Total: $${totalCompra}`;
  }
  