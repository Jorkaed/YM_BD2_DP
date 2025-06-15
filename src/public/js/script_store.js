console.log(productos);
const productsPerPage = 12;
const totalProducts = productos.length;
let currentPage = 1;

function displayProducts(page) {
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const displayedProducts = productos.slice(startIndex, endIndex);

    const productContainer = document.getElementById('products');
    productContainer.innerHTML = ''; // Limpiar productos anteriores

    const row = document.createElement('div');
    row.className = 'row g-4'; // Bootstrap row + gap

    displayedProducts.forEach(producto => {
        const col = document.createElement('div');
        col.className = 'col-6 col-md-4 col-xl-3'; // 2, 3 y 4 columnas responsivo

        col.innerHTML = `
        <a href="/producto/${producto.idproducto}" class="link-underline link-underline-opacity-0">
            <div class="card rounded-0 h-100 card-hover">
                <img src="./img/image-demo.webp" class="card-img-top object-fit-cover px-3 pt-3" alt="${producto.nombre}">
                <div class="card-body d-flex flex-column justify-content-between">
                    <h4 class="card-title fs-6 fw-normal my-auto">${producto.nombre}</h4>
                    <p class="card-text mt-2">${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(producto.precio)}</p>
                </div>
            </div>
        </a>
        `;
        row.appendChild(col); // Agregamos la tarjeta a la fila
    });

    productContainer.appendChild(row); // Insertamos la fila en el contenedor
}

//paginación de productos 

function displayPagination() {
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    const maxButtons = 5; 
    const startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxButtons - 1);

    if (startPage > 1) {
        const prevButton = createButton('prev', currentPage - 1);
        paginationContainer.appendChild(prevButton);
    }

    for (let i = startPage; i <= endPage; i++) {
        const button = createButton(i.toString(), i);
        paginationContainer.appendChild(button);
    }

    if (endPage < totalPages) {
        const nextButton = createButton('next', currentPage + 1);
        paginationContainer.appendChild(nextButton);
    }
}

function createButton(text, page) {
    const button = document.createElement('button');
    if (text == 'prev') {
        button.classList.add('prev');
    }else if (text == 'next') {
        button.classList.add('next');
    }else{
        button.textContent = text;
    }
    button.classList.add('pagination-button', 'btn', 'border-0', 'fs-5');
    if (page === currentPage) {
        button.classList.add('active', 'fw-bold', 'pe-none');
    }
    button.addEventListener('click', () => {
        currentPage = page;
        displayProducts(currentPage);
        displayPagination();
        goHeader();
    });
    return button;
}

displayProducts(currentPage);
displayPagination();

function goHeader() {
    var options = document.getElementById('store-options');
    options.scrollIntoView({block: "end"});
}
