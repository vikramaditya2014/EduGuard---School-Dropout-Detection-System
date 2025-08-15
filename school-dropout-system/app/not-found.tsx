'use client';

import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center">
        {/* 404 Animation */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="relative">
            <h1 className="text-9xl font-black text-primary-600 opacity-20">404</h1>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", bounce: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-24 h-24 bg-gradient-to-r from-primary-500 to-purple-600 rounded-full flex items-center justify-center">
                <AlertCircle className="w-12 h-12 text-white" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="space-y-6"
        >
          <div>
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Oops! Page Not Found
            </h2>
            <p className="text-lg text-secondary-600 leading-relaxed">
              The page you're looking for seems to have wandered off. 
              Don't worry, even the best students sometimes take the wrong path!
            </p>
          </div>

          {/* Search Suggestion */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="font-semibold text-secondary-900 mb-2">Looking for something specific?</h3>
            <p className="text-secondary-600 text-sm">
              Try searching our dashboard or check out the student management section.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/"
              className="btn-primary text-lg px-8 py-4"
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            <Link
              href="/dashboard"
              className="btn-outline text-lg px-8 py-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go to Dashboard
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-20 left-10 w-16 h-16 bg-blue-200/30 rounded-full blur-xl"
          />
          <motion.div
            animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute top-40 right-20 w-12 h-12 bg-purple-200/30 rounded-full blur-xl"
          />
          <motion.div
            animate={{ y: [-5, 15, -5], rotate: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute bottom-20 left-1/4 w-20 h-20 bg-cyan-200/30 rounded-full blur-xl"
          />
        </div>
      </div>
    </div>
  );
}