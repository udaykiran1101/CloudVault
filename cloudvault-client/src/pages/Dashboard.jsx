import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [user, setUser] = useState(null); // Stores the logged-in user
  const navigate = useNavigate();

  // 🔁 Run this once when the component mounts
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        navigate('/login'); // If no user is found, redirect to login
      } else {
        setUser(user); // Otherwise, store user data
      }
    };

    getUser();
  }, [navigate]); // ⏱️ Dependency array → run only once on mount

  const handleLogout = async () => {
    await supabase.auth.signOut(); // Supabase logout
    navigate('/login'); // Redirect to login
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white shadow-lg rounded p-8 w-full max-w-xl text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to CloudVault 🚀</h1>

        {user ? (
          <>
            <p className="mb-6 text-gray-700">
              Logged in as: <strong>{user.email}</strong>
            </p>

            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <p className="text-gray-500">Loading user...</p>
        )}
      </div>
    </div>
  );
}

