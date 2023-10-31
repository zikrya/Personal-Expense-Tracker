import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import TestComponent from "../components/TestComponent";
test('renders the correct text', () => {
    const { getByText } = render(<TestComponent/>);
    const textElement = getByText(/Hello world/i);
    expect(textElement).toBeInTheDocument();
})