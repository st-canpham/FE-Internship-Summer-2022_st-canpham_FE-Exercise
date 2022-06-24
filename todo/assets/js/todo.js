var listKeys = {
  todoList: 'todo-list'
};

function setStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
};

function getStorage(key) {
  return JSON.parse(localStorage.getItem(key));
};

function removeTodo(id, removeBtn) {
  var arrTodoList = getStorage(listKeys.todoList) || [];
  var todoRemoveElm = removeBtn.parentElement;
  todoRemoveElm.remove();
  var index = arrTodoList.findIndex(function (todoItem) {
    return todoItem.id === id;
  });
  arrTodoList.splice(index);
  setStorage(listKeys.todoList, arrTodoList);
};

function renderTodoItem(todo) {
  var todoListElm = document.querySelector('.js-todo-list');
  var todoItem = document.createElement('li');
  todoItem.classList.add('todo-item');
  var todoContent = document.createElement('p');
  todoContent.classList.add('todo-content');
  todoContent.innerText = todo.content;
  var todoRemoveBtn = document.createElement('button');
  todoRemoveBtn.classList.add('btn', 'todo-remove-btn');
  todoRemoveBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
  todoRemoveBtn.addEventListener('click', function() {
    removeTodo(todo.id, this);
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
  var arrTodoList = getStorage(listKeys.todoList) || [];
  arrTodoList.forEach(function(todo) {
    renderTodoItem(todo);
  })
  addEventToForm();
};

function addToDo() {
  var arrTodoList = getStorage(listKeys.todoList) || [];
  var todoInputElm = document.querySelector('.js-todo-input');
  var todoContent = todoInputElm.value.trim();
  if(todoContent) {
    var id = Date.now();
    var todo = {
      id: id,
      content: todoContent
    };
    arrTodoList.push(todo);
    renderTodoItem(todo);
    setStorage(listKeys.todoList, arrTodoList);
    todoInputElm.value = '';
    todoInputElm.focus();
  }
};

function addEventToForm() {
  var todoFormElm = document.querySelector('.js-todo-form');
  todoFormElm.addEventListener('submit', function(e) {
    e.preventDefault();
    addToDo();
  });
};

function play() {
  renderTodoList();
};

play();
