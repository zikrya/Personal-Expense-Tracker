import App from "../App"
import { render, screen, fireEvent, act } from "@testing-library/react"
import '@testing-library/jest-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
jest.mock("../images/addImage.png")
global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}))
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
const MockLoginScreen = () => {
    return (
        <App/>
    )
};
describe("app", () => {
    describe("Visible components on load", () => {
        test("render App", async () => {
            await act( async () => render(<MockLoginScreen/>));

            const app = screen.getByTestId("app");
            expect(app).toBeInTheDocument()
        })
    })
})