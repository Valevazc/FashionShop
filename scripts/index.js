
inicializarProductosEjemplos();


function crearHtmlProducto(producto, indice) {
    return `
    <div class="col-sm-6 col-md-4 col-lg-3 mb-4">
      <div class="card h-100 shadow-sm tarjeta-producto">
        <img src="${validarRutaDeImagen(producto.imagen, "img/")}" class="card-img-top" style="height:200px; object-fit:cover;" alt="${producto.nombre}">
        <div class="card-body d-flex flex-column">
          <h3 class="card-title h6">${producto.nombre}</h3>
          <p class="card-text mb-1">Precio: $${producto.precio}</p>
          <p class="card-text mb-2" id="stock-${indice}">Stock: ${producto.stock}</p>

          <div class="mt-auto">
            <label for="cantidad-${indice}" class="form-label small mb-1">Cantidad:</label>
            <input type="number" id="cantidad-${indice}" name="cantidad" min="1" value="1" class="form-control form-control-sm mb-2">

            <div class="form-check mb-2">
              <input type="checkbox" id="agregarAlCarrito-${indice}" class="form-check-input">
              <label for="agregarAlCarrito-${indice}" class="form-check-label small">Agregar al carrito</label>
            </div>

            <button type="button" class="btn btn-warning btn-sm w-100" onclick="comprarAhora(${indice})">
              Comprar ahora
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
        let htmlProducto = crearHtmlProducto(producto, i);

     
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
    document.getElementById("productosMujeres").innerHTML = mujeres;
    document.getElementById("productosHombres").innerHTML = hombres;
    document.getElementById("productoschicos").innerHTML = chicos;

   
    let totalGuardado = Number(localStorage.getItem("totalGastado")) || 0;
    document.getElementById("resultado").textContent = "$" + totalGuardado;
}


function agregarAlCarrito(){

    let productos = JSON.parse(localStorage.getItem("productos")) || [];
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  
    let totalDeEstaCompra = 0;

    for(let i = 0; i < productos.length; i++){

        let checkbox = document.getElementById("agregarAlCarrito-" + i);

        if(checkbox && checkbox.checked){

            let producto = productos[i];
            let cantidad = Number(document.getElementById("cantidad-" + i).value);

            if(cantidad <= 0){
                alert("La cantidad de " + producto.nombre + " debe ser mayor a 0");
                return;
            }

            if(cantidad > producto.stock){
                alert("No hay suficiente stock de " + producto.nombre);
                return;
            }

        
            let existe = false;

            for(let a = 0; a < carrito.length; a++){
                if(carrito[a].id === producto.id){
                    carrito[a].cantidad += cantidad;
                    existe = true;
                }
            }

            if(existe === false){
                carrito.push({
                    id: producto.id,
                    nombre: producto.nombre,
                    imagen: producto.imagen,
                    precio: producto.precio,
                    cantidad: cantidad
                });
            }

           
            producto.stock -= cantidad;

            totalDeEstaCompra += producto.precio * cantidad;

            checkbox.checked = false;
        }
    }

    localStorage.setItem("productos", JSON.stringify(productos));
    localStorage.setItem("carrito", JSON.stringify(carrito));

    let totalAcumulado = Number(localStorage.getItem("totalGastado")) || 0;
    totalAcumulado = totalAcumulado + totalDeEstaCompra;
    localStorage.setItem("totalGastado", totalAcumulado);

    document.getElementById("resultado").textContent =
        "$" + totalAcumulado;


    mostrarNuevoRegistro();
}


function comprarAhora(indice){

    let productos = JSON.parse(localStorage.getItem("productos")) || [];
    let producto = productos[indice];
    let cantidad = Number(document.getElementById("cantidad-" + indice).value);

    if(cantidad <= 0){
        alert("La cantidad de " + producto.nombre + " debe ser mayor a 0");
        return;
    }

    if(cantidad > producto.stock){
        alert("No hay suficiente stock de " + producto.nombre);
        return;
    }

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  
    let existe = false;

    for(let a = 0; a < carrito.length; a++){
        if(carrito[a].id === producto.id){
            carrito[a].cantidad += cantidad;
            existe = true;
        }
    }

    if(existe === false){
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            imagen: producto.imagen,
            precio: producto.precio,
            cantidad: cantidad
        });
    }

   
    producto.stock -= cantidad;

    localStorage.setItem("productos", JSON.stringify(productos));
    localStorage.setItem("carrito", JSON.stringify(carrito));

    let totalAcumulado = Number(localStorage.getItem("totalGastado")) || 0;
    totalAcumulado = totalAcumulado + (producto.precio * cantidad);
    localStorage.setItem("totalGastado", totalAcumulado);

  
    window.location.href = "HTML/carrito.html";
}


function filtrarProductos() {
    let productos = JSON.parse(localStorage.getItem("productos")) || [];
    let productosfiltrados = productos.filter(function(producto){
        return producto.nombre.toLowerCase().includes(
            document.getElementById("inputbuscar").value.toLowerCase().trim()
        );
    });

    let mujeres = "";
    let hombres = "";
    let chicos = "";

    for (let i = 0; i < productosfiltrados.length; i++) {
        let producto = productosfiltrados[i];
        let indiceOriginal = productos.indexOf(producto);
        let htmlProducto = crearHtmlProducto(producto, indiceOriginal);

       
        if (producto.seccion === "mujeres") {
            mujeres += htmlProducto;
        }
        if (producto.seccion === "hombres") {
            hombres += htmlProducto;
        }
        if (producto.seccion === "chicos") {
            chicos += htmlProducto;
        }
    }
    document.getElementById("productosMujeres").innerHTML = mujeres;
    document.getElementById("productosHombres").innerHTML = hombres;
    document.getElementById("productoschicos").innerHTML = chicos;
}



mostrarNuevoRegistro();