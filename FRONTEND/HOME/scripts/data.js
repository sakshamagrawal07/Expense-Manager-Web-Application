const baseUrl = "http://localhost:8000"

const incTitle = document.querySelector("#inc-title")
const incAmount = document.querySelector("#inc-amount")
const incDate = document.querySelector("#inc-date")
const incDescription = document.querySelector("#inc-description")
const incAdd = document.querySelector("#inc-add")

const expTitle = document.querySelector("#exp-title")
const expAmount = document.querySelector("#exp-amount")
const expDate = document.querySelector("#exp-date")
const expDescription = document.querySelector("#exp-description")
const expAdd = document.querySelector("#exp-add")

const addTransaction = async (obj) => {
    try {
        await fetch(`${baseUrl}/add-transaction`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "category": obj.category,
                "title": obj.title,
                "amount": obj.amount,
                "description": obj.description,
                "date": obj.date
            })
        })
    } catch (err) {
        console.log("ERROR Stroing the data", err);
    }
}

incAdd.addEventListener('click',()=>{
    let incTransaction={
        category : "income",
        title : incTitle.value,
        amount : incAmount.value,
        description : incDescription.value,
        date : incDate.value
    }
    addTransaction(incTransaction)
})

expAdd.addEventListener('click',()=>{
    let expTransaction={
        category : "expense",
        title : expTitle.value,
        amount : expAmount.value*-1,
        description : expDescription.value,
        date : expDate.value
    }
    addTransaction(expTransaction)
})