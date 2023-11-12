# Wise Wallet Architecture
## Component Digram
![Component Digram](/public/Component_Digram.png)

### Description:

User can sign up an account in the register component. The register component passes the account info to the AuthenticationDB.The login component is used to log in to the app and passes the account info through Authentication checker.The Home component recieves the data from the AuthenticationDB, if the account is new user, it bring a user to survey component.The survey component collects input from users and store data to firestoreDB.
If it is existing account, the Home component bring it to the Transaction component. The Transaction component fetch data from firestoreDB. The add Transaction Modal component is dependent on Transaction component, it stores new transaction into firestoreDB.

## Relationship Diagram
![Relationship Diagram](/public/ER_Diagram.png)

### Description:

The authentication table has 4 feilds including one primary key, and has a one-to-one relationship with the User_TransactionDoc table, the Surveys table, and the User_Info table.
The User_TransactionDoc table has 2 feilds including one foreign key and has a one-to-many relationship with the T_Documents. 
The Surveys table has 2 feilds including one foreign key and has a one-to-one relationship with the S_Documents. 
The User_Info table has 2 feilds including one foreign key and has a one-to-one relationship with the U_Documents. 
The T_Docunments table has 4 feilds including one foreign key.
The U_Docunments table has 4 feilds including one foreign key. 
The S_Docunments table has 16 feilds including one foreign key.

## Flow Diagram 
![Flow Diagram](/public/Flow_Diagram.png)

### Description:

The flow diagram shows the adding new transaction feature in our appliaction. When the actor in the transaction table page, actor has an option to add a new transaction.  When actor clicks "add transaction" button, there will pop up a Add Transaction modal. If actor enters the valid inpit of amount, the data will be collected and stored to the transaction collection in DB. After the data is saved, it will return the new transaction list. When the New Transaction List recieves new list, it display the new list to the Transaction Table. 
Alternativly, if the actor entered an invalid amount or not entered, it will go back to the Transaction Table and display an fail message.