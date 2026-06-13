'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      setLoading(false);

      if (result?.error === 'AccountLocked') {
        setError('Cuenta bloqueada por demasiados intentos. Espera 30 segundos.');
      } else if (result?.error) {
        setError('Email o contraseña incorrectos.');
      } else if (result?.ok) {
        window.location.href = '/dashboard';
      } else {
        setError('Error inesperado. Intenta de nuevo.');
      }
    } catch {
      setLoading(false);
      setError('Error de conexión. Intenta de nuevo.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Bienvenido</h1>
          <p className="text-sm text-gray-500 mt-1">Inicia sesión en tu cuenta</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleCredentialsSignIn} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-2.5">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Ingresando...' : 'Iniciar Sesión'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            ¿No tienes cuenta?{' '}
            <Link href="/register" className="text-indigo-600 font-medium hover:underline">
              Regístrate
            </Link>
          </p>

          <div className="flex items-center gap-3 my-5">
            <hr className="flex-1 border-gray-200" />
            <span className="text-xs text-gray-400">o continúa con</span>
            <hr className="flex-1 border-gray-200" />
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
              className="w-full border border-gray-200 bg-white text-gray-700 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <FaGithub className="text-gray-800" />
              Continuar con GitHub
            </button>
            <button
              onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
              className="w-full border border-gray-200 bg-white text-gray-700 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <FaGoogle className="text-red-500" />
              Continuar con Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
