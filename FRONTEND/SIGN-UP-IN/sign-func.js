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

const baseURL = "http://localhost:8000"

signInBtn.addEventListener('click', () => {
    signInContent.style.display = "flex"
    signUpContent.style.display = "none"
})

signUpBtn.addEventListener('click', () => {
    signUpContent.style.display = "flex"
    signInContent.style.display = "none"
})

const addUser = async (obj) => {
    const response = await fetch(`${baseURL}/add-user`, {
        method: "POST",
        headers: {
            "Content-type": "Application/json",
        },
        body: JSON.stringify(obj)
    })

    let data = await response.json()

    if(response.status === 401 || response.status === 402){
        alert(data.error)
    }
    else{
        sessionStorage.setItem("username", obj.username)
        window.location.href = "http://127.0.0.1:3000/FRONTEND/HOME/home.html"
    }
    console.log(data)
}

submitUp.addEventListener('click',async(e)=>{

    e.preventDefault()

    const user = {
        "name": upName.value,
        "email": upEmail.value,
        "username": upUsername.value,
        "password": upPassword.value,
    }
    await addUser(user)
})