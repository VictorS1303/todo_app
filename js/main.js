const todoAppContainer = document.querySelector('.todo-app-container')
const addTodoBtn = document.querySelector('#add_todo_btn')
const createTodoBtn = document.querySelector('#create_todo_btn')
console.log(createTodoBtn)
const addTodoInformationContainer = document.querySelector('.add-todo-information-container')
console.log(addTodoInformationContainer)



// EVENT LISTENERS //
todoAppContainer.addEventListener('click', (e) => checkClickedButton(e))
addTodoBtn.addEventListener('click', openCreateTodoModal)
createTodoBtn.addEventListener('click', closeCreateTodoModal)


// FUNCTIONS //

function checkClickedButton(e)
{
    const completeBtn = e.target.closest('.complete-todo-btn')
    const deleteBtn = e.target.closest('.delete-todo-btn')

    if (completeBtn)
    {
        completeTodo(completeBtn)
    }
    else if (deleteBtn)
    {
        deleteTodo(deleteBtn)
    }
}


function completeTodo(btn)
{
    btn.closest('.todo-list-item').classList.add('completed')
    btn.classList.add('completed')
}


// Delete Todo
function deleteTodo(btn)
{
    const isWantingToDeleteTodo = confirm("Are you sure you want to delete the todo?")

    if(!isWantingToDeleteTodo)
    {
        return
    }
    
    btn.closest('.todo-list-item').remove()
}

function openCreateTodoModal()
{
    addTodoInformationContainer.showModal()
}

function closeCreateTodoModal()
{
    addTodoInformationContainer.close()
}