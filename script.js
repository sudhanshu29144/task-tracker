  const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");
    const taskCounter = document.getElementById("taskCounter");

    // Load tasks from localStorage
    window.onload = function() {
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.forEach(task => renderTask(task.text, task.completed));
      updateCounter();
    };

    // Add Task
    function addTask() {
      let taskText = taskInput.value.trim();
      if (taskText === "") {
        alert("Please enter a task!");
        return;
      }

      renderTask(taskText, false);
      saveTask(taskText, false);
      taskInput.value = ""; // clear input
      updateCounter();
    }

    // Render Task in UI
    function renderTask(text, completed) {
      let li = document.createElement("li");
      if (completed) li.classList.add("completed");

      let span = document.createElement("span");
      span.textContent = text;
      span.style.cursor = "pointer";

      // Toggle complete on click
      span.onclick = function() {
        li.classList.toggle("completed");
        updateLocalStorage();
        updateCounter();
      };

      // Delete button
      let delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.classList.add("delete-btn");
      delBtn.onclick = function() {
        li.remove();
        updateLocalStorage();
        updateCounter();
      };

      li.appendChild(span);
      li.appendChild(delBtn);
      taskList.appendChild(li);
    }

    // Save Task to localStorage
    function saveTask(text, completed) {
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.push({ text, completed });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Update localStorage when tasks change
    function updateLocalStorage() {
      let tasks = [];
      document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
          text: li.querySelector("span").textContent,
          completed: li.classList.contains("completed")
        });
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // 🔹 Clear all tasks
    function clearAll() {
      taskList.innerHTML = "";
      localStorage.removeItem("tasks");
      updateCounter();
    }

    // 🔹 Update Task Counter
    function updateCounter() {
      let total = document.querySelectorAll("#taskList li").length;
      let pending = document.querySelectorAll("#taskList li:not(.completed)").length;
      taskCounter.textContent = `${pending} / ${total} tasks pending`;
    }