/* eslint-disable no-undef */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import HomePage from '../HomePage';

describe('Home Page', () => {
  it('should render the query search', async () => {
    render(<HomePage />);
    const inputElement = screen.getByRole('textbox', { name: /github username/i });
    const buttonElement = screen.getByRole('button', { name: /search/i });

    fireEvent.change(inputElement, { target: { value: 'palto' } });
    expect(inputElement.value).toBe('palto');

    fireEvent.click(buttonElement);
    await waitFor(() => {
      const divElement = screen.getByRole('heading', { name: /showing users for 'palto'/i });
      expect(divElement).toBeInTheDocument();
    });
  });
});
