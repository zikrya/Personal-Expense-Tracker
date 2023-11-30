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
        test("add trans", async () => {
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
    })

})