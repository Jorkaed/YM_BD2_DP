export function renderBootstrapCarousel(arrayProducts, inner, indicators, carouselId) {
    const itemsPerSlide = () => {
        const w = window.innerWidth;
        if (w >= 768) return 4;
        if (w >= 576) return 3;
        return 2;
    };
    
    const perSlide = itemsPerSlide();
    const slides = [];
    for (let i = 0; i < arrayProducts.length; i += perSlide) {
      slides.push(arrayProducts.slice(i, i + perSlide));
    }

    // Render slides
    inner.innerHTML = slides.map((slide, idx) => `
      <div class="carousel-item ${idx === 0 ? 'active' : ''}">
        <div class="row">
          ${slide.map(producto => `
            <div class="col-6 col-sm-4 col-md-3 mb-3 mb-md-2">
                <a href="/producto/${producto.idproducto}" class="link-underline link-underline-opacity-0">
                <div class="card rounded-0 h-100 card-hover">
                <img src="${producto.imagen || '/img/image-demo.webp'}" class="card-img-top object-fit-cover rounded-0 px-2 pt-2" alt="${producto.nombre}">
                <div class="card-body justify-content-between d-flex flex-column">
                  <h4 class="card-title fs-6 fw-normal my-auto">${producto.nombre}</h4>
                  <p class="card-text mt-2">${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(producto.precio)}</p>
                </div>
              </div>
              </a>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');

    // Render indicators
    indicators.innerHTML = slides.map((_, idx) => `
      <button type="button" data-bs-target="${carouselId}" data-bs-slide-to="${idx}" class="${idx === 0 ? 'active' : ''}" aria-current="${idx === 0}" aria-label="Slide ${idx + 1}"></button>
    `).join('');
}
