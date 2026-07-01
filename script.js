let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

const taskInput = document.getElementById("taskInput");
const dueDate = document.getElementById("dueDate");
const priority = document.getElementById("priority");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateCounter() {
    document.getElementById("total").innerText = tasks.length;
    document.getElementById("completed").innerText =
        tasks.filter(task => task.completed).length;
    document.getElementById("pending").innerText =
        tasks.filter(task => !task.completed).length;
}

function renderTasks() {
    taskList.innerHTML = "";

    let keyword = searchInput.value.toLowerCase();

    let filtered = tasks.filter(task => {
        let matchSearch = task.name.toLowerCase().includes(keyword);

        if (filter === "active")
            return !task.completed && matchSearch;

        if (filter === "completed")
            return task.completed && matchSearch;

        return matchSearch;
    });

    filtered.forEach((task, index) => {

        let li = document.createElement("li");
        li.className = "task";

        if(task.completed)
            li.classList.add("completed");

        li.innerHTML = `
            <h3>${task.name}</h3>

            <p><strong>Due:</strong> ${task.date}</p>

            <p><strong>Priority:</strong> ${task.priority}</p>

            <div class="actions">

                <button class="completeBtn"
                onclick="toggleComplete(${index})">
                ${task.completed ? "Undo" : "Complete"}
                </button>

                <button class="editBtn"
                onclick="editTask(${index})">
                Edit
                </button>

                <button class="deleteBtn"
                onclick="deleteTask(${index})">
                Delete
                </button>

            </div>
        `;

        taskList.appendChild(li);

    });

    updateCounter();
}

function addTask(){

    if(taskInput.value.trim()==""){
        alert("Enter a task");
        return;
    }

    tasks.push({
        name:taskInput.value,
        date:dueDate.value,
        priority:priority.value,
        completed:false
    });

    taskInput.value="";
    dueDate.value="";

    saveTasks();
    renderTasks();

}

function deleteTask(index){

    if(confirm("Delete this task?")){

        tasks.splice(index,1);

        saveTasks();

        renderTasks();

    }

}

function editTask(index){

    let newTask=prompt("Edit Task",tasks[index].name);

    if(newTask!=null && newTask!=""){

        tasks[index].name=newTask;

        saveTasks();

        renderTasks();

    }

}

function toggleComplete(index){

    tasks[index].completed=!tasks[index].completed;

    saveTasks();

    renderTasks();

}

function searchTask(){

    renderTasks();

}

function filterTasks(type){

    filter=type;

    renderTasks();

}

document.getElementById("themeBtn").onclick=function(){

    document.body.classList.toggle("dark");

}

renderTasks();