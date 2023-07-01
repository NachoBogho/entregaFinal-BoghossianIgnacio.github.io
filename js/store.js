const contenedorProductos = document.getElementById('contenedorProductos');

const contenedorCarrito = document.getElementById('carrito-contenedor')

const botonVaciar = document.getElementById('vaciar-carrito')

const contadorCarrito = document.getElementById('contadorCarrito')

const cantidad = document.getElementById('cantidad')

const precioTotal = document.getElementById('precioTotal')

const botonFinalizar = document.getElementById('finalizar-compra')

const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]

const botonAbrir = document.getElementById('boton-carrito')

const botonCerrar = document.getElementById('carritoCerrar')

const filtroPrecioMin = document.getElementById('filtroPrecioMin')

const filtroPrecioMax = document.getElementById('filtroPrecioMax')

const botonFiltrar = document.getElementById('botonFiltrar')

const cerrarSession = document.getElementById('botonCerrarSesion')

const modalCarrito = document.getElementsByClassName('modal-carrito')[0]

let carrito = JSON.parse(localStorage.getItem('carrito')) || []


botonAbrir.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})
botonCerrar.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})

contenedorModal.addEventListener('click', (event) =>{
    contenedorModal.classList.toggle('modal-active')

})
modalCarrito.addEventListener('click', (event) => {
    event.stopPropagation() 
})

/* FUNCION ASINCRONICA CON FETCH PARA MOSTRAR LAS CARTAS QUE ESTAN EN EL ARCHIVO JSON */

const mostrarCartas = async() =>{
  const respuesta = await fetch ("../data.json")
  const stock = await respuesta.json()

  stock.forEach((producto) =>{
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = ` 
    <img src=${producto.img} alt= ""> 
    <h3>${producto.nombre}</h3>
    <p>${producto.descripcion}</p>
    <p class="precioProducto">Precio: <span class="orangeColor fontBold"> ${producto.precio} ETH</span></p>
    <div class="botonesCompra"><button id="agregar${producto.id}" class="botonAgregar hoverOrange">Add Cart</button></div>       
    `

    contenedorProductos.appendChild(div);
    
    const boton = document.getElementById(`agregar${producto.id}`)

    boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id)

        Toastify({
          text: "Successfully Added  ",
          duration: 800,
          className:"libreriaAgregar",
          backgroundColor: "#de600c",
          stopOnFocus: true, // Prevents dismissing of toast on hover
          newWindow: true,
          close: true,
          gravity: "top", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          style: {
            color: "#fffff",

          },
          onClick: function(){} // Callback after click
        }).showToast();
    })      
        
   })

botonFiltrar.addEventListener('click', filtrarProductos);

function filtrarProductos() {
  const precioMin = parseFloat(filtroPrecioMin.value);
  const precioMax = parseFloat(filtroPrecioMax.value);

  // Validar que los valores sean numéricos y el mínimo sea menor al máximo
  if (isNaN(precioMin) || isNaN(precioMax) || precioMin >= precioMax) {
    
    Toastify({
      text: "Please enter two valid values  ",
      duration: 4000,
      className:"libreriaAgregar",
      backgroundColor: "red",
      stopOnFocus: true, // Prevents dismissing of toast on hover
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "left", // `left`, `center` or `right`
      style: {
        color: "#fffff",

      },
      onClick: function(){} // Callback after click
    }).showToast();
    return;
  }

  // Limpiar los productos existentes en el contenedor
  contenedorProductos.innerHTML = '';

  // Filtrar los productos por precio
  const productosFiltrados = stock.filter(producto => {
    const precioProducto = parseFloat(producto.precio);
    return precioProducto >= precioMin && precioProducto <= precioMax;
  });

  // Mostrar los productos filtrados en pantalla
  productosFiltrados.forEach(producto => {
    const div = document.createElement('div');
    div.classList.add('producto');
    div.innerHTML = ` 
      <img src=${producto.img} alt="">
      <h3>${producto.nombre}</h3>
      <p>${producto.descripcion}</p>
      <p class="precioProducto">Precio: <span class="orangeColor fontBold"> ${producto.precio} ETH</span></p>
      <div class="botonesCompra"><button id="agregar${producto.id}" class="botonAgregar hoverOrange"> Add Cart</button></div>       
    `;

    contenedorProductos.appendChild(div);

    const boton = document.getElementById(`agregar${producto.id}`);

    boton.addEventListener('click', () => {
      agregarAlCarrito(producto.id);

      Toastify({
        text: "Successfully Added  ",
        duration: 800,
        className: "libreriaAgregar",
        backgroundColor: "#de600c",
        stopOnFocus: true,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        style: {
          color: "#fffff",
        },
        onClick: function () {},
      }).showToast();
    });
  });
}
  }

    mostrarCartas()
    
    const eliminarDelCarrito = (prodId) =>{
      const item = carrito.find((prod) => prod.id === prodId)
      const indice = carrito.indexOf(item)
      carrito.splice(indice, 1)
      actualizarCarrito()
  }

  const agregarAlCarrito = (prodId) => {
    fetch("../data.json")
      .then((stockProductos) => stockProductos.json())
      .then((item) => {
        const producto = item.find((prod) => prod.id === prodId);
        const existe = carrito.find((prod) => prod.id === prodId);
        if (existe) {
          existe.cantidad++;
          actualizarCarrito();
        } else {
          const itemAAgregar = {
            id: producto.id,
            imagen: producto.img,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1,
            descripcion: producto.descripcion,
          };
          carrito.push(itemAAgregar);
          console.log(carrito);
        }
  
        actualizarCarrito();
      });
  };
 
        
  const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = ""
    carrito.forEach((prod) =>{
        const div= document.createElement('div')
        div.className=('productoEnCarrito')
        div.innerHTML = `
        <img src= ${prod.imagen} alt= "">
        <p>${prod.nombre}</p>
        <p>Precio: ${prod.precio} ETH</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `

        contenedorCarrito.appendChild(div)

        localStorage.setItem('carrito', JSON.stringify(carrito))

    })

    localStorage.setItem('carrito', JSON.stringify(carrito))

    contadorCarrito.innerText = carrito.length

    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
}
              
