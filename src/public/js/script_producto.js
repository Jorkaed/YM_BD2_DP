import { renderBootstrapCarousel } from './carrusel.js';

const carouselInner = document.querySelector('#productos-relacionados .carousel-inner');
const indicators = document.querySelector('#productos-relacionados .carousel-indicators');

// Inicial render y on resize
window.addEventListener('load', () => { renderBootstrapCarousel(productos, carouselInner, indicators, "#productos-relacionados") });

window.addEventListener('resize', () => {
    // Reconstruir y resetear al primer slide
    renderBootstrapCarousel(productos, carouselInner, indicators, "#productos-relacionados");
    const bsCarousel = bootstrap.Carousel.getInstance(document.getElementById('productos-relacionados'));
    bsCarousel.to(0);
});

// Selección de color
const colores = new Set();
console.log(variantes);
const contenedor = document.getElementById('colores-container');

variantes.forEach((variante) => {
  if (!colores.has(variante.color)) {
    colores.add(variante.color);

    const label = document.createElement('label');
    label.className = 'color-option';

    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'color';
    input.value = variante.idcolor;
    input.hidden = true;

    const span = document.createElement('span');
    span.className = 'color-circle';
    span.style.backgroundColor = variante.color;

    label.appendChild(input);
    label.appendChild(span);
    contenedor.appendChild(label);
  }
});

const tallas = document.getElementById('talla');
const cantidad = document.getElementById('cantidad');
let productRColor = [];

document.querySelectorAll('.color-option').forEach(option => {
  option.addEventListener('click', () => {
    // Quitar selección previa
    document.querySelectorAll('.color-option').forEach(label => label.classList.remove('selected'));
    option.classList.add('selected');

    // Obtener input hijo del label
    const input = option.querySelector('input');

    // Filtrar por color seleccionado
    productRColor = variantes.filter(v => v.idcolor == input.value);

    // Llenar select de tallas
    tallas.disabled = false;
    tallas.innerHTML = '<option selected disabled>Selecciona una talla</option>';

    productRColor.forEach(variante => {
      const option = document.createElement('option');
      option.value = variante.idtalla;
      option.textContent = variante.talla;
      option.dataset.cantidad = variante.cantidad; // opcional
      tallas.appendChild(option);
    });

    // Resetear cantidad
    cantidad.disabled = true;
    cantidad.value = '';
  });
});

// Al seleccionar una talla
tallas.addEventListener('change', () => {
  const idtalla = tallas.value;
  const label_cantidad = document.getElementById('label-cantidad');
  const seleccion = productRColor.find(p => p.idtalla == idtalla);
console.log(seleccion);
  if (seleccion) {
    label_cantidad.textContent = 'Cantidad: ( '+seleccion.cantidad+' Unidades )';
    cantidad.disabled = false;
    cantidad.value = 1;
    cantidad.max = seleccion.cantidad;
  }
});

window.addEventListener('load', () => {
    // Resetear selección de color
    document.querySelectorAll('.color-option').forEach(option =>        option.classList.remove('selected'));

  // Resetear select de tallas
    tallas.disabled = true;
    tallas.innerHTML = '<option selected disabled>Selecciona un color</option>';

  // Resetear cantidad
    cantidad.disabled = true;
    cantidad.value = '';

  // Resetear texto adicional de cantidad, si existe
    const labelCantidad = document.getElementById('label-cantidad');
    if (labelCantidad) {
        labelCantidad.textContent = 'Cantidad:';
    }
});

// Botón de favoritos
const favBtn = document.getElementById('favorite-btn');
favBtn.addEventListener('click', () => {
    favBtn.classList.toggle('active');
    const icon = favBtn.querySelector('i');
    icon.classList.toggle('bi-heart');
    icon.classList.toggle('bi-heart-fill');
});


