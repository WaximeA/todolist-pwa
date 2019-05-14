import TodoAdd from './components/todo-add/todo-add';

(async function(document) {
  const app = document.querySelector('#app');
  const skeleton = app.querySelector('.skeleton');
  const listPage = app.querySelector('[page=list]');
  skeleton.removeAttribute('active');
  listPage.setAttribute('active', '');

  try {
    console.log('It\' ok');
  } catch(error){
    console.error(error);
  }

})(document);