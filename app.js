/* Cart */

const contenedorProductos = document.getElementById('contenedorProductos');

const contenedorCarrito = document.getElementById('carrito-contenedor')

const botonVaciar = document.getElementById('vaciar-carrito')

const contadorCarrito = document.getElementById('contadorCarrito')

const cantidad = document.getElementById('cantidad')

const precioTotal = document.getElementById('precioTotal')

const botonFinalizar = document.getElementById('finalizar-compra')

let carrito = JSON.parse(localStorage.getItem('carrito')) || []


/* FUNCION PARA VACIAR EL CARRITO */

botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
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
    <div class="botonesCompra" ><button id="agregar${producto.id}" class="botonAgregar fas fa-cart-shopping hoverOrange"> Add Cart</button></div>       
    `

    contenedorProductos.appendChild(div);
    
    const boton = document.getElementById(`agregar${producto.id}`)

    boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id)
    })      
        
   })
  }

    mostrarCartas()


    const agregarAlCarrito = (prodId) => {
      fetch('data.json')
          .then(stockProductos => stockProductos.json())
          .then( item => {
              item.find((prod) => prod.id === prodId) })
      const existe = carrito.find(prod => prod.id === prodId)        
      if (existe) {
          existe.cantidad++
          actualizarCarrito()
        } else {
          const itemAAgregar ={
            id:item.id,
            imagen:item.img,
            nombre:item.nombre,
            precio:item.precio,
            cantidad: 1,
            descripcion:item.descripcion,
           }
           carrito.push(itemAAgregar)
           console.log(carrito)
        }
          actualizarCarrito()
        }


const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = ""

    carrito.forEach((prod) =>{
        const div= document.createElement('div')
        div.className=('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio: ${prod.precio} ETH</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `

        contenedorCarrito.appendChild(div)
        
    })
   
    localStorage.setItem('carrito', JSON.stringify(carrito))

    contadorCarrito.innerText = carrito.length

    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
}


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
});




/* ABRIR CARRITO */

const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]

const botonAbrir = document.getElementById('boton-carrito')

const botonCerrar = document.getElementById('carritoCerrar')

const modalCarrito = document.getElementsByClassName('modal-carrito')[0]


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



let userData = localStorage.getItem('userData'); // Obtener el valor guardado en localStorage

    // Función para abrir la página de pago en otra pestaña
    function abrirPaginaDePago() {
      window.open('pagina-de-pago.html', '_blank');
    }

    // Función para abrir el modal
    openModalBtn.onclick = function() {
      modal.style.display = "block";
    };

    // Asignar el comportamiento al botón de Finalizar Compra
    let finalizarCompraBtn = document.getElementById('finalizar-compra');

    finalizarCompraBtn.onclick = function() {
      if (userData) {
        abrirPaginaDePago();
      } else {
        abrirModal();
      }
    };

  