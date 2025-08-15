'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter, usePathname } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  loading: true,
  signOut: async () => {}
});

export const useAuth = () => useContext(AuthContext);

// Public routes that don't require authentication
const publicRoutes = ['/', '/auth/signin', '/auth/signup', '/auth/forgot-password', '/test'];

export function Providers({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);

      // Redirect logic based on authentication state
      if (!loading) {
        const isPublicRoute = publicRoutes.includes(pathname);
        
        if (!user && !isPublicRoute && pathname.startsWith('/dashboard')) {
          // Redirect to sign in if trying to access protected route without auth
          router.push('/auth/signin');
        } else if (user && (pathname === '/auth/signin' || pathname === '/auth/signup')) {
          // Redirect to dashboard if already signed in and trying to access auth pages
          router.push('/dashboard');
        }
      }
    });

    return () => unsubscribe();
  }, [loading, pathname, router]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success('Signed out successfully');
      router.push('/');
    } catch (error: any) {
      console.error('Sign out error:', error);
      toast.error('Failed to sign out');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut: handleSignOut }}>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#ffffff',
            color: '#1e293b',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '12px 16px',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#ffffff',
            },
          },
          loading: {
            iconTheme: {
              primary: '#3b82f6',
              secondary: '#ffffff',
            },
          },
        }}
      />
      {children}
    </AuthContext.Provider>
  );
}