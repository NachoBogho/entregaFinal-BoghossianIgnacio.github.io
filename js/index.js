const carrusel = document.querySelector(".carrusel-items");
let maxScrollLeft = carrusel.scrollWidth - carrusel.clientWidth;
let animationFrame = null;
let step = 1;

const start = () => {
  animationFrame = requestAnimationFrame(function animate() {
    carrusel.scrollLeft += step;
    if (carrusel.scrollLeft >= maxScrollLeft) {
      carrusel.scrollLeft = 0;
    }
    animationFrame = requestAnimationFrame(animate);
  });
};

const stop = () => {
  cancelAnimationFrame(animationFrame);
};

start();

window.addEventListener('DOMContentLoaded', function() {
  var compraExitosa = localStorage.getItem('compraExitosa');
  if (compraExitosa === 'true') {
    
    Toastify({
      text: "Successful Purchase  ",
      duration: 4000,
      className: "libreriaAgregar",
      backgroundColor: "green",
      stopOnFocus: true,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "center",
      style: {
        color: "#fffff",
      },
      onClick: function () {},
    }).showToast();

    localStorage.removeItem('compraExitosa');
  }
});

