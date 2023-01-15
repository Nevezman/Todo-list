const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const taskList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
}
tasks.forEach(task => {
 renderTask (task);
});

chekEmptyList();
//добавление задачи
form.addEventListener('submit', addTask);

//удаление задачи
taskList.addEventListener('click', deletTask);
//выполненая задача
taskList.addEventListener('click', doneTask);



function addTask (event) {
 //отменяем обновление страницы после отправки кода 
 event.preventDefault();
 // получаем инфу 
   const  taskText = taskInput.value; 
//описываем задачу ввиде обьекта 
 const newTask = {
    id: Date.now(),
    text: taskText,
    done: false
 };
 //добавляем задачу в массив 
 tasks.push(newTask);
 saveToLocalStorage();
 renderTask(newTask);
 //очищаем поле ввода +  фокус 
 taskInput.value = "";
 taskInput.focus();
 
  chekEmptyList();
 
}

function deletTask (e) {
if (e.target.dataset.action !== 'delete') {
    return;
}


   const parentNode = e.target.closest('.list-group-item');

   //ищем по  id 
   const id = Number(parentNode.id);
  const index = tasks.findIndex((task) => task.id === id);
   tasks.splice(index, 1);
   saveToLocalStorage();
   parentNode.remove();

   chekEmptyList();

}

function doneTask (e) {
    if (e.target.dataset.action !== 'done') return;
    
        const parentNode = e.target.closest('.list-group-item');

        
   const id = Number(parentNode.id);
  const task = tasks.find((task) => task.id === id);
  task.done = !task.done;
  
  saveToLocalStorage();

        const taskTitle = parentNode.querySelector('span');
        taskTitle.classList.toggle('task-title--done');

}

function chekEmptyList () {
    if (tasks.length === 0) {
     const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
     <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
     <div class="empty-list__title">Список дел пуст</div>
 </li>`;

taskList.insertAdjacentHTML("afterbegin", emptyListHTML);
    }else {
     const emptyListEl = document.querySelector('#emptyList');
     emptyListEl ? emptyListEl.remove() : null;
    }
}

function saveToLocalStorage () {
    localStorage.setItem ('tasks', JSON.stringify(tasks));
}

function renderTask (task) {

//Добавление класса
const cssClass = task.done ? 'task-title task-title--done' : 'task-title';

//формируем разметку 
const taskHTML = `<li id = '${task.id}' class="list-group-item d-flex justify-content-between task-item">
<span class="${cssClass}">${task.text}</span>
<div class="task-item__buttons">
    <button type="button" data-action="done" class="btn-action">
        <img src="./img/tick.svg" alt="Done" width="18" height="18">
    </button>
    <button type="button" data-action="delete" class="btn-action">
        <img src="./img/cross.svg" alt="Done" width="18" height="18">
    </button>
</div>
</li>
`;
//добавляем задачу 
taskList.insertAdjacentHTML('beforeend', taskHTML);}