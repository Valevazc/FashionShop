//API DE CLIMA

function mostrarClimaColonia(){
    let elementoClima = document.getElementById("climaColonia");

    // Coordenadas de Colonia del Sacramento, Uruguay.
    let url = "https://api.open-meteo.com/v1/forecast?latitude=-34.4708&longitude=-57.8433&current_weather=true";

    fetch(url)
        .then(function(respuesta){
            return respuesta.json();
        })
        .then(function(datos){
            let temperatura = datos.current_weather.temperature;

            let sugerencia = "";
            if(temperatura < 12){
                sugerencia = "hace frío, llevate algo bien abrigado.";
            } else if(temperatura < 22){
                sugerencia = "clima templado, una campera liviana viene bien.";
            } else {
                sugerencia = "hace calor, buen día para ropa fresca.";
            }

            elementoClima.textContent = "En Colonia hay " + temperatura + "°C ahora mismo: " + sugerencia;
        })
        .catch(function(error){
            console.log("No se pudo obtener el clima", error);
            elementoClima.textContent = "No pudimos cargar el clima de Colonia en este momento.";
        });
}

mostrarClimaColonia();