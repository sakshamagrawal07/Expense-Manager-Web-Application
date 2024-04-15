const baseURL = "http://localhost:8000"

const loginBtn = document.querySelector("#login-btn")
const loginUsername = document.querySelector("#login-username")
const loginPassword = document.querySelector("#login-password")

const login = async (username, password) => {
    const user = {
        "username" : username,
        "password" : password
    }
    const response = await fetch(`${baseURL}/login-user`, {
        method: "POST",
        headers: {
            "Content-type": "Application/json",
        },
        body: JSON.stringify(user)
    })

    const data = await response.json()

    if (data === null) {
        alert(`Username "${username}" does not exists`)
    }
    else if (response.status === 200) {
        sessionStorage.setItem("username", username)
        window.location.replace("http://127.0.0.1:3000/FRONTEND/HOME/home.html")

        username.innerHTML = data.username
    }
    else {
        alert("Wrong password")
    }
    console.log(data)
}

loginBtn.addEventListener('click', async (e) => {

    e.preventDefault()
    if (loginUsername.value !== '' && loginPassword !== '') {
        await login(loginUsername.value, loginPassword.value)
    }
    else {
        alert("Input Fields should not be empty!!")
    }
})