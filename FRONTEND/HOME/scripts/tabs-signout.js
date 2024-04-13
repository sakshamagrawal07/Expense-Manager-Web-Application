const tabButtons = document.querySelectorAll(".tabs > button")
const tabs = document.querySelectorAll(".contents > div")
const signOutBtn = document.querySelector("#sign-out")
const noOfTabs = 6

const addStyle = (tabButton)=>{
    tabButton.style.backgroundColor = "#000"
    tabButton.style.color = "#fff"
}

function removeStyle(tabButton) {
    tabButton.style.backgroundColor = "#dbdbdb"
    tabButton.style.color = "#000"
}

const changeTabs = ()=>{
    for(let x=0;x<noOfTabs;x++){
        tabButtons[x].addEventListener('click',()=>{
            if(x!=noOfTabs-1){
                tabs[x].style.display = "flex"
            }
            addStyle(tabButtons[x])
            for(let y=0;y<noOfTabs;y++){
                if(y!=x){
                    removeStyle(tabButtons[y])
                    // removeStyle(signOutBtn)
                    tabs[y].style.display = "none"
                }
            }
        })
    }
}

signOutBtn.addEventListener('click', () => {
    sessionStorage.removeItem("username")
    window.location.replace(location.href)
})

window.onload = async()=>{
    
    for(let x=1;x<noOfTabs-1;x++)
    {
        tabs[x].style.display = "none"
    }
    tabButtons[0].click()
}
changeTabs()