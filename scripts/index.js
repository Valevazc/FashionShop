
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
            crearProducto("Gorro de lana", "chicos", 850, 10, "HTML/img/gorroNino1.jpg", 1),
            crearProducto("Pantalón cargo", "Mujeres", 2200, 8, "HTML/img/pantalon1.jpg", 2),
			 crearProducto("Pack de medias", "Mujeres", 400, 8, "HTML/img/mediasMujeres.jpg", 3),
            crearProducto("Pantalón convertible", "Hombres", 1900, 12, "HTML/img/pantalon2.jpg", 4),
            crearProducto("Jean clásico", "chicos", 1100, 15, "HTML/img/pantalon3.jpg", 5)
        ];

        localStorage.setItem("productos", JSON.stringify(ejemplos));
    }
}

inicializarProductosEjemplos();

function mostrarNuevoRegistro (){
let productos =
JSON.parse(localStorage.getItem("productos")) || [];
let mujeres = "";
let hombres = "";
let chicos = "";
	
	for(let i = 0; i < productos.length; i++){
    let producto = productos[i];
    let htmlProducto = 
        `<section class="areaProducto">
        <h3>${producto.nombre}</h3>
        <img src="${producto.imagen}" width="250" height="200" style="border-radius: 15px;">
        <p>Precio: $${producto.precio}</p>
        <p id="stock-${i}">Stock: ${producto.stock}</p>
		</section>
		<section class="areaCarrito">
		<label for="cantidad-${i}">Cantidad:</label>
		<input type="number" id="cantidad-${i}" name="cantidad" min="1" value="1">
		<input type="checkbox" id="agregarAlCarrito-${i}">
		<label for="agregarAlCarrito-${i}">Agregar al carrito</label><br>
		<a href="#verBoton">carrito</a>
		</section><hr>`;
   
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


function agregarAlCarrito(){

    let productos = JSON.parse(localStorage.getItem("productos")) || [];
    let total = 0;

	let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
		
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

    if(carrito[a].nombre === producto.nombre){

        carrito[a].cantidad += cantidad;
        existe = true;
    }
}


if(existe === false){
	carrito.push({nombre: producto.nombre,
	imagen: producto.imagen,
	precio: producto.precio,
	cantidad: cantidad
	});

}
	
checkbox.checked = false;
  }
 }

    localStorage.setItem("productos", JSON.stringify(productos));
	localStorage.setItem("carrito", JSON.stringify(carrito));
	
    let totalAcumulado = Number(localStorage.getItem("totalGastado")) || 0; 
    totalAcumulado = totalAcumulado + total;
    localStorage.setItem("totalGastado", totalAcumulado);

    document.getElementById("resultado").textContent =
        "$" + totalAcumulado;	
    }

  
  
function filtrarProductos() {
let productosfiltrados = [];
let productos = JSON.parse(localStorage.getItem("productos")) || [];
let resultado = productos.filter(function(producto){
 return producto.nombre.toLowerCase().includes(document.getElementById("inputbuscar").value.toLowerCase().trim()
   );
});

productosfiltrados = resultado;
let mujeres = "";
let hombres = "";
let chicos = "";
 
 for (let i = 0; i < productosfiltrados.length; i++) {
 let producto = productosfiltrados[i];
 let indiceOriginal = productos.indexOf(producto);
 let htmlProducto = 
`<section class="areaProducto">
<h3>${producto.nombre}</h3>
<img src="${producto.imagen}" width="250" height="200">
<p>Precio: $${producto.precio}</p>
<p id="stock-${indiceOriginal}">Stock: ${producto.stock}</p>
</section>
<section class="areaCarrito">
<label for="cantidad-${indiceOriginal}">Cantidad:</label>
<input type="number" id="cantidad-${indiceOriginal}" name="cantidad" min="1" value="1">
<input type="checkbox" id="agregarAlCarrito-${indiceOriginal}"> <label for="agregarAlCarrito-${indiceOriginal}">Agregar al carrito</label>
</section>
<hr> `;
if (producto.seccion === "Mujeres") {
    mujeres += htmlProducto;
}
if (producto.seccion === "Hombres") {
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













