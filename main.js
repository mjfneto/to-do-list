import { TasksManager } from './src/TasksManager.js'

const tasksForm = document.querySelector('#tasks-form')
const tasksList = document.querySelector('#tasks-list')

const tasksManager = new TasksManager(updateTasksList)

tasksForm.addEventListener('submit', function (event) {
  event.preventDefault()

  const tasksFormData = new FormData(tasksForm)

  const content = tasksFormData.get('content')

  if (!content) return

  tasksManager.addTask(content)

  tasksForm.querySelector('textarea').value = ''
})

function updateTasksList(tasks) {
  tasksList.innerHTML = tasks.reduce((html, task) => {
    html += `
        <li data-id="${task.id}">
            <div class="task-content">
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

  document.querySelectorAll('.btn-delete').forEach(function (button) {
    button.addEventListener('click', handleDeleteButtonClicked)
  })
}

function handleDeleteButtonClicked() {
  const parentListItem = this.closest('[data-id]')

  document.querySelectorAll('.btn-delete').forEach(function (button) {
    button.removeEventListener('click', handleDeleteButtonClicked)
  })

  tasksManager.removeTask(parentListItem.dataset.id)
}
