const todoAppContainer = document.querySelector('.todo-app-container')
const todoContainerUL = document.querySelector('.todo-container-ul')
const completeTodosUL = document.querySelector('.done-todos-ul')
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

let todoArray = []
let completeTodos = []

let currentCompleteTodoText = ''
let currentCompleteTodoAmount = 0


// EVENT LISTENERS //
window.addEventListener('DOMContentLoaded', loadLocalStorage)
todoAppContainer.addEventListener('click', (e) => checkClickedButton(e))
addTodoBtn.addEventListener('click', openCreateTodoModal)
createTodoBtn.addEventListener('click', closeCreateTodoModal)
openDoneTodosContainerBtn.addEventListener('click', openDoneTodosContainer)
closeDoneTodosContainerBtn.addEventListener('click', closeDoneTodosContainer)
deleteCompleteTodoBtn.addEventListener('click', (e) => deleteTodo(e))




// FUNCTIONS //

function loadLocalStorage()
{
    // Load active todos
    const getTodos = localStorage.getItem('todo')

    if (getTodos)
    {
        todoArray = JSON.parse(getTodos)
        displayFromLocalStorage()
    }

    // Load completed todos
    const getCompleteTodos = localStorage.getItem('completeTodos')
    if (getCompleteTodos)
    {
        completeTodos = JSON.parse(getCompleteTodos)
        displayCompletedTodosFromLocalStorage()
    }
}

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
        completeTodo(e)
    }
    else if (deleteBtn)
    {
        deleteTodo(e)
    }
}


function completeTodo(e)
{
    // Get the current todo text and amount
    currentCompleteTodoText = e.target.closest('.todo-list-item').firstElementChild.firstElementChild.textContent
    currentCompleteTodoAmount = e.target.closest('.todo-list-item').querySelector('.amount').textContent

    // Remove the task from the active list (DOM)
    e.target.closest('.todo-list-item').remove()

    // Move the task from active todos to completeTodos in localStorage
    removeFromLocalStorage(currentCompleteTodoText)
    
    // Immediately add the task to the completeTodos list in the DOM
    addCompletedItemToDOM(currentCompleteTodoAmount, currentCompleteTodoText)
}

function updateLocalStorage()
{
    // Save both the todoArray and completeTodos arrays in localStorage
    localStorage.setItem('todo', JSON.stringify(todoArray))
    localStorage.setItem('completeTodos', JSON.stringify(completeTodos))
}

function removeFromLocalStorage(todoTitleToRemove)
{
    // Loop through the todoArray to find the matching todo and remove it
    todoArray.forEach((todo, index) => {
        if (todo.todoTitle === todoTitleToRemove) {
            const completeTodo = todoArray.splice(index, 1)[0] // Remove from todoArray
            completeTodos.push(completeTodo) // Add to completeTodos

            // Update localStorage after moving the task to completeTodos
            updateLocalStorage()
        }
    })
}

