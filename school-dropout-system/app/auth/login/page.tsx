'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  ArrowRight, 
  Shield, 
  Users, 
  BarChart3,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate login process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Redirect to dashboard
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center mb-8"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-purple-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">EduGuard</h1>
                <p className="text-xs text-secondary-600">Detection System</p>
              </div>
            </div>
          </motion.div>

          {/* Welcome Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold text-secondary-900 mb-2">Welcome Back! 👋</h2>
            <p className="text-secondary-600">Sign in to your EduGuard dashboard and continue making a difference</p>
          </motion.div>

          {/* Login Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="label">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input pl-10"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="label">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pl-10 pr-10"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-secondary-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-secondary-700">
                  Remember me
                </label>
              </div>
              <Link href="/auth/forgot-password" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full text-lg py-3 relative overflow-hidden"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>

            {/* Demo Credentials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-blue-50 border border-blue-200 rounded-xl p-4"
            >
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-semibold text-blue-900">Demo Credentials</h3>
              </div>
              <div className="text-xs text-blue-700 space-y-1">
                <p><strong>Admin:</strong> admin@eduguard.com / admin123</p>
                <p><strong>Teacher:</strong> teacher@eduguard.com / teacher123</p>
                <p><strong>Counselor:</strong> counselor@eduguard.com / counselor123</p>
              </div>
            </motion.div>

            {/* Sign Up Link */}
            <p className="text-center text-secondary-600">
              Don't have an account?{' '}
              <Link href="/auth/register" className="text-primary-600 hover:text-primary-700 font-medium">
                Sign up here
              </Link>
            </p>
          </motion.form>
        </div>
      </div>

      {/* Right Side - Feature Showcase */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary-600 to-purple-700 p-8 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 right-20 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Transforming Education with AI
            </h2>
            <p className="text-xl text-blue-100 mb-12 leading-relaxed">
              Join thousands of educators using our advanced system to identify at-risk students 
              early and implement effective intervention strategies.
            </p>
          </motion.div>

          {/* Feature List */}
          <div className="space-y-6">
            {[
              {
                icon: Shield,
                title: '95% Prediction Accuracy',
                description: 'AI-powered risk detection with industry-leading precision'
              },
              {
                icon: Users,
                title: '50,000+ Students Monitored',
                description: 'Comprehensive tracking across 500+ educational institutions'
              },
              {
                icon: BarChart3,
                title: 'Real-time Analytics',
                description: 'Interactive dashboards with actionable insights'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-start space-x-4"
              >
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-blue-100">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
          >
            <p className="text-blue-100 italic mb-4">
              "EduGuard has revolutionized how we identify and support at-risk students. 
              The early warning system has helped us prevent dozens of dropouts this year."
            </p>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold">Dr. Sarah Martinez</p>
                <p className="text-sm text-blue-200">Principal, Springfield High School</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}