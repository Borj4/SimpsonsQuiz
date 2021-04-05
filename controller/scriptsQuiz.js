// const { response } = require("express");

//Con este maravilloso invento vamos a recoger las preguntas
const url = 'http://localhost:8000/questions';
const fetchOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    }
}
fetch(url,fetchOptions)
.then(response => response.json()) // comprobar que funciona bien, que igual no.
.then(response  => localStorage.setItem("questions", JSON.stringify(response)))
.catch(response => console.log(response))

let preguntas = JSON.parse(localStorage.getItem("questions"))

// Los del storage es una chapuza porque no se muy bien como guardar el JSON en una variable.

// Vamos a declarar un par de strings que nos sirvan de contador para el numero de aciertos y de fallos.
let aciertos = 0; let fallos = 0;


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
    // console.log(orden); 
};


// Asignación del valor a las constantes correspondientes. Y ya de paso pinto el primer valor a las pintores.
const p0 = document.getElementById("p0")
const btn0 = document.getElementById("btn0")
const btn1 = document.getElementById("btn1")
const btn2 = document.getElementById("btn2")
const btn3 = document.getElementById("btn3")


// Se pinta la tirada inicial. AQUI HAY QUE METER MANGOSTA
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
const cookies = [];

(this.id).push=cookies;

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