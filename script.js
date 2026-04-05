let activities = JSON.parse(localStorage.getItem("activities")) || [
  { name: "Learn HTML", completed: false },
  { name: "Learn CSS", completed: false }
];

function saveData() {
  localStorage.setItem("activities", JSON.stringify(activities));
}

function renderActivities() {
  const list = document.getElementById("activityList");
  list.innerHTML = "";

  activities.forEach((activity, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span class="${activity.completed ? 'completed' : ''}">
        ${activity.name}
      </span>
      <button onclick="toggleComplete(${index})">
        ${activity.completed ? 'Undo' : 'Complete'}
      </button>
    `;

    list.appendChild(li);
  });

  updateProgress();
  saveData();
}

function toggleComplete(index) {
  activities[index].completed = !activities[index].completed;
  renderActivities();
}

function addTask() {
  const input = document.getElementById("newTask");
  const value = input.value.trim();

  if (value === "") {
    alert("Enter a task!");
    return;
  }

  activities.push({ name: value, completed: false });
  input.value = "";
  renderActivities();
}

function updateProgress() {
  const completed = activities.filter(a => a.completed).length;
  const total = activities.length;

  document.getElementById("progressText").innerText =
    `${completed} out of ${total} completed`;

  const percent = (completed / total) * 100;
  document.getElementById("progressFill").style.width = percent + "%";

  if (completed === total && total > 0) {
    document.getElementById("progressText").innerText += " 🎉 All Done!";
  }
}

renderActivities();