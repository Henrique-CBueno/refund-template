const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")
const form = document.querySelector("form")

const expenseList = document.querySelector("ul")
const expenseQuantity = document.querySelector("aside header p span")
const expenseTotal = document.querySelector("aside header h2")




form.onsubmit = (event)=>{
    event.preventDefault()



    const newExpense ={
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        currate_at: new Date(),
    }

    expenseAdd(newExpense)

    console.log(newExpense)
    amount.value = ""
    expense.value = ""
    category.value = ""
}





function expenseAdd(newExpense){
    try{
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")

        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", `${newExpense.category_name}`)

        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")

        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense

        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.category_name

        expenseInfo.append(expenseName, expenseCategory)

        const expenseAmount = document.createElement("span")
        expenseAmount.classList.add("expense-amount")
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`

        const expenseDelete = document.createElement("img")
        expenseDelete.classList.add("remove-icon")
        expenseDelete.setAttribute("src", `img/remove.svg`)
        expenseIcon.setAttribute("alt", `remove button`)

        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, expenseDelete)

        expenseList.append(expenseItem)


        updateTotals()


    }catch(error){
        alert("Não foi possivel adicionar a lista de despesas")
        console.log(error)
    }
}




amount.oninput = ()=> {
    let value = amount.value.replace(/\D/g, "")

    value = Number(value) / 100

    amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value) {

    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    return value

}



function updateTotals(){
    try{
        const itens = expenseList.children

        expenseQuantity.textContent = `${itens.length} ${
            itens.length > 1  ? "Despesas" : "Despesa"
        }`


        let total = 0

        for(let item = 0; item < itens.length; item++){
            const itemAmount = itens[item].querySelector(".expense-amount")
            
            let value = itemAmount.textContent.replace(/[^\d]/g, "").replace(",", ".")
            value = parseFloat(value)

            if(isNaN(value)){
                return alert("nao foi possivel retornar o total")
            }
            
            total += Number(value)
        }

        const symbolBRL = document.createElement("small")
        symbolBRL.textContent = "R$"

        total = formatCurrencyBRL(total / 100).toUpperCase().replace("R$", "")


        expenseTotal.innerHTML = ""

        expenseTotal.append(symbolBRL, total)
    }catch(error){
        alert("Não foi possivel alterar o total")
        console.log(error)
    }
}


expenseList.addEventListener("click", (e)=>{
    
    if(e.target.classList.contains("remove-icon")){
        const item = e.target.closest(".expense")
        item.remove()
        updateTotals()
    }

})
