const signUpBtn=document.querySelector('#sign-up-btn');
const signInBtn=document.querySelector('#sign-in-btn');
const signUpContent=document.querySelector('#sign-up-contents');
const signInContent=document.querySelector('#sign-in-contents');

signInBtn.addEventListener('click',()=>{
    signInContent.style.display = "flex"
    signUpContent.style.display = "none"
})

signUpBtn.addEventListener('click',()=>{
    signUpContent.style.display = "flex"
    signInContent.style.display = "none"
})

async function fun(){
    const obj={
        "username":"Hello007",
        "password": "123456",
        "email": "Hello@gmail.com",
        "name": "Hello World"
    }

    let response=await fetch("http://localhost:8000/add-user",{
        method:"POST",
        headers:{
            "Content-type":"Application/json",
            "Developer":"Saksham Agrawal"
        },
        body:JSON.stringify(obj)
    })

    let data=await response.json()

    console.log(data)
}