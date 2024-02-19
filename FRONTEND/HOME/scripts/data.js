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

const recentHistory = document.querySelector("#recent-history")

const username = sessionStorage.getItem("username")

let deleteBtn = document.querySelectorAll(".delete-btn")
let chartCreated = false
let mychart = null

let minInc = 0
let maxInc = 0
let minExp = 0
let maxExp = 0

let totalInc = 0
let totalExp = 0
let total = 0

let inc = false
let exp = false
let recent = 0

window.onload = () => {
    if (username === null) {
        window.location.href = "http://127.0.0.1:3000/FRONTEND/SIGN-UP-IN/sign.html"
    }
}

const addTransaction = async (obj) => {
    try {
        await fetch(`${baseUrl}/add-transaction`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj)
        })
    } catch (err) {
        console.log("ERROR Stroing the data", err);
    }
}

const removeTransaction = async (_id) => {
    try {
        await fetch(`${baseUrl}/remove-transaction/${_id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
    } catch (err) {
        console.log("ERROR Deleting the data", err);
    }
}

const readTransactions = async () => {
    try {
        const response = await fetch(`${baseUrl}/get-transactions/${username}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        const dataArray = (await response.json()).transaction
        Chartfun(dataArray)
        chartCreated = true
        const incul = document.querySelector('#income-list')
        incul.innerHTML = ""
        const expul = document.querySelector('#expense-list')
        expul.innerHTML = ""
        const tranul = document.querySelector('#transaction-list')
        tranul.innerHTML = ""
        totalInc = 0
        totalExp = 0
        dataArray.forEach(data => {
            if (data.category === 'income') {
                displayIncome(data)
                displayTransactionIncome(data)
                totalInc += data.amount
                if (!inc) {
                    minInc = data.amount
                    maxInc = data.amount
                    inc = true
                }
                minInc = Math.min(minInc, data.amount)
                maxInc = Math.max(maxInc, data.amount)
            }
            else {
                displayExpense(data)
                displayTransactionExpense(data)
                totalExp += data.amount * -1
                if (!exp) {
                    minExp = data.amount * -1
                    maxExp = data.amount * -1
                    exp = true
                }
                minExp = Math.min(minExp, data.amount * -1)
                maxExp = Math.max(maxExp, data.amount * -1)
            }
            if (recent <= 2) {
                if (recent == 0) recentHistory.innerHTML = ""
                displayRecent(data)
                recent++
            }
        })

        deleteBtn = document.querySelectorAll(".delete-btn")

        total = totalInc - totalExp
        recent = 0
        deleteTransaction()
        updateTotalIncome()
        updateTotalExpense()
        updateTotal()
    } catch (err) {
        console.log("ERROR Reading the data", err);
    }
}

const updateTotalIncome = () => {
    const span = document.querySelector("#income-total")
    span.innerHTML = `<i class="fa-solid fa-indian-rupee-sign"></i>${totalInc}`

    const dashSpan = document.querySelector("#dashboard-total-income")
    dashSpan.innerHTML = `<i class="fa-solid fa-indian-rupee-sign"></i>${totalInc}`

    const minIncome = document.querySelector("#min-income")
    const maxIncome = document.querySelector("#max-income")
    minIncome.innerHTML = `<i class="fa-solid fa-indian-rupee-sign"></i>${minInc}`
    maxIncome.innerHTML = `<i class="fa-solid fa-indian-rupee-sign"></i>${maxInc}`
}

const updateTotalExpense = () => {
    const span = document.querySelector("#expense-total")
    span.innerHTML = `<i class="fa-solid fa-indian-rupee-sign"></i>${totalExp}`

    const dashSpan = document.querySelector("#dashboard-total-expense")
    dashSpan.innerHTML = `<i class="fa-solid fa-indian-rupee-sign"></i>${totalExp}`

    const minExpense = document.querySelector("#min-expense")
    const maxExpense = document.querySelector("#max-expense")
    minExpense.innerHTML = `<i class="fa-solid fa-indian-rupee-sign"></i>${minExp}`
    maxExpense.innerHTML = `<i class="fa-solid fa-indian-rupee-sign"></i>${maxExp}`
}

const updateTotal = () => {
    const dashSpan = document.querySelector("#dashboard-total")
    dashSpan.innerHTML = `<i class="fa-solid fa-indian-rupee-sign"></i>${total}`

    if (total >= 0) dashSpan.style.color = "#6bb023"
    else dashSpan.style.color = "#e0211f"
}

const displayIncome = (obj) => {
    const li = document.createElement('li')
    li.innerHTML = `<div class="image"><i class="fa-solid fa-piggy-bank"></i></div><div class="data"><div class="heading"><div class="dot" style="background-color: #6bb023;"></div><p>${obj.title}</p></div><div class="info"><p><i class="fa-solid fa-indian-rupee-sign"></i>${obj.amount}</p><p><i class="fa-solid fa-calendar"></i>${obj.date}</p></div><div class="message"><p><i class="fa-solid fa-comment"></i>${obj.description}</p></div></div><div class="delete-btn" data-id="${obj._id}"><div><i class="fa-solid fa-trash"></i></div></div>`
    const ul = document.querySelector('#income-list')
    ul.appendChild(li)
}

const displayRecent = (obj) => {
    let color = "#6bb023"
    if (obj.category === 'expense') {
        color = "#e0211f"
        obj.amount *= -1
    }
    recentHistory.innerHTML += `<div class="history-list"><p style="color:${color}">${obj.title}</p><p style="color:${color}"><i class="fa-solid fa-indian-rupee-sign"></i>${obj.amount}</p></div>`
}

const displayExpense = (obj) => {
    const li = document.createElement('li')
    li.innerHTML = `<div class="image"><i class="fa-solid fa-money-bill-wave"></i></div><div class="data"><div class="heading"><div class="dot" style="background-color: #e0211f;"></div><p>${obj.title}</p></div><div class="info"><p><i class="fa-solid fa-indian-rupee-sign"></i>${obj.amount * -1}</p><p><i class="fa-solid fa-calendar"></i>${obj.date}</p></div><div class="message"><p><i class="fa-solid fa-comment"></i>${obj.description}</p></div></div><div class="delete-btn" data-id="${obj._id}"><div><i class="fa-solid fa-trash"></i></div></div>`
    const ul = document.querySelector('#expense-list')
    ul.appendChild(li)
}

const displayTransactionIncome = (obj) => {
    const li = document.createElement('li')
    li.innerHTML = `<div class="image"><i class="fa-solid fa-piggy-bank"></i></div><div class="data"><div class="heading"><div class="dot" style="background-color: #6bb023;"></div><p>${obj.title}</p></div><div class="info"><p><i class="fa-solid fa-indian-rupee-sign"></i>${obj.amount}</p><p><i class="fa-solid fa-calendar"></i>${obj.date}</p><p><i class="fa-solid fa-comment"></i>${obj.description}</p></div></div><div class="delete-btn" data-id="${obj._id}"><div><i class="fa-solid fa-trash"></i></div></div>`
    const ul = document.querySelector('#transaction-list')
    ul.appendChild(li)
}

const displayTransactionExpense = (obj) => {
    const li = document.createElement('li')
    li.innerHTML = `<div class="image"><i class="fa-solid fa-money-bill-wave"></i></div><div class="data"><div class="heading"><div class="dot" style="background-color: #e0211f;"></div><p>${obj.title}</p></div><div class="info"><p><i class="fa-solid fa-indian-rupee-sign"></i>${obj.amount * -1}</p><p><i class="fa-solid fa-calendar"></i>${obj.date}</p><p><i class="fa-solid fa-comment"></i>${obj.description}</p></div></div><div class="delete-btn" data-id="${obj._id}"><div><i class="fa-solid fa-trash"></i></div></div>`
    const ul = document.querySelector('#transaction-list')
    ul.appendChild(li)
}

incAdd.addEventListener('click', async () => {
    let incTransaction = {
        "category": "income",
        "title": incTitle.value,
        "amount": incAmount.value,
        "description": incDescription.value,
        "date": incDate.value,
        "username": username,
    }
    await addTransaction(incTransaction)
    await readTransactions()
    incTitle.value = ""
    incAmount.value = ""
    incDescription.value = ""
    incDate.value = ""
})

expAdd.addEventListener('click', async () => {
    let expTransaction = {
        "category": "expense",
        "title": expTitle.value,
        "amount": expAmount.value * -1,
        "description": expDescription.value,
        "date": expDate.value,
        "username": username,
    }
    await addTransaction(expTransaction)
    await readTransactions()
    expTitle.value = ""
    expAmount.value = ""
    expDescription.value = ""
    expDate.value = ""
})

const deleteTransaction = () => {
    deleteBtn.forEach(btn => {
        btn.addEventListener('click', async () => {
            await removeTransaction(btn.dataset.id)
            await readTransactions()
        })
    })
}

const Chartfun = (arr) => {
    let incomeData = []
    let expenseData = []
    arr.forEach(obj => {
        if (obj.amount < 0) {
            expenseData.push(obj)
        }
        else {
            incomeData.push(obj)
        }
    })
    const date = arr.map(d => d.date)
    const ctx = document.querySelector('#inc-exp-chart')
    if (chartCreated === true) mychart.destroy()
    chartCreated = false;
    mychart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: date,
            datasets: [{
                label: 'Income',
                data: incomeData.map(d => ({
                    x: d.date,
                    y: d.amount
                })),
                borderWidth: 2,
                lineTension: 0,
                backgroundColor: 'green',
            },
            {
                label: 'Expense',
                data: expenseData.map(d => ({
                    x: d.date,
                    y: d.amount
                })),
                borderWidth: 2,
                lineTension: 0,
                backgroundColor: '#af2021',
            }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
        },
    })
}

readTransactions()