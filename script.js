// Global variables to store application state
let tasks = []; // Array to store all tasks
let taskIdCounter = 1; // Counter for unique task IDs
let currentTheme = 'light'; // Theme state
let userName = ''; // User's name
let userAge = 0; // User's age

/**
 * Process user information with conditionals and data validation
 * Demonstrates: variables, conditionals, string operations, DOM updates
 */
function processUserInfo() {
    // Get user input values
    const nameInput = document.getElementById('userName');
    const ageInput = document.getElementById('userAge');
    const output = document.getElementById('userOutput');
    
    // Store values in variables
    userName = nameInput.value.trim();
    userAge = parseInt(ageInput.value);
    
    let message = '';
    
    // Conditional logic for input validation
    if (userName === '' || userName.length < 2) {
        message = 'Error: Please enter a valid name (at least 2 characters)';
    } else if (isNaN(userAge) || userAge < 1 || userAge > 120) {
        message = 'Error: Please enter a valid age (1-120)';
    } else {
        // Determine user category based on age (conditional logic)
        let ageCategory;
        let taskSuggestion;
        
        if (userAge < 13) {
            ageCategory = 'Young Explorer';
            taskSuggestion = 'homework, chores, and fun activities';
        } else if (userAge < 18) {
            ageCategory = 'Teen Achiever';
            taskSuggestion = 'school projects, part-time jobs, and hobbies';
        } else if (userAge < 65) {
            ageCategory = 'Adult Professional';
            taskSuggestion = 'work tasks, family responsibilities, and personal goals';
        } else {
            ageCategory = 'Wise Senior';
            taskSuggestion = 'leisure activities, family time, and health goals';
        }
        
        // Build success message using string concatenation and template literals
        message = `Welcome, ${userName}!\n`;
        message += `Profile Summary:\n`;
        message += `Name: ${userName}\n`;
        message += `Age: ${userAge} years old\n`;
        message += `Category: ${ageCategory}\n`;
        message += `Suggested task types: ${taskSuggestion}\n\n`;
        message += `You're ready to start managing your tasks!`;
    }
    
    // Display result and show output section
    output.textContent = message;
    output.classList.remove('hidden');
    
    console.log('User Info Processed:', { name: userName, age: userAge });
}

// PART 2: FUNCTIONS - THE HEART OF REUSABILITY
// Custom functions for task management

/**
 * Function 1: Add a new task to the list
 * Demonstrates: function parameters, object creation, array manipulation
 * @param {string} customText - Optional custom task text
 * @param {string} customPriority - Optional custom priority
 */
function addTask(customText = null, customPriority = null) {
    // Get input values or use custom parameters
    const taskInput = document.getElementById('taskInput');
    const prioritySelect = document.getElementById('taskPriority');
    
    const taskText = customText || taskInput.value.trim();
    const priority = customPriority || prioritySelect.value;
    
    // Validate input
    if (taskText === '') {
        alert('Please enter a task description!');
        return false;
    }
    
    // Create task object with properties
    const newTask = {
        id: taskIdCounter++,
        text: taskText,
        priority: priority,
        completed: false,
        createdAt: new Date().toLocaleString()
    };
    
    // Add to tasks array
    tasks.push(newTask);
    
    // Clear input field
    if (!customText) {
        taskInput.value = '';
    }
    
    // Update display and statistics
    renderTasks();
    updateStatistics();
    
    console.log('Task added:', newTask);
    return true;
}

/**
 * Function 2: Calculate and format task statistics
 * Demonstrates: array methods, mathematical operations, return values
 * @returns {object} Statistics object with task counts
 */
function calculateTaskStats() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;
    
    // Calculate completion percentage
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    // Count tasks by priority
    const priorityCounts = {
        high: tasks.filter(task => task.priority === 'high').length,
        medium: tasks.filter(task => task.priority === 'medium').length,
        low: tasks.filter(task => task.priority === 'low').length
    };
    
    return {
        total,
        completed,
        pending,
        completionRate,
        priorityCounts
    };
}

/**
 * Function 3: Toggle task completion status
 * Demonstrates: array search, object modification, conditional updates
 * @param {number} taskId - ID of the task to toggle
 */
function toggleTask(taskId) {
    // Find task by ID using array method
    const task = tasks.find(t => t.id === taskId);
    
    if (task) {
        // Toggle completion status
        task.completed = !task.completed;
        
        // Update display
        renderTasks();
        updateStatistics();
        
        // Log action
        console.log(`Task ${taskId} marked as ${task.completed ? 'completed' : 'pending'}`);
    }
}

