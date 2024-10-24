// VARIABLES //
const todoAppContainer = document.querySelector('.todo-app-container')
const todoContainerUL = document.querySelector('.todo-container-ul')
const completeTodosUL = document.querySelector('.done-todos-ul')
const addTodoBtn = document.querySelector('#add_todo_btn')
const createTodoBtn = document.querySelector('#create_todo_btn')
const addTodoInformationContainer = document.querySelector('.add-todo-information-container')
const todoInput = document.querySelector('#todo_input')
const amountInput = document.querySelector('#amount_input')
const openDoneTodosContainerBtn = document.querySelector('.open-done-todos-container-btn')
const closeDoneTodosContainerBtn = document.querySelector('.close-done-todos-container-btn')
const doneTodosContainer = document.querySelector('.done-todos-container')
const deleteAllCompletedTodosBtn = document.querySelector('.delete-all-completed-todos-btn')




// EMPTY ARRAYS FOR LOCAL STORAGE
let todoArray = []
let completeTodos = []

/*
    INITIAL VALUES FOR COMPLETE currentCompleteTodoText and currentCompleteTodoAmount
    (the text in the completed todos)
*/
let currentCompleteTodoText = ''
let currentCompleteTodoAmount = 0


// EVENT LISTENERS //
window.addEventListener('DOMContentLoaded', loadLocalStorage)
todoAppContainer.addEventListener('click', (e) => checkClickedButton(e))
addTodoBtn.addEventListener('click', openCreateTodoModal)
createTodoBtn.addEventListener('click', closeCreateTodoModal)
openDoneTodosContainerBtn.addEventListener('click', openCompleteTodosContainer)
closeDoneTodosContainerBtn.addEventListener('click', closeDoneTodosContainer)
deleteAllCompletedTodosBtn.addEventListener('click', deleteAllCompletedTodos)
doneTodosContainer.addEventListener('click', (e) => checkClickedButtonInCompletedTodo(e))

// FUNCTIONS //


// Open complete todos container
function openCompleteTodosContainer()
{
    doneTodosContainer.showModal()
}

// Close complete todos container
function closeDoneTodosContainer()
{
    doneTodosContainer.close()
}

// Open createTodoModal
function openCreateTodoModal()
{
    addTodoInformationContainer.showModal()
}

// Close createTodoModal
function closeCreateTodoModal()
{
    addTodo()
    addTodoInformationContainer.close()
}

/*
    This function takes care of checking, which button has been clicked in the todo in the todos container
    using event delegation.
    If complete button, then complete the task.
    If delete button, then delete the task
*/
function checkClickedButton(e)
{
    // Clicking the completeBtn 
    const completeBtn = e.target.closest('.complete-todo-btn')

    // Clicking the deleteBtn
    const deleteBtn = e.target.closest('.delete-todo-btn')

    // Run the completeTodo function if completeBtn is clicked
    if (completeBtn)
    {
        completeTodo(e)
    }
    // Run the deleteTodo function if deleteBtn is clicked
    else if (deleteBtn)
    {
        deleteTodo(e)
    }
}

function checkClickedButtonInCompletedTodo(e)
{
    const undoCompleteTodoBtn = e.target.closest('.undo-complete-todo-btn')
    const deleteCompleteTodoBtn = e.target.closest('.delete-complete-todo-btn')

    if (undoCompleteTodoBtn)
    {
        undoCompleteTodo(e)
    }

    if (deleteCompleteTodoBtn)
    {
        deleteCompleteTodo(e)
    }
}

