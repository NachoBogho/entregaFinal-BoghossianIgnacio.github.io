
const carritoPago = JSON.parse(localStorage.getItem("carrito"));
const precioTotal = document.getElementById('precioTotal2'); // Asumiendo que tienes un elemento HTML con el id "precioTotal" para mostrar el total

const mostrarCarritoPago = () => {
  const mostrarCarrito = document.getElementById('mostrarCarrito');
  mostrarCarrito.innerHTML = "";

  carritoPago.forEach((prod) => {
    const div = document.createElement('div');
    div.className = 'mostrarCarrito';
    div.innerHTML = `
      <img src=${prod.imagen} alt="">
      <p>${prod.nombre}</p>
      <p>Precio: ${prod.precio} ETH</p>
      <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
    `;

    mostrarCarrito.appendChild(div);
  });

  localStorage.setItem('carrito', JSON.stringify(carritoPago));

  const total = carritoPago.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0);
  precioTotal.innerText = `Total: ${total} ETH`;
};

mostrarCarritoPago();
