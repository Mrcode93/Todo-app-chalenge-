let filters = document.querySelectorAll(".filters ul li");
let counter = document.querySelector(".counter span");
const html = document.documentElement;
html.dataset.theme = `theme-light`;
for (let i = 0; i < filters.length; i++) {
  filters[i].onclick = function () {
    filters[i].className = "active";
    for (let j = 0; j < filters.length; j++) {
      if (j !== i) {
        filters[j].className = "";
      }
    }
  };
}
/////////////////////////////////
let todosContainer = document.querySelector(".todos");
let input = document.querySelector("input");
let footer = document.querySelector(".footer");

window.addEventListener("DOMContentLoaded", showDetails());
window.addEventListener("DOMContentLoaded", counterItems());

input.addEventListener("keypress", function (e) {
  // e.preventDefault();
  if (e.key === "Enter") {
    if (input.value === "") {
      Swal.fire({
        title: "Oops...",
        text: "the value is empty!",
      });
    } else {
      addTodos();

      TodoLocalStorage(input);
      input.value = "";
    }
  }
});
//counter function

//add the task to container
function addTodos() {
  let todo = document.createElement("div");
  todo.className = "todo";
  let span = document.createElement("span");
  todo.appendChild(span);
  let text = document.createElement("div");
  text.className = "text";
  text.textContent = input.value;
  todo.appendChild(text);
  let image = document.createElement("img");
  image.src = "images/icon-cross.svg";
  todo.appendChild(image);
  todosContainer.appendChild(todo);
  footer.style.display = "flex";
  image.onclick = (e) => {
    e.target.parentNode.remove();
  };
}

function TodoLocalStorage(input) {
  let todos;
  if (localStorage.getItem("items") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("items"));
  }
  todos.push(input.value);
  localStorage.setItem("items", JSON.stringify(todos));
}
/////////////////////////////////
function counterItems() {
  let todos;
  if (localStorage.getItem("items") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("items"));
  }
  let count = todos.length;
  counter.innerHTML = count;
}

function showDetails() {
  let item = JSON.parse(localStorage.getItem("items"));

  for (let i = 0; i < item.length; i++) {
    let todo = document.createElement("div");
    todo.className = "todo";
    let span = document.createElement("span");
    todo.appendChild(span);
    let text = document.createElement("div");
    text.className = "text";
    text.textContent = item[i];
    todo.appendChild(text);
    let image = document.createElement("img");
    image.src = "images/icon-cross.svg";
    todo.appendChild(image);
    todosContainer.appendChild(todo);
    footer.style.display = "flex";
    image.onclick = (e) => {
      e.target.parentNode.remove();
      let node = e.target.parentNode.innerText;
      // console.log(node);

      let locals = JSON.parse(localStorage.getItem("items"));
      // console.log(locals);
      locals.forEach((item) => {
        if (item === node) {
          locals = locals.filter((item) => item !== node);
          console.log(locals);
          localStorage.setItem("items", JSON.stringify(locals));
        }
      });
    };
  }
}

//completed
let spanComoleted = document.querySelectorAll(".todo span");
spanComoleted.forEach((element) => {
  element.addEventListener("click", () => {
    element.parentNode.classList.toggle("completed");
    // console.log(element.parentNode.textContent);
    // localStorage.setItem("classList", "completed");
    let item = element.parentNode.textContent;
    let tasks;
    if (localStorage.getItem("classList") === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem("classList"));
    }
    tasks.push(item);

    localStorage.setItem("classList", JSON.stringify(tasks));
  });
});

//comp
let comp = document.querySelector(".comp");
let todo = document.querySelectorAll(".todo");
comp.addEventListener("click", () => {
  todo.forEach((element) => {
    if (element.classList.contains("completed")) {
      element.style.display = "flex";
    } else {
      element.style.display = "none";
    }
  });
});
let notComp = document.querySelector(".notComp");
notComp.addEventListener("click", () => {
  todo.forEach((element) => {
    if (element.classList.contains("completed")) {
      element.style.display = "none";
    } else {
      element.style.display = "flex";
    }
  });
});
//all
let all = document.querySelector(".all");

all.addEventListener("click", () => {
  todo.forEach((element) => {
    element.style.display = "flex";
  });
});

//clearCompleted
let clearCompleted = document.querySelector(".clearCompleted");

clearCompleted.addEventListener("click", () => {
  let myArr = [];
  todo.forEach((element) => {
    if (element.classList.contains("completed")) {
      element.remove();
      // console.log(element.innerText);
      let itemList = JSON.parse(localStorage.getItem("items"));

      itemList.forEach((item) => {
        if (item == element.innerText) {
          myArr.push(item);
          let deferences = itemList.filter((x) => myArr.indexOf(x) === -1);
          localStorage.setItem("items", JSON.stringify(deferences));
        }
      });
    }
  });
});

function setCompletedClassList() {
  let completed = JSON.parse(localStorage.getItem("classList"));
  completed.forEach((e) => {
    todo.forEach((element) => {
      if (e === element.innerText) {
        element.classList.add("completed");
      }
    });
  });
}
window.addEventListener("DOMContentLoaded", setCompletedClassList);

let themeBtn = document.querySelector(".icon");
// themse toggler
function toggleTheme() {
  const themeIcon = document.querySelector(".icon img");

  if (themeBtn.classList.contains("light")) {
    themeBtn.classList.remove("light");
    themeBtn.classList.add("dark");
    html.dataset.theme = "theme-dark";
    themeIcon.src = "./images/icon-sun.svg";
    themeIcon.alt = "moon svg";
  } else {
    themeBtn.classList.remove("dark");
    themeBtn.classList.add("light");
    html.dataset.theme = "theme-light";
    themeIcon.src = "./images/icon-moon.svg";
    themeIcon.alt = "sun svg";
  }
}
themeBtn.addEventListener("click", toggleTheme);
