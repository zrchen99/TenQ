import { render, screen } from '@testing-library/react';
import ChatItem from './ChatItem';

describe('ChatItem', () => {
  test('renders assistant message correctly', () => {
    const content = 'This is an assistant message';
    render(<ChatItem content={content} role="assistant" />);
    expect(screen.findByText(new RegExp(content))).toBeInTheDocument();
  });

  test('renders user message correctly', () => {
    const content = 'This is a user message';
    render(<ChatItem content={content} role="user" />);
    expect(screen.findByText(new RegExp(content))).toBeInTheDocument();
  });
  // More tests here for different scenarios
});