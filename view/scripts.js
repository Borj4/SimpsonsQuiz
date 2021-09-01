//Este es el array que contiene las preguntas y las respuestas.
const preguntas = [
    {
        pregunta: "¿Cuál es el segundo nombre de Homer?",
        respuestas: ["Jay", "John", "Adolf", "Homero"],
        correcta: 0
    },
    {
        pregunta: "¿Qué instrumento toca Lisa?",
        respuestas: ["Saxofón","Pandereta","Theremin","Oboe"],
        correcta: 0
    },
    {
        pregunta: "¿Cual es la firma de Bart?",
        respuestas: ["Ay, caramba!","El Barto","Almeida carapolla","Muelle"],
        correcta: 1
    },
    {
        pregunta: "¿Cómo se apellida Moe",
        respuestas: ["Chapman","Mahou","Szyslak","Hofstadter"],
        correcta: 2
    },
    {
        pregunta: "¿Dónde fue concebido Bart?",
        respuestas: ["Es adoptado", "En un minigolf", "En el asiento trasero de un Camaro", "En un laboratorio"],
        correcta: 1
    },
    {
        pregunta: "¿Cómo se llama el gemelo 'malvado' de Bart?",
        respuestas: ["Bort","Abe","Morgan","Hugo"],
        correcta: 3
    },
    {
        pregunta: "Bart es diagnosticado con un conocido transtorno, ¿cuál es?",
        respuestas: ["Los tres chiflados","Boquita de piñón","TDAH","TEA"],
        correcta: 2
    },
    {
        pregunta: "En su viaje al espacio, ¿qué utilizó Homer para cerrar la puerta de la nave?",
        respuestas: ["Una KostyBurguer", "Una inanimada barra de carbono", "Una lata de Duff", "Su propia pierna"],
        correcta: 1
    },
    {
        pregunta:"En las primeras temporada de la serie, ¿de que color era la camiseta de Bart",
        respuestas:["Azul","Naranja","Verde","Iba a pesho palomo"],
        correcta: 0
    },
    {
        pregunta: "¿Cuándo fue 1 + 1?",
        respuestas:["En el periodo neolítico","Cuando Diosito creó a Adán + Eva","Dos","¡La respuesta es el Fantástico Ralph!"],
        correcta: 3
    },
]
// Vamos a declarar un par de strings que nos sirvan de contador para el numero de aciertos y de fallos.
var aciertos = 0; var fallos = 0;

// Esta función de abajo sirve para recoger el índice de elementos del array y devolver un array desordenado.
// De esta manera cuando se repita el juego será con un orden de preguntas aleatorio.
// Se crea vacío, se llena aquí mismo y cada carga de página, y se vacía a lo largo de la partida.
const orden =[];


randomizador(preguntas)
function randomizador(preguntas){
    for(i=0;i < preguntas.length;i++){
        orden[i]=i;
    }
    orden.sort(() => {
        return Math.random() - 0.5;
    });
    console.log(orden); 
};


// Asignación del valor a las constantes correspondientes. Y ya de paso pinto el primer valor a las pintores.
const p0 = document.getElementById("p0")
const btn0 = document.getElementById("btn0")
const btn1 = document.getElementById("btn1")
const btn2 = document.getElementById("btn2")
const btn3 = document.getElementById("btn3")


// Se pinta la tirada inicial.
p0.textContent = preguntas[orden[0]].pregunta
btn0.textContent = preguntas[orden[0]].respuestas[0]
btn1.textContent = preguntas[orden[0]].respuestas[1]
btn2.textContent = preguntas[orden[0]].respuestas[2]
btn3.textContent = preguntas[orden[0]].respuestas[3]


// Asignación de escuchadores a los botones.
btn0.addEventListener("click",callback)
btn1.addEventListener("click",callback)
btn2.addEventListener("click",callback)
btn3.addEventListener("click",callback)


// Función que determina el acierto o el fracaso más estrepitoso.
function callback() {

    if (this.id == "btn"+preguntas[orden[0]].correcta){
        aciertos = aciertos +1; //CONTADOR DE ACIERTOS
        //LO QUE EL DOM TE DA
        let cambio = document.getElementById(this.id)
        cambio.classList.add("verde")
        // EL DOM TE LO QUITA
        setTimeout(()=>cambio.classList.remove("verde"),1500)

    }else{
        fallos = fallos +1; //CONTADOR DE FALLOS
        //LO QUE EL DOM TE DA
        let cambio = document.getElementById(this.id)
        cambio.classList.add("rojo")
        // EL DOM TE LO QUITA
        setTimeout(()=>cambio.classList.remove("rojo"),1500)
    }

setTimeout(()=>{

    orden.shift(); // Elimino el primer elemento del array para que vaya avanzando.

    if(orden.length>0){
        
        p0.textContent = preguntas[orden[0]].pregunta
        btn0.textContent = preguntas[orden[0]].respuestas[0]
        btn1.textContent = preguntas[orden[0]].respuestas[1]
        btn2.textContent = preguntas[orden[0]].respuestas[2]
        btn3.textContent = preguntas[orden[0]].respuestas[3]
        
    }else{
        //BORRADO DE ELEMENTOS
        btn0.remove();btn1.remove();btn2.remove();btn3.remove();

        // MUESTRA DE RESULTADOS
        let recuento = `Has tenido ${aciertos} aciertos y ${fallos} fallos. `;
            if(aciertos>(fallos*2)){ p0.textContent = recuento+"Eres el puto amo, te puedes dedicar a esto."
            }else if(fallos>(aciertos*2)){ p0.textContent = recuento+"Estás excluido."
            }else if(aciertos>fallos) {p0.textContent = recuento+"No esta mal, pero se nota que comías sin ver la tele."
            }else if(aciertos=0){ p0.textContent = recuento+"Jamás te olvidaré, quien quiera que seas."}
            
        // UN POCO DE ALEGRÍA
        let homer = document.getElementById("homer")
        homer.classList.remove()
        homer.classList.add("homerWalking")
}
}
,1500)
};




console.log("BOTON: "+this.id);
console.log("repasamos los aciertos que tenemos fuera de la función después de jugar: "+aciertos)



// Esto es por si lo quiro utilizar para back
// let numbers = [1,2,3,4]
// const squaresObject = numbers.map(numbers => { return { n: numbers}});
// debolverá un objeto json en el que devolverá un array  en el que a los valores de 