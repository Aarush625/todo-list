let eye_slash = document.getElementById('eye-slash')
let password = document.getElementById('password')
let eye = document.getElementById('eye')
let username = document.getElementById('username')
const btn = document.getElementById('btn')



eye_slash.addEventListener('click', ()=>{
    eye_slash.classList.toggle('fa-eye')
    const type = password.getAttribute('type') === "password" ? "text" : "password"
    password.setAttribute("type", type)
})


let nameUser = ''
let ok = false
username.addEventListener('input', ()=>{
    let username = document.getElementById('username').value
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    let test1 = specialChars.test(username);
    if (username.length < 2) {
        let username_error = document.getElementById("username_error");
        username_error.style.visibility = 'visible'
        username_error.innerHTML = 'Username Should Be Longer Than 2 Characters'
    }
    else if (username.length >= 12) {
        let username_error = document.getElementById("username_error");
        username_error.style.visibility = 'visible'
        username_error.innerHTML = 'Username Should Be Shorter Than 12 Characters'
    }
    else if (test1 == true) {
        let username_error = document.getElementById("username_error");
        username_error.style.visibility = 'visible'
        username_error.innerHTML = 'Your Username Cannot Contain Special Characters'
    }
    else {
        let username_error = document.getElementById("username_error");
        username_error.style.visibility = 'hidden'
        username_error.innerHTML = 'x'
        let username = document.getElementById('username').value
        ok = true
        nameUser = username
    }
})

let userPassword = ''
let ok1 = false
password.addEventListener('input', ()=>{
    let password1 = document.getElementById('password').value
    let regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    let check = regex.test(password1)

    if (check == false) {
        let password = document.getElementById('password_error')
        password.style.visibility = 'visible'
        password.innerHTML = '8 Letters And Contain 1 Special Character & Number'
    } else {
        let password = document.getElementById('password_error')
        password.style.visibility = 'hidden'
        password.innerHTML = 'x'
        ok1 = true
        userPassword = password1
    }
})


btn.addEventListener('click', ()=>{
    if (ok && ok1 == true){
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:3001/loginuser", true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            name: nameUser,
            password: userPassword
        }));
        xhr.onload = function() {
            let response = xhr.response
            if (response == "Succesfully Logged In"){
                location.replace("/Todo")
            }
            else if(response == "Wrong Password"){
                let password = document.getElementById('password_error')
                password.style.visibility = 'visible'
                password.innerHTML = 'Your Password Is Wrong'
            }
            else{
                let username_error = document.getElementById("username_error")
                username_error.innerHTML = response
            }
        };
    }else{
        let error = document.querySelectorAll('.error')
        error.forEach(element => {
            element.style.visibility = 'visible'
            element.innerHTML = 'Field Required'
        });
    }
})