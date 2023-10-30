class User_Dashboard {
    constructor(income, budget_spent, budget_savings, total_savings) {
        this.income = income;
        this.budget_spent = budget_spent;
        this.budget_savings = budget_savings;
        this.total_savings = total_savings;
    }
    displaySpent() {
        console.log(`You spent $${this.budget_spent}`);
        return this.budget_spent;
    }
}

function displayTotalSpent(i, bs, bsv, ts) {
    // create a new user and display total spent
    const first_user = new User_Dashboard(i, bs, bsv, ts);
    if(Number.isInteger(first_user.budget_spent)) { // check if it's a number
        return first_user.displaySpent(); // return the number
    } else {
        return 'Error in database. Spent should be an integer.' // error message
    }
}

module.exports = displayTotalSpent;