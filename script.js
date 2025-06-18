document.addEventListener('DOMContentLoaded', () => {
    // --- Form Validation Code (your existing code) ---
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

    // --- Task Management Code with Local Storage ---
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const clearButton = document.getElementById('clear-tasks-btn');

    // Load tasks from Local Storage when page loads
    loadTasks();

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false = don't save to storage again
    }

    // Function to save current tasks to Local Storage
    function saveTasks() {
        const tasks = [];
        const taskItems = taskList.querySelectorAll('li');
        taskItems.forEach(li => {
            const taskText = li.textContent.replace('Remove', '').trim(); // Remove button text
            tasks.push(taskText);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Modified addTask function with optional save parameter
    function addTask(taskText = null, save = true) {
        // Get task text from input if not provided
        if (taskText === null) {
            taskText = taskInput.value.trim();
        }
        
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create new list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');
        removeButton.onclick = () => {
            taskList.removeChild(li);
            saveTasks(); // Update Local Storage after removal
        };

        // Append remove button to li, then li to taskList
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Save to Local Storage if requested
        if (save) {
            saveTasks();
        }

        // Clear the input field only if we got text from input
        if (taskText === taskInput.value.trim()) {
            taskInput.value = '';
        }
    }

    // Add event listeners
    addButton.addEventListener('click', () => addTask());

    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    clearButton.addEventListener('click', () => {
        taskList.innerHTML = '';
        saveTasks(); // Update Local Storage after clearing
    });
});
