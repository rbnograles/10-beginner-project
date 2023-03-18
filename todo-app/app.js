const newTaskInput = document.getElementById("new-task");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

let tasks = [];

// store the data to tasks array
// clear the input field
// render the task on the browser
addTaskButton.addEventListener("click", () => {
  const newTask = newTaskInput.value.trim();
  tasks.push({
    taskName: newTask,
    completed: false,
  });
  newTaskInput.value = "";
  renderTaskList();
});

const renderTaskList = () => {
  // clear task list
  taskList.innerHTML = "";
  // loop on the tasks array
  for (let i = 0; i < tasks.length; i++) {
    // create a list item for each task
    const listItem = document.createElement("li");
    // assign task to the list item
    listItem.textContent = tasks[i].taskName;
    // add style class if task is completed
    if (tasks[i].completed) {
      listItem.classList.add("completed");
    }

    // create a div to hold the buttons in place
    const buttonWrapper = document.createElement("div");
    buttonWrapper.classList.add("button-wrapper");

    // create a button for each list item
    const removeButton = document.createElement("button");
    removeButton.textContent = "-";
    removeButton.classList.add("remove-button");

    // remove button
    removeButton.addEventListener("click", () => {
      tasks.splice(i, 1);
      renderTaskList();
    });

    // create a button for completing the task
    const completeButton = document.createElement("button");
    completeButton.innerHTML = "&#10004";
    completeButton.classList.add("complete-button");

    // listen for a click event for the complete button
    completeButton.addEventListener("click", () => {
      tasks[i].completed = !tasks[i].completed;
      renderTaskList();
    });

    // append task list
    taskList.appendChild(listItem);
    listItem.append(buttonWrapper);
    buttonWrapper.appendChild(completeButton);
    buttonWrapper.appendChild(removeButton);
  }
};