/**
 * Function 4: Remove a task from the list
 * Demonstrates: array filtering, conditional logic
 * @param {number} taskId - ID of the task to remove
 */
function removeTask(taskId) {
    // Confirm deletion
    const task = tasks.find(t => t.id === taskId);
    if (task && confirm(`Are you sure you want to delete "${task.text}"?`)) {
        // Remove task using filter method
        tasks = tasks.filter(t => t.id !== taskId);
        
        // Update display
        renderTasks();
        updateStatistics();
        
        console.log(`Task ${taskId} removed`);
    }
}

/**
 * Function 5: Clear completed tasks
 * Demonstrates: array filtering, bulk operations
 */
function clearCompleted() {
    const completedCount = tasks.filter(task => task.completed).length;
    
    if (completedCount === 0) {
        alert('No completed tasks to clear!');
        return;
    }
    
    if (confirm(`Remove ${completedCount} completed task(s)?`)) {
        tasks = tasks.filter(task => !task.completed);
        renderTasks();
        updateStatistics();
        console.log(`${completedCount} completed tasks cleared`);
    }
}

/**
 * Function 6: Clear all tasks
 * Demonstrates: array reset, confirmation dialogs
 */
function clearAllTasks() {
    if (tasks.length === 0) {
        alert('No tasks to clear!');
        return;
    }
    
    if (confirm('Are you sure you want to remove all tasks? This cannot be undone!')) {
        tasks = [];
        renderTasks();
        updateStatistics();
        console.log('All tasks cleared');
    }
}

// PART 3: LOOPS - EMBRACE THE POWER OF REPETITION
// For, while, forEach loops for various tasks

/**
 * Loop Example 1: Generate countdown using for loop
 * Demonstrates: for loop, string building, setTimeout for animation
 */
function generateCountdown() {
    const output = document.getElementById('loopOutput');
    output.classList.remove('hidden');
    
    let countdownText = 'PRODUCTIVITY COUNTDOWN:\n\n';
    
    // For loop to generate countdown
    for (let i = 10; i >= 1; i--) {
        countdownText += `${i}... `;
        if (i % 5 === 0) countdownText += '\n'; // Line break every 5 numbers
    }
    
    countdownText += '\nBLAST OFF! Time to be productive!\n\n';
    
    // While loop demonstration - double countdown
    countdownText += 'BONUS COUNTDOWN (while loop):\n';
    let bonus = 5;
    while (bonus > 0) {
        countdownText += `${bonus === 1 ? 'GO!' : bonus} `;
        bonus--;
    }
    
    output.textContent = countdownText;
    console.log('Countdown generated using for and while loops');
}

/**
 * Loop Example 2: Generate task summary using forEach
 * Demonstrates: forEach loop, object iteration, string formatting
 */
function showTaskSummary() {
    const output = document.getElementById('loopOutput');
    output.classList.remove('hidden');
    
    if (tasks.length === 0) {
        output.textContent = 'No tasks to summarize. Add some tasks first!';
        return;
    }
    
    let summary = 'TASK SUMMARY REPORT\n';
    summary += '═'.repeat(40) + '\n\n';
    
    // forEach loop to iterate through tasks
    tasks.forEach((task, index) => {
        const status = task.completed ? 'COMPLETED' : 'PENDING';
        const priority = task.priority.toUpperCase();
        summary += `${index + 1}. [${status}] [${priority}] ${task.text}\n`;
        summary += `   Created: ${task.createdAt}\n\n`;
    });
    
    // Additional statistics using for...in loop
    const stats = calculateTaskStats();
    summary += 'STATISTICS:\n';
    summary += '─'.repeat(20) + '\n';
    
    // For...in loop to iterate through statistics object
    for (const key in stats.priorityCounts) {
        summary += `${key.charAt(0).toUpperCase() + key.slice(1)} Priority: ${stats.priorityCounts[key]}\n`;
    }
    
    summary += `\nCompletion Rate: ${stats.completionRate}%`;
    
    output.textContent = summary;
    console.log('Task summary generated using forEach and for...in loops');
}

/**
 * Loop Example 3: Generate daily motivational quotes
 * Demonstrates: array iteration, random selection, for loop with conditions
 */
