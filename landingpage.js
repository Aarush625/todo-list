const body = document.querySelector("body")
const sidebar = document.querySelector(".sidebar")
const toggle = document.querySelector(".toggle")
const searchBtn = document.querySelector(".search-box")
const modeSwitch = document.querySelector(".toggle-switch")
const modeText = document.querySelector(".mode-text")
const btn = document.querySelector('.btn')

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
    window.location = '/register'
})

var xhr = new XMLHttpRequest();
xhr.open("POST", "http://localhost:3001/returnuser", true);
xhr.send()
xhr.onload = function() {
    let response = xhr.response
    let element = document.getElementById('user-field').innerHTML = response
};