
window.addEventListener('load', initialization);

function initialization(){

    const addButton = document.getElementById("add");
    addButton.addEventListener( "click" , newItem); 
    
    const input = document.getElementById("taskInput");
    input.addEventListener("keypress", function(event) {
    
        let key = event.keyCode;
    
        if (key === 13) {
            newItem();
        }
    });
    
    const ul = document.getElementById('list');
    
    ul.addEventListener("click", function(event){
        let target = event.target;
    
        if (target.type == 'checkbox') {
            toggleDone(target);
            return;
        }
    
        if (target.tagName === 'I') {
            
            deleteItem(target);                    //DELETE f-ja za niz/local storage
            return;
        }
    }); 
}

function toggleDone(task){                              
        task.classList.toggle("checked");
        task.nextSibling.classList.toggle("crossed");
        updateList(task);
    }

function updateList(task){                                           
    
    let id = getId(task);

    let arrayItem = array.find(item => item.id == id);
    arrayItem.done = !arrayItem.done ? true : false;

    //console.table(array);                                             // ++++ UPDATE LOCALSTORAGE
}

function getTask(){                                                   //REQUIRED PRE ADD
    const task = document.getElementById("taskInput").value;
    return task;

}

function Item (id, task, done){
    this.id = id;
    this.task = task;
    this.done = done;
} 

var array = [];

function newItem () {

    let id = 0;

if (array.length != 0){
    id = array[array.length-1].id + 1;
};

    const task = getTask();

    if(task == ""){                                  //REQUIRED PRE ADD
        alert("Please enter a task");
        return;
    } 

    let item = new Item(id, task, false);

    addToList(item);  
    saveToStorage(item); // treba f-ja za prevodjenje u JSON koja se poziva u f-ji saveToStorage
    const input = document.getElementById("taskInput");
    input.value= "";
}

function newRow(item){
    

    let li = document.createElement("li");

    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");

    let idnumber = "" + item.id;
    if (!item.done){
        checkbox.classList.add("checkbox");
        checkbox.setAttribute("id", idnumber);
    } else {
        checkbox.classList.add ("checkbox", "checked");
    };

    let label = document.createElement("label");
    label.setAttribute("class", "task");
    label.setAttribute("for", idnumber)
    let task = item.task;
    label.innerHTML = task;

    let delButton = document.createElement("i");
    delButton.innerHTML = "delete";
    delButton.classList.add("material-icons", "icon-style");

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(delButton);
    
    return li;
    
}

function addToList(item){
    const ul = document.getElementById("list");
    let li = newRow(item);
    ul.appendChild(li);
    li.scrollIntoView();
    array.push(item);


}

//CHECK:

function deleteItem (target){
    
    let id = getId(target);
    deleteFromArray(id);
    target.parentNode.remove();
}

function deleteFromArray (id){

    for (var i = 0; i <= array.length-1; i++) {
        if (array[i].id == id) {
            array.splice(i,1);
        }
    }
}

function getId(target){
    let li = target.parentNode;
    let checkbox = li.firstChild;
    let id = checkbox.id;

    return id;
}

function saveToStorage(item) {

    

    
    // var key = "" + item.id;
    // var storageItem = JSON.stringify(item);
    // localStorage.setItem(key, storageItem);

    // for (var key in localStorage) {
    //     console.log(key + ':' + localStorage[key]);
    //   }



    //localStorage.clear();
}

