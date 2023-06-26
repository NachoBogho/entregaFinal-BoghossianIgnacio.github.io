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



  