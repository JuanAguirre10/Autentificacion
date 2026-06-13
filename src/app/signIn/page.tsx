'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error === 'AccountLocked') {
      setError('Cuenta bloqueada por demasiados intentos fallidos. Espera 30 segundos.');
    } else if (result?.error) {
      setError('Email o contraseña incorrectos.');
    } else if (result?.ok) {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl text-gray-800 font-bold mb-6 text-center">
          Sign In
        </h1>

        <form onSubmit={handleCredentialsSignIn} className="mb-4">
          <div className="mb-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-gray-500"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-gray-500"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Ingresando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mb-4">
          ¿No tienes cuenta?{' '}
          <Link href="/register" className="text-blue-600 hover:underline">
            Regístrate
          </Link>
        </p>

        <div className="flex items-center mb-4">
          <hr className="flex-1 border-gray-300" />
          <span className="px-3 text-sm text-gray-400">o continúa con</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
            className="w-full bg-gray-800 text-white py-2 px-4 rounded hover:bg-black transition flex items-center justify-center gap-2"
          >
            <FaGithub />
            Continue with GitHub
          </button>
          <button
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
            className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-black transition flex items-center justify-center gap-2"
          >
            <FaGoogle />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}
