// Contenedor del formulario
const formElement = document.getElementById('formElement');
// Contenedor de la lista de materiales
const homeworkList = document.getElementById('homeworkList'); 
const contentTweets = document.getElementById('contentTweets');


let homeworks =[];


loadListeners();

// Al momento de cargar la pagina traer la lista de tareas guardadas en el local storage
document.addEventListener('DOMContentLoaded',()=>{
    homeworks = JSON.parse(localStorage.getItem('storageItems')) || [];
    printHomeworkList();
    btnEliminarFunction();
})

// Prestar atención a las nuevas tareas por agregar
function loadListeners(){
    formElement.addEventListener('submit', createHomework);
    
}

// Guardar las tareas en un objeto literal acumulador en arreglos
function createHomework(e){
    e.preventDefault();
    const homework = document.getElementById('homework').value.trim();
    
    if(homework === ''){
        showAlert('Tarea Vacia');
        return;
    }

    const homeworkObject = {
        id:Date.now(),
        homework,
    };

    homeworks = [...homeworks, homeworkObject];
    formElement.reset();
    
    saveToLocalStorage(homeworks);
    printHomeworkList();
    

}

// En caso se trate de agregar una tarea vacia surgira una alerta
function showAlert(message){
    const element = document.createElement('p');
    element.textContent = message;
    element.classList.add('error');

    const exist = document.querySelector('.error')

    if(!exist){
        formElement.appendChild(element);
        return;
    }
}

// Dibujar la lista en el contenedor
function printHomeworkList(){
    
    clearHomeworkList();
    homeworks.forEach((homework) =>{
    const list = document.createElement('li');
    let id2 = '';
    list.textContent=homework.homework;
    id2=homework.id;
    homeworkList.appendChild(list);
    createBtnEliminar(list, id2);

    })
}

// Guardar el arreglo en local storage
function saveToLocalStorage(data){
    localStorage.setItem('storageItems',JSON.stringify(data));
    
}

// Limpiar el contenedor con la lista de tareas
function clearHomeworkList(){
    homeworkList.textContent='';
}

// Crear e imprimir el btn de eliminar tarea individual
function createBtnEliminar(toAppend, id){
    const btnEliminar = document.createElement('span');
    btnEliminar.textContent='X';
    btnEliminar.classList.add('borrar-tweet');
    btnEliminar.setAttribute('id',id);
    toAppend.appendChild(btnEliminar);
}


// Agregar funcionalidad al boton eliminar, este comienza a funcionar una vez hay un input en el formulario
function btnEliminarFunction(){

    contentTweets.addEventListener('click', (e)=>{
        
        if(e.target.classList.contains('borrar-tweet')){

            const id2 = Number(e.target.getAttribute('id'));

            storageItems = JSON.parse(localStorage.getItem('storageItems'));

            storageItems = storageItems.filter((storageItem) => storageItem.id != id2);
            homeworks = storageItems;
            
            saveToLocalStorage(storageItems);
            
            printHomeworkList();
        }
    })
}
