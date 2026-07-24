

function realizarCompra(){
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

 if(carrito.length === 0){
 alert("El carrito está vacío");
 return;
 }

let nombre = document.getElementById("nombreUsuario").value;
let fecha = document.getElementById("fechaDePago").value;
let metodoPago = document.getElementById("metodoDePago").value;
let entregaDelivery = document.getElementById("entregaDelivery").checked;

  if(nombre === "" || fecha === ""){
   alert("Por favor completá todos los campos");
   return;
  }
  
  if(entregaDelivery && document.getElementById("domicilio").value === ""){
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
	let producto = null;
    
	for(let j = 0; j < productos.length; j++){
    if(productos[j].nombre === productoCarrito.nombre){
        producto = productos[j];
    }
}

	if(!producto){
      alert("El producto " + productoCarrito.nombre + " ya no está disponible");
      return;
     }
    if(productoCarrito.cantidad > producto.stock){
      alert("No hay suficiente stock de " + productoCarrito.nombre);
      return;
    }
}


for(let i = 0; i < carrito.length; i++){
    let productoCarrito = carrito[i];
    let producto = null;

    for(let j = 0; j < productos.length; j++){
        if(productos[j].nombre === productoCarrito.nombre){
            producto = productos[j];
        }
    }

    producto.stock =  producto.stock - productoCarrito.cantidad;
}

localStorage.setItem("productos", JSON.stringify(productos));



let totalSinIva = 0;
	
 for(let i = 0; i < carrito.length; i++){
 totalSinIva = totalSinIva + (carrito[i].cantidad * carrito[i].precio);
 }

 let porcentajeIva = 0.22;
 
if(metodoPago === "debito"){
porcentajeIva = 0.20;
}

let montoIva = totalSinIva * porcentajeIva;
let totalConIva = totalSinIva + montoIva;

let costoDelivery = 0;

 if(entregaDelivery){
  costoDelivery = 50;
  totalConIva = totalConIva + costoDelivery;
}

let total = totalConIva;

let mensajeIva = "Precio sin IVA: $" + totalSinIva + "  ";	
mensajeIva += "IVA (" + (porcentajeIva * 100) + "%): $ " + montoIva + " " ;
	
if(entregaDelivery){
   mensajeIva += "Costo de delivery: $" + costoDelivery;
 }
mensajeIva += " Total a pagar: $" + total;


let venta = {
  nombre: nombre,
  fecha: fecha,
  hora: new Date().toLocaleTimeString(),
  metodoPago: metodoPago,
  productos: carrito,
  totalSinIva: totalSinIva,
  montoIva: montoIva,
  costoDelivery: costoDelivery,
  total: total
};

let ventasRealizadas = JSON.parse(localStorage.getItem("ventasRealizadas")) || [];
 ventasRealizadas.push(venta);
 
 localStorage.setItem("ventasRealizadas", JSON.stringify(ventasRealizadas));

 let totalAcumulado = Number(localStorage.getItem("totalGastado")) || 0;
   totalAcumulado = totalAcumulado + total;
 
 localStorage.setItem("totalGastado", totalAcumulado);
 localStorage.removeItem("carrito");
 

  alert("Compra confirmada! " + mensajeIva);
    window.location.href = "../index.html";
}