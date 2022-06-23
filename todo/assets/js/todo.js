var listKeys = {
  todoList: 'todo-list'
}

function setStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
};

function getStorage(key) {
  return JSON.parse(localStorage.getItem(key));
};

function removeTodo(id) {
  var arrTodoList = getStorage(listKeys.todoList) || [];
  console.log(id)
  arrTodoList.forEach(function(item) {
    if(item.id == id) {
    }
  })
}

function renderTodoItem(todo) {
  var todoListElm = document.querySelector('.js-todo-list');
  var idRemoveBtn = todo.id;
  todoListElm.innerHTML += '<li class="todo-item">'
  + '<p class="todo-content">'+todo.content+'</p>'
  + '<button class="btn todo-remove-btn js-remove-'+idRemoveBtn+'"><i class="fa-solid fa-trash"></i></button>'
  + '</li>';
  removeBtnElm = document.querySelector('.js-remove-' + idRemoveBtn);
  removeBtnElm.addEventListener('click', function() {
    console.log('dfjdfj')
  })
}

function renderTodoList() {
  var arrTodoList = getStorage(listKeys.todoList) || [];
  arrTodoList.forEach(function(todo) {
    renderTodoItem(todo);
  });
}

function addToDo() {
  var arrTodoList = getStorage(listKeys.todoList) || [];
  var todoInputElm = document.querySelector('.js-todo-input');
  var todoContent = todoInputElm.value.trim();
  if(todoContent) {
    var id = Date.now();
    var todo = {
      id,
      content: todoContent,
      status: 0
    };
    arrTodoList.push(todo);
    setStorage(listKeys.todoList, arrTodoList);
    renderTodoItem(todo);
    todoInputElm.value = '';
    todoInputElm.focus();
  }
}

function addEventToAddBtn() {
  var addBtn = document.querySelector('.js-add-btn');
  addBtn.addEventListener('click', addToDo)
}

function play() {
  renderTodoList();
  addEventToAddBtn();
}

play();
