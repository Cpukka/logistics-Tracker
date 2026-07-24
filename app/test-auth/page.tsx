// app/test-auth/page.tsx
'use client'

import { useAuth } from '../components/providers/AuthProvider'

export default function TestAuth() {
  const { user, signIn, signOut } = useAuth()
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Auth Test</h1>
      <p className="mt-4">User: {user ? user.email : 'Not logged in'}</p>
      <button 
        onClick={() => signIn('test@test.com', 'password')}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Login Test
      </button>
      <button 
        onClick={() => signOut()}
        className="mt-4 ml-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>
    </div>
  )
}