'use client';

import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  GraduationCap, 
  Mail, 
  ArrowLeft, 
  CheckCircle, 
  AlertCircle,
  Send,
  Clock
} from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await sendPasswordResetEmail(auth, email);
      setEmailSent(true);
      toast.success('Password reset email sent successfully!');
    } catch (error: any) {
      console.error('Password reset error:', error);
      let errorMessage = 'An error occurred while sending the reset email';
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email address';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many requests. Please try again later';
          break;
        default:
          errorMessage = error.message || 'Failed to send reset email';
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    if (!email) return;
    
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Reset email sent again!');
    } catch (error: any) {
      toast.error('Failed to resend email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Link href="/" className="inline-flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold gradient-text">EduGuard</h1>
              <p className="text-xs text-secondary-600">Dropout Detection System</p>
            </div>
          </Link>
          
          {!emailSent ? (
            <>
              <h2 className="text-2xl font-bold text-secondary-900 mb-2">Forgot Password?</h2>
              <p className="text-secondary-600">
                No worries! Enter your email address and we'll send you a link to reset your password.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-secondary-900 mb-2">Check Your Email</h2>
              <p className="text-secondary-600">
                We've sent a password reset link to your email address.
              </p>
            </>
          )}
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg border border-secondary-200 p-8"
        >
          {!emailSent ? (
            <>
              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <p className="text-sm text-red-700">{error}</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
                <div>
                  <label className="label">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input pl-11"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-primary py-3 flex items-center justify-center space-x-2 group"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Reset Link</span>
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            /* Success State */
            <div className="text-center space-y-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto"
              >
                <CheckCircle className="w-8 h-8 text-green-600" />
              </motion.div>

              <div className="space-y-4">
                <p className="text-secondary-700">
                  We've sent a password reset link to:
                </p>
                <p className="font-semibold text-secondary-900 bg-secondary-50 px-4 py-2 rounded-lg">
                  {email}
                </p>
                <p className="text-sm text-secondary-600">
                  Click the link in the email to reset your password. The link will expire in 1 hour.
                </p>
              </div>

              {/* Instructions */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-left">
                <div className="flex items-center space-x-2 mb-3">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <h3 className="text-sm font-semibold text-blue-900">What's next?</h3>
                </div>
                <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                  <li>Check your email inbox (and spam folder)</li>
                  <li>Click the "Reset Password" link in the email</li>
                  <li>Enter your new password</li>
                  <li>Sign in with your new password</li>
                </ol>
              </div>

              {/* Resend Button */}
              <div className="space-y-3">
                <p className="text-sm text-secondary-600">
                  Didn't receive the email?
                </p>
                <button
                  onClick={handleResendEmail}
                  disabled={isLoading}
                  className="btn-outline w-full"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600"></div>
                  ) : (
                    'Resend Email'
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Back to Sign In */}
          <div className="mt-8 text-center">
            <Link
              href="/auth/signin"
              className="inline-flex items-center space-x-2 text-sm text-secondary-600 hover:text-secondary-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Sign In</span>
            </Link>
          </div>
        </motion.div>

        {/* Additional Help */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-center"
        >
          <p className="text-sm text-secondary-600">
            Still having trouble?{' '}
            <Link
              href="/dashboard/help"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Contact Support
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}