const todoAppContainer = document.querySelector('.todo-app-container')
const ul = document.querySelector('ul')
const addTodoBtn = document.querySelector('#add_todo_btn')
const createTodoBtn = document.querySelector('#create_todo_btn')
const addTodoInformationContainer = document.querySelector('.add-todo-information-container')
const todoInput = document.querySelector('#todo_input')
const amountInput = document.querySelector('#amount_input')
const amountContainer = document.querySelector('.amount-container')

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
    addTodo()
    addTodoInformationContainer.close()
}


// TODO ITEM //
function addItemToDOM()
{
    // Create UL
    const ul = createUL()

    // Create LI
    const li = createLI('item todo-list-item d-flex jc-space_between ai-center')

    // Create Todo Text
    const todoText = createTodoText('todo-item-text')

    // Create Amount Container
    const amountContainer = createAmountContainer('amount-container d-flex jc-center ai-center')

    // Create amount paragraph
    const amountParagraph = createAmountParagraph('amount')

    // Create List Item Controls Container
    const listItemControlsContainer = createListItemControlsContainer('container list-item-controls-container d-flex')

    // Create Complete Todo Button
    const completeTodoBtn = createCompleteTodoBtn('btn complete-todo-btn')

    // Create Complete Todo Button Icon
    const completeTodoBtnIcon = createCompleteTodoBtnIcon('fas fa-check')

    // Create Delete Todo Button
    const deleteTodoBtn = createDeleteTodoBtn('btn delete-todo-btn')

    // Create Delete Todo Button Icon
    const deleteTodoBtnIcon = createDeleteTodoBtnIcon('fas fa-trash-alt')

    // Append amountParagraph to amountContainer
    amountContainer.appendChild(amountParagraph)

    // Append completeTOdoBtn and deleteTodoBtn to listItemControlsContainer
    listItemControlsContainer.append(completeTodoBtn, deleteTodoBtn)

    // Append icon to completeTodoBtn
    completeTodoBtn.appendChild(completeTodoBtnIcon)

    // Append icon to deleteTodoBtn
    deleteTodoBtn.appendChild(deleteTodoBtnIcon)

    // Call appendItems with all its parameters
    appendItems(ul, li, todoText, amountContainer, listItemControlsContainer, completeTodoBtn, deleteTodoBtn)
}

// Append Items
function appendItems(ul, li, todoText, amountContainer, listItemControlsContainer)
{
    // Append UL to todoAppContainer
    todoAppContainer.appendChild(ul)

    // Append li to ul
    ul.appendChild(li)

    // Append to li
    li.append(todoText, amountContainer, listItemControlsContainer)
}


// Creator Functions //

// Create UL
function createUL()
{
    const ul = document.createElement('ul')
    return ul
}

// Create LI
function createLI(liClasses)
{
    const li = document.createElement('li')
    li.className = liClasses
    return li
}

// Create Todo Text
function createTodoText(todoTextClasses)
{
    const todoText = document.createElement('span')
    todoText.className = todoTextClasses
    todoText.textContent = todoInput.value
    return todoText
}

// Create Amount Container
function createAmountContainer(amountContainerClasses)
{
    const amountContainer = document.createElement('span')
    amountContainer.className = amountContainerClasses
    return amountContainer
}

// Create Amount Paragraph
function createAmountParagraph(amountParagraphClasses)
{
    const amountParagraph = document.createElement('p')
    amountParagraph.textContent = `Amount: ${amountInput.value}`
    amountParagraph.className = amountParagraphClasses
    return amountParagraph
}

// Create List Item Controls Container
function createListItemControlsContainer(listItemControlsContainerClasses)
{
    const listItemControlsContainer = document.createElement('div')
    listItemControlsContainer.className = listItemControlsContainerClasses
    return listItemControlsContainer
}

// Create Complete Todo Button
function createCompleteTodoBtn(completeTodoBtnClasses)
{
    const completeTodoBtn = document.createElement('button')
    completeTodoBtn.className = completeTodoBtnClasses
    return completeTodoBtn
}

// Create Complete Todo Button Icon
function createCompleteTodoBtnIcon(completeTodoBtnIconClasses)
{
    const completeTodoBtnIcon = document.createElement('i')
    completeTodoBtnIcon.className = completeTodoBtnIconClasses
    return completeTodoBtnIcon
}

// Create Delete Todo Button
function createDeleteTodoBtn(deleteTodoBtnClasses)
{
    const deleteTodoBtn = document.createElement('button')
    deleteTodoBtn.className = deleteTodoBtnClasses
    return deleteTodoBtn
}

// Create Delete Todo Button Icon
function createDeleteTodoBtnIcon(deleteTodoBtnIconClasses)
{
    const deleteTodoBtnIcon = document.createElement('i')
    deleteTodoBtnIcon.className = deleteTodoBtnIconClasses
    return deleteTodoBtnIcon
}


function addTodo()
{
    if(todoInput.value.trim() === '')
    {
        alert('Please enter a todo item')
        openCreateTodoModal()
        return
    }
    else
    {
        addItemToDOM()
        clearInputs()
    }

    
}


function clearInputs()
{
    todoInput.value = ''
    amountInput.value = ''
}


// function createTodoObject()
// {
//     const todoObject =
//     {
//         todoTitle: todoInput.value,
//         amount: amountInput.value,
//         randomId: self.crypto.randomUUID()
//     }

//     console.log(todoObject.randomId)
// }

// createTodoObject()