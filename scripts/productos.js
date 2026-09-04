let versionActualDatos = 1;

function crearProducto(nombre, seccion, precio, stock, imagen, id) {
    return {
        id: id,
        nombre: nombre,
        seccion: seccion.toLowerCase(),
        precio: precio,
        stock: stock,
        imagen: imagen
    };
}

function inicializarProductosEjemplos() {
    let versionGuardada = Number(localStorage.getItem("versionDatos")) || 0;
    if (versionGuardada < versionActualDatos) {
        localStorage.removeItem("productos");
        localStorage.removeItem("carrito");
        localStorage.setItem("versionDatos", String(versionActualDatos));
    }

    let productos = JSON.parse(localStorage.getItem("productos")) || [];

    if (productos.length === 0) {
        let ejemplos = [
            crearProducto("Gorro de lana", "chicos", 850, 10, "gorroNino1.jpg", 1),
            crearProducto("Pantalón cargo", "mujeres", 2200, 8, "pantalon1.jpg", 2),
            crearProducto("Pack de medias", "mujeres", 400, 8, "mediasMujeres.jpg", 3),
            crearProducto("Pantalón convertible", "hombres", 1900, 12, "pantalon2.jpg", 4),
            crearProducto("Jean clásico", "chicos", 1100, 15, "pantalon3.jpg", 5)
        ];

        localStorage.setItem("productos", JSON.stringify(ejemplos));
    }
}


function generarNuevoId(productos) {
    let maxId = 0;
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].id > maxId) {
            maxId = productos[i].id;
        }
    }
    return maxId + 1;
}


function validarRutaDeImagen(imagen, prefijoCarpetaLocal) {

    let esLinkCompleto = imagen.startsWith("http://") || imagen.startsWith("https://");

    if (esLinkCompleto) {
        return imagen;
    }
    return prefijoCarpetaLocal + imagen;
}