import RegisterSurvey from "../pages/RegisterSurvey";
import { render, screen, fireEvent, act } from "@testing-library/react"
import '@testing-library/jest-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContext} from '../context/AuthContext';

const currentUser = {
    uid: "asdasdas"
}
const MockLoginScreen = () => {
    return (
        <AuthContext.Provider value = {{currentUser}}>
        <Router>
            <RegisterSurvey/>
        </Router>
        </AuthContext.Provider>
    );
};

describe("survey screen", () => {
    describe("Visible components on load", () => {
        test("renders survey", () => {
            render(<MockLoginScreen/>);

            const firstNameInput = screen.getByTestId("fname")
            const lastNameInput = screen.getByTestId("lname")
            const collegeInput = screen.getByTestId("college")
            const submitButton = screen.getByRole("button", {name: /Submit/i });
            const form = screen.getByTestId("survey")

            expect(firstNameInput).toBeInTheDocument();
            expect(lastNameInput).toBeInTheDocument();
            expect(collegeInput).toBeInTheDocument();
            expect(submitButton).toBeInTheDocument();
            expect(form).toBeInTheDocument();
        })
    })
    describe("functionality", () => {
        const fillAndSubmit = (first, last, college, button) => {
            const firstNameInput = screen.getByTestId("fname")
            const lastNameInput = screen.getByTestId("lname")
            const collegeInput = screen.getByTestId("college")

            fireEvent.change(firstNameInput, {target: {value: first}});
            fireEvent.change(lastNameInput, {target: {value: last}});
            fireEvent.change(collegeInput, {target: {value: college}});
            fireEvent.click(button);
        }
        test("submit survey", () => {
            render(<MockLoginScreen/>);
            const firstNameInput = screen.getByTestId("fname")
            const lastNameInput = screen.getByTestId("lname")
            const collegeInput = screen.getByTestId("college")
            const submitButton = screen.getByRole("button", {name: /Submit/i });
            const handleSubmit = jest.fn();
            submitButton.onsubmit = handleSubmit;
            fillAndSubmit("first", "last", "college", submitButton);
            handleSubmit.mockReturnValue(
                {
                    firstName: firstNameInput.value,
                    lastName: lastNameInput.value,
                    college: collegeInput.value
                }
            )
            expect(handleSubmit()).toStrictEqual({firstName: "first", lastName: "last", college: "college"});
        })

    })
})