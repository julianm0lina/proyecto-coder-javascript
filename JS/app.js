
const mensajeBienvenida = "Bienvenido al Simulador de Clima";


let temperatura;
let condicionClimatica;


function obtenerDatos() {
    temperatura = parseInt(prompt("Ingrese la temperatura en grados Celsius:"));
    condicionClimatica = prompt("Ingrese la condición climática (soleado, lluvioso, nublado, etc.):").toLowerCase();
}


function recomendarRopa(temp, clima) {
    if (temp > 25) {
        return "Hace calor, usa ropa ligera y fresca.";
    } else if (temp > 15) {
        return "El clima es templado, puedes usar ropa cómoda y una campera liviana.";
    } else {
        return "Hace frío, abrígate bien con ropa gruesa y bufanda.";
    }
}


function mostrarResultado() {
    alert(mensajeBienvenida);
    obtenerDatos();
    let mensaje = recomendarRopa(temperatura, condicionClimatica);
    alert("Con base en la temperatura de " + temperatura + "°C y el clima " + condicionClimatica + ", te recomendamos: " + mensaje);
    console.log(mensaje);
}


mostrarResultado();
