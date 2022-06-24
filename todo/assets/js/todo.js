var listKeys = {
  todoList: 'todo-list'
};

function setStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
};

function getStorage(key) {
  return JSON.parse(localStorage.getItem(key));
};

function removeTodo(id) {
  var objTodoList = getStorage(listKeys.todoList) || {};
  var todoRemoveElm = document.querySelector('.js-todo-item-'+id);
  todoRemoveElm.remove();
  delete objTodoList[id];
  setStorage(listKeys.todoList, objTodoList);
};

function renderTodoItem(todo) {
  var todoListElm = document.querySelector('.js-todo-list');
  var idRemoveBtn = todo.id;
  var todoItem = document.createElement('li');
  todoItem.classList.add('todo-item', 'js-todo-item-'+idRemoveBtn);
  var todoContent = document.createElement('p');
  todoContent.classList.add('todo-content');
  todoContent.innerText = todo.content;
  var todoRemoveBtn = document.createElement('button');
  todoRemoveBtn.classList.add('btn', 'todo-remove-btn');
  todoRemoveBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
  todoRemoveBtn.addEventListener('click', function() {
    removeTodo(idRemoveBtn);
  })
  todoItem.appendChild(todoContent);
  todoItem.appendChild(todoRemoveBtn);
  todoListElm.appendChild(todoItem);
};

function renderTodoList() {
  var todoInputElm = document.querySelector('.js-todo-input');
  todoInputElm.addEventListener('keydown', function(e) {
    if(e.keyCode === 13) {
      addToDo();
    }
  })
  var objTodoList = getStorage(listKeys.todoList) || {};
  Object.values(objTodoList).forEach(function(todo) {
    renderTodoItem(todo);
  })
  addEventToAddBtn();
};

function addToDo() {
  var objTodoList = getStorage(listKeys.todoList) || {};
  var todoInputElm = document.querySelector('.js-todo-input');
  var todoContent = todoInputElm.value.trim();
  if(todoContent) {
    var id = Date.now();
    var todo = {
      id,
      content: todoContent,
      status: 0
    };
    objTodoList[id] = todo;
    renderTodoItem(todo);
    setStorage(listKeys.todoList, objTodoList);
    todoInputElm.value = '';
    todoInputElm.focus();
  }
};

function addEventToAddBtn() {
  var addBtn = document.querySelector('.js-add-btn');
  addBtn.addEventListener('click', addToDo);
};

function play() {
  renderTodoList();
};

play();
