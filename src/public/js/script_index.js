import { renderBootstrapCarousel } from './carrusel.js';

const carouselInner = document.querySelector('#carrusel-novedades .carousel-inner');
const indicators = document.querySelector('#carrusel-novedades .carousel-indicators');

console.log(productos_novedades);

// Inicial render y on resize
window.addEventListener('load', () => { renderBootstrapCarousel(productos_novedades, carouselInner, indicators, "#carrusel-novedades") });

window.addEventListener('resize', () => {
    // Reconstruir y resetear al primer slide
    renderBootstrapCarousel(productos_novedades, carouselInner, indicators, "#carrusel-novedades");
    const bsCarousel = bootstrap.Carousel.getInstance(document.getElementById('carrusel-novedades'));
    bsCarousel.to(0);
});
