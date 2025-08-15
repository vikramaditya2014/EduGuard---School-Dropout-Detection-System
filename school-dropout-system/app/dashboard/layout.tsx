'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/ui/navigation';
import AuthGuard from '@/components/AuthGuard';
import { useAuth } from '@/app/providers';
import { Bell, Settings, Search, User, LogOut, HelpCircle, ChevronDown } from 'lucide-react';
import Link from 'next/link';

// Mock notifications data
const notifications = [
  {
    id: 1,
    type: 'alert',
    title: 'High Risk Student Alert',
    message: 'Sarah Johnson requires immediate attention',
    time: '5 minutes ago',
    unread: true,
    severity: 'high'
  },
  {
    id: 2,
    type: 'update',
    title: 'Intervention Update',
    message: 'Math tutoring program showing positive results',
    time: '1 hour ago',
    unread: true,
    severity: 'medium'
  },
  {
    id: 3,
    type: 'report',
    title: 'Weekly Report Ready',
    message: 'Analytics report for Week 3 is available',
    time: '2 hours ago',
    unread: false,
    severity: 'low'
  },
  {
    id: 4,
    type: 'system',
    title: 'System Maintenance',
    message: 'Scheduled maintenance completed successfully',
    time: '1 day ago',
    unread: false,
    severity: 'low'
  }
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const { user, signOut } = useAuth();

  // Get user data from Firebase Auth
  const userData = {
    name: user?.displayName || 'User',
    email: user?.email || '',
    role: 'Administrator',
    school: 'Springfield High School',
    avatar: user?.photoURL || 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=40&h=40&fit=crop&crop=face'
  };

  useEffect(() => {
    // Count unread notifications
    const unread = notifications.filter(n => n.unread).length;
    setUnreadCount(unread);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowNotifications(false);
      setShowUserMenu(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      default: return 'border-l-blue-500 bg-blue-50';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'alert': return '🚨';
      case 'update': return '📊';
      case 'report': return '📋';
      case 'system': return '⚙️';
      default: return '📢';
    }
  };

  return (
    <AuthGuard>
      <div className="flex h-screen bg-secondary-50">
        <Navigation />
      
      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Header - Desktop Only */}
        <div className="hidden lg:flex items-center justify-between bg-white border-b border-secondary-200 px-8 py-4">
          <div className="flex-1">
            {/* Breadcrumb or page title could go here */}
          </div>
          
          {/* Header Actions */}
          <div className="flex items-center space-x-4">
            {/* Global Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary-400" />
              <input
                type="text"
                placeholder="Search across all modules..."
                className="input pl-9 w-80 bg-secondary-50 border-secondary-200 focus:bg-white"
              />
            </div>

            {/* Notifications */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100 rounded-lg transition-colors"
              >
                <Bell className="h-6 w-6" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-secondary-200 z-50 max-h-96 overflow-y-auto"
                  >
                    <div className="p-4 border-b border-secondary-200">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-secondary-900">Notifications</h3>
                        {unreadCount > 0 && (
                          <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                            Mark all read
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <div className="divide-y divide-secondary-100">
                      {notifications.map((notification) => (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={`p-4 hover:bg-secondary-50 transition-colors cursor-pointer border-l-4 ${getSeverityColor(notification.severity)} ${
                            notification.unread ? 'bg-blue-50' : ''
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <span className="text-lg">{getTypeIcon(notification.type)}</span>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className={`text-sm font-medium ${notification.unread ? 'text-secondary-900' : 'text-secondary-700'}`}>
                                  {notification.title}
                                </p>
                                {notification.unread && (
                                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                )}
                              </div>
                              <p className="text-sm text-secondary-600 mt-1 line-clamp-2">
                                {notification.message}
                              </p>
                              <p className="text-xs text-secondary-500 mt-2">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="p-4 border-t border-secondary-200 text-center">
                      <Link
                        href="/dashboard/notifications"
                        className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                      >
                        View all notifications
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Menu */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-secondary-100 transition-colors"
              >
                <img
                  src={userData.avatar}
                  alt={userData.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="hidden xl:block text-left">
                  <p className="text-sm font-medium text-secondary-900">{userData.name}</p>
                  <p className="text-xs text-secondary-600">{userData.email}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-secondary-400" />
              </button>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-secondary-200 z-50"
                  >
                    <div className="p-4 border-b border-secondary-200">
                      <div className="flex items-center space-x-3">
                        <img
                          src={userData.avatar}
                          alt={userData.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-secondary-900">{userData.name}</p>
                          <p className="text-sm text-secondary-600">{userData.email}</p>
                          <p className="text-xs text-secondary-500">{userData.school}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-2">
                      <Link
                        href="/dashboard/profile"
                        className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-secondary-50 transition-colors"
                      >
                        <User className="w-4 h-4 text-secondary-400" />
                        <span className="text-sm text-secondary-700">Profile Settings</span>
                      </Link>
                      <Link
                        href="/dashboard/settings"
                        className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-secondary-50 transition-colors"
                      >
                        <Settings className="w-4 h-4 text-secondary-400" />
                        <span className="text-sm text-secondary-700">System Settings</span>
                      </Link>
                      <Link
                        href="/dashboard/help"
                        className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-secondary-50 transition-colors"
                      >
                        <HelpCircle className="w-4 h-4 text-secondary-400" />
                        <span className="text-sm text-secondary-700">Help & Support</span>
                      </Link>
                      
                      <div className="border-t border-secondary-200 my-2"></div>
                      
                      <button 
                        onClick={signOut}
                        className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm">Sign Out</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="h-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full px-4 lg:px-8 py-6 lg:py-8"
            >
              {children}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}