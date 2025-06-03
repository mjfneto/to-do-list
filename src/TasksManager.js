export class TasksManager {
  constructor(updateTasksList) {
    this.tasks = []
    this.updateTasksHTML = updateTasksList
  }

  getTask(id) {
    return this.tasks.find((t) => t.id === id)
  }

  updateTask(id, content) {
    this.getTask(id).content = content

    this.updateTasksList()
  }

  addTask(content) {
    this.tasks.push({
      id: this.generateTaskId(),
      content,
    })

    this.updateTasksList()
  }

  removeTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id)

    this.updateTasksList()
  }

  updateTasksList() {
    this.updateTasksHTML(this.tasks)
  }

  generateTaskId() {
    const timestamp = Date.now().toString(36) // base36 = compact
    const random = Math.random().toString(36).substring(2, 6) // short random bit
    return `task-${timestamp}-${random}`
  }
}
