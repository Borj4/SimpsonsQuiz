// Fetch stuff

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
// .catch(window.alert('No hay conexión con el servidor.'))

// MASTER VIEW-----------------------------------------------------------

// Create DOM`s elements ------------------------------------------------
// Main & Header
const header = document.createElement('header'); // Create main.
header.setAttribute('id', 'header');
let main = document.createElement('main');
main.setAttribute('id', 'main');
document.body.appendChild(header);
document.body.appendChild(main);

// Add button
const button = document.createElement('input'); // Create button add question.
button.value = 'Añadir pregunta';
button.setAttribute('type', 'button');
button.setAttribute('id', 'add'); ////////////////////////////////////////////
header.appendChild(button);

// Modify form
const form1 = document.createElement('form')
header.appendChild(form1);
const select = document.createElement("select") // Create select...
const submit = document.createElement('input'); // ...and his submit button.
submit.setAttribute('type','submit');
submit.setAttribute('value','Modificar pregunta');
submit.setAttribute('id', 'mod'); ////////////////////////////////////////////
form1.appendChild(select);
form1.appendChild(submit);

// Delete button
const eraseButton = document.createElement('input'); // Create button add question.
eraseButton.value = 'Borrar pregunta';
eraseButton.setAttribute('type', 'button');
eraseButton.setAttribute('id', 'del'); ////////////////////////////////////////////
header.appendChild(eraseButton);

// Set fetched questions in memory.
let preguntas = JSON.parse(localStorage.getItem("questions"));
// Fill selector.
preguntas.map((value,index) => {
  const option = document.createElement("option");
  select.appendChild(option);
  option.innerText = value.pregunta;
  option.value = index;
})

// console.log(select.value)
// console.log(selected);
// console.log(selected.pregunta)

let selected;
let form2;

// Functions declaration ---------------------------------------------------
// 1) Function that built detail common view 
async function detail(){
  
  selected = preguntas[select.value];

  let substituter = document.getElementById("contenedor");
  if(document.contains(substituter) != false){  
    document.getElementById("contenedor").remove();
}
  let contenedor = document.createElement('div');
  contenedor.setAttribute('id', 'contenedor');
  main.appendChild(contenedor);

  form2 = document.createElement('form');


  let inTitle = document.createElement('input');
  let inQues0 = document.createElement('input');
  let inQues1 = document.createElement('input');
  let inQues2 = document.createElement('input');  
  let inQues3 = document.createElement('input');
  let correct = document.createElement('input');
  let submit2 = document.createElement('input')

  inTitle.setAttribute('type','text');
  inQues0.setAttribute('type','text');
  inQues1.setAttribute('type','text');
  inQues2.setAttribute('type','text');
  inQues3.setAttribute('type','text');
  correct.setAttribute('type','text');
  submit2.setAttribute('type','submit')

  inTitle.setAttribute('id','inTitle');
  inQues0.setAttribute('id','inQues0');
  inQues1.setAttribute('id','inQues1');
  inQues2.setAttribute('id','inQues2');
  inQues3.setAttribute('id','inQues3');
  correct.setAttribute('id','correct');
  submit2.setAttribute('id','submit2')

  inTitle.setAttribute('name','nuevaPregunta');
  inQues0.setAttribute('name','q0');
  inQues1.setAttribute('name','q1');
  inQues2.setAttribute('name','q2');
  inQues3.setAttribute('name','q3');
  correct.setAttribute('name','number');
  submit2.setAttribute('value','Enviar')

  let labelTitle = document.createElement('label');
  let label0 = document.createElement('label');
  let label1 = document.createElement('label');
  let label2 = document.createElement('label');  
  let label3 = document.createElement('label');
  let labelCorrect = document.createElement('label');

  labelTitle.innerHTML = 'pregunta<br>';
  label0.innerHTML = 'respuesta 0<br>';
  label1.innerHTML = 'respuesta 1<br>';
  label2.innerHTML = 'respuesta 2<br>';
  label3.innerHTML = 'respuesta 3<br>';
  labelCorrect.innerHTML = 'seleccionar correcta<br>';

  form2.appendChild(inTitle)
  form2.appendChild(labelTitle)
  form2.appendChild(inQues0)
  form2.appendChild(label0)
  form2.appendChild(inQues1)
  form2.appendChild(label1)
  form2.appendChild(inQues2)
  form2.appendChild(label2)
  form2.appendChild(inQues3)
  form2.appendChild(label3)
  form2.appendChild(correct)
  form2.appendChild(labelCorrect)
  form2.appendChild(submit2)
  contenedor.appendChild(form2)
}

// 2) Function that adds one question
function add(){

  detail()
  
  form2.setAttribute('action','http://localhost:8000/add'); // Igual hay que escribir la ruta completa, no solo el endpoint
  form2.setAttribute('method','POST');

}

//  2) Function that modify one question
async function mod(){

  await detail()
  
  form2.setAttribute('action','http://localhost:8000/mod'); // Igual hay que escribir la ruta completa, no solo el endpoint
  form2.setAttribute('method','POST');
  document.getElementById('inTitle').setAttribute('value',selected.pregunta);
  document.getElementById('inQues0').setAttribute('value',selected.respuestas[0]);
  document.getElementById('inQues1').setAttribute('value',selected.respuestas[1]);
  document.getElementById('inQues2').setAttribute('value',selected.respuestas[2]);
  document.getElementById('inQues3').setAttribute('value',selected.respuestas[3]);
  document.getElementById('correct').setAttribute('value',selected.correcta);

  let identifier = document.createElement('input');
  identifier.setAttribute('type','text');
  identifier.setAttribute('name','id');
  identifier.setAttribute('value',selected._id);
  form2.appendChild(identifier);


}

//  2) Function that delete one question
async function del(){
  
  await detail()
  
  form2.setAttribute('action','http://localhost:8000/del'); // Igual hay que escribir la ruta completa, no solo el endpoint
  form2.setAttribute('method','POST');
  document.getElementById('inTitle').setAttribute('value',selected.pregunta);
  document.getElementById('inQues0').setAttribute('value',selected.respuestas[0]);
  document.getElementById('inQues1').setAttribute('value',selected.respuestas[1]);
  document.getElementById('inQues2').setAttribute('value',selected.respuestas[2]);
  document.getElementById('inQues3').setAttribute('value',selected.respuestas[3]);
  document.getElementById('correct').setAttribute('value',selected.correcta);

  let identifier = document.createElement('input');
  identifier.setAttribute('type','text');
  identifier.setAttribute('name','id');
  identifier.setAttribute('value',selected._id);
  form2.appendChild(identifier);


}
// --------------------------------------------------------------------------

document.getElementById('add').addEventListener("click", add);

document.getElementById('mod').addEventListener("click", (retiradaEvento) => {
  retiradaEvento.preventDefault();
  mod();
});

document.getElementById('del').addEventListener("click", del);

// DETAIL VIEW --------------------------------------------------------





