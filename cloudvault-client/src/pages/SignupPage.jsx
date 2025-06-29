import { useState } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });

    if (error) {
      alert('Signup failed: ' + error.message);
    } else {
      alert('Check your email to confirm your account.');
      navigate('/login');
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        <input
          className="mb-4 px-3 py-2 border border-gray-300 rounded w-full"
          type="text"
          placeholder="Full Name"
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          className="mb-4 px-3 py-2 border border-gray-300 rounded w-full"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="mb-6 px-3 py-2 border border-gray-300 rounded w-full"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleSignup}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </div>
    </div>
  );
}
