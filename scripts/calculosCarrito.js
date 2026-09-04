let porcentajeIva = 0.22;
let porcentajeDescuentoDebito = 0.10;
let costoFijoDelivery = 50;

function calcularTotalesCarrito(carrito, metodoPago) {
    let subtotal = 0;
    for (let i = 0; i < carrito.length; i++) {
        subtotal += carrito[i].cantidad * carrito[i].precio;
    }

    let esDebito = metodoPago === "debito";
    let descuento = 0;
    if (esDebito) {
        descuento = subtotal * porcentajeDescuentoDebito;
    }

    let subtotalConDescuento = subtotal - descuento;
    let iva = subtotalConDescuento * porcentajeIva;
    let totalSinDelivery = subtotalConDescuento + iva;

    return {
        subtotal: subtotal,
        esDebito: esDebito,
        descuento: descuento,
        subtotalConDescuento: subtotalConDescuento,
        iva: iva,
        totalSinDelivery: totalSinDelivery
    };
}