function realizarCompra(){
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if(carrito.length === 0){
        alert("El carrito está vacío");
        return;
    }

    let nombre = document.getElementById("nombreUsuario").value.trim();
    let fecha = document.getElementById("fechaDePago").value;
    let metodoPago = document.getElementById("metodoDePago").value;
    let entregaRetiro = document.getElementById("entregaRetiro").checked;
    let entregaDelivery = document.getElementById("entregaDelivery").checked;

    if(nombre === "" || fecha === ""){
        alert("Por favor completá todos los campos");
        return;
    }

    
    if(!entregaRetiro && !entregaDelivery){
        alert("Por favor elegí un método de entrega");
        return;
    }

    if(entregaDelivery && document.getElementById("domicilio").value.trim() === ""){
        alert("Por favor ingresá tu domicilio");
        return;
    }

    if(metodoPago === ""){
        alert("Por favor seleccioná un método de pago");
        return;
    }

    let productos = JSON.parse(localStorage.getItem("productos")) || [];

   
    for(let i = 0; i < carrito.length; i++){
        let productoCarrito = carrito[i];
        let producto = productos.find(function(p){ return p.id === productoCarrito.id; });

        if(!producto){
            alert("El producto " + productoCarrito.nombre + " ya no está disponible");
            return;
        }
    }

   
    let totales = calcularTotalesCarrito(carrito, metodoPago);
    let costoDelivery = entregaDelivery ? costoFijoDelivery : 0;
    let total = totales.totalSinDelivery + costoDelivery;

    let mensajeCompra = "Subtotal: $" + totales.subtotal.toFixed(2) + ". ";

    if(totales.esDebito){
        mensajeCompra += "Descuento débito (10%): -$" + totales.descuento.toFixed(2) + ". ";
    }

    mensajeCompra += "IVA (22%): $" + totales.iva.toFixed(2) + ". ";

    if(entregaDelivery){
        mensajeCompra += "Costo de delivery: $" + costoDelivery.toFixed(2) + ". ";
    }

    mensajeCompra += "Total a pagar: $" + total.toFixed(2);

    let venta = {
        nombre: nombre,
        fecha: fecha,
        hora: new Date().toLocaleTimeString(),
        metodoPago: metodoPago,
        metodoEntrega: entregaDelivery ? "delivery" : "retiro",
        domicilio: entregaDelivery ? document.getElementById("domicilio").value.trim() : null,
        productos: carrito,
        subtotal: totales.subtotal,
        descuento: totales.descuento,
        iva: totales.iva,
        costoDelivery: costoDelivery,
        total: total
    };

    let ventasRealizadas = JSON.parse(localStorage.getItem("ventasRealizadas")) || [];
    ventasRealizadas.push(venta);
    localStorage.setItem("ventasRealizadas", JSON.stringify(ventasRealizadas));


    localStorage.setItem("totalGastado", 0);

 
    localStorage.removeItem("carrito");

    alert("¡Compra confirmada! " + mensajeCompra);
    window.location.href = "../index.html";
}