function generateMotivation() {
    const motivationalQuotes = [
        "The way to get started is to quit talking and begin doing. - Walt Disney",
        "Don't be afraid to give up the good to go for the great. - John D. Rockefeller",
        "Innovation distinguishes between a leader and a follower. - Steve Jobs",
        "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
        "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
        "The only impossible journey is the one you never begin. - Tony Robbins"
    ];
    
    const output = document.getElementById('loopOutput');
    output.classList.remove('hidden');
    
    let motivationText = 'DAILY MOTIVATION GENERATOR\n';
    motivationText += '═'.repeat(50) + '\n\n';
    
    // For loop to generate multiple quotes
    for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
        motivationText += `${i + 1}. ${motivationalQuotes[randomIndex]}\n\n`;
    }
    
    // Generate task-specific motivation based on pending tasks
    const pendingTasks = tasks.filter(task => !task.completed);
    if (pendingTasks.length > 0) {
        motivationText += 'YOUR PENDING TASKS:\n';
        motivationText += '─'.repeat(25) + '\n';
        
        // Loop through pending tasks (max 5)
        for (let i = 0; i < Math.min(pendingTasks.length, 5); i++) {
            motivationText += `• ${pendingTasks[i].text}\n`;
        }
        
        motivationText += '\nYou got this! One task at a time!';
    }
    
    output.textContent = motivationText;
    console.log('Motivation generated using multiple loop types');
}

// PART 4: DOM MANIPULATION WITH JAVASCRIPT
// Element selection, event handling, dynamic content

/**
 * DOM Interaction 1: Render all tasks in the DOM
 * Demonstrates: createElement, appendChild, event listeners, dynamic styling
 */
function renderTasks() {
    const taskList = document.getElementById('taskList');
    
    // Clear existing content
    taskList.innerHTML = '';
    
    if (tasks.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'No tasks yet. Add your first task above!';
        emptyMessage.style.textAlign = 'center';
        emptyMessage.style.color = '#666';
        emptyMessage.style.fontStyle = 'italic';
        emptyMessage.style.padding = '20px';
        taskList.appendChild(emptyMessage);
        return;
    }
    
    // Create DOM elements for each task
    tasks.forEach(task => {
        // Create task container
        const taskDiv = document.createElement('div');
        taskDiv.className = `task-item ${task.completed ? 'completed' : ''}`;
        taskDiv.classList.add('fade-in');
        
        // Create task text element
        const taskText = document.createElement('div');
        taskText.className = 'task-text';
        taskText.textContent = task.text;
        
        // Create priority badge
        const priorityBadge = document.createElement('span');
        priorityBadge.className = `task-priority priority-${task.priority}`;
        priorityBadge.textContent = task.priority.toUpperCase();
        
        // Create button container
        const buttonContainer = document.createElement('div');
        
        // Create toggle button
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'btn btn-secondary';
        toggleBtn.textContent = task.completed ? 'Undo' : 'Complete';
        toggleBtn.style.fontSize = '0.8rem';
        toggleBtn.style.padding = '5px 10px';
        toggleBtn.onclick = () => toggleTask(task.id);
        
        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger';
        deleteBtn.textContent = 'Delete';
        deleteBtn.style.fontSize = '0.8rem';
        deleteBtn.style.padding = '5px 10px';
        deleteBtn.onclick = () => removeTask(task.id);
        
        // Assemble elements
        buttonContainer.appendChild(toggleBtn);
        buttonContainer.appendChild(deleteBtn);
        taskDiv.appendChild(taskText);
        taskDiv.appendChild(priorityBadge);
        taskDiv.appendChild(buttonContainer);
        taskList.appendChild(taskDiv);
    });
    
    console.log('Tasks rendered to DOM');
}

/**
 * DOM Interaction 2: Update statistics display
 * Demonstrates: getElementById, textContent modification, real-time updates
 */
function updateStatistics() {
    const stats = calculateTaskStats();
    
    // Update stat cards
    document.getElementById('totalTasks').textContent = stats.total;
    document.getElementById('completedTasks').textContent = stats.completed;
    document.getElementById('pendingTasks').textContent = stats.pending;
    
    // Color-code the completion rate
    const completedElement = document.getElementById('completedTasks');
    if (stats.completionRate >= 80) {
        completedElement.style.color = '#4CAF50'; // Green
    } else if (stats.completionRate >= 50) {
        completedElement.style.color = '#FF9800'; // Orange
    } else {
        completedElement.style.color = '#f44336'; // Red
    }
    
    console.log('Statistics updated:', stats);
}

/**
 * DOM Interaction 3: Toggle application theme
 * Demonstrates: classList manipulation, CSS custom properties, style changes
 */
