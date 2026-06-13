import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Image from 'next/image';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-6 py-12">

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Perfil</h1>
          <p className="text-sm text-gray-500 mt-1">Tu información de cuenta</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-24" />

          <div className="px-6 pb-6">
            <div className="flex items-end gap-4 -mt-10 mb-6">
              {session?.user?.image ? (
                <Image
                  height={80}
                  width={80}
                  src={session.user.image}
                  alt="Avatar"
                  className="w-20 h-20 rounded-2xl ring-4 ring-white"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl ring-4 ring-white bg-indigo-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-indigo-600">
                    {session?.user?.name?.[0]?.toUpperCase() ?? '?'}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">Nombre</label>
                <p className="text-sm font-medium text-gray-800 mt-0.5">
                  {session?.user?.name ?? '—'}
                </p>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">Email</label>
                <p className="text-sm font-medium text-gray-800 mt-0.5">
                  {session?.user?.email ?? '—'}
                </p>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">Estado</label>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  <p className="text-sm font-medium text-gray-800">Sesión activa</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
