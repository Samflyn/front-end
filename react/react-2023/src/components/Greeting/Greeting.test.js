import { render, screen } from '@testing-library/react';
import Greeting from './Greeting';
import userEvent from '@testing-library/user-event';

// for creating test suits
describe('Greeting component', () => {
  test('renders', () => {
    //   Arrange
    render(<Greeting />);

    //   Act
    // do nothing

    //   Assert
    const paragraphElement = screen.queryByTestId('data-p');
    expect(paragraphElement).toBeInTheDocument();
  });

  test('renders initial text if the button is not clicked', () => {
    render(<Greeting />);

    expect(
      screen.getByText('Initial Text', { exact: false })
    ).toBeInTheDocument();
  });

  //   test('renders changed text if the button is clicked', () => {
  //     render(<Greeting />);

  //     userEvent.click(screen.getByRole('button'));

  //     expect(
  //       screen.getByText('Changed Text', { exact: false })
  //     ).toBeInTheDocument();
  //   });

  //   test('renders with mock http request', () => {
  //     window.fetch = jest.fn;
  //     window.fetch.mockResolvedValueOnce({
  //       json: async () => {},
  //     });
  //   });
});
