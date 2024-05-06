import React, { useState } from "react";
import UserDetails from "./UserDetails";
import { IUser } from "./User";

interface UserCardProps {
  user: IUser;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='bg-white rounded-xl shadow-md relative'>
      <div className='p-4 text-center'>
        <div className='mb-6 relative w-full rounded-xl bg-indigo-500'>
          <div className="aspect-w-16 aspect-h-9 w-40 h-40 inline-flex items-center justify-center rounded-full bg-white">
            {user.avatar && <img src={user.avatar} alt="User avatar" className="object-cover w-32 h-32" />}
          </div>
        </div>

        <div className='mb-6'>
          <h3 className='text-xl font-bold'>{user.firstname} {user.lastname}</h3>
        </div>

        <div className='flex flex-col lg:flex-row justify-center mb-4'>
          <button onClick={openModal}
            className='h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm'
          >
            View More
          </button>

          <UserDetails data-testid="user-modal" isOpen={isModalOpen} onClose={closeModal} user={user}/>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
