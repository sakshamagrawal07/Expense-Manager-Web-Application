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

let deleteBtn = document.querySelectorAll(".delete-btn")

let totalInc = 0
let totalExp = 0
let total = 0

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

const readTransactions = async () => {
    try {
        const response = await fetch(`${baseUrl}/get-transactions`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        }
        )
        const dataArray = (await response.json()).transaction
        
        const incul = document.querySelector('#income-list')
        incul.innerHTML = ""
        const expul = document.querySelector('#expense-list')
        expul.innerHTML = ""
        const tranul = document.querySelector('#transaction-list')
        tranul.innerHTML = ""
        totalInc=0
        totalExp=0
        dataArray.forEach(data => {
            if (data.category === 'income') {
                displayIncome(data)
                displayTransactionIncome(data)
                totalInc+=data.amount
            }
            else {
                displayExpense(data)
                displayTransactionExpense(data)
                totalExp+=data.amount*-1
            }
        })
        // console.log(totalInc)
        total=totalInc-totalExp
        updatTotalIncome()
        updatTotalExpense()
        updateTotal()
    } catch (err) {
        console.log("ERROR Reading the data", err);
    }
}

const updatTotalIncome = ()=>{
    const span = document.querySelector("#income-total")
    span.innerHTML=`<i class="fa-solid fa-indian-rupee-sign"></i>${totalInc}`

    const dashSpan = document.querySelector("#dashboard-total-income")
    dashSpan.innerHTML=`<i class="fa-solid fa-indian-rupee-sign"></i>${totalInc}`
}

const updatTotalExpense = ()=>{
    const span = document.querySelector("#expense-total")
    span.innerHTML=`<i class="fa-solid fa-indian-rupee-sign"></i>${totalExp}`

    const dashSpan = document.querySelector("#dashboard-total-expense")
    dashSpan.innerHTML=`<i class="fa-solid fa-indian-rupee-sign"></i>${totalExp}`
}

const updateTotal = ()=>{
    const dashSpan = document.querySelector("#dashboard-total")
    dashSpan.innerHTML=`<i class="fa-solid fa-indian-rupee-sign"></i>${total}`

    if(total>=0)dashSpan.style.color = "#6bb023"
    else dashSpan.style.color = "#e0211f"
}

const displayIncome = (obj) => {
    const li = document.createElement('li')
    li.innerHTML = `<div class="image"><i class="fa-solid fa-piggy-bank"></i></div><div class="data"><div class="heading"><div class="dot" style="background-color: #6bb023;"></div><p>${obj.title}</p></div><div class="info"><p><i class="fa-solid fa-indian-rupee-sign"></i>${obj.amount}</p><p><i class="fa-solid fa-calendar"></i>${obj.date}</p></div><div class="message"><p><i class="fa-solid fa-comment"></i>${obj.description}</p></div></div><div class="delete-btn"><div><i class="fa-solid fa-trash"></i></div></div>`
    const ul = document.querySelector('#income-list')
    ul.appendChild(li)

    deleteBtn = document.querySelectorAll(".delete-btn")
}

const displayExpense = (obj) => {
    const li = document.createElement('li')
    li.innerHTML = `<div class="image"><i class="fa-solid fa-money-bill-wave"></i></div><div class="data"><div class="heading"><div class="dot" style="background-color: #e0211f;"></div><p>${obj.title}</p></div><div class="info"><p><i class="fa-solid fa-indian-rupee-sign"></i>${obj.amount * -1}</p><p><i class="fa-solid fa-calendar"></i>${obj.date}</p></div><div class="message"><p><i class="fa-solid fa-comment"></i>${obj.description}</p></div></div><div class="delete-btn"><div><i class="fa-solid fa-trash"></i></div></div>`
    const ul = document.querySelector('#expense-list')
    ul.appendChild(li)

    deleteBtn = document.querySelectorAll(".delete-btn")
}

const displayTransactionIncome = (obj) => {
    const li = document.createElement('li')
    li.innerHTML = `<div class="image"><i class="fa-solid fa-piggy-bank"></i></div><div class="data"><div class="heading"><div class="dot" style="background-color: #6bb023;"></div><p>${obj.title}</p></div><div class="info"><p><i class="fa-solid fa-indian-rupee-sign"></i>${obj.amount}</p><p><i class="fa-solid fa-calendar"></i>${obj.date}</p><p><i class="fa-solid fa-comment"></i>${obj.description}</p></div></div><div class="delete-btn"><div><i class="fa-solid fa-trash"></i></div></div>`
    const ul = document.querySelector('#transaction-list')
    ul.appendChild(li)

    deleteBtn = document.querySelectorAll(".delete-btn")
}

const displayTransactionExpense = (obj) => {
    const li = document.createElement('li')
    li.innerHTML = `<div class="image"><i class="fa-solid fa-money-bill-wave"></i></div><div class="data"><div class="heading"><div class="dot" style="background-color: #e0211f;"></div><p>${obj.title}</p></div><div class="info"><p><i class="fa-solid fa-indian-rupee-sign"></i>${obj.amount * -1}</p><p><i class="fa-solid fa-calendar"></i>${obj.date}</p><p><i class="fa-solid fa-comment"></i>${obj.description}</p></div></div><div class="delete-btn"><div><i class="fa-solid fa-trash"></i></div></div>`
    const ul = document.querySelector('#transaction-list')
    ul.appendChild(li)

    deleteBtn = document.querySelectorAll(".delete-btn")
}

incAdd.addEventListener('click', () => {
    let incTransaction = {
        category: "income",
        title: incTitle.value,
        amount: incAmount.value,
        description: incDescription.value,
        date: incDate.value
    }
    addTransaction(incTransaction)
    readTransactions()
})

expAdd.addEventListener('click', () => {
    let expTransaction = {
        category: "expense",
        title: expTitle.value,
        amount: expAmount.value * -1,
        description: expDescription.value,
        date: expDate.value
    }
    addTransaction(expTransaction)
    readTransactions()
})

readTransactions()