/* eslint-disable no-undef */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import HomePage from '../HomePage';
import { getReposList } from '../../api/api';

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
  it('returns a list of repositories for the given user', async () => {
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([{ name: 'Repo 1' }, { name: 'Repo 2' }])
      })
    );
    global.fetch = mockFetch;
    const result = await getReposList('fake-user-name');

    expect(mockFetch).toHaveBeenCalledWith('https://api.github.com/users/fake-user-name/repos');
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(2);
    expect(result[0]).toHaveProperty('name', 'Repo 1');
    expect(result[1]).toHaveProperty('name', 'Repo 2');
  });
});
