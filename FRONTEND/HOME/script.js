const tabButtons = document.querySelectorAll(".tabs > .btn > button")
const tabs = document.querySelectorAll(".contents > div")
const signOutBtn = document.querySelector("#sign-out")

const addStyle = (tabButton)=>{
    tabButton.parentElement.querySelector(".border").style.backgroundColor = "#2d1f51d8"
    tabButton.style.color = "#2d1f51d8"
}

const removeStyle = (tabButton)=>{
    tabButton.parentElement.querySelector(".border").style.background = "none"
    tabButton.style.color = "rgba(46, 32, 82, 0.565)"
}

const changeTabs = ()=>{
    for(let x=0;x<5;x++){
        tabButtons[x].addEventListener('click',()=>{
            if(x!=4){
                tabs[x].style.display = "flex"
            }
            addStyle(tabButtons[x])
            for(let y=0;y<5;y++){
                if(y!=x){
                    removeStyle(tabButtons[y])
                    // removeStyle(signOutBtn)
                    tabs[y].style.display = "none"
                }
            }
        })
    }
}


window.onload = ()=>{
    for(let x=1;x<4;x++)
    {
        tabs[x].style.display = "none"
    }
}
changeTabs()