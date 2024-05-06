import { render, fireEvent } from '@testing-library/react';
import UserDetails from '../components/UserDetails';

// Mock user data
const mockUser = {
  id: '1',
  firstname: 'John',
  lastname: 'Doe',
  role: 'User',
  join_date: '2022-05-01',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  avatar: 'https://example.com/avatar.jpg',
  username: 'JohnD',
  email: 'jd@abc.com',
};

describe('UserDetails', () => {
  beforeEach(() => {
    // Clear document body and remove any added classes before each test
    document.body.className = '';
  });

  test('adds overflow-hidden class to body when isOpen is true', () => {
    render(<UserDetails isOpen={true} onClose={() => {}} user={mockUser} />);
    expect(document.body.classList.contains('overflow-hidden')).toBe(true);
  });

  test('removes overflow-hidden class from body when isOpen is false', () => {
    render(<UserDetails isOpen={true} onClose={() => {}} user={mockUser} />);
    render(<UserDetails isOpen={false} onClose={() => {}} user={mockUser} />);
    expect(document.body.classList.contains('overflow-hidden')).toBe(false);
  });

  test('renders correctly when isOpen is true', () => {
    const { getByText } = render(<UserDetails isOpen={true} onClose={() => {}} user={mockUser} />);
    expect(getByText('User Details')).toBeInTheDocument();
  });

  test('does not render when isOpen is false', () => {
    const { queryByText } = render(<UserDetails isOpen={false} onClose={() => {}} user={mockUser} />);
    expect(queryByText('User Details')).not.toBeInTheDocument();
  });

  test('calls onClose function when "Close" button is clicked', () => {
    const onCloseMock = jest.fn();
    const { getByText } = render(<UserDetails isOpen={true} onClose={onCloseMock} user={mockUser} />);
    fireEvent.click(getByText('Close'));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