// Undo complete todo
function undoCompleteTodo(e)
{
    // Get the clicked completed todo item
    const completedTodoItem = e.target.closest('.done-todo-list-item')

    // Get the text and amount of the completed todo
    const todoText = completedTodoItem.querySelector('.done-todo-item-text').textContent
    const todoAmount = completedTodoItem.querySelector('.amount').textContent

    // Remove the todo from the DOM (completed list)
    completedTodoItem.remove()

    // Remove from completeTodos array and update localStorage
    completeTodos = completeTodos.filter(todo => todo.todoTitle !== todoText)
    
    // Reuse the existing function to remove the todo from completeTodos in localStorage
    localStorage.setItem('completeTodos', JSON.stringify(completeTodos))

    // Add the todo back to the active list using your existing addItemToDOM function
    addItemToDOM(todoAmount, todoText)

    // Add it back to the todoArray and update localStorage
    populateTodoObject()

    // Update both arrays in localStorage using your existing updateLocalStorage function
    updateLocalStorage();
}


// Delete complete todo
function deleteCompleteTodo(e) {
    // Confirm if the user wants to delete this completed todo
    const isWantingToDeleteTodo = confirm("Are you sure you want to delete this completed todo?");

    // If the user doesn't want to delete, exit the function
    if (!isWantingToDeleteTodo) {
        return;
    }

    // Get the clicked completed todo item
    const completedTodoItem = e.target.closest('.done-todo-list-item');

    // Get the text of the completed todo
    const todoText = completedTodoItem.querySelector('.done-todo-item-text').textContent;

    // Remove the todo from the DOM (completed list)
    completedTodoItem.remove();

    // Remove the todo from completeTodos array
    completeTodos = completeTodos.filter(todo => todo.todoTitle !== todoText);

    // Update the completeTodos in localStorage
    localStorage.setItem('completeTodos', JSON.stringify(completeTodos));
}



// Complete Todo
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

// Delete Todo
function deleteTodo(e)
{
    /*
        Creating a confirm to show up, when the deleteTodoBtn has been clicked,
        so that the user doesn't delete a todo accidentally 
    */
    const isWantingToDeleteTodo = confirm("Are you sure you want to delete the todo?")
    
    /*
        If the user doesn't want to delete the todo, the function stops here,
        and the function does not run the deleteTodo function.
        This is done to prevent accidental deletion of a todo.
    */
    if (!isWantingToDeleteTodo) {
        return
    }

    accessClickedTodo(e)
}

function accessClickedTodo(e)
{
    // Access the clicked list item
    const todoItem = e.target.closest('.todo-list-item')
    
    // Get the title of the todo from the DOM element
    const todoTitleToRemove = todoItem.querySelector('.todo-item-text').textContent

    // Check if the item is in the "doneTodosContainer" or "todoContainerUL"
    if (completeTodosUL.contains(todoItem))
    {
        // Remove from completeTodosUL (completed tasks)
        completeTodosUL.removeChild(todoItem)
    }
    else if (todoContainerUL.contains(todoItem))
    {
        // Remove from todoContainerUL (active tasks)
        todoContainerUL.removeChild(todoItem)

        // Pass the title to the function to remove it from localStorage and move it to completed tasks
        removeFromLocalStorage(todoTitleToRemove)
    }
    
}





// CREATE TODO ITEM //

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

