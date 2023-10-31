import {render, screen} from '@testing-library/react'
import { BrowserRouter as Router} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import NavBar from "../components/NavBar";
it("should render correctly", async () => {
    render(<Router><NavBar/></Router>);
    expect(screen.getByText(/Wise Wallet/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
});
it("should go to login", async () => {
    render(<Router><NavBar/></Router>);
    await userEvent.click(screen.getByText(/Login/i))
    expect(global.window.location.href).toBe("http://localhost/login");
});
it("should go to register", async () => {
    render(<Router><NavBar/></Router>);
    await userEvent.click(screen.getByText(/Register/i))
    expect(global.window.location.href).toBe("http://localhost/register");
});