function mostrarCarrito (){
let productosAgregados =JSON.parse(localStorage.getItem("carrito")) || [];
let html = "";
	
	for(let i = 0; i < productosAgregados.length; i++){
    let producto = productosAgregados[i];
    html +=
        `<section class="areaProducto">
        <h3>${producto.nombre}</h3>
        <img src="${producto.imagen}" width="250" height="200" style="border-radius: 15px;">
        <p>Precio: $${producto.precio}</p>
		</section>
		<section class="areaCarrito">
		<label>Cantidad:</label>
		<input type="number" id="cantidad-${i}" value="${producto.cantidad}" min="1">
		</section><br>
		<button type="button" onclick="eliminarDeCarrito(${i})">Quitar del carrito</button>
    <hr><br><br> `;
	}
   document.getElementById("productosCarrito").innerHTML = html;
}


function actualizarCantidad(){
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    for(let i = 0; i < carrito.length; i++){
        let nuevaCantidad = Number(document.getElementById("cantidad-" + i).value);

        if(nuevaCantidad <= 0){
            alert("La cantidad tiene que ser mayor a 0");
            return;
        }

        carrito[i].cantidad = nuevaCantidad;
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
	mostrarTotalCarrito();
}


function mostrarTotalCarrito(){
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let total = 0;
    for(let i = 0; i < carrito.length; i++){
        total = total + (carrito[i].cantidad * carrito[i].precio);
    }
	
	let iva = total * 0.22;
    let totalConIva = total + iva;
    document.getElementById("totalCarrito").textContent = 
        "Subtotal: $" + total + "  IVA (22%): $" + iva + "  Total con IVA: $" + totalConIva  + ". ATENCIÓN: Pagando con débito el IVA baja al 20%";
}

function confirmarCompra(){
	
	 let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if(carrito.length === 0){
     alert("El carrito está vacío");
     return;
    }else{
	 window.location.href="registroCompra.html"	
	}
}


function eliminarDeCarrito(indice){
	let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(indice, 1);
    localStorage.setItem("carrito",JSON.stringify(carrito));

mostrarCarrito();
mostrarTotalCarrito()
}


mostrarCarrito();
mostrarTotalCarrito();
