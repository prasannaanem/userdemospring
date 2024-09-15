'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';

const EditUserPage: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [place, setPlace] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) {
            const fetchUser = async () => {
                setLoading(true);
                setError(null);
                try {
                    const response = await axios.get(`http://localhost:8080/users/${id}`);
                    const user = response.data;
                    setName(user.name || '');
                    setEmail(user.email || '');
                    setPlace(user.place || '');
                } catch (err) {
                    setError('Error fetching user data. Please try again.');
                    console.error('Error fetching user data:', err);
                } finally {
                    setLoading(false);
                }
            };
            fetchUser();
        }
    }, [id]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await axios.put(`http://localhost:8080/users/update/${id}`, { name, email, place });
            router.push('/users'); // Redirect to the users list page
        } catch (err: any) {
            if (err.response && err.response.data) {
                setError(`Error updating user: ${err.response.data.message || 'Please try again.'}`);
            } else {
                setError('Error updating user. Please try again.');
            }
            console.error('Error updating user:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Edit User</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border px-3 py-2 w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border px-3 py-2 w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">Place</label>
                    <input
                        type="text"
                        value={place}
                        onChange={(e) => setPlace(e.target.value)}
                        className="border px-3 py-2 w-full"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    disabled={loading}
                >
                    {loading ? 'Updating...' : 'Update User'}
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
        </div>
    );
};

export default EditUserPage;
