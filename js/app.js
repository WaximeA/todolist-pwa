import TodoAdd from './components/todo-add/todo-add';
import TodoElement from './components/todo-element/todo-element';
import checkConnectivity from '/js/components/connectivity/connectivity.js';
import { openDB } from '/node_modules/idb/build/esm/index.js';

(async function(document) {
  const app = document.querySelector('#app');
  const skeleton = app.querySelector('.skeleton');
  const todoAddPage = app.querySelector('[page=todo-add]');
  const todoListPage = app.querySelector('[page=todo-list]');
  const fetchUrl = 'http://localhost:3000/todoelements';
  skeleton.removeAttribute('active');
  todoAddPage.setAttribute('active', '');
  todoListPage.setAttribute('active', '');

  new checkConnectivity();
  document.addEventListener('connectivity-changed', ({detail}) => {
    console.log(detail)
  });

  try {
    const data = await fetch(fetchUrl);
    const json = await data.json();
    const database = await openDB('app-store', 1, {
      upgrade(db) {
        db.createObjectStore('todoelements')
      }
    });

    // Put articles in database in navigator if he got a connection (null connection = true)
    if (navigator.onLine) {
      await database.put('todoelements', json, 'todoelements');
    }

    // Get todoelements
    const todoElements = await database.get('todoelements', 'todoelements');
    let todolistDiv = app.querySelector('#todo-list');

    // Display existing todoelements
    todoElements.map(item => {
      const test = new TodoElement();

      test.initTodoElement(
          item.label,
          item.id,
      );
      todolistDiv.appendChild(test);

      return test;
    });

    document.addEventListener('add-todo', async ({detail}) => {
      const todo = {};
      let randomId = uuidv4();
      let formatedLabel = detail.toLowerCase().replace(/\s/g, '');
      const todoElement = new TodoElement();

      todoElement.initTodoElement(detail, formatedLabel);
      todolistDiv.append(todoElement);
      todo.id = randomId;
      todo.label = detail;
      todoElements.push(todo);
      // Add elements to idb
      await database.put('todoelements', todoElements, 'todoelements');
      // Add elements to json-server
      addElementJsonServer(todo)
    });


  } catch(error){
    console.error(error);
  }

  function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  function addElementJsonServer(todoElement) {
    fetch(fetchUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todoElement),
    }).catch(err => {
      console.log(err);
    });
  }

})(document);