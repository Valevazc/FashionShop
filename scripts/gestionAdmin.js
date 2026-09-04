

inicializarProductosEjemplos();

document.getElementById("registrar").classList.add("d-none");

document.getElementById("btnRegistrar").addEventListener("click", mostrarFormulario);

function mostrarFormulario(){
    document.getElementById("registrar").classList.remove("d-none");
}

document.getElementById("guardarProducto").addEventListener("click", guardarProducto);

function guardarProducto(){

    let productos = JSON.parse(localStorage.getItem("productos")) || [];

    let urlImagenIngresada = document.getElementById("imgProducto").value.trim();

    let producto = {
        id: generarNuevoId(productos),
        nombre: document.getElementById("nombreProducto").value.trim(),
        seccion: document.getElementById("seccionProducto").value.toLowerCase(),
        precio: Number(document.getElementById("precioProducto").value),
        stock: Number(document.getElementById("stockProducto").value),
        imagen: urlImagenIngresada
    };


    if(producto.nombre === "" || producto.precio <= 0 || producto.stock < 0 || producto.imagen === ""){
        alert("Debe completar todos los campos correctamente");
        return;
    }


    let empiezaConHttp = producto.imagen.startsWith("http://");
    let empiezaConHttps = producto.imagen.startsWith("https://");

    if(empiezaConHttp === false && empiezaConHttps === false){
        alert("La imagen tiene que ser un link que empiece con http:// o https://");
        return;
    }

    productos.push(producto);

    localStorage.setItem("productos", JSON.stringify(productos));

    alert("Producto registrado correctamente");

    limpiarFormulario();
    mostrarNuevoRegistro();
}

function limpiarFormulario(){
    document.getElementById("nombreProducto").value = "";
    document.getElementById("seccionProducto").value = "mujeres";
    document.getElementById("precioProducto").value = "";
    document.getElementById("stockProducto").value = "";
    document.getElementById("imgProducto").value = "";
}


function crearHtmlProductoAdmin(producto) {
    return `
    <div class="col-sm-6 col-md-4 col-lg-3 mb-4">
      <div class="card h-100 shadow-sm tarjeta-producto">
        <img src="${validarRutaDeImagen(producto.imagen, "../img/")}" class="card-img-top" style="height:180px; object-fit:cover;" alt="${producto.nombre}">
        <div class="card-body d-flex flex-column">
          <h3 class="card-title h6">${producto.nombre}</h3>
          <p class="card-text mb-1">Precio: $${producto.precio}</p>
          <p class="card-text mb-2">Stock: ${producto.stock}</p>

          <div class="mt-auto">
            <label for="editarStock-${producto.id}" class="form-label small mb-1">Editar stock:</label>
            <div class="input-group input-group-sm mb-2">
              <input type="number" id="editarStock-${producto.id}" class="form-control" placeholder="Ej: 2">
              <button type="button" class="btn btn-outline-secondary" onclick="cargarStock(${producto.id})">Cargar</button>
            </div>
            <button type="button" class="btn btn-outline-danger btn-sm w-100" onclick="eliminarProducto(${producto.id})">
              Eliminar producto
            </button>
          </div>
        </div>
      </div>
    </div>`;
}

function mostrarNuevoRegistro (){
    let productos = JSON.parse(localStorage.getItem("productos")) || [];
    let mujeres = "";
    let hombres = "";
    let chicos = "";

    for(let i = 0; i < productos.length; i++){
        let producto = productos[i];
        let htmlProducto = crearHtmlProductoAdmin(producto);

    
        if(producto.seccion === "mujeres"){
            mujeres += htmlProducto;
        }
        if(producto.seccion === "hombres"){
            hombres += htmlProducto;
        }
        if(producto.seccion === "chicos"){
            chicos += htmlProducto;
        }
    }

    document.getElementById("productosMujeres").innerHTML =
        mujeres || `<p class="text-muted">No has registrado nada aún</p>`;
    document.getElementById("productosHombres").innerHTML =
        hombres || `<p class="text-muted">No has registrado nada aún</p>`;
    document.getElementById("productoschicos").innerHTML =
        chicos || `<p class="text-muted">No has registrado nada aún</p>`;
}


function eliminarProducto(id){
    let productos = JSON.parse(localStorage.getItem("productos")) || [];
    let productosSinEliminar = [];
    for(let i = 0; i < productos.length; i++){
        if(productos[i].id !== id){
            productosSinEliminar.push(productos[i]);
        }
    }

    localStorage.setItem("productos", JSON.stringify(productosSinEliminar));
    mostrarNuevoRegistro();
}

function cargarStock(id){
    let productos = JSON.parse(localStorage.getItem("productos")) || [];
    let producto = null;
    for(let j = 0; j < productos.length; j++){
        if(productos[j].id === id){
            producto = productos[j];
        }
    }

    let stockActualizado = Number(document.getElementById("editarStock-" + id).value);

  
    let stockEsValido = true;

    if(producto === null){
        stockEsValido = false;
    }
    if(isNaN(stockActualizado)){
        stockEsValido = false;
    }
    if(stockActualizado < 0){
        stockEsValido = false;
    }

    if(stockEsValido === false){
        alert("Ingresá un stock válido (0 o mayor)");
        return;
    }

    producto.stock = stockActualizado;
    localStorage.setItem("productos", JSON.stringify(productos));
    mostrarNuevoRegistro();
}

function mostrarVentas(){
    let ventasRealizadas = JSON.parse(localStorage.getItem("ventasRealizadas")) || [];
    let html = "";

    for(let i = 0; i < ventasRealizadas.length; i++){
        let venta = ventasRealizadas[i];
        let productosVendidos = "";

        for(let j = 0; j < venta.productos.length; j++){
            let item = venta.productos[j];
            productosVendidos += `<p class="mb-1">${item.nombre} x${item.cantidad} - $${(item.cantidad * item.precio).toFixed(2)}</p>`;
        }

        let lineaDescuento = venta.descuento > 0
            ? `<p class="mb-1">Descuento débito (10%): -$${venta.descuento.toFixed(2)}</p>`
            : "";

        let lineaEntrega = venta.metodoEntrega === "delivery"
            ? `<p class="mb-1">Entrega: envío a domicilio (${venta.domicilio || "sin domicilio"})</p>`
            : `<p class="mb-1">Entrega: retiro en el local</p>`;

        html += `
        <div class="col-12 col-md-6 mb-3">
          <div class="card shadow-sm p-3">
            <p class="mb-1"><strong>Cliente:</strong> ${venta.nombre}</p>
            <p class="mb-1"><strong>Fecha:</strong> ${venta.fecha} — ${venta.hora}</p>
            <p class="mb-1"><strong>Método de pago:</strong> ${venta.metodoPago}</p>
            ${lineaEntrega}
            <hr>
            ${productosVendidos}
            <hr>
            <p class="mb-1">Subtotal: $${venta.subtotal.toFixed(2)}</p>
            ${lineaDescuento}
            <p class="mb-1">IVA (${(porcentajeIva * 100)}%): $${venta.iva.toFixed(2)}</p>
            <p class="mb-1">Costo de delivery: $${venta.costoDelivery.toFixed(2)}</p>
            <p class="mb-0"><strong>Total: $${venta.total.toFixed(2)}</strong></p>
          </div>
        </div>`;
    }

    if(html === ""){
        html = `<p class="text-muted">No hay ventas realizadas aún</p>`;
    }
    document.getElementById("listaVentas").innerHTML = html;
}

function eliminarVentas(){
    localStorage.removeItem("ventasRealizadas");
    mostrarVentas();
}

mostrarVentas();
mostrarNuevoRegistro();