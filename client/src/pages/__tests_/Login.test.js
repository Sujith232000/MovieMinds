jest.mock('../../contexts/UserContext', () => ({
  useUser: jest.fn(() => ({
    setEmail: jest.fn(), // A basic mock for setEmail
  })),
}));
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../Login'; // Adjust path if needed
import { useUser } from '../../contexts/UserContext'; // Mock this
import { act } from 'react';


// Mock the useUser context
jest.mock('../../contexts/UserContext', () => ({
  useUser: jest.fn(),
}));

describe('Login Component', () => {
  beforeEach(() => {
    // Mock the return value of useUser
    useUser.mockReturnValue({
      setEmail: jest.fn(),
    });
  });

  it('renders the login form', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Check for the email input
    const emailInput = screen.getByPlaceholderText(/email/i);
    expect(emailInput).toBeInTheDocument();

    // Check for the password input
    const passwordInput = screen.getByPlaceholderText(/password/i);
    expect(passwordInput).toBeInTheDocument();

    // Check for the login button
    const loginButton = screen.getByRole('button', { name: /login/i });
    expect(loginButton).toBeInTheDocument();
  });
});
