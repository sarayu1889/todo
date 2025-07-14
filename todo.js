const form = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const card = document.createElement("div");
    card.className = "card mb-3 task-card";

    card.innerHTML = `
      <div class="card-body d-flex justify-content-between align-items-center">
        <div>
          <h5 class="card-title mb-1">${task.title}</h5>
          <small class="text-muted">Category: ${task.category}</small>
        </div>
        <div>
          <span class="me-3 timer" id="timer-${index}">${task.timer} min</span>
          <button class="btn btn-success btn-sm me-2" onclick="startTimer(${index})">Start</button>
          <button class="btn btn-danger btn-sm" onclick="deleteTask(${index})">Delete</button>
        </div>
      </div>
    `;
    taskList.appendChild(card);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function startTimer(index) {
  const display = document.getElementById(`timer-${index}`);
  let duration = tasks[index].timer * 60;

  const interval = setInterval(() => {
    let minutes = Math.floor(duration / 60);
    let seconds = duration % 60;
    display.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    if (--duration < 0) {
      clearInterval(interval);
      alert(`⏰ Time's up for "${tasks[index].title}"!`);
      display.textContent = `${tasks[index].timer} min`;
    }
  }, 1000);
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("taskTitle").value;
  const category = document.getElementById("taskCategory").value;
  const timer = parseInt(document.getElementById("taskTimer").value);

  tasks.push({ title, category, timer });
  form.reset();
  renderTasks();
});

renderTasks();
