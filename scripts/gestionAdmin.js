
function crearProducto(nombre, seccion, precio, stock, imagen, id) {
    return {
        id: id,
        nombre: nombre,
        seccion: seccion,
        precio: precio,
        stock: stock,
        imagen: imagen
    };
}


function inicializarProductosEjemplos() {

    let productos = JSON.parse(localStorage.getItem("productos")) || [];

    if (productos.length === 0) {
        let ejemplos = [
            crearProducto("Gorro de lana", "chicos", 850, 10, "img/gorroNino1.jpg", 1),
            crearProducto("Pantalón cargo", "Mujeres", 2200, 8, "img/pantalon1.jpg", 2),
			crearProducto("Pack de medias", "Mujeres", 400, 8, "img/mediasMujeres.jpg", 3),
            crearProducto("Pantalón convertible", "Hombres", 1900, 12, "img/pantalon2.jpg", 4),
            crearProducto("Jean clásico", "chicos", 1100, 15, "img/pantalon3.jpg", 5)
        ];

        localStorage.setItem("productos", JSON.stringify(ejemplos));
    }
}

inicializarProductosEjemplos();

document.getElementById("registrar").style.display = "none";

let productos = JSON.parse(localStorage.getItem("productos")) || [];

document.getElementById("btnRegistrar").addEventListener("click", mostrarFormulario);


function mostrarFormulario(){
    document.getElementById("registrar").style.display = "block";  
}

document.getElementById("guardarProducto").addEventListener("click", guardarProducto);

function guardarProducto(){
	
	let productos = JSON.parse(localStorage.getItem("productos")) || [];
	
    let producto = {
       nombre: document.getElementById("nombreProducto").value,
       seccion: document.getElementById("seccionProducto").value,
       precio: Number(document.getElementById("precioProducto").value),
       stock: Number(document.getElementById("stockProducto").value),
       imagen: document.getElementById("imgProducto").value
    };
	
	 if(producto.nombre === "" || producto.seccion === "" || producto.precio <= 0 || producto.stock <= 0 || producto.imagen === ""){
        alert("Debe completar todos los campos");
        return;
    }
    productos.push(producto);
	
    localStorage.setItem("productos",JSON.stringify(productos));

    alert("Producto registrado correctamente");

    console.log(productos);
    limpiarFormulario();
	mostrarNuevoRegistro();
}


function limpiarFormulario(){
    document.getElementById("nombreProducto").value = "";
    document.getElementById("seccionProducto").value = "";
    document.getElementById("precioProducto").value = "";
    document.getElementById("stockProducto").value = "";
    document.getElementById("imgProducto").value = "";
}


function mostrarNuevoRegistro (){
let productos =
JSON.parse(localStorage.getItem("productos")) || [];
let mujeres = "";
let hombres = "";
let chicos = "";
	
	for(let i = 0; i < productos.length; i++){
    let producto = productos[i];
    let htmlProducto = 
    `<section>
        <h3>${producto.nombre}</h3>
        <img src="${producto.imagen}" width="250" height="200" style="border-radius: 15px;">
        <p>Precio: $${producto.precio}</p>
	   <p id="stock-${i}">Stock: ${producto.stock}</p>
	   <p>Editar stock:</p>
		<input type="number" id="editarStock-${i}" name="cantidad" placeholder="ej: 2">
		<button onclick="cargarStock(${i})">Cargar stock</button><br><br>
		<button onclick="eliminarProducto(${i})">Eliminar producto</button>
	</section> 
    <hr> `;   
   
    if(producto.seccion === "Mujeres"){
        mujeres += htmlProducto;
    }
    if(producto.seccion === "Hombres"){
        hombres += htmlProducto;
    }
    if(producto.seccion === "chicos"){
        chicos += htmlProducto;
    }
}
document.getElementById("productosMujeres").innerHTML =mujeres;
document.getElementById("productosHombres").innerHTML =hombres;
document.getElementById("productoschicos").innerHTML =chicos;	
}

function eliminarProducto(indice){
    let productos = JSON.parse(localStorage.getItem("productos")) || [];
    productos.splice(indice, 1);
    localStorage.setItem("productos",JSON.stringify(productos));
    mostrarNuevoRegistro();
}

function cargarStock(indice){
	let productos = JSON.parse(localStorage.getItem("productos")) || [];
    let stockActualizado = Number(document.getElementById("editarStock-" + indice).value);

    console.log("indice:", indice);
    console.log("stockActualizado:", stockActualizado);
    console.log("producto antes:", productos[indice].stock);

	productos[indice].stock = stockActualizado;
    localStorage.setItem("productos",JSON.stringify(productos));
    mostrarNuevoRegistro();
}


function mostrarVentas(){
    let ventasRealizadas = JSON.parse(localStorage.getItem("ventasRealizadas")) || [];
    let html = "";

  for(let i = 0; i < ventasRealizadas.length; i++){
   let venta = ventasRealizadas[i];
   let productosVendidos = "";

     for(let j = 0; j < venta.productos.length; j++){
       productosVendidos += `<p>${venta.productos[j].nombre} x${venta.productos[j].cantidad} - $${venta.productos[j].cantidad * venta.productos[j].precio}</p>`;
     }

       html += `
       <section style="border: 1px solid #ccc; margin: 10px; padding: 10px;">
           <p>Cliente: ${venta.nombre}</p>
          <p>Fecha: ${venta.fecha}</p>
		  <p>Hora: ${venta.hora}</p>
          <p>Método de pago: ${venta.metodoPago}</p>
            ${productosVendidos}
		  <p>Precio sin IVA: $${venta.totalSinIva}</p>
	    	  <p>IVA (${venta.montoIva / venta.totalSinIva * 100}%): $${venta.montoIva}</p>
		   <p>Costo de delivery: $${venta.costoDelivery}</p>
          <p><strong>Total: $${venta.total}</strong></p>
        </section>
        <hr>`;
    }

    if(html === ""){
     html = "No hay ventas realizadas aún";
    }
    document.getElementById("listaVentas").innerHTML = html;
}

mostrarVentas();

function eliminarVentas(){
    localStorage.removeItem("ventasRealizadas");
    mostrarVentas();
}


   mostrarNuevoRegistro();
