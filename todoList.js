// To-Do List Application with LocalStorage
class TodoList {
  constructor() {
    this.tasks = this.loadFromLocalStorage();
    this.todoInput = document.getElementById("todoInput");
    this.addBtn = document.getElementById("addBtn");
    this.todoListElement = document.getElementById("todoList");
    this.emptyState = document.getElementById("emptyState");
    this.taskCountElement = document.getElementById("taskCount");
    this.completedCountElement = document.getElementById("completedCount");

    this.init();
  }

  // Initialize event listeners
  init() {
    this.addBtn.addEventListener("click", () => this.addTask());
    this.todoInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.addTask();
      }
    });

    this.render();
  }

  // Load tasks from localStorage
  loadFromLocalStorage() {
    const storedTasks = localStorage.getItem("todoTasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  }

  // Save tasks to localStorage
  saveToLocalStorage() {
    localStorage.setItem("todoTasks", JSON.stringify(this.tasks));
  }

  // Add a new task
  addTask() {
    const taskText = this.todoInput.value.trim();

    if (taskText === "") {
      this.todoInput.focus();
      return;
    }

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };

    this.tasks.push(newTask);
    this.saveToLocalStorage();
    this.todoInput.value = "";
    this.todoInput.focus();
    this.render();
  }

  // Delete a task
  deleteTask(taskId) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.saveToLocalStorage();
    this.render();
  }

  // Toggle task completion status
  toggleTaskCompletion(taskId) {
    const task = this.tasks.find((task) => task.id === taskId);
    if (task) {
      task.completed = !task.completed;
      this.saveToLocalStorage();
      this.render();
    }
  }

  // Count total tasks
  countTasks() {
    return this.tasks.length;
  }

  // Count completed tasks
  countCompletedTasks() {
    return this.tasks.filter((task) => task.completed).length;
  }

  // Update task counter display
  updateCounter() {
    const totalTasks = this.countTasks();
    const completedTasks = this.countCompletedTasks();

    this.taskCountElement.textContent = totalTasks;
    this.completedCountElement.textContent = completedTasks;
  }

  // Render the task list
  render() {
    // Clear the list
    this.todoListElement.innerHTML = "";

    // Show empty state if no tasks
    if (this.tasks.length === 0) {
      this.todoListElement.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="70"
              height="70"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--accent)"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M13 5h8" />
              <path d="M13 12h8" />
              <path d="M13 19h8" />
              <path d="m3 17 2 2 4-4" />
              <rect x="3" y="4" width="6" height="6" rx="1" />
            </svg>
          </div>
          <div class="empty-state-text">No tasks yet. Add one above to get started!</div>
        </div>
      `;
      this.updateCounter();
      return;
    }

    // Render each task
    this.tasks.forEach((task) => {
      const todoItem = document.createElement("div");
      todoItem.className = `todo-item ${task.completed ? "completed" : ""}`;
      todoItem.innerHTML = `
        <input 
          type="checkbox" 
          class="todo-checkbox" 
          ${task.completed ? "checked" : ""}
          data-id="${task.id}"
        />
        <span class="todo-text">${this.escapeHtml(task.text)}</span>
        <button class="btn-delete" data-id="${task.id}">Delete</button>
      `;

      // Add event listener for checkbox
      const checkbox = todoItem.querySelector(".todo-checkbox");
      checkbox.addEventListener("change", () => {
        this.toggleTaskCompletion(task.id);
      });

      // Add event listener for delete button
      const deleteBtn = todoItem.querySelector(".btn-delete");
      deleteBtn.addEventListener("click", () => {
        this.deleteTask(task.id);
      });

      this.todoListElement.appendChild(todoItem);
    });

    this.updateCounter();
  }

  // Escape HTML to prevent XSS
  escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize the to-do list when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new TodoList();
});
