const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = ""
    
    fetch("../data.json")
        .then(stockProductos => stockProductos.json())
        .then( prod => {

        const div= document.createElement('div')
        div.className=('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio: ${prod.precio} ETH</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `

        contenedorCarrito.appendChild(div)
        
   
    localStorage.setItem('carrito', JSON.stringify(carrito))

    contadorCarrito.innerText = carrito.length

    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)

})
}
            
