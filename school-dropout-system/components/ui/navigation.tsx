'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/app/providers';
import { 
  GraduationCap, 
  BarChart3, 
  Users, 
  Target, 
  AlertTriangle, 
  Settings, 
  Bell, 
  Search, 
  Menu, 
  X,
  LogOut,
  User,
  ChevronDown,
  Home,
  TrendingUp,
  Brain,
  FileText,
  Calendar,
  MessageCircle,
  Shield,
  HelpCircle
} from 'lucide-react';

const navigationItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: Home,
    description: 'Overview and key metrics'
  },
  {
    name: 'Students',
    href: '/dashboard/students',
    icon: Users,
    description: 'Student management and profiles'
  },
  {
    name: 'Analytics',
    href: '/dashboard/analytics',
    icon: BarChart3,
    description: 'Data insights and reports'
  },
  {
    name: 'Risk Assessment',
    href: '/dashboard/risk-assessment',
    icon: AlertTriangle,
    description: 'AI-powered risk analysis'
  },
  {
    name: 'Interventions',
    href: '/dashboard/interventions',
    icon: Target,
    description: 'Support programs and tracking'
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
    description: 'System configuration'
  }
];

const quickActions = [
  { name: 'Add Student', icon: Users, href: '/dashboard/students?action=add' },
  { name: 'Create Alert', icon: Bell, href: '/dashboard/alerts/create' },
  { name: 'Generate Report', icon: FileText, href: '/dashboard/reports/generate' },
  { name: 'Schedule Meeting', icon: Calendar, href: '/dashboard/meetings/schedule' }
];

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  // Get user data from Firebase Auth
  const userData = {
    name: user?.displayName || 'User',
    email: user?.email || '',
    role: 'Administrator',
    school: 'Springfield High School',
    avatar: user?.photoURL || 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=40&h=40&fit=crop&crop=face'
  };

  // Handle search functionality
  useEffect(() => {
    if (searchQuery.length > 2) {
      // Mock search results
      const mockResults = [
        { type: 'Student', name: 'Sarah Johnson', href: '/dashboard/students/1' },
        { type: 'Intervention', name: 'Math Tutoring Program', href: '/dashboard/interventions/1' },
        { type: 'Report', name: 'Monthly Analytics', href: '/dashboard/analytics' }
      ].filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(mockResults);
      setShowSearch(true);
    } else {
      setShowSearch(false);
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setUserMenuOpen(false);
      setShowSearch(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-80">
          <div className="flex flex-col flex-1 min-h-0 bg-white border-r border-secondary-200">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0 px-6 py-6 border-b border-secondary-200">
              <Link href="/dashboard" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold gradient-text">EduGuard</h1>
                  <p className="text-xs text-secondary-600">Dropout Detection System</p>
                </div>
              </Link>
            </div>

            {/* Search Bar */}
            <div className="px-6 py-4 border-b border-secondary-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary-400" />
                <input
                  type="text"
                  placeholder="Search students, reports..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input pl-9 text-sm"
                />
                {showSearch && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-secondary-200 rounded-lg shadow-lg z-50">
                    {searchResults.map((result, index) => (
                      <Link
                        key={index}
                        href={result.href}
                        className="block px-4 py-3 hover:bg-secondary-50 border-b border-secondary-100 last:border-b-0"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-secondary-900">{result.name}</span>
                          <span className="text-xs text-secondary-500">{result.type}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-6 py-6 space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                      : 'text-secondary-600 hover:text-secondary-900 hover:bg-secondary-50'
                  }`}
                >
                  <item.icon 
                    className={`flex-shrink-0 w-5 h-5 mr-3 ${
                      isActive(item.href) ? 'text-primary-600' : 'text-secondary-400 group-hover:text-secondary-600'
                    }`} 
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-secondary-500 mt-0.5">{item.description}</p>
                  </div>
                  {isActive(item.href) && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="w-1 h-6 bg-primary-600 rounded-full"
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Quick Actions */}
            <div className="px-6 py-4 border-t border-secondary-200">
              <h3 className="text-xs font-semibold text-secondary-500 uppercase tracking-wider mb-3">
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action) => (
                  <Link
                    key={action.name}
                    href={action.href}
                    className="flex flex-col items-center p-3 text-center rounded-lg hover:bg-secondary-50 transition-colors"
                  >
                    <action.icon className="w-5 h-5 text-secondary-400 mb-2" />
                    <span className="text-xs text-secondary-600 font-medium">{action.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between bg-white border-b border-secondary-200 px-4 py-4">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-md text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100 transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <Link href="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-purple-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold gradient-text">EduGuard</span>
          </Link>

          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-secondary-100 transition-colors"
            >
              <img
                src={userData.avatar}
                alt={userData.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <ChevronDown className="w-4 h-4 text-secondary-400" />
            </button>

            <AnimatePresence>
              {userMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-secondary-200 z-50"
                >
                  <div className="p-4 border-b border-secondary-200">
                    <p className="font-medium text-secondary-900">{userData.name}</p>
                    <p className="text-sm text-secondary-600">{userData.email}</p>
                    <p className="text-xs text-secondary-500">{userData.school}</p>
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
                      href="/dashboard/help"
                      className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-secondary-50 transition-colors"
                    >
                      <HelpCircle className="w-4 h-4 text-secondary-400" />
                      <span className="text-sm text-secondary-700">Help & Support</span>
                    </Link>
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-80 bg-white shadow-xl z-50 lg:hidden"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-secondary-200">
                <Link href="/dashboard" className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-bold gradient-text">EduGuard</span>
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-secondary-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="px-6 py-6 space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                      isActive(item.href)
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-secondary-600 hover:text-secondary-900 hover:bg-secondary-50'
                    }`}
                  >
                    <item.icon 
                      className={`flex-shrink-0 w-5 h-5 mr-3 ${
                        isActive(item.href) ? 'text-primary-600' : 'text-secondary-400'
                      }`} 
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-secondary-500 mt-0.5">{item.description}</p>
                    </div>
                  </Link>
                ))}
              </nav>

              <div className="px-6 py-4 border-t border-secondary-200">
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src={userData.avatar}
                    alt={userData.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-secondary-900">{userData.name}</p>
                    <p className="text-sm text-secondary-600">{userData.email}</p>
                  </div>
                </div>
                <button 
                  onClick={signOut}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm font-medium">Sign Out</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}