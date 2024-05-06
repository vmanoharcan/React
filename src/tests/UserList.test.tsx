import { render, screen, waitFor } from '@testing-library/react';
import UserList from '../components/UserList';

// Mocking the fetch function
const mockFetch = jest.fn();

// Mock data
const mockUsers = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' },
];

// Mocking the UserCard component
jest.mock('../components/UserCard', () => {
    return jest.fn(({ user }) => (
      <div data-testid={`user-card-${user.id}`}>
        <span>{user.name}</span>
      </div>
    ));
  });

beforeAll(() => {
  // Mocking the global fetch function
  global.fetch = mockFetch;
});

test('renders user list', async () => {
  // Mocking fetch response
  mockFetch.mockResolvedValueOnce({
    json: async () => ({ data: { users: mockUsers } }),
  });

  // Rendering the component
  render(<UserList />);

  // Verifying loading text is shown
  expect(screen.getByText('Loading...')).toBeInTheDocument();

  // Waiting for data to load
  await waitFor(() => expect(screen.queryByText('Loading...')).toBeNull());

  // Verifying user cards are rendered
  mockUsers.forEach(user => {
    expect(screen.getByTestId(`user-card-${user.id}`)).toBeInTheDocument();
  });
});