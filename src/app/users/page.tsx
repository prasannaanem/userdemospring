'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export type User = {
    id: number;
    name: string;
    email: string;
    place: string;
};

const UsersPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const fetchUsers = async () => {
        setLoading(true);
        setError(null); // Clear previous errors
        try {
            const response = await axios.get<User[]>('http://localhost:8080/users/getall');
            setUsers(response.data);
        } catch (err) {
            setError('Error fetching users. Please try again.');
            console.error('Error fetching users:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleAddUserClick = () => {
        router.push('/users/adduser');
    };

    const handleEditClick = (id: number) => {
        router.push(`/users/edituser/${id}`);
    };

    const handleDeleteClick = async (id: number) => {
        setLoading(true);
        setError(null);
        try {
            await axios.delete(`http://localhost:8080/users/delete/${id}`);
            fetchUsers();
        } catch (err) {
            setError('Error deleting user. Please try again.');
            console.error('Error deleting user:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Users List</h1>
            <button
                className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleAddUserClick}
            >
                Add User
            </button>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && users.length === 0 && <p>No users found.</p>}
            {users.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 text-sm">
                        <thead className="bg-gray-100">
                            <tr className="border-b border-gray-300">
                                <th className="px-4 py-2 text-left">ID</th>
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-left">Email</th>
                                <th className="px-4 py-2 text-left">Place</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id} className="border-b border-gray-300">
                                    <td className="px-4 py-2">{user.id}</td>
                                    <td className="px-4 py-2">{user.name}</td>
                                    <td className="px-4 py-2">{user.email}</td>
                                    <td className="px-4 py-2">{user.place}</td>
                                    <td className="px-4 py-2">
                                        <button
                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2 text-xs"
                                            onClick={() => handleEditClick(user.id)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs"
                                            onClick={() => handleDeleteClick(user.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UsersPage;
