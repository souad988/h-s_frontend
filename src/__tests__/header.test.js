/*
import React from 'react';
import {
  cleanup, fireEvent, render, waitFor,
} from '@testing-library/react';
import Header1 from '../components/header/Header1';

afterEach(cleanup);

describe('Header1', () => {
  it('changes to dark theme when theme button is clicked', () => {
    // Render the header component
    const { getByTestId } = render(<Header1 />);

    // Find the LightModeOutlined icon by test ID
    const lightModeIcon = getByTestId('LightModeOutlinedIcon');
    const themeButton = getByTestId('theme-button'); // <-- Fix this line
    fireEvent.click(themeButton);
    // Find the DarkModeOutlined icon by test ID
    // const darkModeIcon = queryByTestId('DarkModeOutlinedIcon');
    // Assert that the icon exists
    expect(lightModeIcon).toBeInTheDocument();
  });
  it('is language selector rendred in header1?', () => {
    // Render the header component
    const { getByTestId } = render(<Header1 />);

    // Find the LightModeOutlined icon by test ID
    const list = getByTestId('nav-language');
    // Assert that the icon exists
    expect(list).toBeInTheDocument();
  });
  it('redirects to a valid URL when the link is clicked', async () => {
    const { getByRole } = render(
      <Header1 />,
    );
    const link = getByRole('link', { name: 'twitter' });
    // Click the link
    fireEvent.click(link);
    // let currentURL = window.location.href;
    // Wait for the redirect to happen (you might need to adjust the time or use specific event)
    let currentURL = '';
    await waitFor(() => {
      // Get the current URL after redirection
        currentURL = window.location.href;
    });
    expect(currentURL).toMatch('https://twitter.com/souadElmansouri');
  });
});
*/
