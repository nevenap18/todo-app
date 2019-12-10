const addButton = document.getElementById('add');
const input = document.getElementById('taskInput');
const ul = document.getElementById('list'); // koristiti vec napravbljen selekor

let array = JSON.parse(localStorage.getItem('todo'));

if (array == undefined) {
    array = [];
}

array.forEach(item => {
    addToList(item);
});

function toggleDone(task) {
    task.classList.toggle('checked');
    task.nextSibling.classList.toggle('crossed');
    updateList(task);
}

function updateList(task) {
    let arrayItem = array.find(item => item.id == task.id);
    arrayItem.done = !arrayItem.done ? true : false;
    localStorage.setItem('todo', JSON.stringify(array));
}

function deleteItem(target) {
    let id = target.dataset.id;
    saveDelete(id);
    target.parentNode.remove();
}

function saveDelete(id) {
    for (let i = 0; i <= array.length - 1; i++) {
        if (array[i].id == id) {
            array.splice(i, 1);
        }
    }
    localStorage.setItem('todo', JSON.stringify(array));
}

function Item(id, task, done) {
    this.id = id;
    this.task = task;
    this.done = done;
}

function newItem() {
    const task = document.getElementById('taskInput').value;
    let id = 0;
    
    if (array.length != 0) {
        id = array[array.length - 1].id + 1;
    };

    if (task === '') {
        alert("Please enter a task");
        return;
    }

    const item = new Item(id, task, false);

    array.push(item);
    addToList(item);
    saveToStorage();
    input.value = '';
}

function newRow(item) {
    const idnumber = item.id;

    let li = document.createElement('li');

    let checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.classList.add('checkbox');
    checkbox.setAttribute('id', idnumber);

    let label = document.createElement('label');
    label.classList.add('task');
    label.setAttribute('for', idnumber)

    let task = item.task;
    label.innerHTML = task;

    if (item.done) {
        checkbox.classList.add('checked');
        label.classList.add('crossed')
    };

    let delButton = document.createElement('i');
    delButton.innerHTML = 'delete';
    delButton.classList.add('material-icons', 'delete-button');
    delButton.setAttribute('data-id', idnumber);

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(delButton);

    return li;
}

function addToList(item) {
    let li = newRow(item);
    ul.appendChild(li);
    li.scrollIntoView();
}

function saveToStorage() {
    let key = 'todo';
    let storageItem = JSON.stringify(array);
    localStorage.setItem(key, storageItem);
}

addButton.addEventListener('click', newItem);

input.addEventListener('keypress', function (event) {
    let key = event.keyCode;
    
    if (key === 13) {
        newItem();
    }
});
   
ul.addEventListener('click', function (event) { // Smisliti bolje resenje
    let target = event.target;

    if (target.classList.contains('checkbox')) {
        toggleDone(target);
        return;
    }

    if (target.classList.contains('delete-button')) {
        deleteItem(target);
        return;
    }
});