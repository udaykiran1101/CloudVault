import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';
import UploadForm from '../components/UploadForm';
import FileList from '../components/FileList';


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
    <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-light">
      <div className="bg-white shadow rounded p-4 w-100" style={{ maxWidth: '32rem' }}>
        <h1 className="display-5 fw-bold mb-4">Welcome to CloudVault 🚀</h1>

        {user ? (
          <>
            <p className="mb-4 text-secondary">
              Logged in as: <strong>{user.email}</strong>
            </p>
          
            <UploadForm user={user} />
            <FileList user={user} />
            <button
              onClick={handleLogout}
              className="btn btn-danger px-4 py-2"
            >
              Logout
            </button>
          </>
        ) : (
          <p className="text-muted">Loading user...</p>
        )}
      </div>
    </div>
  );
}

