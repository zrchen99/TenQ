import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import Footer from './Footer';

describe('Footer component', () => {
  const authorName = 'Ziang Chen';
  const validPortfolioUrl = 'https://portfolio.com/zrchen99';
  const invalidPortfolioUrl = 'https://not-a-valid-url';

  const renderComponent = (name = authorName, url = validPortfolioUrl) =>
    render(
      <Router>
        <Footer authorName={name} portfolioUrl={url} />
      </Router>
    );

  test('renders with correct author name and portfolio URL', () => {
    renderComponent();
    expect(screen.getByText(new RegExp(authorName))).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', validPortfolioUrl);
  });

  test('renders with a default message when authorName is empty', () => {
    renderComponent('');
    // Assuming your component handles empty author names by displaying a default message.
    expect(screen.getByText(/Click to see my portfolio!/)).toBeInTheDocument();
  });

  test('renders correctly with an invalid portfolio URL', () => {
    renderComponent(authorName, invalidPortfolioUrl);
    expect(screen.getByRole('link')).toHaveAttribute('href', invalidPortfolioUrl);
  });

  // test('link has correct aria-label for accessibility', () => {
  //   renderComponent();
  //   expect(screen.getByRole('link')).toHaveAttribute('aria-label', `Visit ${authorName}'s portfolio`);
  // });

});