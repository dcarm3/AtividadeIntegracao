const baseUrl = 'http://localhost:3000/tasks';

document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    document.querySelector('#taskForm').addEventListener('submit', addTask);
});

function addTask(event) {
    event.preventDefault();
    const form = event.target;
    const taskTitle = form.title.value.trim();
    const taskDescription = form.description.value.trim();

    if (!taskTitle || !taskDescription) {
        alert("Título e descrição são obrigatórios e não podem ser apenas espaços em branco.");
        return;
    }

    const newTask = { title: taskTitle, description: taskDescription };
    saveTask(newTask);
    form.reset();
}

function saveTask(task) {
    fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    })
        .then(response => response.json())
        .then(() => loadTasks())
        .catch(error => console.error('Error:', error));
}

function loadTasks() {
    fetch(baseUrl)
        .then(response => response.json())
        .then(tasks => {
            const taskList = document.querySelector('#taskList');
            taskList.innerHTML = '';
            tasks.forEach(task => appendTaskToList(task));
        })
        .catch(error => console.error('Error:', error));
}

function appendTaskToList(task) {
    const taskList = document.querySelector('#taskList');
    const li = document.createElement('li');
    li.id = task.id;
    li.innerHTML = `
        <h2>${task.title}</h2>
        <p>${task.description}</p>
        <button class="edit-button" title="Editar tarefa">✏️</button>
        <button class="delete-button" title="Excluir tarefa">❌</button>
    `;
    taskList.appendChild(li);
    li.querySelector('.edit-button').addEventListener('click', openEditDialog);
    li.querySelector('.delete-button').addEventListener('click', () => deleteTask(task.id));
}

function openEditDialog(event) {
    const button = event.target.closest('.edit-button');
    if (!button) return;

    const li = button.closest('li');
    const taskId = li.id;
    const taskTitle = li.querySelector('h2').textContent;
    const taskDescription = li.querySelector('p').textContent;
    const dialog = document.querySelector('#editDialog');

    dialog.querySelector('#editTitle').value = taskTitle;
    dialog.querySelector('#editDescription').value = taskDescription;
    dialog.showModal();

    const form = dialog.querySelector('form');
    form.onsubmit = function (event) {
        event.preventDefault();
        editTask(taskId, form.editTitle.value.trim(), form.editDescription.value.trim());
        dialog.close();
    };

    document.querySelector('#cancelButton').onclick = () => {
        dialog.close();
    };
}

function editTask(taskId, newTitle, newDescription) {
    const updatedTask = { title: newTitle, description: newDescription };
    fetch(`${baseUrl}/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
    })
        .then(response => response.json())
        .then(() => loadTasks())
        .catch(error => console.error('Error:', error));
}

function deleteTask(taskId) {
    fetch(`${baseUrl}/${taskId}`, {
        method: 'DELETE',
    })
        .then(() => loadTasks())
        .catch(error => console.error('Error:', error));
}

