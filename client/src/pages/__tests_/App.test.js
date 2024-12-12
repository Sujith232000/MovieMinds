import { render, screen } from '@testing-library/react';
import App from '/Users/sanjna/Desktop/Software-Project/MovieMinds/client/src/App.js';

test('renders welcome page', () => {
  render(<App />);
  const heading = screen.getByText(/WELCOME TO MOVIE MIND's/i);
  expect(heading).toBeInTheDocument();
});
