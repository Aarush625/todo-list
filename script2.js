let password2 = document.getElementById('cfm-password')
let eye_slash = document.getElementById('eye-slash')
let eye_slash1 = document.getElementById('eye-slash1')
let password = document.getElementById('password')
let cfm_password = document.getElementById('cfm-password')
let username = document.getElementById('username')
let email = document.getElementById('email')
let password1 = document.getElementById('password')
let btn = document.getElementById('btn')

// let userName = ''
let userName = ''
let userEmail = ''
let userPassword = ''

// fetch('https://localhost:3000/api/register', {headers: {'Access-Control-Allow-Origin': '*'}}).then(res => res.json()).then(data => {console.log(data)}).catch(rejected => {console.log(rejected);});

let ok1 = false
username.addEventListener('input', () => {
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
        let name = document.getElementById('username').value
        let username_error = document.getElementById("username_error");
        username_error.style.visibility = 'hidden'
        ok1 = true
        userName = name
    }
    
})

let ok2 = false
email.addEventListener('input', () => {
    let email = document.getElementById('email').value
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    let check = regex.test(email)
    if (check == false) {
        let email = document.getElementById('email_error')
        email.style.visibility = 'visible'
        email.innerHTML = 'Your Email Is Not Valid'
    } else {
        let email = document.getElementById('email_error')
        email.style.visibility = 'hidden'
        let emails = document.getElementById('email').value
        ok2 = true
        userEmail = emails
    }
})


let ok3 = false
password1.addEventListener('input', () => {
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
        ok3 = true
    }

})

let ok4 = false
password2.addEventListener('input', () => {
    if (password2.value != password1.value) {
        let password = document.getElementById('cfm-password_error')
        password.style.visibility = 'visible'
        password.innerHTML = 'Your Password Does Not Match'
    }
    else if (password2.value == password1.value) {
        let password_error = document.getElementById('cfm-password_error')
        password_error.style.visibility = 'hidden'
        let password = document.getElementById('cfm-password').value
        ok4 = true
        userPassword = password
    }
})


eye_slash.addEventListener('click', () => {
    eye_slash.classList.toggle('fa-eye')
    const type = password.getAttribute('type') === "password" ? "text" : "password"
    password.setAttribute("type", type)
})
eye_slash1.addEventListener('click', () => {
    eye_slash1.classList.toggle('fa-eye')
    const type = cfm_password.getAttribute('type') === "password" ? "text" : "password"
    cfm_password.setAttribute("type", type)
})


btn.addEventListener('click', ()=>{
    if (ok1 && ok2 && ok3 && ok4 == true){
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:3001/registeruser", true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            name: userName,
            email: userEmail,
            password: userPassword
        }));
        xhr.onload = function() {
            if (xhr.response == "Your Email Already Exist's"){
                let email = document.getElementById('email_error').innerHTML = "Your Email Already Exist's"
            }
            else if (xhr.response == "Your Username Already Exist's"){
                let username_error = document.getElementById("username_error").innerHTML = "Your Username Already Exist's"
            }else{
                location.replace("/login")
            }
        };
    }else{
        let errors = document.querySelectorAll(".errors")
        errors.forEach((item) => {
            item.style.visibility = 'visible'
            item.innerHTML = 'Field Required'
        });
    }
})