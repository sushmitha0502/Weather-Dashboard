import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

jest.mock('./services/weatherAPI', () => ({
  fetchWeather: jest.fn((city) =>
    Promise.resolve({
      name: city,
      main: {
        temp: 28,
        humidity: 60,
      },
      weather: [{ main: 'Sunny', icon: '01d', description: 'clear sky' }],
      wind: { speed: 10 },
    })
  ),
}));

describe('Weather Dashboard App', () => {
  test('renders Weather Dashboard title', () => {
    render(<App />);
    const heading = screen.getByText(/Weather Dashboard/i);
    expect(heading).toBeInTheDocument();
  });

  test('renders search input and button', () => {
    render(<App />);
    expect(screen.getByPlaceholderText(/Enter city/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  test('fetches and displays default city weather', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText(/Bangalore/i)).toBeInTheDocument();
      expect(screen.getByText(/28°C/i)).toBeInTheDocument();
      expect(screen.getByText(/Sunny/i)).toBeInTheDocument();
    });
  });
});
