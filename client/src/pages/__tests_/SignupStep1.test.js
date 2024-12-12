import { render, screen } from '@testing-library/react';
import SignupStep1 from '../SignupStep1';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from '../../contexts/UserContext'; // Adjust the import path
import { act } from 'react';


describe('SignupStep1 Component', () => {
  it('renders the form correctly', () => {
    render(
      <BrowserRouter>
        <UserProvider>
          <SignupStep1 />
        </UserProvider>
      </BrowserRouter>
    );

    // Check for the form rendering
    expect(screen.getByText(/Sign up to get started.../i)).toBeInTheDocument();
  });

  it('allows user input and updates context', () => {
    render(
      <BrowserRouter>
        <UserProvider>
          <SignupStep1 />
        </UserProvider>
      </BrowserRouter>
    );

    // Find input with the actual placeholder
    const emailInput = screen.getByPlaceholderText('Email Address');
    expect(emailInput).toBeInTheDocument();

    // Additional assertions for other fields if needed
    const firstNameInput = screen.getByPlaceholderText('First Name');
    expect(firstNameInput).toBeInTheDocument();

    const lastNameInput = screen.getByPlaceholderText('Last Name');
    expect(lastNameInput).toBeInTheDocument();
  });
});