function toggleTheme() {
    const body = document.body;
    const container = document.querySelector('.container');
    
    if (currentTheme === 'light') {
        // Switch to dark theme
        body.style.background = 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)';
        container.style.background = '#2c3e50';
        container.style.color = '#ecf0f1';
        
        // Update all sections
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            section.style.background = '#34495e';
            section.style.color = '#ecf0f1';
            section.style.borderLeft = '4px solid #3498db';
        });
        
        // Update task items
        const taskItems = document.querySelectorAll('.task-item');
        taskItems.forEach(item => {
            item.style.background = '#34495e';
            item.style.color = '#ecf0f1';
            item.style.border = '1px solid #495057';
        });
        
        currentTheme = 'dark';
        console.log('Switched to dark theme');
    } else {
        // Switch to light theme
        body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        container.style.background = 'white';
        container.style.color = 'inherit';
        
        // Reset sections
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            section.style.background = '#f9f9f9';
            section.style.color = 'inherit';
            section.style.borderLeft = '4px solid #4CAF50';
        });
        
        // Reset task items
        const taskItems = document.querySelectorAll('.task-item');
        taskItems.forEach(item => {
            item.style.background = 'white';
            item.style.color = 'inherit';
            item.style.border = '1px solid #e0e0e0';
        });
        
        currentTheme = 'light';
        console.log('Switched to light theme');
    }
}

/**
 * DOM Interaction 4: Animate header with dynamic effects
 * Demonstrates: style manipulation, setTimeout, CSS transitions
 */
function animateHeader() {
    const header = document.querySelector('.header');
    const title = document.querySelector('.header h1');
    
    // Add animation class
    header.style.transform = 'scale(1.05)';
    header.style.transition = 'transform 0.3s ease';
    title.style.transform = 'rotate(5deg)';
    title.style.transition = 'transform 0.3s ease';
    
    // Reset after animation
    setTimeout(() => {
        header.style.transform = 'scale(1)';
        title.style.transform = 'rotate(0deg)';
    }, 300);
    
    console.log('Header animation triggered');
}

/**
 * DOM Interaction 5: Create floating success messages
 * Demonstrates: createElement, positioning, animations, setTimeout
 */
function createFloatingMessage() {
    const messages = [
        'Great job staying organized!',
        'You\'re crushing your goals!',
        'Productivity level: Expert!',
        'Keep up the amazing work!',
        'Task master in action!'
    ];
    
    const message = messages[Math.floor(Math.random() * messages.length)];
    
    // Create floating message element
    const floatingDiv = document.createElement('div');
    floatingDiv.textContent = message;
    floatingDiv.style.position = 'fixed';
    floatingDiv.style.top = '50%';
    floatingDiv.style.left = '50%';
    floatingDiv.style.transform = 'translate(-50%, -50%)';
    floatingDiv.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
    floatingDiv.style.color = 'white';
    floatingDiv.style.padding = '20px 30px';
    floatingDiv.style.borderRadius = '25px';
    floatingDiv.style.fontSize = '1.2rem';
    floatingDiv.style.fontWeight = 'bold';
    floatingDiv.style.boxShadow = '0 10px 30px rgba(76, 175, 80, 0.4)';
    floatingDiv.style.zIndex = '9999';
    floatingDiv.style.animation = 'bounceIn 0.5s ease';
    
    // Add to page
    document.body.appendChild(floatingDiv);
    
    // Remove after 3 seconds with fade out
    setTimeout(() => {
        floatingDiv.style.opacity = '0';
        floatingDiv.style.transform = 'translate(-50%, -50%) scale(0.8)';
        floatingDiv.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            if (floatingDiv.parentNode) {
                floatingDiv.parentNode.removeChild(floatingDiv);
            }
        }, 500);
    }, 3000);
    
    console.log('Floating message created:', message);
}

// INITIALIZATION AND KEYBOARD SUPPORT

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize statistics display
    updateStatistics();
    
    // Add keyboard support for adding tasks
    const taskInput = document.getElementById('taskInput');
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    // Add sample tasks for demonstration
    setTimeout(() => {
        addTask('Learn JavaScript fundamentals', 'high');
        addTask('Complete coding assignment', 'medium');
        addTask('Practice DOM manipulation', 'low');
        console.log('Sample tasks added for demonstration');
    }, 1000);
    
    console.log('Personal Task Manager initialized successfully!');
    console.log('Ready to demonstrate JavaScript fundamentals!');
});