let taskToDo = [];

let current = true;

function loading() {
  if (current) {
    document.getElementById("hideIndividualPage").style.display = "none";
    document.getElementById("pages").style.display = "block";
  } else {
    document.getElementById("pages").style.display = "none";
    document.getElementById("hideIndividualPage").style.display = "block";
  }
  if (taskToDo.length === 0) {
    document.getElementById("noTodo").style.display = "block";
  } else {
    document.getElementById("noTodo").style.display = "none";
  }
}

let currentChange;

loading();

function startTodo(todo) {
  loading();
  const list = document.querySelector(".cardsToAdd");
  var child = list.lastElementChild;
  while (child) {
    list.removeChild(child);
    child = list.lastElementChild;
  }

  for (let i = 0; i < taskToDo.length; i++) {
    const task = document.createElement("div");
    task.setAttribute("class", "card");
    task.setAttribute("key", taskToDo[i].id);
    task.innerHTML = 
    `<p class="cardHeading" onclick="redirect(this)">${taskToDo[i].heading}</p>
      <ul type="none">
      </ul>
      <div class='footer'>
          <button class='btn-completed' onclick="removeCard(this)"><i class="fa fa-trash" ></i></button> 
          <p class = 'btn-add' onclick="addingItems(this)"><i class="fa fa-plus-circle"></i></p>
      </div>
      `;
    console.log(task.childNodes);
    list.append(task);
    let currentTodo = taskToDo[i];
    // console.log(currentTodo.subTask);
    for (let j = 0; j < currentTodo.subTask.length; j++) {
      let puttingClass = currentTodo.subTask[j].marked
        ? "cardItem marked"
        : "cardItem";
      let rest = currentTodo.subTask[j].marked
        ? ""
        : '<button class = "markDone" onclick="markComplete(this)">Completed</button>';
      const liNode = document.createElement("li");
      liNode.setAttribute("class", puttingClass);
      liNode.setAttribute("key", currentTodo.subTask[j].id);
      liNode.innerHTML = ` ${currentTodo.subTask[j].name} ${rest}`;
      task.childNodes[2].append(liNode);
    }
  }
}



function removeCard(element) {
  let tempElement = element.parentNode.parentNode;
  // console.log(tempElement);

  for (let i = 0; i < taskToDo.length; i++) {
    if (taskToDo[i].id == tempElement.getAttribute("key")) {
      taskToDo.splice(i, 1);
    }
  }
  if (!current) {
    goBack();
  } else {
    tempElement.parentNode.removeChild(tempElement);
    loading();
  }
}

function addTodo() {
  let heading = document.getElementById("listHeading").value;
  if (heading == ""){
    alert("Please enter the task");
  }
  document.getElementById("listHeading").value = "";
  if (heading !== "") {
    const todo = {
      heading,
      completed: false,
      subTask: [],
      id: Date.now(),
    };
    taskToDo.push(todo);
    toggle();
    goBack();
  }
}

function addSubTodo() {
  let taskHeading = document.getElementById("subListHeading").value;
  if (taskHeading == ""){
    alert("Please enter the sub task");
  }
  document.getElementById("subListHeading").value = "";
  if (taskHeading !== "") {
    let list;
    if (current) {
      list = currentChange.parentNode.parentNode.childNodes[2];
    } else {
      list = currentChange.parentNode.parentNode.childNodes[3];
    }
    // console.log(currentChange.parentNode, currentChange.parentNode.parentNode);
    let id = currentChange.parentNode.parentNode.getAttribute("key");
    // console.log(currentChange.parentNode.parentNode);

    const task = document.createElement("li");
    task.setAttribute("class", current ? `cardItem` : `cardItem2`);
    task.setAttribute("key", Date.now());
    task.innerHTML = ` ${taskHeading}<button class = 'markDone' onclick="markComplete(this)">Completed</button>`;

    for (let i = 0; i < taskToDo.length; i++) {
      if (taskToDo[i].id == id) {
        taskToDo[i].subTask.push({
          name: taskHeading,
          marked: false,
          id: task.getAttribute("key"),
        });
      }
    }

    list.append(task);
    addingItems();
  }
}


function markComplete(element) {
  let puttingClass = current
    ? "cardItem marked"
    : "cardItem2 marked";
  element.parentNode.setAttribute("class", puttingClass);
  let id = element.parentNode.parentNode.parentNode.getAttribute("key");
  let subTaskId = element.parentNode.getAttribute("key");

  for (let i = 0; i < taskToDo.length; i++) {
    if (taskToDo[i].id == id) {
      for (let j = 0; j < taskToDo[i].subTask.length; j++) {
        if (taskToDo[i].subTask[j].id == subTaskId) {
          taskToDo[i].subTask[j].marked = true;
        }
      }
    }
  }
  element.parentNode.removeChild(element);
}

function goBack() {
  current = true;
  startTodo();
}

function toggle() {
  var translucent;
  if (current) {
    translucent = document.getElementById("pages");
  } else {
    translucent = document.getElementById("hideIndividualPage");
  }
  translucent.classList.toggle("active");
  var popup = document.getElementById("popList");
  popup.classList.toggle("active");
}

function addingItems(item) {
  currentChange = item;
  var translucent;
  if (current) {
    translucent = document.getElementById("pages");
  } else {
    translucent = document.getElementById("hideIndividualPage");
  }
  translucent.classList.toggle("active");
  var popup = document.getElementById("popItem");
  popup.classList.toggle("active");
}

function redirect(element) {
  let id = element.parentNode.getAttribute("key");
  let currentTodo;
  for (let i = 0; i < taskToDo.length; i++) {
    if (taskToDo[i].id == id) {
      currentTodo = taskToDo[i];
    }
  }
  current = false;
  loading();
  document.getElementById("individualPage").textContent = currentTodo.heading;
  document.getElementById("individualPageHeading").textContent = currentTodo.heading;
  document.getElementById("individualPageHeading").parentNode.setAttribute("key", currentTodo.id);

  console.log(currentTodo);
  let e = document.getElementById("singleList");
  var child = e.lastElementChild;
  while (child) {
    e.removeChild(child);
    child = e.lastElementChild;
  }
  for (let i = 0; i < currentTodo.subTask.length; i++) {
    let puttingClass = currentTodo.subTask[i].marked
      ? "cardItem2 marked"
      : "cardItem2";
    let rest = currentTodo.subTask[i].marked
      ? ""
      : '<button class = "markDone" onclick="markComplete(this)">Completed</button>';
    const task = document.createElement("li");
    task.setAttribute("class", puttingClass);
    task.setAttribute("key", currentTodo.subTask[i].id);
    task.innerHTML = ` ${currentTodo.subTask[i].name} ${rest}`;
    e.append(task);
  }
}

