import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';
import { IUser } from './User';

const UserList: React.FC = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch('https://9e06da9a-97cf-4701-adfc-9b9a5713bbb9.mock.pstmn.io/users');
                const data = await res.json();
                setUsers(data.data.users);
            } catch (error) {
                console.log('Error fetching data', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return (
        <section className="bg-blue-50 px-4 py-10">
            <div className="container-xl lg:container m-auto">
                <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">Users</h2>
                {loading ?
                    <span className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-75 text-3xl font-bold text-indigo-500">
                        Loading...
                    </span> : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {users.map((user: IUser) => (
                                <UserCard key={user.id} user={user} />
                            ))}
                        </div>
                    )}
            </div>
        </section>
    );
};

export default UserList;
