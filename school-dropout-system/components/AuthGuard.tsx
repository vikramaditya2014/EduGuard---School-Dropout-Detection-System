'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/providers';
import { GraduationCap } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin');
    }
  }, [user, loading, router]);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto animate-pulse">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-primary-200 rounded-2xl animate-spin mx-auto"></div>
          </div>
          
          <h2 className="text-xl font-semibold text-secondary-900 mb-2">
            Checking Authentication...
          </h2>
          <p className="text-secondary-600 text-sm">
            Please wait while we verify your access
          </p>
          
          <div className="mt-6 flex justify-center">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Don't render children if user is not authenticated
  if (!user) {
    return null;
  }

  // Render children if user is authenticated
  return <>{children}</>;
}