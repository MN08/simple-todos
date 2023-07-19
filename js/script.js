document.addEventListener('DOMContentLoaded',function(){
    const todos = [];
    const RENDER_EVENT = 'render-todo';

    const submitForm = document.getElementById('form');
    submitForm.addEventListener('submit',function(event){
        event.preventDefault();
        addTodo();
    })

    function addTodo(){
        const textTodo = document.getElementById('title').value;
        const timeStamp = document.getElementById('date').value;

        const generateID = generateId();
        const todoObject = generateTodoObject(generateID,textTodo,timeStamp,false);
        todos.push(todoObject);

        document.dispatchEvent(new Event(RENDER_EVENT));
    }

    function generateId(){
        return +new Date();
    }

    function generateTodoObject(id, task, timeStamp, isCompleted){
        return {
            id,
            task,
            timeStamp,
            isCompleted
        }
    }

    document.addEventListener(RENDER_EVENT, function(){
        // console.log(todos);
        const unCompletedTodoList = document.getElementById('todos');
        unCompletedTodoList.innerHTML = '';
        for (const todoItem of todos) {
            const todoElement = makeTodo(todoItem);
            if (!todoItem.isCompleted) {
                unCompletedTodoList.append(todoElement);
            }
          }
    });

    function makeTodo(todoObject){
        const textTitle = document.createElement('h2');
        textTitle.innerText = todoObject.task;

        const textTimeStamp = document.createElement('p');
        textTimeStamp.innerText = todoObject.timeStamp

        const textContainer = document.createElement('div');
        textContainer.classList.add('inner');
        textContainer.append(textTitle,textTimeStamp);

        const container = document.createElement('div');
        container.classList.add('item','shadow');
        container.append(textContainer);
        container.setAttribute('id',`todo-${todoObject.id}`);

        if (todoObject.isCompleted) {
            const undoButton = document.createElement('button');
            undoButton.classList.add('undo-button');
         
            undoButton.addEventListener('click', function () {
              undoTaskFromCompleted(todoObject.id);
            });
         
            const trashButton = document.createElement('button');
            trashButton.classList.add('trash-button');
         
            trashButton.addEventListener('click', function () {
              removeTaskFromCompleted(todoObject.id);
            });
         
            container.append(undoButton, trashButton);
          } else {
            const checkButton = document.createElement('button');
            checkButton.classList.add('check-button');
            
            checkButton.addEventListener('click', function () {
              addTaskToCompleted(todoObject.id);
            });
            
            container.append(checkButton);
          }
         

        return container;
    };

    function findTodo(todoId){
        for (const todoItem of todos) {
            if (todoItem.id === todoId) {
              return todoItem;
            }
          }
          return null;
    }
});