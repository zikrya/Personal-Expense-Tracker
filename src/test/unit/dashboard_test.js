// The class below is just created as context, and is not what we are actually testing.
class User_Dashboard {
    constructor(income, budget_spent, budget_savings, total_savings) {
        this.income = income;
        this.budget_spent = budget_spent;
        this.budget_savings = budget_savings;
        this.total_savings = total_savings;
    }
}

// The function below is what we are testing to ensure that the displayed information is a number 
// based on the given inputs to the function. 
export function returnTotalSpent(i, bs, bsv, ts) {
    // create a new user and display total spent and ensure the display is a number.
    const first_user = new User_Dashboard(i, bs, bsv, ts); // create a new user
    // the code below is what we are testing -- to determine if the returned value is a number or not.
    if(Number.isInteger(first_user.budget_spent)) { // check if budgetspent is a number
        return first_user.budget_spent; // return the number
    } else {
        return 'Error in database. Spent should be an integer.' // display an error message
    }
}

// export default returnTotalSpent;