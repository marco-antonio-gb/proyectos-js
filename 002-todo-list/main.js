const STORAGEKEY = 'misTareas'

const totoInput = document.getElementById('todo-input')

const todoAddButton = document.getElementById('todo-add-button')

const todoResetButton = document.getElementById('todo-reset-button')

const todoListElement = document.getElementById('todo-list-element')

todoAddButton.addEventListener('click', () => addTodo())
todoResetButton.addEventListener('click', () => resetTodos())

function addTodo() {
	const inputValue = totoInput.value
	if (inputValue) {
		const newTodo = {
			id: Date.now(),
			title: totoInput.value,
			completed: false
		}
		saveTodo(newTodo)
	} else {
		alert('Agrega una tarea valida!')
	}

	displayTodos()
}

function saveTodo(newTodo) {
	const storeTodos = localStorage.getItem(STORAGEKEY) ? JSON.parse(localStorage.getItem(STORAGEKEY)) : []

	storeTodos.push(newTodo)
	localStorage.setItem(STORAGEKEY, JSON.stringify(storeTodos))
	totoInput.value = ''
}
function deleteTodo(itemId) {
	if (window.confirm(`Desea eliminar la tarea: ${itemId}?`)) {
		const todos = localStorage.getItem(STORAGEKEY) ? JSON.parse(localStorage.getItem(STORAGEKEY)) : []
		if (todos.length) {
			const index = todos.findIndex((todoItem) => todoItem.id === itemId)

			if (index !== -1) {
				let xTodos = todos.splice(index, 1)

				localStorage.setItem(STORAGEKEY, JSON.stringify(todos))
			}
		}
		displayTodos()
	}
}
function changeStatus(itemId, newStatus) {
	const todos = localStorage.getItem(STORAGEKEY) ? JSON.parse(localStorage.getItem(STORAGEKEY)) : []
	if (todos.length) {
		const result = todos.find(({ id }) => id === itemId)
		result.completed = newStatus
		localStorage.setItem(STORAGEKEY, JSON.stringify(todos))
	}
}
function resetTodos() {
	if (window.confirm('Desea reiniciar la lista de tareas?')) {
		localStorage.setItem(STORAGEKEY, [])

		displayTodos()
	}
}
function displayTodos() {
	todoListElement.innerHTML = ''

	const todos = localStorage.getItem(STORAGEKEY) ? JSON.parse(localStorage.getItem(STORAGEKEY)) : []

	if (todos && todos.length > 0) {
		todoResetButton.disabled = false
		todos.forEach((element) => {
			const todoItem = document.createElement('li')
			todoItem.dataset.id = element.id
			const labelItem = document.createElement('label')
			const todoCheck = document.createElement('INPUT')
			todoCheck.setAttribute('type', 'checkbox')
			todoCheck.checked = element.completed

			if (element.completed) {
				labelItem.classList.add('todo-item', 'completed')
			} else {
				labelItem.classList.add('todo-item')
			}
			todoCheck.classList.add('todo-status')
			labelItem.innerText = element.title
			labelItem.prepend(todoCheck)

			const closeButton = document.createElement('button')
			closeButton.classList.add('close-button')
			closeButton.innerText = 'X'
			closeButton.dataset.item = element.id
			todoItem.append(labelItem, closeButton)
			todoListElement.appendChild(todoItem)
			todoCheck.addEventListener('change', (event) => {
				var target = event.target
				var parent = target.parentElement
				if (todoCheck.checked) {
					parent.classList.add('completed')
				} else {
					parent.classList.remove('completed')
				}

				changeStatus(element.id, todoCheck.checked)
			})
			closeButton.addEventListener('click', () => {
				deleteTodo(element.id)
			})
		})
	} else {
		todoResetButton.disabled = true
	}
}
document.addEventListener('DOMContentLoaded', () => {
	displayTodos()
})
