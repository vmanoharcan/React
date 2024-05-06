import { useEffect } from "react";
import { IUser } from "./User";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: IUser;
}

const UserDetails: React.FC<ModalProps> = ({ isOpen, onClose, user }) => {
    useEffect(() => {
        const body = document.querySelector('body');
        if (isOpen) {
            body?.classList.add('overflow-hidden');
        } else {
            body?.classList.remove('overflow-hidden');
        }

        return () => {
            body?.classList.remove('overflow-hidden');
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
                <div className="bg-white p-6 rounded-lg w-96">
                    <h2 className="text-lg font-bold mb-4">User Details</h2>

                    <div className='mb-6 relative w-full rounded-xl bg-indigo-500'>
                        <div className="aspect-w-16 aspect-h-9 w-40 h-40 inline-flex items-center justify-center rounded-full bg-white">
                            {user.avatar && <img src={user.avatar} alt="User avatar" className="object-cover w-32 h-32" />}
                        </div>
                    </div>

                    <div className='mb-6'>
                        <div><strong>FirstName: </strong>{user.firstname}</div>
                        <div><strong>LastName: </strong> {user.lastname}</div>
                        <div><strong>Role: </strong>{user.role}</div>
                        <div><strong>Join date:  </strong>{user.join_date}</div>
                        <div className="text-center mt-6">{user.description}</div>
                    </div>

                    <button onClick={onClose} className='h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm'>Close</button>
                </div>
            </div>

        </>
    )
}

export default UserDetails