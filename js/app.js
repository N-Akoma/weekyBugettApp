//classes
class Budget{
    constructor(budget, budgetLeft){
        this.budget = Number(budget);
        this.budgetLeft = this.budget
    }

    subBudget(amount){
        return this.budgetLeft -=amount
    }
}

class HTML{
    addToBudget(amount){
        budgetTotal.innerHTML = `${amount}`
        budgetLeft.innerHTML =` ${amount}`
    }
    message(mess, danger){
        const div = document.createElement('div')
        div.classList.add('text-center', 'alert', danger)
        div.appendChild(document.createTextNode(mess))

        //add before the form
        document.querySelector('.primary').insertBefore(div, userForm);

        //clear the error message
        setTimeout(function(){
            document.querySelector('.primary .alert').remove();
            userForm.reset()
        },2000)
    }

    setBuget(expense, amount){
        const expenseList = document.querySelector('#expenses ul')
        const li = document.createElement('li')
        li.classList ='list-group-item d-flex justify-content-between align-items-center'

        li.innerHTML = `
        ${expense}
        <span class='badge badge-primary badge-pill'>${amount}<span>
        `
        expenseList.appendChild(li)
    }

    //checks the amount and substract

    checkBudget(amountName){
        const subAmt = budget.subBudget(amountName);
        budgetLeft.innerHTML =`${subAmt}`
        html.message('Added..', 'alert-info')
        if((budget.budget / 4) > subAmt){
        budgetLeft.parentElement.parentElement.classList.remove('alert-success', 'alert-warning')
        budgetLeft.parentElement.parentElement.classList.add('alert-danger')
        }else if((budget.budget / 2) > subAmt){
            budgetLeft.parentElement.parentElement.classList.remove('alert-success')
            budgetLeft.parentElement.parentElement.classList.add('alert-warning')
        }
    }
}




//variables
const userForm = document.querySelector('#add-expense');
const budgetTotal = document.querySelector('span#total')
const budgetLeft = document.querySelector('span#left')


const html = new HTML()
let budget, addBudget;


EventListeners()
//Event Listeners
function EventListeners(){
    document.addEventListener('DOMContentLoaded', function(){
        addBudget = prompt('What is your Budget for the week')
        if(addBudget === null || addBudget === '' || addBudget === '0'){
            window.location.reload()
        }else{
            //creates a new budget class
            budget = new Budget(addBudget)
            html.addToBudget(budget.budget)
        }
    })

    userForm.addEventListener('submit', function(e){
        e.preventDefault()
        const expenseName = document.querySelector('#expense').value
        const amountName = document.querySelector('#amount').value
        if(expenseName === '' || amountName === ''){
            html.message('there was an error, all fields are mandetory', 'alert-danger')
        }else{
            html.setBuget(expenseName, amountName);
            html.checkBudget(amountName)
        }
    })
}