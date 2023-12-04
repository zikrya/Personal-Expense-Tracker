import { render, fireEvent, waitFor } from '@testing-library/react';
import TransTable from '../pages/TransTable';
import * as authContext from '../context/AuthContext';
import * as firebaseConfig from '../utils/firebase-config';

// Unit Tests - Samira
// Mocks
jest.mock('../utils/firebase-config');

describe('TransTable Component Tests', () => {
    const mockCurrentUser = { uid: '123' };
    const mockTransactions = [{ id: '1', date: '2023-04-01', amount: '100' }];
    const mockIncome = '5000';
    const mockBudget = '2000';
    const mockSavingGoal = '1500';

    beforeEach(() => {
        // Mock useAuth
        jest.spyOn(authContext, 'useAuth').mockImplementation(() => ({ currentUser: mockCurrentUser }));
        // Mock API calls
        firebaseConfig.getTransactionFromDB.mockResolvedValue(mockTransactions);
        firebaseConfig.getIncome.mockResolvedValue(mockIncome);
        firebaseConfig.getBudget.mockResolvedValue(mockBudget);
        firebaseConfig.getSavingGoal.mockResolvedValue(mockSavingGoal);
    });

    it('should render without crashing', () => {
        render(<TransTable />);
    });

    it('fetches and displays transactions on mount', async () => {
        const { findByText } = render(<TransTable />);
        expect(await findByText('$100')).toBeInTheDocument();
    });

    it('calculates and displays monthly spent correctly', async () => {
        const { findByText } = render(<TransTable />);
        expect(await findByText('Monthly Spent')).toBeInTheDocument();
        expect(await findByText('$100')).toBeInTheDocument(); // example value
    });

    test('useProtectedRoute hook is called on mount', () => {
        const useProtectedRouteSpy = jest.spyOn(require("../components/useProtectedRoute"), 'useProtectedRoute');
        render(<TransTable />);
        expect(useProtectedRouteSpy).toHaveBeenCalled();
    });

    test('API call to getTransactionFromDB is made when currentUser is present', async () => {
        render(<TransTable />);
        expect(firebaseConfig.getTransactionFromDB).toHaveBeenCalledWith(mockCurrentUser.uid);
    });

    test('state updates correctly when transactions are fetched', async () => {
        const transactions = [{ id: 1, description: 'Groceries', amount: 50, date: '2023-01-01' }];
        firebaseConfig.getTransactionFromDB.mockResolvedValue(transactions);
        render(<TransTable />);
        await waitFor(() => {
            expect(screen.getByText('Groceries')).toBeInTheDocument();
        });
    });

    test('clicking on TrashIcon toggles showTrashIcon state', async () => {
        render(<TransTable />);
        const trashIcon = screen.getByTestId('trash-icon-toggle');
        fireEvent.click(trashIcon);
        expect(screen.getByTestId('delete-confirm')).toBeInTheDocument();
    });


});
