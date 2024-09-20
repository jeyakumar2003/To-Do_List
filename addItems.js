var in_box = document.getElementById("in_box");
var add = document.getElementById("add");
var todo_container = document.getElementById("todo_container");

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.todo-item').forEach(item => {
        tasks.push({
            text: item.querySelector('.todo-text').textContent,
            completed: item.querySelector('input[type="checkbox"]').checked
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTask(task.text, task.completed);
    });
}

function addTask(text, completed = false) {
    var creat = document.createElement('div');
    creat.classList.add('todo-item');   

    // Create a span for the text and apply necessary classes for styling
    var todoText = document.createElement('span');
    todoText.classList.add('todo-text');
    todoText.textContent = text;
    creat.appendChild(todoText);

    // Create checkbox for line-through
    var checkboxContainer = document.createElement('div');
    checkboxContainer.classList.add('checkbox-container');
    
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    checkbox.classList.add('me-2'); // Margin end
    checkboxContainer.appendChild(checkbox);
    
    creat.appendChild(checkboxContainer);

    // Create an edit button with FontAwesome icon
    var editBtn = document.createElement('button');
    editBtn.innerHTML = '<i class="fas fa-edit"></i>'; // FontAwesome edit icon
    editBtn.classList.add('btn', 'btn-warning', 'btn-sm');
    creat.appendChild(editBtn);

    // Create a delete button with FontAwesome icon
    var deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>'; // FontAwesome delete icon
    deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm');
    creat.appendChild(deleteBtn);

    // Append the new todo item to the container
    todo_container.appendChild(creat);

    // Toggle line-through on checkbox click
    checkbox.addEventListener('change', function () {
        todoText.style.textDecoration = checkbox.checked ? "line-through" : "none";
        saveTasks();
    });

    // Edit the text of the todo item
    editBtn.addEventListener('click', function () {
        var newText = prompt("Edit your task:", todoText.textContent);
        if (newText !== null && newText.trim() !== "") {
            todoText.textContent = newText.trim();
            saveTasks();
        }
    });

    // Delete the entire task when delete button is clicked
    deleteBtn.addEventListener('click', function () {
        todo_container.removeChild(creat);
        saveTasks();
    });

    // Set the initial text decoration based on the completed status
    todoText.style.textDecoration = completed ? "line-through" : "none";
}

add.addEventListener('click', function () {
    var task = in_box.value.trim(); // Get input value and trim extra spaces

    if (task === '') {
        // If the input is empty, show an alert
        alert("You're typing nothing.");
        return; // Stop further execution
    }

    addTask(task); // Add the new task
    in_box.value = ''; // Clear the input field
    saveTasks(); // Save the tasks to local storage
});

// Load tasks from local storage on page load
loadTasks();