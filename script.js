document.addEventListener('DOMContentLoaded', () => {
    // --- Form Validation Code ---
    const form = document.getElementById('registration-form');
    const feedbackDiv = document.getElementById('form-feedback');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        let isValid = true;
        const messages = [];

        if (username.length < 3) {
            isValid = false;
            messages.push('Username must be at least 3 characters long.');
        }

        if (!email.includes('@') || !email.includes('.')) {
            isValid = false;
            messages.push('Please enter a valid email address.');
        }

        if (password.length < 8) {
            isValid = false;
            messages.push('Password must be at least 8 characters long.');
        }

        feedbackDiv.style.display = 'block';
        if (isValid) {
            feedbackDiv.textContent = 'Registration successful!';
            feedbackDiv.style.color = '#28a745';
        } else {
            feedbackDiv.innerHTML = messages.join('<br>');
            feedbackDiv.style.color = '#dc3545';
        }
    });

    // --- Task Management Code ---
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn'); // Select Add Task button
    const taskInput = document.getElementById('task-input'); // Select task input field
    const taskList = document.getElementById('task-list'); // Select task list
    const clearButton = document.getElementById('clear-tasks-btn'); // Select Clear All Tasks button

    // Define addTask function
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        const li = document.createElement('li');
        li.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';
        removeButton.onclick = () => {
            taskList.removeChild(li);
        };

        li.appendChild(removeButton);
        taskList.appendChild(li);
        taskInput.value = '';
    }

    // Add event listeners
    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
    clearButton.addEventListener('click', () => {
        taskList.innerHTML = '';
    });
});
