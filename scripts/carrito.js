
function migrarCarritoConId(){
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let productos = JSON.parse(localStorage.getItem("productos")) || [];
    let huboCambios = false;

    for(let i = 0; i < carrito.length; i++){

   
        if(carrito[i].id === undefined){

            for(let j = 0; j < productos.length; j++){
                if(productos[j].nombre === carrito[i].nombre){
                    carrito[i].id = productos[j].id;
                    huboCambios = true;
                }
            }
        }
    }

    if(huboCambios){
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }
}


function crearHtmlItemCarrito(producto, indice) {
    return `
    <div class="col-sm-6 col-md-4 col-lg-3 mb-4">
      <div class="card h-100 shadow-sm tarjeta-producto">
        <img src="${validarRutaDeImagen(producto.imagen, "../img/")}" class="card-img-top" style="height:200px; object-fit:cover;" alt="${producto.nombre}">
        <div class="card-body d-flex flex-column">
          <h3 class="card-title h6">${producto.nombre}</h3>
          <p class="card-text mb-2">Precio: $${producto.precio}</p>

          <div class="mt-auto">
            <label for="cantidad-${indice}" class="form-label small mb-1">Cantidad:</label>
            <input type="number" id="cantidad-${indice}" class="form-control form-control-sm mb-2" value="${producto.cantidad}" min="1">

            <button type="button" class="btn btn-outline-danger btn-sm w-100" onclick="eliminarDeCarrito(${indice})">
              Quitar del carrito
            </button>
          </div>
        </div>
      </div>
    </div>`;
}

function mostrarCarrito (){
    let productosAgregados = JSON.parse(localStorage.getItem("carrito")) || [];
    let contenedor = document.getElementById("productosCarrito");

    
    if(productosAgregados.length === 0){
        contenedor.innerHTML = `<div class="col-12"><div class="alert alert-warning">Tu carrito está vacío.</div></div>`;
        return;
    }

    let html = "";
    for(let i = 0; i < productosAgregados.length; i++){
        html += crearHtmlItemCarrito(productosAgregados[i], i);
    }
    contenedor.innerHTML = html;
}

function actualizarCantidad(){
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let productos = JSON.parse(localStorage.getItem("productos")) || [];

    for(let i = 0; i < carrito.length; i++){
        let inputCantidad = document.getElementById("cantidad-" + i);

   
        if(inputCantidad){
            let nuevaCantidad = Number(inputCantidad.value);

            if(nuevaCantidad <= 0){
                alert("La cantidad tiene que ser mayor a 0");
                return;
            }
      
            let producto = null;
            for(let j = 0; j < productos.length; j++){
                if(productos[j].id === carrito[i].id){
                    producto = productos[j];
                }
            }

            let diferencia = nuevaCantidad - carrito[i].cantidad;

            if(producto){
                if(diferencia > 0 && diferencia > producto.stock){
                    alert("No hay suficiente stock de " + carrito[i].nombre);
                    return;
                }
                producto.stock = producto.stock - diferencia;
            }

            carrito[i].cantidad = nuevaCantidad;
        }
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    localStorage.setItem("productos", JSON.stringify(productos));
    mostrarCarrito();
    mostrarTotalCarrito();
}

function mostrarTotalCarrito(){
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    let metodoPagoSeleccionado = document.querySelector('input[name="metodoPago"]:checked');

   
    let metodoPago = "otro";
    if(metodoPagoSeleccionado){
        metodoPago = metodoPagoSeleccionado.value;
    }

  
    let totales = calcularTotalesCarrito(carrito, metodoPago);

    let lineaDescuento = "";
    if(totales.esDebito){
        lineaDescuento = "Descuento débito (10%): -$" + totales.descuento.toFixed(2) + "<br>";
    }

    document.getElementById("totalCarrito").innerHTML =
        "Subtotal: $" + totales.subtotal.toFixed(2) + "<br>" +
        lineaDescuento +
        "IVA (22%): $" + totales.iva.toFixed(2) + "<br>" +
        "<strong>Total: $" + totales.totalSinDelivery.toFixed(2) + "</strong>";
}

function confirmarCompra(){
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    if(carrito.length === 0){
        alert("El carrito está vacío");
        return;
    }
    window.location.href = "registroCompra.html";
}

function eliminarDeCarrito(indice){
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let productos = JSON.parse(localStorage.getItem("productos")) || [];

    let itemQuitado = carrito[indice];

    let producto = null;
    for(let j = 0; j < productos.length; j++){
        if(productos[j].id === itemQuitado.id){
            producto = productos[j];
        }
    }

    if(producto){
        producto.stock += itemQuitado.cantidad;
        localStorage.setItem("productos", JSON.stringify(productos));
    }

    carrito.splice(indice, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
    mostrarTotalCarrito();
}

migrarCarritoConId();
mostrarCarrito();
mostrarTotalCarrito();