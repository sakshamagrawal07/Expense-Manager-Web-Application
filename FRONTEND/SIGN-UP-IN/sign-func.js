const baseURL = "http://localhost:8000"

const signUpBtn = document.querySelector('#sign-up-btn');
const signInBtn = document.querySelector('#sign-in-btn');
const signUpContent = document.querySelector('#sign-up-contents');
const signInContent = document.querySelector('#sign-in-contents');

const submitIn = document.querySelector("#submit-sign-in")
const submitUp = document.querySelector("#submit-sign-up")

const inUsername = document.querySelector("#in-username")
const inPassword = document.querySelector("#in-password")
const upName = document.querySelector("#up-name")
const upEmail = document.querySelector("#up-email")
const upUsername = document.querySelector("#up-username")
const upPassword = document.querySelector("#up-password")

signInBtn.addEventListener('click', () => {
    signInContent.style.display = "flex"
    signUpContent.style.display = "none"
})

signUpBtn.addEventListener('click', () => {
    signUpContent.style.display = "flex"
    signInContent.style.display = "none"
})

const signUp = async (obj) => {
    const response = await fetch(`${baseURL}/add-user`, {
        method: "POST",
        headers: {
            "Content-type": "Application/json",
        },
        body: JSON.stringify(obj)
    })

    const data = await response.json()

    if (response.status === 401 || response.status === 402) {
        alert(data.error)
    }
    else {
        sessionStorage.setItem("username", obj.username)
        window.location.href = "http://127.0.0.1:3000/FRONTEND/HOME/home.html"
    }
    console.log(data)
}

const signIn = async (username, password) => {
    const response = await fetch(`${baseURL}/get-user/${username}`, {
        method: "POST",
        headers: {
            "Content-type": "Application/json",
        },
    })

    const data = await response.json()

    if (data === null) {
        alert(`Username "${username}" does not exists`)
    }
    else if (data.password === password) {
        sessionStorage.setItem("username", username)
        window.location.href = "http://127.0.0.1:3000/FRONTEND/HOME/home.html"
    }
    else {
        alert("Wrong password")
    }
    console.log(data)
}

submitUp.addEventListener('click', async (e) => {

    e.preventDefault()

    if (upName.value !== '' && upEmail.value !== '' && upUsername.value !== '' && upPassword.value !== '') {
        const user = {
            "name": upName.value,
            "email": upEmail.value,
            "username": upUsername.value,
            "password": upPassword.value,
        }
        await signUp(user)
    }
    else{
        alert("Input Fields should not be empty!!")
    }
})

submitIn.addEventListener('click', async (e) => {

    e.preventDefault()
    if (inUsername.value !== '' && inPassword !== '') {
        await signIn(inUsername.value, inPassword.value)
    }
    else {
        alert("Input Fields should not be empty!!")
    }
})