/* FUNCION PARA VACIAR EL CARRITO */

botonVaciar.addEventListener('click', () => {
  carrito.length = 0
  actualizarCarrito()
})


/* Register */

document.addEventListener("DOMContentLoaded", function() {
  let openModalBtn = document.getElementById("openModalBtn");
  let modal = document.getElementById("myModal");
  let closeButton = document.getElementsByClassName("close")[0];
  let registrationForm = document.getElementById("registrationForm");
  let userNameElement = document.getElementById("user-name");

  openModalBtn.onclick = function() {
    modal.style.display = "block";
  };

  closeButton.onclick = function() {
    modal.style.display = "none";
  };

  registrationForm.addEventListener("submit", function(event) {
    event.preventDefault();
    let usernameInput = document.getElementById("username");
    let emailInput = document.getElementById("email");
    let birthdayInput = document.getElementById("birthday");
    let passwordInput = document.getElementById("password");

    let userData = {
      username: usernameInput.value,
      email: emailInput.value,
      birthday: birthdayInput.value,
      password: passwordInput.value
    };

    // Guardar los datos en localStorage
    localStorage.setItem("userData", JSON.stringify(userData));
    
    // Mostrar el nombre en el HTML
    userNameElement.textContent = userData.username;

    modal.style.display = "none";
  });

  // Obtener los datos guardados en localStorage
  let savedData = localStorage.getItem("userData");

  if (savedData) {
    let userData = JSON.parse(savedData);

    // Mostrar el nombre en el HTML
    userNameElement.textContent = userData.username;
  }

  // Función para abrir la página de pago en otra pestaña
  function abrirPaginaDePago() {
    window.open('pagina-de-pago.html', '_self');
  }

  // Asignar el comportamiento al botón de Finalizar Compra
  let finalizarCompraBtn = document.getElementById('finalizar-compra');

  finalizarCompraBtn.onclick = function() {
    let userData = localStorage.getItem('userData'); // Obtener el valor guardado en localStorage

    if (userData) {
      abrirPaginaDePago();
    } else {
      openModalBtn.click(); // Llamar al método 'click' para abrir el modal
    }
  }

  cerrarSession.addEventListener('click', () => {
    localStorage.removeItem('userData');
    location.reload();
  });

});

/* convertidor de eth */

function convertToARS() {
  const ethAmount = 1;
  const conversionRate = 473678.91;  // Tasa de conversión de ETH a Pesos Argentinos (ejemplo)

  const result = ethAmount * conversionRate;

  document.getElementById('result').innerHTML =  result + 'ARS';
}

function convertToUSD() {
  const ethAmount = 1;
  const conversionRate = 1857.48;  // Tasa de conversión de ETH a Dólares (ejemplo)

  const result = ethAmount * conversionRate;

  document.getElementById('result').innerHTML = result + 'USD';
}

function convertToEUR() {
  const ethAmount = 1;
  const conversionRate = 1701.92;  // Tasa de conversión de ETH a Euros (ejemplo)

  const result = ethAmount * conversionRate;

  document.getElementById('result').innerHTML =  result + 'EUR' ;
}

function convertToBRL() {
  const ethAmount = 1;
  const conversionRate = 8997.91;  // Tasa de conversión de ETH a Reales (ejemplo)

  const result = ethAmount * conversionRate;

  document.getElementById('result').innerHTML = + result + 'BRL';
}



