'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import type { FirebaseError } from 'firebase/app';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/admin'); // Redirect to your dashboard
    } catch (err) {
      const fbErr = err as FirebaseError;
      console.error('Login error:', fbErr.code, fbErr.message);
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 text-black">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <h1 className="text-3xl font-extrabold mb-2 text-center text-gray-900">Admin Login</h1>
        <p className="text-gray-500 text-center mb-8">Manage your MakanSedap Menu</p>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 text-center border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-1.5 ml-1">Email Address</label>
            <input 
              type="email" 
              placeholder="admin@makansedap.com" 
              required
              className="w-full border border-gray-200 p-3 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-black"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1.5 ml-1">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              required
              className="w-full border border-gray-200 p-3 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-black"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            disabled={loading}
            className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-orange-700 active:scale-[0.98] transition-all disabled:bg-gray-400"
          >
            {loading ? "Logging in..." : "Sign In to Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}