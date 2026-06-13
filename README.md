# Next Auth App

Aplicación web de autenticación desarrollada con **Next.js 16**, **NextAuth.js v4** y **Tailwind CSS v4**, como parte del laboratorio de Desarrollo de Aplicaciones Web Avanzado — TECSUP.

## Tecnologías

- Next.js 16.2.9 (App Router)
- NextAuth.js v4
- React 19
- Tailwind CSS v4
- TypeScript 5
- bcryptjs

## Proveedores de autenticación

| Proveedor | Descripción |
|-----------|-------------|
| **Google** | OAuth 2.0 via Google Cloud Console |
| **GitHub** | OAuth via GitHub Developer Settings |
| **Credentials** | Email y contraseña con cifrado bcrypt |

## Funcionalidades

- Registro de usuarios con contraseña cifrada (bcrypt)
- Inicio de sesión con credenciales, Google o GitHub
- Bloqueo de cuenta tras **3 intentos fallidos** (30 segundos)
- Rutas protegidas `/dashboard` y `/profile` — redirigen a `/signIn` si no hay sesión
- Cierre de sesión con redirección a `/signIn`

## Rutas

| Ruta | Acceso |
|------|--------|
| `/` | Público — redirige a `/dashboard` |
| `/signIn` | Público — página de inicio de sesión |
| `/register` | Público — formulario de registro |
| `/dashboard` | Protegido — muestra bienvenida al usuario |
| `/profile` | Protegido — muestra datos del perfil |

## Configuración

### 1. Instalar dependencias

```bash
npm install
```

### 2. Crear el archivo `.env.local` en la raíz del proyecto

```env
# Google OAuth
GOOGLE_CLIENT_ID=tu-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=tu-client-secret

# GitHub OAuth
GITHUB_CLIENT_ID=tu-github-client-id
GITHUB_CLIENT_SECRET=tu-github-client-secret

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu-secret-generado
```

### 3. Configurar Google OAuth

1. Ir a [Google Cloud Console](https://console.developers.google.com/apis/credentials)
2. Crear credenciales → ID de cliente OAuth → Aplicación web
3. Orígenes autorizados: `http://localhost:3000`
4. URI de redirección: `http://localhost:3000/api/auth/callback/google`

### 4. Configurar GitHub OAuth

1. Ir a [GitHub Developer Settings](https://github.com/settings/developers)
2. New OAuth App
3. Authorization callback URL: `http://localhost:3000/api/auth/callback/github`

### 5. Generar NEXTAUTH_SECRET

```
https://generate-secret.vercel.app/32
```

### 6. Ejecutar la aplicación

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

## Scripts

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run start    # Ejecutar build de producción
npm run lint     # Verificar código con ESLint
```
