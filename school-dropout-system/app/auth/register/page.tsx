'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Building, 
  ArrowRight, 
  CheckCircle, 
  Target,
  TrendingUp,
  Shield
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    institution: '',
    role: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNextStep = () => {
    if (step < 2) setStep(step + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate registration process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Redirect to dashboard
    router.push('/dashboard');
  };

  const roles = [
    { value: 'admin', label: 'Administrator' },
    { value: 'principal', label: 'Principal' },
    { value: 'teacher', label: 'Teacher' },
    { value: 'counselor', label: 'Counselor' },
    { value: 'coordinator', label: 'Program Coordinator' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex">
      {/* Left Side - Registration Form */}
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

          {/* Progress Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 1 ? 'bg-primary-600 text-white' : 'bg-secondary-200 text-secondary-500'
              }`}>
                {step > 1 ? <CheckCircle className="w-5 h-5" /> : '1'}
              </div>
              <div className={`w-20 h-1 rounded-full ${step >= 2 ? 'bg-primary-600' : 'bg-secondary-200'}`} />
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 2 ? 'bg-primary-600 text-white' : 'bg-secondary-200 text-secondary-500'
              }`}>
                2
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm text-secondary-600">
                Step {step} of 2: {step === 1 ? 'Personal Information' : 'Account Setup'}
              </p>
            </div>
          </motion.div>

          {/* Welcome Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold text-secondary-900 mb-2">Create Your Account ✨</h2>
            <p className="text-secondary-600">Join the revolution in educational technology</p>
          </motion.div>

          {/* Registration Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onSubmit={step === 2 ? handleSubmit : (e) => { e.preventDefault(); handleNextStep(); }}
            className="space-y-6"
          >
            {step === 1 ? (
              <>
                {/* First Name */}
                <div>
                  <label htmlFor="firstName" className="label">First Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="input pl-10"
                      placeholder="Enter your first name"
                      required
                    />
                  </div>
                </div>

                {/* Last Name */}
                <div>
                  <label htmlFor="lastName" className="label">Last Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="input pl-10"
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                </div>

                {/* Institution */}
                <div>
                  <label htmlFor="institution" className="label">Institution</label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
                    <input
                      type="text"
                      id="institution"
                      name="institution"
                      value={formData.institution}
                      onChange={handleInputChange}
                      className="input pl-10"
                      placeholder="Enter your school/institution name"
                      required
                    />
                  </div>
                </div>

                {/* Role */}
                <div>
                  <label htmlFor="role" className="label">Role</label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="input"
                    required
                  >
                    <option value="">Select your role</option>
                    {roles.map(role => (
                      <option key={role.value} value={role.value}>{role.label}</option>
                    ))}
                  </select>
                </div>
              </>
            ) : (
              <>
                {/* Email */}
                <div>
                  <label htmlFor="email" className="label">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="input pl-10"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="label">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="input pl-10 pr-10"
                      placeholder="Create a strong password"
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

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="label">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="input pl-10 pr-10"
                      placeholder="Confirm your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-secondary-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded mt-1"
                    required
                  />
                  <label htmlFor="terms" className="ml-3 text-sm text-secondary-700">
                    I agree to the{' '}
                    <Link href="/terms" className="text-primary-600 hover:text-primary-700 font-medium">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-primary-600 hover:text-primary-700 font-medium">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </>
            )}

            {/* Navigation Buttons */}
            <div className="flex space-x-4">
              {step === 2 && (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn-outline flex-1"
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary flex-1 text-lg py-3 relative overflow-hidden"
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : step === 1 ? (
                  <>
                    Continue
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                ) : (
                  <>
                    Create Account
                    <CheckCircle className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>
            </div>

            {/* Sign In Link */}
            <p className="text-center text-secondary-600">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-primary-600 hover:text-primary-700 font-medium">
                Sign in here
              </Link>
            </p>
          </motion.form>
        </div>
      </div>

      {/* Right Side - Benefits Showcase */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-green-600 to-emerald-700 p-8 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 left-20 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Join the Future of Education
            </h2>
            <p className="text-xl text-green-100 mb-12 leading-relaxed">
              Become part of a growing community of educators who are transforming 
              student outcomes through data-driven insights and early intervention.
            </p>
          </motion.div>

          {/* Benefits List */}
          <div className="space-y-8">
            {[
              {
                icon: Target,
                title: 'Early Detection',
                description: 'Identify at-risk students weeks before traditional methods',
                stats: '3-4 weeks earlier'
              },
              {
                icon: TrendingUp,
                title: 'Proven Results',
                description: 'Schools report significant improvement in retention rates',
                stats: '73% improvement'
              },
              {
                icon: Shield,
                title: 'Secure Platform',
                description: 'Enterprise-grade security with full FERPA compliance',
                stats: 'Bank-level security'
              }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-start space-x-4"
              >
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-xl">{benefit.title}</h3>
                    <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                      {benefit.stats}
                    </span>
                  </div>
                  <p className="text-green-100 leading-relaxed">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
          >
            <h3 className="font-semibold text-lg mb-4">Trusted by Leading Institutions</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-green-200">Schools</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-green-200">Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">95%</div>
                <div className="text-green-200">Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-green-200">Support</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}