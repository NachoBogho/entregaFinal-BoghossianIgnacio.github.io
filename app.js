/* Cart */

const contenedorProductos = document.getElementById('contenedorProductos');

const contenedorCarrito = document.getElementById('carrito-contenedor')

const botonVaciar = document.getElementById('vaciar-carrito')

const contadorCarrito = document.getElementById('contadorCarrito')

const cantidad = document.getElementById('cantidad')

const precioTotal = document.getElementById('precioTotal')

let carrito = JSON.parse(localStorage.getItem('carrito')) || []



botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
})
    

stockProductos.forEach((producto) =>{
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = ` 
    <img src=${producto.img} alt= ""> 
    <h3>${producto.nombre}</h3>
    <p>${producto.descripcion}</p>
    <p class="precioProducto">Precio: <span class="orangeColor fontBold"> ${producto.precio} ETH</span></p>
    <button id="agregar${producto.id}" class="botonAgregar">Agregar <i class="fas fa-cart-shopping hoverOrange"></i></button>       
    `

    contenedorProductos.appendChild(div);
    
    const boton = document.getElementById(`agregar${producto.id}`)

    boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id)
    })      
        
   })

   const agregarAlCarrito = (prodId) => {
    const item = stockProductos.find((prod) => prod.id === prodId)
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

const eliminarDelCarrito = (prodId) =>{
    const item = carrito.find((prod) => prod.id === prodId)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
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
  
      const userData = {
        username: usernameInput.value,
        email: emailInput.value,
        birthday: birthdayInput.value,
        password: passwordInput.value
      };
  
      console.log(userData);
  
      modal.style.display = "none";
    });
  });
  
  var savedData = localStorage.getItem("userData");

  if (savedData) {
    var userData = JSON.parse(savedData);
  
    // Utilizar los datos guardados
    console.log(userData.username);
    console.log(userData.email);
    console.log(userData.birthday);
    console.log(userData.password);
  }

 