// Delete Todo
function deleteTodo(e)
{
    const isWantingToDeleteTodo = confirm("Are you sure you want to delete the todo?")
    
    if (!isWantingToDeleteTodo) {
        return
    }

    // Access the clicked list item
    const todoItem = e.target.closest('.todo-list-item')

    if (todoItem) {
        // Get the title of the todo from the DOM element (assuming the title is stored as text)
        const todoTitleToRemove = todoItem.querySelector('.todo-item-text').textContent

        // Check if the item is in the "doneTodosContainer" or "todoContainerUL"
        if (completeTodosUL.contains(todoItem)) {
            // Remove from completeTodosUL (completed tasks)
            completeTodosUL.removeChild(todoItem)
        } else if (todoContainerUL.contains(todoItem)) {
            // Remove from todoContainerUL (active tasks)
            todoContainerUL.removeChild(todoItem)

            // Pass the title to the function to remove it from localStorage and move it to completed tasks
            removeFromLocalStorage(todoTitleToRemove)
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
function addItemToDOM(amountvalue, todoname)
{
    // Create LI
    const li = createLI('item todo-list-item d-flex jc-space_between ai-center')

    // Create Todo Text
    const todoText = createTodoText('todo-item-text', todoname)

    // Create Todo Text Content Container
    const todoTextContentContainer = createTodoTextContentContainer('container todo-text-content-container d-flex jc-space_around')

    // Create Amount Container
    const amountContainer = createAmountContainer('amount-container d-flex jc-center ai-center')

    // Create amount paragraph
    const amountParagraph = createAmountParagraph('amount', amountvalue)

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

function displayFromLocalStorage()
{
    todoArray.forEach((todo) =>
    {
        addItemToDOM(todo.todoAmount, todo.todoTitle)
    })
}

function displayCompletedTodosFromLocalStorage()
{
    completeTodos.forEach((completedTodo) =>
    {
        addCompletedItemToDOM(completedTodo.todoAmount, completedTodo.todoTitle)
    })
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
function createTodoText(todoTextClasses, value)
{
    const todoText = document.createElement('span')
    todoText.className = todoTextClasses
    todoText.textContent = value
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
function createAmountParagraph(amountParagraphClasses, value)
{
    const amountParagraph = document.createElement('p')
    amountParagraph.textContent = value
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
        populateTodoObject()
        addItemToDOM(amountInput.value, todoInput.value)
        clearInputs()
    }
}

function populateTodoObject()
{
    const todoObject =
    {
        todoTitle: todoInput.value,
        todoAmount: amountInput.value,
    }

    todoArray.push(todoObject)

    let todoString = JSON.stringify(todoArray)

    localStorage.setItem('todo', todoString)
}


// DONE TODOS //

// Create Complete LI
function createCompleteLI(completeLIClasses)
{
    const completeLI = document.createElement('li')
    completeLI.className = completeLIClasses
    return completeLI
}

// Create Complete Todo Text Content Container
function createCompleteTodoTextContentContainer(completeTodoTextContentContainerClasses)
{
    const completeTodoTextContentContainer = document.createElement('div')
    completeTodoTextContentContainer.className = completeTodoTextContentContainerClasses
    return completeTodoTextContentContainer
}

// Create Complete Todo Text
function createCompleteTodoText(completeTodoTextClasses)
{
    const completeTodoText = document.createElement('span')
    completeTodoText.textContent = currentCompleteTodoText
    completeTodoText.className = completeTodoTextClasses
    return completeTodoText
}

// Create Complete Amount Container
function createCompleteAmountContainer(completeAmountContainerClasses)
{
    const completeAmountContainer = document.createElement('span')
    completeAmountContainer.className = completeAmountContainerClasses
    return completeAmountContainer    
}

// Create Complete Amount Paragraph
function createCompleteAmountParagraph(completeAmountParagraphClasses)
{
    const completeAmountParagraph = document.createElement('p')
    completeAmountParagraph.textContent = currentCompleteTodoAmount
    completeAmountParagraph.className = completeAmountParagraphClasses
    return completeAmountParagraph
}

// Create Complete List Item Controls Container
function createCompleteListItemControlsContainer(completeListItemControlsContainerClasses)
{
    const completeListItemControlsContainer = document.createElement('div')
    completeListItemControlsContainer.className = completeListItemControlsContainerClasses
    return completeListItemControlsContainer
}

// Create Undo Complete Todo Button
function createUndoCompleteTodoBtn(undoCompleteTodoBtnClasses)
{
    const undoCompleteTodoBtn = document.createElement('button')
    undoCompleteTodoBtn.className = undoCompleteTodoBtnClasses
    return undoCompleteTodoBtn
}

// Create Undo Complete Todo Button Icon
function createUndoCompleteTodoBtnIcon(undoCompleteTodoBtnIconClasses)
{
    const undoCompleteTodoBtnIcon = document.createElement('i')
    undoCompleteTodoBtnIcon.className = undoCompleteTodoBtnIconClasses
    return undoCompleteTodoBtnIcon
}

// Create Delete Complete Todo Button
function createDeleteCompleteTodoBtn(deleteCompleteTodoBtnClasses)
{
    const deleteCompleteTodoBtn = document.createElement('button')
    deleteCompleteTodoBtn.className = deleteCompleteTodoBtnClasses
    return deleteCompleteTodoBtn
}

// Create Delete Complete Todo Button Icon
function createDeleteCompleteTodoBtnIcon(deleteCompleteTodoBtnIconClasses)
{
    const deleteCompleteTodoBtnIcon = document.createElement('i')
    deleteCompleteTodoBtnIcon.className = deleteCompleteTodoBtnIconClasses
    return deleteCompleteTodoBtnIcon
}

function addCompletedItemToDOM(amountValue, todoName) {
    // Create complete LI
    const completeLI = createCompleteLI('item done-todo-list-item d-flex jc-space_between ai-center')

    // Create completeTodoTextContentContainer
    const completeTodoTextContentContainer = createCompleteTodoTextContentContainer('container complete-todo-text-content-container d-flex jc-space_between')

    // Create completeTodoItemText
    const completeTodoText = createTodoText('done-todo-item-text', todoName)

    // Create completeAmountContainer
    const completeAmountContainer = createAmountContainer('amount-container d-flex jc-center ai-center')

    // Create completeAmountParagraph
    const completeAmountParagraph = createAmountParagraph('amount', amountValue)

    // Create completeListItemControlsContainer
    const completeListItemControlsContainer = createListItemControlsContainer('container done-list-item-controls-container d-flex')

    // Create undoCompleteTodoBtn
    const undoCompleteTodoBtn = createUndoCompleteTodoBtn('btn undo-complete-todo-btn')

    // Create undoCompleteTodoBtnIcon
    const undoCompleteTodoBtnIcon = createUndoCompleteTodoBtnIcon('fa-solid fa-rotate-left')

    // Create deleteCompleteTodoBtn
    const deleteCompleteTodoBtn = createDeleteCompleteTodoBtn('btn delete-complete-todo-btn')

    // Create deleteCompleteTodoBtnIcon
    const deleteCompleteTodoBtnIcon = createDeleteCompleteTodoBtnIcon('fas fa-trash-alt')

    // Append items to DOM
    appendCompleteTodoItem(
        completeLI,
        completeTodoTextContentContainer,
        completeListItemControlsContainer,
        completeTodoText,
        completeAmountContainer,
        completeAmountParagraph,
        undoCompleteTodoBtn,
        deleteCompleteTodoBtn,
        undoCompleteTodoBtnIcon,
        deleteCompleteTodoBtnIcon
    )
}

// Append Complete Todo Item
function appendCompleteTodoItem(completeLI, completeTodoTextContentContainer, completeListItemControlsContainer, completeTodoText, completeAmountContainer, completeAmountParagraph, undoCompleteTodoBtn, deleteCompleteTodoBtn, undoCompleteTodoBtnIcon, deleteCompleteTodoBtnIcon)
{
    completeTodosUL.append(completeLI)

    completeLI.append(completeTodoTextContentContainer, completeListItemControlsContainer)

    completeTodoTextContentContainer.append(completeTodoText, completeAmountContainer)

    completeAmountContainer.append(completeAmountParagraph)

    completeListItemControlsContainer.append(undoCompleteTodoBtn, deleteCompleteTodoBtn)

    undoCompleteTodoBtn.append(undoCompleteTodoBtnIcon)

    deleteCompleteTodoBtn.append(deleteCompleteTodoBtnIcon)
}

function clearInputs()
{
    todoInput.value = ''
    amountInput.value = ''
}



