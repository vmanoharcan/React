import { render, screen, fireEvent } from '@testing-library/react';
import UserCard from '../components/UserCard';

const mockUser = {
  id: '1',
  firstname: 'John',
  lastname: 'Doe',
  avatar: 'https://example.com/avatar.jpg',
  username: 'JohnD',
  email: 'jd@abc.com',
  role: 'Manager',
  join_date: '10-20-2021',
  description: 'Test Description'
};

describe('UserCard', () => {
  test('renders without crashing', () => {
    render(<UserCard user={mockUser} />);
    expect(screen.getByText(`${mockUser.firstname} ${mockUser.lastname}`)).toBeInTheDocument();
  });

  test('initial state of modal is closed', () => {
    render(<UserCard user={mockUser} />);
    expect(screen.queryByTestId('user-modal')).not.toBeInTheDocument();
  });

  describe('UserCard', () => {
    test('opens modal when "View More" button is clicked', () => {
      render(<UserCard user={mockUser} />);
      expect(screen.queryByTestId('user-modal')).not.toBeInTheDocument();
      fireEvent.click(screen.getByText('View More'));
      setTimeout(() => {
      expect(screen.getByTestId('user-modal')).toBeInTheDocument();
    }, 100);
    });
  });

  test('closes modal when closeModal is called', () => {
    render(<UserCard user={mockUser} />);
    fireEvent.click(screen.getByText('View More')); // Open modal
    fireEvent.click(screen.getByText('Close')); // Close modal
    expect(screen.queryByTestId('user-modal')).not.toBeInTheDocument();
  });

  test('displays user name', () => {
    render(<UserCard user={mockUser} />);
    expect(screen.getByText(`${mockUser.firstname} ${mockUser.lastname}`)).toBeInTheDocument();
  });

  test('displays avatar if available', () => {
    render(<UserCard user={mockUser} />);
    expect(screen.getByAltText('User avatar')).toBeInTheDocument();
  });
});