// Append Items
function appendItems(li, todoText, listItemControlsContainer)
{
    // Create A Document Fragment To Avoid Unintended Text Nodes
    const fragment = document.createDocumentFragment()

    // Append All Elements To The Fragment
    li.append(todoText, listItemControlsContainer)
    
    // Append The LI To The Fragment
    fragment.appendChild(li)

    // Append Fragment To The UL
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


/*
    Common for the following creator functions is that they all create an element for their specific
    purpose. They each take a parameter named after, what classes they get. The element's .className is set equal
    to this parameter, and the argument is passed as a string to the call of each function in the addItemToDOM() function.
    
    Note, that the elements that contain text have an extra parameter called "value", too.
*/

// Create Todo Text
function createTodoText(todoTextClasses, value)
{
    const todoText = document.createElement('span')
    todoText.className = todoTextClasses
    todoText.textContent = value
    return todoText
}

// Create Todo Text Content Container
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
    // If Todo Input Field Is Empty
    if(todoInput.value.trim() === '')
    {
        // Alert without closing the modal
        alert('Please enter a todo item')
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
    const todoTitle = todoInput.value.trim();
    const todoAmount = amountInput.value.trim();

    // Only create a todo object if both values are not empty
    if (todoTitle !== '' && todoAmount !== '')
    {
        const todoObject =
        {
            todoTitle: todoTitle,
            todoAmount: todoAmount,
        }

        todoArray.push(todoObject);
        localStorage.setItem('todo', JSON.stringify(todoArray));
    }
    else
    {
        alert('Please enter valid todo details');
    }
}


// COMPLETE TODOS //

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


// Delete All Completed Todos
function deleteAllCompletedTodos()
{
    // Confirm if the user really wants to delete all completed todos
    const isWantingToDeleteAllCompletedNotes = confirm("Are you sure you want to delete all completed todos?");
    
    // If the user doesn't want to delete all completed todos, exit the function
    if (!isWantingToDeleteAllCompletedNotes)
    {
        return
    }

    // Remove all completed todos from the DOM
    while (completeTodosUL.firstChild)
    {
        completeTodosUL.removeChild(completeTodosUL.firstChild);
    }

    // Clear the completeTodos array
    completeTodos = [];

    // Update localStorage to remove completed todos
    localStorage.setItem('completeTodos', JSON.stringify(completeTodos));

}



// LOCAL STORAGE //

// Load localStorage (being called upon window load)
function loadLocalStorage()
{
    // Load active todos
    const getTodos = localStorage.getItem('todo')

    /*
        If there are any todos, they get parsed from a JSON string
        into the todoArray
    */
    if (getTodos)
    {
        todoArray = JSON.parse(getTodos)

        // Display from localStorage, if any todos are present
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

function displayFromLocalStorage()
{
    /*
        Looping through the todoArray to get each todo.
    */
    todoArray.forEach((todo) =>
    {
        // Adding the text content from each todo in the todo container
        addItemToDOM(todo.todoAmount, todo.todoTitle)

        // Check if the todoTitle and todoAmount are not empty
        if (todo.todoTitle.trim() !== '' && todo.todoAmount.trim() !== '')
        {
            addItemToDOM(todo.todoAmount, todo.todoTitle);
        }
    })
}

// Display completed todos
function displayCompletedTodosFromLocalStorage()
{
    /*
        Looping through the completeTodos to get each completed todo
    */
    completeTodos.forEach((completedTodo) =>
    {
        // Adding the text content from each todo in the completedTodosContainer
        addCompletedItemToDOM(completedTodo.todoAmount, completedTodo.todoTitle)

        // Check if the todoTitle and todoAmount are not empty
        if (completedTodo.todoTitle.trim() !== '' && completedTodo.todoAmount.trim() !== '')
        {
            addCompletedItemToDOM(completedTodo.todoAmount, completedTodo.todoTitle);
        }
    })
}

// Update localStorage
function updateLocalStorage()
{
    // Save both the todoArray and completeTodos arrays in localStorage
    localStorage.setItem('todo', JSON.stringify(todoArray))
    localStorage.setItem('completeTodos', JSON.stringify(completeTodos))
}

// Remove from localStorage
function removeFromLocalStorage(todoTitleToRemove)
{
    /*
        Loop through the todoArray to find the matching todo and remove it
    */
    todoArray.forEach((todo, index) =>
    {
        /*
            If todoTitle is equal to the title of the todo wanted to be deleted,
            then the todo gets removed
        */
        if (todo.todoTitle === todoTitleToRemove) {
            // If match is found, remove todo from todoArray and return the todo.
            const completeTodo = todoArray.splice(index, 1)[0] // Remove from todoArray

            // Push the completeTodo to the completeTodos array
            completeTodos.push(completeTodo)

            // Update localStorage after moving the task to completeTodos
            updateLocalStorage()
        }
    })
}



// Clear inputs
function clearInputs()
{
    todoInput.value = ''
    amountInput.value = ''
}
