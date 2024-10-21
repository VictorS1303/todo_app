const todoAppContainer = document.querySelector('.todo-app-container')

// EVENT LISTENERS //
todoAppContainer.addEventListener('click', (e) =>
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
})

function completeTodo(btn)
{
    btn.closest('.todo-list-item').classList.add('completed')
    btn.classList.add('completed')
}

// Delete Todo
function deleteTodo(btn)
{
}