const baseUrl = "http://localhost:8000"

const incTitle = document.querySelector("#inc-title")
const incAmount = document.querySelector("#inc-amount")
const incDate = document.querySelector("#inc-date")
const incDescription = document.querySelector("#inc-description")
const incAdd = document.querySelector("#inc-add")
incDate.max = new Date().toISOString().split("T")[0];

const expTitle = document.querySelector("#exp-title")
const expAmount = document.querySelector("#exp-amount")
const expDate = document.querySelector("#exp-date")
const expDescription = document.querySelector("#exp-description")
const expAdd = document.querySelector("#exp-add")
expDate.max = new Date().toISOString().split("T")[0];

const invTitle = document.querySelector("#inv-title")
const invAmount = document.querySelector("#inv-amount")
const invDate = document.querySelector("#inv-date")
const invDescription = document.querySelector("#inv-description")
const invAdd = document.querySelector("#inv-add")
invDate.max = new Date().toISOString().split("T")[0];

const recentHistory = document.querySelector("#recent-history")

const username = sessionStorage.getItem("username")

let deleteBtn = document.querySelectorAll(".delete-btn")
let chartCreated = false
let mychart = null

let minInc = 0
let maxInc = 0
let minExp = 0
let maxExp = 0
let minInv = 0
let maxInv = 0

let totalInc = 0
let totalExp = 0
let totalInv = 0
let total = 0

let inc = false
let exp = false
let inv = false
let recent = 0

const changeNameUsernameImg = async () => {
    const user = {
        "username" : username
    }
    const response = await fetch(`${baseUrl}/get-user`, {
        method: "POST",
        headers: {
            "Content-type": "Application/json",
        },
        body: JSON.stringify(user)
    })
    
    const data = await response.json()
    
    const nameBox = document.querySelector(".username > h3")
    const usernameBox = document.querySelector(".username > p")
    
    nameBox.innerText = (data.name).trim().split(" ")[0]
    usernameBox.innerText = `@${username}`

    const profileImg = document.querySelector("#profile-img")
    profileImg.src = `https://avatar.iran.liara.run/public/boy?username=${username} : https://avatar.iran.liara.run/public/girl?username=${username}`
}

