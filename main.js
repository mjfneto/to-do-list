import { TasksManager } from './src/TasksManager.js'

const tasksForm = document.querySelector('#tasks-form')
const tasksList = document.querySelector('#tasks-list')
const contentTextArea = document.querySelector('#content')

const maxLength = parseFloat(contentTextArea.maxLength)

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
            <p class="task-content" contenteditable="true">${task.content}</p>
            <div class="control-buttons">
                <button class="btn-delete" type="button">
                    <span class="material-icons">delete</span>
                </button>
            </div>
        </li>
    `

    return html
  }, '')

  document.querySelectorAll('.task-content').forEach((taskContent) => {
    taskContent.addEventListener('blur', handleTaskContentBlur)
    taskContent.addEventListener('beforeinput', handleTaskContentBeforeInput)
  })
}

function handleTasksListClicked(event) {
  const eTarget = event.target
  const btnDeleteClicked = eTarget.closest('.btn-delete')

  if (btnDeleteClicked) {
    document.querySelectorAll('.task-content').forEach((taskContent) => {
      taskContent.removeEventListener('blur', handleTaskContentBlur)
      taskContent.removeEventListener(
        'beforeinput',
        handleTaskContentBeforeInput
      )
    })

    const parentListItem = eTarget.closest('[data-id]')
    tasksManager.removeTask(parentListItem.dataset.id)
  }
}

function handleTaskContentBlur(event) {
  const eTarget = event.target
  const id = eTarget.closest('[data-id]').dataset.id
  const task = tasksManager.getTask(id)

  if (eTarget.textContent === task.content) return

  if (eTarget.textContent.trim() === '') {
    eTarget.textContent = task.content
    return
  }

  tasksManager.updateTask(id, eTarget.textContent)
}

function handleTaskContentBeforeInput(event) {
  const eTarget = event.target
  const inputType = event.inputType
  const textInsertions = new Set([
    'insertText',
    'insertFromPaste',
    'insertFromDrop',
    'insertFromYank',
    'insertReplacementText',
    'insertCompositionText',
    'insertFromComposition',
  ])

  if (
    textInsertions.has(inputType) &&
    eTarget.textContent.length >= maxLength
  ) {
    event.preventDefault()
  }
}
