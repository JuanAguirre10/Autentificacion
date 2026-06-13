import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Link from 'next/link';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-12">

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            {session?.user
              ? `Bienvenido, ${session.user.name}`
              : 'Explora las funcionalidades de la app'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-sm font-semibold text-gray-800 mb-1">Sesión activa</h2>
            <p className="text-xs text-gray-500">
              {session?.user ? session.user.email : 'No has iniciado sesión'}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h2 className="text-sm font-semibold text-gray-800 mb-1">Autenticación</h2>
            <p className="text-xs text-gray-500">
              {session?.user ? 'Autenticado correctamente' : 'Sin autenticar'}
            </p>
          </div>
        </div>

        {!session?.user && (
          <div className="mt-6 bg-indigo-50 border border-indigo-100 rounded-2xl p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-indigo-800">Inicia sesión para ver tu perfil</p>
              <p className="text-xs text-indigo-500 mt-0.5">Accede a todas las funciones de la app</p>
            </div>
            <Link
              href="/signIn"
              className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition-colors whitespace-nowrap"
            >
              Iniciar Sesión
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
