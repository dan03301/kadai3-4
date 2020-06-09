const add = document.getElementById('add');
const task = document.getElementById('task');
const tableDataId = document.getElementById('tableData');
const table = document.getElementById('table');
const all = document.getElementById('all');
const working = document.getElementById('working');
const completed = document.getElementById('completed');
const radioGroup = document.forms.buttons;

const todos = [];

const filterCompleted = (todos) => {
  const onlyPushCompleted = todos.filter((todo) => {
    return todo.status === '完了';
  });
  showTodos(onlyPushCompleted);
}

const filterWorking = (todos) => {
  const onlyPushWorking = todos.filter((todo) => {
    return todo.status === '作業中';
  });
  showTodos(onlyPushWorking);
}

add.addEventListener('click', () => {
  if (!task.value == '') {
    const todo = { task: `${task.value}`, status: '作業中' };
    todos.push(todo); // 追加
    changeShowTodos();
  }  else {
    alert('タスクを入力してください。');
  }
});

const showTodos = (todos) => {
  removeChilds();

  todos.forEach((todo, index) => {
    const createId = document.createElement('td');
    const createComment = document.createElement('td');

    createId.textContent = index;
    createComment.textContent = todo.task;

    const createTr = document.createElement('tr');
    const createStatus = document.createElement('td');

    const statusFunc = createStatusButtonFunc(todo.status, index);
    const removeFunc = createRemoveButtonFunc(index);

    createStatus.appendChild(statusFunc);
    createStatus.appendChild(removeFunc);
    createTr.appendChild(createId);
    createTr.appendChild(createComment);
    createTr.appendChild(createStatus);

    table.appendChild(createTr);

    removeFunc.addEventListener('click' , () => {
      deleteFunc(todo);
    });
    statusFunc.addEventListener('click', () => {
      statusChangeFunc(todo, statusFunc);
      changeShowTodos();
    });

  });
  
  buttonFunc();
  task.value = '';
};

const buttonFunc = () => {
  radioGroup.addEventListener('change', () => {
    changeShowTodos();
  });
};

function changeShowTodos() {
  if (radioGroup[0].checked) {
    showTodos(todos);
  } else if (radioGroup[1].checked) {
    filterWorking(todos);
  } else if (radioGroup[2].checked) {
    filterCompleted(todos);
  }
}

function removeChilds() {
  while (table.children[1]) {
    table.removeChild(table.children[1]);
  }
}

function createStatusButtonFunc(status, index) {
  const createStatusButton = document.createElement('button');
  createStatusButton.textContent = status;
  createStatusButton.setAttribute('class', 'statusButton');
  createStatusButton.setAttribute('id', `status${index}`);

  return createStatusButton;
}

function createRemoveButtonFunc(index) {
  const createRemoveButton = document.createElement('button');
  createRemoveButton.textContent = '削除';
  createRemoveButton.setAttribute('id', `delete${index}`);

  return createRemoveButton;
}

const deleteFunc = (value) => {
  var index = todos.indexOf(value);
  todos.splice(index, 1);
  
  changeShowTodos();
};

const statusChangeFunc = (todo, statusButton) => {
    if (todo.status === '作業中') {
      todo.status = '完了';
      statusButton.textContent = '完了';
    } else if (todo.status === '完了') {
      todo.status = '作業中';
      statusButton.textContent = '作業中';
    }
}