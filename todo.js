const sidebar = document.querySelector(".sidebar")
const toggle = document.querySelector(".toggle")
const searchBtn = document.querySelector(".search-box")
const modeSwitch = document.querySelector(".toggle-switch")
const modeText = document.querySelector(".mode-text")
const body = document.querySelector("body")
const description = document.getElementById('description')
const card_title = document.getElementById('card_title')
const card_content = document.getElementById('card_content')
const card_arrow = document.getElementById('card_arrow')
const author = document.getElementById('author')
const loader = document.getElementById('loader')

modeSwitch.addEventListener('click', () => {
  body.classList.toggle("dark")

  if (body.classList.contains("dark")) {
    modeText.innerText = 'Light Mode'
  } else {
    modeText.innerText = 'Dark Mode'
  }
})

toggle.addEventListener('click', () => {
  sidebar.classList.toggle("close")
})

description.style.visibility = 'hidden'
author.style.visibility = 'hidden'
var xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost:3001/getQuote", true);
xhr.send()
xhr.onload = function () {
  let response = xhr.response
  let res = JSON.parse(response)

  res.forEach((item) => {
    description.innerHTML = item.quote
    author.innerHTML = `- ${item.author}`
    description.style.visibility = 'visible'
    loader.style.display = 'none'
    author.style.visibility = 'visible'
  })
}
var xhr1 = new XMLHttpRequest();
xhr1.open("GET", "http://localhost:3001/getNewWord", true);
xhr1.send()
xhr1.onload = function () {
  let response = xhr1.response
  let res = JSON.parse(response)
  card_title.innerHTML = res.word
  card_content.innerHTML = res.definition
  card_arrow.addEventListener('click', () => {
    alert(res.definition)
  })
}

var xhr2 = new XMLHttpRequest();
xhr2.open("POST", "http://localhost:3001/returnuser", true);
xhr2.send()
xhr2.onload = function () {
  let response = xhr2.response
  let element = document.getElementById('user-field').innerHTML = response
};

function loadTodos() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:3001/getTodos", true);
  xhr.send()
  xhr.onload = function () {
    let response = xhr.response
    let html = "";
    if (response == "No Todos"){
      let list_error = document.getElementById("list-errorr").style.height = '20vh'
      list_error.style.visibility = 'visible'
    }else{
      let list_ = document.getElementById('list').style.justifyContent = 'flex-start'
      let list_error = document.getElementById("list-errorr").style.visibility = 'hidden'
      let parsed = JSON.parse(response)
      parsed.forEach(function (element, index) {
        let userTitle = element.title
        let userAuthor = element.Author
        let userDescription = element.description
        let userPriorty = element.Priorty
        let priorty = ''
        if (userPriorty == 'high') {
          priorty = 'H'
        }
        if (userPriorty == 'medium') {
          priorty = 'M'
        }
        if (userPriorty == 'low') {
          priorty = 'L'
        }
        html += `              <div class="list-item" id=${userTitle}>
              <div class="cardr">
                <div class="headerr">
                  <span class="icons">
                    <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path clip-rule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" fill-rule="evenodd"></path>
                    </svg>
                  </span>
                  <p class="alert">${userAuthor}</p>
                  <div class="badge" id="badge">${priorty}</div>
                </div>
                <div class="msg-title" id="msg-title">
                  ${userTitle}
                </div>
                <p class="message">
                  ${userDescription}
                </p>
              
                <div class="actions">
                  <div class="buttonR" id="markAsDone" onclick={markAsDone(this.id)}>
                  <button>Mark As Done
    <div class="star-1">
      <svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 784.11 815.53" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><defs></defs><g id="Layer_x0020_1"><metadata id="CorelCorpID_0Corel-Layer"></metadata><path d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z" class="fil0"></path></g></svg>
    </div>
    <div class="star-2">
      <svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 784.11 815.53" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><defs></defs><g id="Layer_x0020_1"><metadata id="CorelCorpID_0Corel-Layer"></metadata><path d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z" class="fil0"></path></g></svg>
    </div>
    <div class="star-3">
      <svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 784.11 815.53" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><defs></defs><g id="Layer_x0020_1"><metadata id="CorelCorpID_0Corel-Layer"></metadata><path d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z" class="fil0"></path></g></svg>
    </div>
    <div class="star-4">
      <svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 784.11 815.53" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><defs></defs><g id="Layer_x0020_1"><metadata id="CorelCorpID_0Corel-Layer"></metadata><path d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z" class="fil0"></path></g></svg>
    </div>
    <div class="star-5">
      <svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 784.11 815.53" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><defs></defs><g id="Layer_x0020_1"><metadata id="CorelCorpID_0Corel-Layer"></metadata><path d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z" class="fil0"></path></g></svg>
    </div>
    <div class="star-6">
      <svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 784.11 815.53" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><defs></defs><g id="Layer_x0020_1"><metadata id="CorelCorpID_0Corel-Layer"></metadata><path d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z" class="fil0"></path></g></svg>
    </div>
  </button>
                  </div>
              
  
                  <button id="${index}" class="noselect deleteButton" onclick="deleteTodo(this.id)"><span class="text">Delete</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button>
                </div>
              </div>                
            </div>`
      });
    }
    let todoElement = document.getElementById('list')
    todoElement.innerHTML = html
  };
}
let deleteTodo = (id) => {
  let elementToDelete = document.getElementById(id).parentElement.parentElement.style.display = 'none'
  let elementToDeleteInMongo = document.getElementById(id).parentElement.parentElement.parentElement.id
  let info = document.getElementById('info')
  let info_title = document.getElementById('info_title').innerHTML = 'Todo Was Successfully Deleted!'
  info.style.background = 'red'
  info.classList.add('info_move')
  setTimeout(() => {
    let info = document.getElementById('info').classList.remove('info_move')
  }, 2000);
  var xhr1 = new XMLHttpRequest();
  xhr1.open("POST", "http://localhost:3001/deleteTodo", true);
  xhr1.setRequestHeader('Content-Type', 'application/json');
  xhr1.send(JSON.stringify({
    "title": elementToDeleteInMongo
  }))
  xhr1.onload = function() {
    let response = xhr1.response
  };
};

let markAsDone = (id) => {
  let elementToDelete = document.getElementById(id).parentElement.parentElement.style.display = 'none'
  let elementToDeleteInMongo = document.getElementById(id).parentElement.parentElement.parentElement.id
  let info_title = document.getElementById('info_title').innerHTML = 'Todo Was Marked As Done'
  let info = document.getElementById('info')
  info.style.background = 'rgb(116, 235, 52)'
  info.classList.add('info_move')
  setTimeout(() => {
    let info = document.getElementById('info').classList.remove('info_move')
  }, 2000);
  var xhr1 = new XMLHttpRequest();
  xhr1.open("POST", "http://localhost:3001/markAsDone", true);
  xhr1.setRequestHeader('Content-Type', 'application/json');
  xhr1.send(JSON.stringify({
    "title": elementToDeleteInMongo
  }))
  xhr1.onload = function() {
      let response = xhr1.response
  };

};
loadTodos()