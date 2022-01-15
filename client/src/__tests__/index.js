import { render, fireEvent, screen } from '@testing-library/react';
import App from '../App';


test('renders ok', () => {
  render(<App />);
  screen.debug(); 
});

test('renders without crashing', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Access/i);
  expect(linkElement).toBeInTheDocument(); 
});

test('renders custom element', () => {
  render(<div data-testid="custom-element" />);
  const element = screen.getByTestId('custom-element');
  expect(element).toBeInTheDocument();
});






// import { render, fireEvent, screen } from '@testing-library/react';
// import App from '../App';


// test('renders ok', () => {
//   render(<App />);
//   screen.debug(); 
// });

// test('renders without crashing', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/Access/i);
//   expect(linkElement).toBeInTheDocument(); 
// });

// test('renders custom element', () => {
//   render(<div data-testid="custom-element" />);
//   const element = screen.getByTestId('custom-element');
//   expect(element).toBeInTheDocument();
// });
