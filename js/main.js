const todoAppContainer = document.querySelector('.todo-app-container')
const todoContainerUL = document.querySelector('.todo-container-ul')
const doneTodosUL = document.querySelector('.done-todos-ul')
const addTodoBtn = document.querySelector('#add_todo_btn')
const createTodoBtn = document.querySelector('#create_todo_btn')
const addTodoInformationContainer = document.querySelector('.add-todo-information-container')
const todoInput = document.querySelector('#todo_input')
const amountInput = document.querySelector('#amount_input')
const amountContainer = document.querySelector('.amount-container')
const openDoneTodosContainerBtn = document.querySelector('.open-done-todos-container-btn')
const closeDoneTodosContainerBtn = document.querySelector('.close-done-todos-container-btn')
const doneTodosContainer = document.querySelector('.done-todos-container')
const deleteCompleteTodoBtn = document.querySelector('.delete-complete-todo-btn')


// EVENT LISTENERS //
todoAppContainer.addEventListener('click', (e) => checkClickedButton(e))
addTodoBtn.addEventListener('click', openCreateTodoModal)
createTodoBtn.addEventListener('click', closeCreateTodoModal)
openDoneTodosContainerBtn.addEventListener('click', openDoneTodosContainer)
closeDoneTodosContainerBtn.addEventListener('click', closeDoneTodosContainer)
deleteCompleteTodoBtn.addEventListener('click', (e) => deleteTodo(e))




// FUNCTIONS //
function openDoneTodosContainer()
{
    doneTodosContainer.showModal()
}

// openDoneTodosContainer()

function closeDoneTodosContainer()
{
    doneTodosContainer.close()
}


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
        deleteTodo(e)
    }
}


function completeTodo(btn)
{
    btn.closest('.todo-list-item').classList.add('completed')
}


// Delete Todo
function deleteTodo(e)
{
    const isWantingToDeleteTodo = confirm("Are you sure you want to delete the todo?")
    
    if (!isWantingToDeleteTodo)
    {
        return
    }

    // Access the clicked list item
    const todoItem = e.target.closest('.todo-list-item')
    
    if (todoItem)
    {
        // Check if the item is in the "doneTodosContainer" or "todoContainerUL"
        if (doneTodosUL.contains(todoItem))
        {
            // Remove from doneTodosUL
            doneTodosUL.removeChild(todoItem)
        }
        else if (todoContainerUL.contains(todoItem))
        {
            // Remove from todoContainerUL
            todoContainerUL.removeChild(todoItem)
        }
    }
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
    // Create LI
    const li = createLI('item todo-list-item d-flex jc-space_between ai-center')

    // Create Todo Text
    const todoText = createTodoText('todo-item-text')

    // Create Todo Text Content Container
    const todoTextContentContainer = createTodoTextContentContainer('container todo-text-content-container d-flex jc-space_around')

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

    todoTextContentContainer.append(todoText, amountContainer)

    // Append amountParagraph to amountContainer
    amountContainer.appendChild(amountParagraph)

    // Append completeTodoBtn and deleteTodoBtn to listItemControlsContainer
    listItemControlsContainer.append(completeTodoBtn, deleteTodoBtn)

    // Append icon to completeTodoBtn
    completeTodoBtn.appendChild(completeTodoBtnIcon)

    // Append icon to deleteTodoBtn
    deleteTodoBtn.appendChild(deleteTodoBtnIcon)

    // Call appendItems with all its parameters
    appendItems(li, todoTextContentContainer, listItemControlsContainer)
}

// Append Items
function appendItems(li, todoText, listItemControlsContainer)
{
    // Create a document fragment to avoid unintended text nodes
    const fragment = document.createDocumentFragment()

    // Append all elements to the fragment
    li.append(todoText, listItemControlsContainer)
    
    // Append the li to the fragment
    fragment.appendChild(li)

    // Append fragment to the ul
    todoContainerUL.appendChild(fragment)
}


// Creator Functions //

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

function createTodoTextContentContainer(todoTextContentContainerClasses)
{
    const todoTextContentContainer = document.createElement('div')
    todoTextContentContainer.className = todoTextContentContainerClasses
    return todoTextContentContainer
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








// function addToLocalStorage()
// {
//     let todos = JSON.parse(localStorage.getItem('todos')) || []

//     // Todo Object
//     const todoItem =
//     {
//         text: todoText,
//         amount: amountText,
//         completed: false
//     }

//     todos.push(todoItem)

//     localStorage.setItem('todos', JSON.stringify(todos))
// }





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