window.onload =async() => {
    if (username === null) {
        window.location.href = "http://127.0.0.1:3000/FRONTEND/SIGN-UP-IN/login.html"
    }
    try{
        const resp=await fetch("http://localhost:8000/update-visits",{
            method:"GET",
            headers:{
                "Content-Type":"Application/json"
            }
        })
        const data=await resp.json();
        console.log(data)
    }catch(err){}
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

    await changeNameUsernameImg()

    try {
        const response = await fetch(`${baseUrl}/get-transactions/${username}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        const dataArray = ((await response.json()).transaction).reverse()
        Chartfun(dataArray)

        if (dataArray.length === 0) recentHistory.innerHTML = ""

        chartCreated = true
        const incul = document.querySelector('#income-list')
        incul.innerHTML = ""
        const expul = document.querySelector('#expense-list')
        expul.innerHTML = ""
        const tranul = document.querySelector('#transaction-list')
        tranul.innerHTML = ""
        const invul = document.querySelector('#investment-list')
        invul.innerHTML = ""

        totalInc = 0
        totalExp = 0
        totalInv = 0

        minInc = 0
        maxInc = 0
        minExp = 0
        maxExp = 0
        minInv = 0
        maxInv = 0
        recent =

            inc = false
        exp = false
        inv = false
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
            else if (data.category === 'expense') {
                displayExpense(data)
                displayTransactionExpense(data)
                totalExp += data.amount
                if (!exp) {
                    minExp = data.amount
                    maxExp = data.amount
                    exp = true
                }
                minExp = Math.min(minExp, data.amount)
                maxExp = Math.max(maxExp, data.amount)
            }
            else {
                displayInvestment(data)
                displayTransactionInvestment(data)
                totalInv += data.amount
                if (!inv) {
                    minInv = data.amount
                    maxInv = data.amount
                    inv = true
                }
                minInv = Math.min(minInv, data.amount)
                maxInv = Math.max(maxInv, data.amount)
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
        updateTotalInvestment()
        updateTotal()
    } catch (err) {
        alert("ERROR Reading the data", err);
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

const updateTotalInvestment = () => {
    const span = document.querySelector("#investment-total")
    span.innerHTML = `<i class="fa-solid fa-indian-rupee-sign"></i>${totalInv}`

    const minInvestment = document.querySelector("#min-investment")
    const maxInvestment = document.querySelector("#max-investment")
    minInvestment.innerHTML = `<i class="fa-solid fa-indian-rupee-sign"></i>${minInv}`
    maxInvestment.innerHTML = `<i class="fa-solid fa-indian-rupee-sign"></i>${maxInv}`
}

const updateTotal = () => {
    const dashSpan = document.querySelector("#dashboard-total")
    dashSpan.innerHTML = `<i class="fa-solid fa-indian-rupee-sign"></i>${total}`

    if (total >= 0) dashSpan.style.color = "#198642"
    else dashSpan.style.color = "#a0184f"
}

const displayIncome = (obj) => {
    const li = document.createElement('li')
    li.innerHTML = `<div class="image"><i class="fa-solid fa-piggy-bank"></i></div><div class="data"><div class="heading"><p>${obj.title}</p></div><div class="info"><p><i class="fa-solid fa-indian-rupee-sign"></i>${obj.amount}</p><p><i class="fa-solid fa-calendar"></i>${obj.date}</p></div><div class="message"><p><i class="fa-solid fa-comment"></i>${obj.description}</p></div></div><div class="delete-btn" data-id="${obj._id}"><div><i class="fa-solid fa-trash"></i></div></div>`
    const ul = document.querySelector('#income-list')
    ul.appendChild(li)
}

const displayRecent = (obj) => {
    let background = "linear-gradient(-150deg,#198642,#49dc7f)"
    if (obj.category === 'expense') {
        background = "linear-gradient(-150deg,#a0184f,#d82675)"
    }
    else if (obj.category === 'investment') {
        background = "linear-gradient(-150deg,#2153da,#5da1f8)"
    }
    recentHistory.innerHTML += `<div class="history-list" style="background:${background}"><p>${obj.title}</p><p><i class="fa-solid fa-indian-rupee-sign"></i>${obj.amount}</p></div>`
}

const displayExpense = (obj) => {
    const li = document.createElement('li')
    li.innerHTML = `<div class="image"><i class="fa-solid fa-money-bill-wave"></i></div><div class="data"><div class="heading"><p>${obj.title}</p></div><div class="info"><p><i class="fa-solid fa-indian-rupee-sign"></i>${obj.amount}</p><p><i class="fa-solid fa-calendar"></i>${obj.date}</p></div><div class="message"><p><i class="fa-solid fa-comment"></i>${obj.description}</p></div></div><div class="delete-btn" data-id="${obj._id}"><div><i class="fa-solid fa-trash"></i></div></div>`
    const ul = document.querySelector('#expense-list')
    ul.appendChild(li)
}

const displayInvestment = (obj) => {
    const li = document.createElement('li')
    li.innerHTML = `<div class="image"><i class="fa-solid fa-vault"></i></div><div class="data"><div class="heading"><p>${obj.title}</p></div><div class="info"><p><i class="fa-solid fa-indian-rupee-sign"></i>${obj.amount}</p><p><i class="fa-solid fa-calendar"></i>${obj.date}</p></div><div class="message"><p><i class="fa-solid fa-comment"></i>${obj.description}</p></div></div><div class="delete-btn" data-id="${obj._id}"><div><i class="fa-solid fa-trash"></i></div></div>`
    const ul = document.querySelector('#investment-list')
    ul.appendChild(li)
}

const displayTransactionIncome = (obj) => {
    const li = document.createElement('li')
    li.classList.add("income-transaction")
    li.innerHTML = `<div class="image"><i class="fa-solid fa-piggy-bank"></i></div><div class="data"><div class="heading"><p>${obj.title}</p></div><div class="info"><p><i class="fa-solid fa-indian-rupee-sign"></i>${obj.amount}</p><p><i class="fa-solid fa-calendar"></i>${obj.date}</p><p><i class="fa-solid fa-comment"></i>${obj.description}</p></div></div><div class="delete-btn" data-id="${obj._id}"><div><i class="fa-solid fa-trash"></i></div></div>`
    const ul = document.querySelector('#transaction-list')
    ul.appendChild(li)
}

const displayTransactionExpense = (obj) => {
    const li = document.createElement('li')
    li.classList.add("expense-transaction")
    li.innerHTML = `<div class="image"><i class="fa-solid fa-money-bill-wave"></i></div><div class="data"><div class="heading"><p>${obj.title}</p></div><div class="info"><p><i class="fa-solid fa-indian-rupee-sign"></i>${obj.amount}</p><p><i class="fa-solid fa-calendar"></i>${obj.date}</p><p><i class="fa-solid fa-comment"></i>${obj.description}</p></div></div><div class="delete-btn" data-id="${obj._id}"><div><i class="fa-solid fa-trash"></i></div></div>`
    const ul = document.querySelector('#transaction-list')
    ul.appendChild(li)
}

const displayTransactionInvestment = (obj) => {
    const li = document.createElement('li')
    li.classList.add("investment-transaction")
    li.innerHTML = `<div class="image"><i class="fa-solid fa-vault"></i></div><div class="data"><div class="heading"><p>${obj.title}</p></div><div class="info"><p><i class="fa-solid fa-indian-rupee-sign"></i>${obj.amount}</p><p><i class="fa-solid fa-calendar"></i>${obj.date}</p><p><i class="fa-solid fa-comment"></i>${obj.description}</p></div></div><div class="delete-btn" data-id="${obj._id}"><div><i class="fa-solid fa-trash"></i></div></div>`
    const ul = document.querySelector('#transaction-list')
    ul.appendChild(li)
}

const validate = (title, amount, date) => {
    if (title == '' || amount == '' || date == '') {
        return false
    }
    else return true
}

const formatDate = (date) => {
    // const parsedDate = new Date(date);
    // const formattedDate = parsedDate.toISOString().split('T')[0];
    // return formattedDate;

    const dateTime = new Date(date);
    const year = dateTime.getFullYear();
    const month = dateTime.getMonth() + 1; // Months are zero-based (0 = January)
    const day = dateTime.getDate();
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    const seconds = dateTime.getSeconds();
    console.log('Date:', year + '-' + month + '-' + day);
    console.log('Time:', hours + ':' + minutes + ':' + seconds);

    date = `${day}-${month}-${year}`

    return date
}

incAdd.addEventListener('click', async () => {

    if (validate(incTitle.value, incAmount.value, incDate.value)) {
        if (incDescription.value == "") incDescription.value = "Not Specified"
        let incTransaction = {
            "category": "income",
            "title": incTitle.value,
            "amount": incAmount.value,
            "description": incDescription.value,
            "date": formatDate(incDate.value),
            "username": username,
        }
        await addTransaction(incTransaction)
        await readTransactions()
        incTitle.value = ""
        incAmount.value = ""
        incDescription.value = ""
        incDate.value = ""
    }
    else {
        alert("Input field cannot be empty")
    }
})

expAdd.addEventListener('click', async () => {
    if (validate(expTitle.value, expAmount.value, expDate.value)) {
        if (expDescription.value == "") expDescription.value = "Not Specified"
        let expTransaction = {
            "category": "expense",
            "title": expTitle.value,
            "amount": expAmount.value,
            "description": expDescription.value,
            "date": formatDate(expDate.value),
            "username": username,
        }
        await addTransaction(expTransaction)
        await readTransactions()
        expTitle.value = ""
        expAmount.value = ""
        expDescription.value = ""
        expDate.value = ""
    }
    else {
        alert("Input field cannot be empty")
    }
})

invAdd.addEventListener('click', async () => {
    if (validate(invTitle.value, invAmount.value, invDate.value)) {
        if (invDescription.value == "") invDescription.value = "Not Specified"
        let invTransaction = {
            "category": "investment",
            "title": invTitle.value,
            "amount": invAmount.value,
            "description": invDescription.value,
            "date": formatDate(invDate.value),
            "username": username,
        }
        await addTransaction(invTransaction)
        await readTransactions()
        invTitle.value = ""
        invAmount.value = ""
        invDescription.value = ""
        invDate.value = ""
    }
    else {
        alert("Input field cannot be empty")
    }
})

const deleteTransaction = () => {
    deleteBtn.forEach(btn => {
        btn.addEventListener('click', async () => {
            await removeTransaction(btn.dataset.id)
            await readTransactions()
        })
    })
}

const Chartfun = (originalarr) => {
    arr = [...originalarr].reverse()
    let incomeData = []
    let expenseData = []
    let investmentData = []
    arr.forEach(obj => {
        if (obj.category === 'expense') {
            expenseData.push(obj)
        }
        else if (obj.category === 'income') {
            incomeData.push(obj)
        }
        else {
            investmentData.push(obj)
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
                borderColor: 'rgb(75 192 192)',
                backgroundColor: 'rgb(75 192 192)',
            },
            {
                label: 'Expense',
                data: expenseData.map(d => ({
                    x: d.date,
                    y: d.amount
                })),
                borderWidth: 2,
                lineTension: 0,
                borderColor: 'rgb(255 99 122)',
                backgroundColor: 'rgb(255 99 122)',
            },
            {
                label: 'Investment',
                data: investmentData.map(d => ({
                    x: d.date,
                    y: d.amount
                })),
                borderWidth: 2,
                lineTension: 0,
                borderColor: '#36a2eb',
                backgroundColor: '#36a2eb',
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#fff' // Text color for y-axis
                    },
                    grid: {
                        color: '#fff',
                        borderColor: '#fff'
                    }
                },
                x: {
                    ticks: {
                        color: '#fff' // Text color for x-axis
                    },
                    grid: {
                        color: '#fff',
                        borderColor: '#fff'
                    }
                }
            }
        }
    })
    Chart.defaults.color = '#fff';
}

readTransactions()