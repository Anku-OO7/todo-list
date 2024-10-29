document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("task-form");
    const taskInput = document.getElementById("task-input");
    const dueDateInput = document.getElementById("due-date");
    const priorityInput = document.getElementById("priority");
    const taskList = document.getElementById("task-list");

    loadTasks();

    taskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        addTask(taskInput.value, dueDateInput.value, priorityInput.value);
        taskInput.value = "";
        dueDateInput.value = "";
        priorityInput.value = "low";
    });

    function addTask(name, dueDate, priority) {
        const task = {name, dueDate, priority, completed: false };
        const tasks = getTasks();
        tasks.push(task);
        saveTasks(tasks);
        renderTask(task);
    }

    function renderTask(task) {
        const taskE1 = document.createElement("div");
        taskE1.classList.add("task");
        taskE1.innerHTML = `
          <span>${task.name}</span>
          <span>Due: ${task.dueDate || "N/A"}</span>
          <span>Priority: ${task.priority}</span>
          <button class="delete-btn">Delete</button>
        `;
        taskList.appendChild(taskE1);

        taskE1.querySelector(".delete-btn").addEventListener("click", () => {
            taskList.removeChild(taskE1);
            deleteTask(task);
        });
    }

    function getTasks() {
        return JSON.parse(localStorage.getItem("tasks")) || [];
    }

    function saveTasks(tasks) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function deleteTask(taskToDelete) {
        const tasks = getTasks().filter(task => task,name !== taskToDelete.name);
        saveTasks(tasks);
    }

    function loadTasks() {
        const tasks = getTasks();
        tasks.forEach(task => renderTask(task));
    }
});