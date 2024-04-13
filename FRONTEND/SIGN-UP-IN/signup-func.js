const baseURL = "http://localhost:8000"

const signupBtn = document.querySelector("#signup-btn")
const signupName = document.querySelector("#signup-name")
const signupEmail = document.querySelector("#signup-email")
const signupUsername = document.querySelector("#signup-username")
const signupPassword = document.querySelector("#signup-password")

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

signupBtn.addEventListener('click', async (e) => {

    e.preventDefault()

    if(signupEmail.value.indexOf("@")<=0&&signupEmail.value.indexOf(".",signupEmail.value.indexOf("@")+1)==-1){
        alert("Email invalid")
    }
    else if (signupName.value !== '' && signupEmail.value !== '' && signupUsername.value !== '' && signupPassword.value !== '') {
        const user = {
            "name": signupName.value,
            "email": signupEmail.value,
            "username": signupUsername.value,
            "password": signupPassword.value,
        }
        await signUp(user)
    }
    else{
        alert("Input Fields should not be empty!!")
    }
})