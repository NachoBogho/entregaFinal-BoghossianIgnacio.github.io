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
