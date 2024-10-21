const todoAppContainer = document.querySelector('.todo-app-container')

// EVENT LISTENERS //
todoAppContainer.addEventListener('click', (e) =>
{
    if(e.target.matches('.complete-todo-btn'))
    {
        completeTodo(e)
    }
    else if(e.target.matches('.delete-todo-btn'))
    {
        deleteTodo(e)
    }
})

function completeTodo(e)
{
    e.target.closest('.todo-list-item').classList.add('completed')
    e.target.classList.add('completed')
}

// Delete Todo
function deleteTodo(e)
{

}