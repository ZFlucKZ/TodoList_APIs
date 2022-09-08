var todoListApp = (function () {
  let tasks = [];
  const taskList = document.getElementById('list');
  const addTaskInput = document.getElementById('add');
  const tasksCounter = document.getElementById('tasks-counter');

  async function fetchTodos() {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos'
      );
      const data = await response.json();
      tasks = data.slice(0, 10);
      renderList();
    } catch (error) {
      console.log('Error : ' + error);
    }
  }

  function addTaskToDOM(task) {
    const li = document.createElement('li');

    li.innerHTML = `<input type="checkbox" id="${task.id}" ${
      task.done ? 'checked' : ''
    } class="custom-checkbox">
        <label for="${task.id}""><p>${task.title}</p></label>
        <ion-icon name="trash-bin" data-id="${task.id}"></ion-icon>`;

    taskList.append(li);
  }

  function renderList() {
    taskList.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
      addTaskToDOM(tasks[i]);
    }

    tasksCounter.innerHTML = tasks.length;
  }

  function toggleTask(taskID) {
    const task = tasks.filter((task) => task.id == taskID);

    if (task.length > 0) {
      const currentTask = task[0];

      currentTask.done = !currentTask.done;
      renderList();
      showNotification('Task toggled successfully');
      return;
    }
  }

  function deleteTask(taskID) {
    const newtasks = tasks.filter((task) => task.id != taskID);

    tasks = newtasks;
    renderList();
    showNotification('Task deleted successfully');
    return;
  }

  function addTask(task) {
    if (task) {
      tasks.push(task);
      renderList();
      showNotification('Task added successfully');
      return;
    }
  }

  function showNotification(text) {
    alert(text);
    return;
  }

  function handleInputKeypress(e) {
    if (e.key == 'Enter') {
      const text = e.target.value;

      if (!text) {
        showNotification('Task can not be empty!');
        return;
      }

      const task = {
        title: text,
        id: Date.now().toString(),
        done: false,
      };

      e.target.value = '';
      addTask(task);
    }
  }

  function handleClickListener(e) {
    const target = e.target;

    if (target.className == 'md hydrated') {
      const taskID = target.dataset.id;
      deleteTask(taskID);
      return;
    } else if (target.className == 'custom-checkbox') {
      const taskID = target.id;
      toggleTask(taskID);
      return;
    }
  }

  function initialApp() {
    fetchTodos();
    document.addEventListener('click', handleClickListener);
    addTaskInput.addEventListener('keyup', handleInputKeypress);
  }

  return {
    initialize: initialApp(),
  };
})();
