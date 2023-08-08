// const body = document.querySelector("body")
const sidebar = document.querySelector(".sidebar")
const toggle = document.querySelector(".toggle")
const searchBtn = document.querySelector(".search-box")
const modeSwitch = document.querySelector(".toggle-switch")
const modeText = document.querySelector(".mode-text")
const btn = document.querySelector('.button')
const btn1 = document.querySelector('#btn1')
const btn2 = document.querySelector('#btn2')
const btn3 = document.querySelector('#btn3')
const body = document.querySelector("#body")
const userTitle = document.querySelector("#title").value
const userTitleInput = document.querySelector("#title")
const userDescription = document.querySelector("#description").value
const userAuthor = document.querySelector("#author").value


userTitleInput.addEventListener('input', () => {
})

modeSwitch.addEventListener('click', ()=>{
    body.classList.toggle("dark")

    if(body.classList.contains("dark")){
        modeText.innerText = 'Light Mode'
    }else{
        modeText.innerText = 'Dark Mode'
    }
})

toggle.addEventListener('click', ()=>{
    sidebar.classList.toggle("close")
})

btn.addEventListener('click', ()=>{
    const dropdowns = document.querySelector('.modal')
    const body = document.querySelectorAll('.bodys')
    const thinkingImage = document.querySelector('#thinkingImage')
    thinkingImage.style.filter = "blur(2px)"
    dropdowns.classList.add('dropdown')
    body.forEach(element => {
        element.style.filter = 'blur(2px)'
    });
})
btn1.addEventListener('click', ()=>{
    const dropdowns = document.querySelector('.modal')
    const button = document.querySelector('#button')
    const buttonClass = document.querySelector('.button')
    dropdowns.classList.remove('dropdown')
    const thinkingImage = document.querySelector('#thinkingImage')
    thinkingImage.style.filter = "blur(0px)"
    button.innerHTML = 'High'
    buttonClass.classList.add('High')
    buttonClass.style.background = 'rgb(252, 66, 69)'
    const body = document.querySelectorAll('.bodys')
    body.forEach(element => {
        element.style.filter = 'blur(0px)'
    });
    const deadline = document.querySelector('#deadline').value
})
btn2.addEventListener('click', ()=>{
    const dropdowns = document.querySelector('.modal')
    const button = document.querySelector('#button')
    const buttonClass = document.querySelector('.button')
    button.innerHTML = 'Medium'
    buttonClass.classList.add('Medium')
    buttonClass.style.background = 'rgb(66, 252, 85)'
    dropdowns.classList.remove('dropdown')
    const thinkingImage = document.querySelector('#thinkingImage')
    thinkingImage.style.filter = "blur(0px)"
    const body = document.querySelectorAll('.bodys')
    body.forEach(element => {
        element.style.filter = 'blur(0px)'
    });
})
btn3.addEventListener('click', ()=>{
    const dropdowns = document.querySelector('.modal')
    const button = document.querySelector('#button')
    const buttonClass = document.querySelector('.button')
    button.innerHTML = 'Low'
    buttonClass.classList.add('Low')
    buttonClass.style.background = 'rgb(246, 252, 66)'
    dropdowns.classList.remove('dropdown')
    const thinkingImage = document.querySelector('#thinkingImage')
    thinkingImage.style.filter = "blur(0px)"
    const body = document.querySelectorAll('.bodys')
    body.forEach(element => {
        element.style.filter = 'blur(0px)'
    });
})

var xhr = new XMLHttpRequest();
xhr.open("POST", "http://localhost:3001/returnuser", true);
xhr.send()
xhr.onload = function() {
    let response = xhr.response
    let element = document.getElementById('user-field').innerHTML = response
};



const button = document.querySelector('#buttonSubmit')
button.addEventListener('click', () => {
    let title = document.getElementById('title').value
    let description = document.getElementById('description').value
    let author = document.getElementById('author').value
    let userButton = document.querySelector('.button').classList
    if (title == ''){
        let usr = document.querySelectorAll('.sm')
        usr.forEach(element => {
            element.classList.add('small')
        });
    }
    else if (author == ''){
        let usr = document.querySelectorAll('.sm')
        usr.forEach(element => {
            element.classList.add('small')
        });
    }
    if(userTitleInput.value.indexOf(' ') >= 0){
        let userTitleError = document.getElementById('userTitleError')
        userTitleError.innerHTML = "Title Cannot Contain Spaces!"
        userTitleError.style.visibility = 'visible';
    }
    else if (description == ''){
        let usr = document.querySelectorAll('.sm')
        usr.forEach(element => {
            element.classList.add('small')
        });
    }else{
        let priorty = ''
        if (userButton.contains('High')){
            priorty = 'high'
        }
        if (userButton.contains('Medium')){
            priorty = 'medium'
        }
        if (userButton.contains('Low')){
            priorty = 'low'
        }
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:3001/addTodo", true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            title: title,
            description: description,
            author: author,
            priorty: priorty
        }))
        xhr.onload = function() {
            let response = xhr.response

            if (response == 'todo saved'){
                const info = document.getElementById('info').classList.add('info_move')
                let title = document.getElementById('title').value = ''
                let description = document.getElementById('description').value = ''
                let author = document.getElementById('author').value = ''
                setTimeout(function(){
                    const info = document.getElementById('info').classList.remove('info_move')
                }, 3000);
            }

        };
    }
})