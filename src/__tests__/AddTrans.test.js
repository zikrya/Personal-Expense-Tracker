import AddTransactionForm from "../pages/AddTransactionForm"
import { render, screen, fireEvent, act } from "@testing-library/react"
import '@testing-library/jest-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContext} from '../context/AuthContext';
jest.mock("../utils/firebase-config")
global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}))
let currentUser = {
    uid: "asdasdas"
}
const MockLoginScreen = () => {
    return (
        <AuthContext.Provider value = {{currentUser}}>
        <Router>
            <AddTransactionForm fetchTransactions = {jest.fn()}/>
        </Router>
        </AuthContext.Provider>
    );
};

describe("addtrans page screen", () => {
    describe("Visible components on load", () => {
        test("render addtrans button", async () => {
            render(<MockLoginScreen/>);

            const addButton = screen.getByTestId("add-trans-button");
            expect(addButton).toBeInTheDocument();
            fireEvent.click(addButton)
            await act( async () => render(<MockLoginScreen/>));
            expect(screen.getByTestId("add-trans-date")).toBeInTheDocument()
            expect(screen.getByTestId("add-trans-descrip")).toBeInTheDocument()
            expect(screen.getByTestId("add-trans-descrip-list")).toBeInTheDocument()
            expect(screen.getByTestId("add-trans-amount")).toBeInTheDocument()
            expect(screen.getByTestId("add-trans-submit")).toBeInTheDocument()
        })
    })
    describe("functionality", () => {
        test("add trans today", async () => {
            render(<MockLoginScreen/>);
            const addButton = screen.getByTestId("add-trans-button");
            fireEvent.click(addButton)
            await act( async () => render(<MockLoginScreen/>));
            const descripInput = screen.getByTestId("add-trans-descrip");
            const amountInput = screen.getByTestId("add-trans-amount")
            const submit = screen.getByTestId("add-trans-submit")
            fireEvent.change(descripInput, {target: {value: "Food"}});
            expect(descripInput.value).toBe("Food")
            fireEvent.change(amountInput, {target: {value: "33"}});
            expect(amountInput.value).toBe("33")
            fireEvent.click(submit)
            expect(amountInput.value).toBe("")
            expect(descripInput.value).toBe("")
        })
        test("add trans in future", async () => {
            render(<MockLoginScreen/>);
            const addButton = screen.getByTestId("add-trans-button");
            fireEvent.click(addButton)
            const descripInput = screen.getByTestId("add-trans-descrip");
            const amountInput = screen.getByTestId("add-trans-amount")
            const submit = screen.getByTestId("add-trans-submit")
            const dateInput = screen.getByTestId("add-trans-date")

            fireEvent.change(descripInput, {target: {value: "Food"}});
            fireEvent.change(amountInput, {target: {value: "33"}});
            fireEvent.change(dateInput, {target: {value: "3333-12-03"}});
            expect(dateInput.value).toBe("3333-12-03")
            jest.spyOn(window, 'alert').mockImplementation(() => {});
            fireEvent.click(submit)
            expect(window.alert).toBeCalledWith("The transaction date you entered is in the future. Please update the date to be today's date or before today");
        })
        test("add trans that is too old", async () => {
            render(<MockLoginScreen/>);
            const addButton = screen.getByTestId("add-trans-button");
            fireEvent.click(addButton)
            const descripInput = screen.getByTestId("add-trans-descrip");
            const amountInput = screen.getByTestId("add-trans-amount")
            const submit = screen.getByTestId("add-trans-submit")
            const dateInput = screen.getByTestId("add-trans-date")

            fireEvent.change(descripInput, {target: {value: "Food"}});
            fireEvent.change(amountInput, {target: {value: "33"}});
            fireEvent.change(dateInput, {target: {value: "2000-11-03"}});
            expect(dateInput.value).toBe("2000-11-03")
            jest.spyOn(window, 'alert').mockImplementation(() => {});
            fireEvent.click(submit)
            let today = new Date().toLocaleString().split(',')[0];
            let [month,day,year] = today.split('/')
            day = day.toString().padStart(2, '0')
            today = `${year}-${month}-${day}`
            expect(window.alert).toBeCalledWith(`The transaction date you entered is too old. Please update the date to be today's date or within ${parseFloat(today.split('-')[0])}- ${parseFloat(today.split('-')[0]) - 1}`);
        })
        test("add trans that not too old, not today", async () => {
            render(<MockLoginScreen/>);
            const addButton = screen.getByTestId("add-trans-button");
            fireEvent.click(addButton)
            const descripInput = screen.getByTestId("add-trans-descrip");
            const amountInput = screen.getByTestId("add-trans-amount")
            const submit = screen.getByTestId("add-trans-submit")
            const dateInput = screen.getByTestId("add-trans-date")

            fireEvent.change(descripInput, {target: {value: "Food"}});
            fireEvent.change(amountInput, {target: {value: "33"}});
            fireEvent.change(dateInput, {target: {value: "2023-10-03"}});
            expect(dateInput.value).toBe("2023-10-03")
            fireEvent.click(submit)
            expect(amountInput.value).toBe("")
            expect(descripInput.value).toBe("")
          
        })
        test("add trans with too long description", async () => {
            render(<MockLoginScreen/>);
            const addButton = screen.getByTestId("add-trans-button");
            fireEvent.click(addButton)
            const descripInput = screen.getByTestId("add-trans-descrip");
            const amountInput = screen.getByTestId("add-trans-amount")
            const submit = screen.getByTestId("add-trans-submit")
            jest.spyOn(window, 'alert').mockImplementation(() => {});

            fireEvent.change(descripInput, {target: {value: "yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy"}});
            fireEvent.change(amountInput, {target: {value: "33"}});

            fireEvent.click(submit)
            expect(window.alert).toBeCalledWith("Failed to add a new transaction, the description you entered is too long");
          
        })
        test("add trans with no description", async () => {
            render(<MockLoginScreen/>);
            const addButton = screen.getByTestId("add-trans-button");
            fireEvent.click(addButton)
            const descripInput = screen.getByTestId("add-trans-descrip");
            const amountInput = screen.getByTestId("add-trans-amount")
            const submit = screen.getByTestId("add-trans-submit")
            jest.spyOn(window, 'alert').mockImplementation(() => {});

            fireEvent.change(descripInput, {target: {value: ""}});
            fireEvent.change(amountInput, {target: {value: "33"}});

            fireEvent.click(submit)
            expect(window.alert).toBeCalledWith("Failed to add a new transaction, the description you entered is empty");
          
        })
        test("add trans with incorrect amount", async () => {
            render(<MockLoginScreen/>);
            const addButton = screen.getByTestId("add-trans-button");
            fireEvent.click(addButton)
            const descripInput = screen.getByTestId("add-trans-descrip");
            const amountInput = screen.getByTestId("add-trans-amount")
            const submit = screen.getByTestId("add-trans-submit")
            jest.spyOn(window, 'alert').mockImplementation(() => {});

            fireEvent.change(descripInput, {target: {value: "asdasd"}});
            fireEvent.change(amountInput, {target: {value: ""}});

            fireEvent.click(submit)
            expect(window.alert).toBeCalledWith("Failed to add the new transaction, the amount you entered was incorrectly entered. E.g 123.45");
          
        })
    })

})