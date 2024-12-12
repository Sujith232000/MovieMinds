import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ForgotPassword from '../ForgotPassword';
import axios from 'axios';

// Mock axios
jest.mock('axios');

// Mock window.alert
jest.spyOn(window, 'alert').mockImplementation(() => {});

describe('ForgotPassword Component', () => {
  it('renders the ForgotPassword component', () => {
    render(
      <BrowserRouter>
        <ForgotPassword />
      </BrowserRouter>
    );

    // Check if the fields and button are present
    expect(screen.getByPlaceholderText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Re-Enter Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Change Password/i })).toBeInTheDocument();
  });

  it('displays an alert if passwords do not match', () => {
    render(
      <BrowserRouter>
        <ForgotPassword />
      </BrowserRouter>
    );

    // Fill out the form with mismatched passwords
    fireEvent.change(screen.getByPlaceholderText(/Email Address/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Last Name/i), {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByPlaceholderText('Re-Enter Password'), {
      target: { value: 'password456' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Change Password/i }));

    // Assert alert is called
    expect(window.alert).toHaveBeenCalledWith('Passwords do not match!');
  });

  it('submits the form successfully with valid input', async () => {
    axios.put.mockResolvedValueOnce({ status: 200 });

    render(
      <BrowserRouter>
        <ForgotPassword />
      </BrowserRouter>
    );

    // Fill out the form with matching passwords
    fireEvent.change(screen.getByPlaceholderText(/Email Address/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Last Name/i), {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByPlaceholderText('Re-Enter Password'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Change Password/i }));

    // Wait for axios and assertions
    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith('http://localhost:4000/forgot-password', {
        email: 'test@example.com',
        lastName: 'Doe',
        password: 'password123',
      });
      expect(window.alert).toHaveBeenCalledWith('Password updated successfully!');
    });
  });

  it('handles API error gracefully', async () => {
    axios.put.mockRejectedValueOnce(new Error('Failed to update password'));

    render(
      <BrowserRouter>
        <ForgotPassword />
      </BrowserRouter>
    );

    // Fill out the form with valid input
    fireEvent.change(screen.getByPlaceholderText(/Email Address/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Last Name/i), {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByPlaceholderText('Re-Enter Password'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Change Password/i }));

    // Wait for axios and assertions
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Failed to update password. Please try again.');
    });
  });
});
