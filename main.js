import { TasksManager } from './src/TasksManager.js'

const tasksForm = document.querySelector('#tasks-form')
const tasksList = document.querySelector('#tasks-list')

const tasksManager = new TasksManager(updateTasksList)

tasksForm.addEventListener('submit', handleTasksFormSubmission)

tasksList.addEventListener('click', handleTasksListClicked)

function handleTasksFormSubmission(event) {
  event.preventDefault()

  const tasksFormData = new FormData(tasksForm)

  const content = tasksFormData.get('content')

  if (!content) return

  tasksManager.addTask(content)

  tasksForm.querySelector('textarea').value = ''
}

function updateTasksList(tasks) {
  tasksList.innerHTML = tasks.reduce((html, task) => {
    html += `
        <li data-id="${task.id}">
            <div class="task-content" contenteditable="true">
                <p>${task.content}</p>
            </div>
            <div class="control-buttons">
                <button class="btn-delete" type="button">
                    <span class="material-icons">delete</span>
                </button>
            </div>
        </li>
    `

    return html
  }, '')
}

function handleTasksListClicked(event) {
  const eTarget = event.target
  const btnDeleteClicked = eTarget.closest('.btn-delete')

  if (btnDeleteClicked) {
    const parentListItem = eTarget.closest('[data-id]')
    tasksManager.removeTask(parentListItem.dataset.id)
  }
}
