'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  Search, 
  Filter, 
  MoreVertical, 
  Check, 
  CheckCheck, 
  Trash2, 
  Eye, 
  EyeOff,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  User,
  Settings,
  Archive,
  Star,
  StarOff,
  Volume2,
  VolumeX
} from 'lucide-react';
import { toast } from 'react-hot-toast';

// Mock notifications data
const initialNotifications = [
  {
    id: 1,
    type: 'alert',
    title: 'High Risk Student Alert',
    message: 'Sarah Johnson requires immediate attention - attendance dropped below 70%',
    time: '5 minutes ago',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    unread: true,
    severity: 'high',
    category: 'student',
    starred: false,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=40&h=40&fit=crop&crop=face',
    actionUrl: '/dashboard/students/1'
  },
  {
    id: 2,
    type: 'update',
    title: 'Intervention Update',
    message: 'Math tutoring program showing positive results - 3 students improved grades',
    time: '1 hour ago',
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
    unread: true,
    severity: 'medium',
    category: 'intervention',
    starred: true,
    avatar: null,
    actionUrl: '/dashboard/interventions/1'
  },
  {
    id: 3,
    type: 'report',
    title: 'Weekly Report Ready',
    message: 'Analytics report for Week 3 is available for download',
    time: '2 hours ago',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    unread: false,
    severity: 'low',
    category: 'report',
    starred: false,
    avatar: null,
    actionUrl: '/dashboard/analytics'
  },
  {
    id: 4,
    type: 'system',
    title: 'System Maintenance',
    message: 'Scheduled maintenance completed successfully - all systems operational',
    time: '1 day ago',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    unread: false,
    severity: 'low',
    category: 'system',
    starred: false,
    avatar: null,
    actionUrl: null
  },
  {
    id: 5,
    type: 'alert',
    title: 'Multiple Absences Detected',
    message: 'Michael Chen has been absent for 3 consecutive days',
    time: '2 days ago',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    unread: false,
    severity: 'high',
    category: 'student',
    starred: false,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    actionUrl: '/dashboard/students/2'
  },
  {
    id: 6,
    type: 'achievement',
    title: 'Student Achievement',
    message: 'Emma Davis improved her GPA by 0.5 points this semester',
    time: '3 days ago',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    unread: false,
    severity: 'low',
    category: 'student',
    starred: true,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
    actionUrl: '/dashboard/students/3'
  }
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'all' | 'unread' | 'starred'>('all');

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || notification.category === selectedFilter;
    
    const matchesView = viewMode === 'all' || 
                       (viewMode === 'unread' && notification.unread) ||
                       (viewMode === 'starred' && notification.starred);
    
    return matchesSearch && matchesFilter && matchesView;
  });

  const unreadCount = notifications.filter(n => n.unread).length;
  const starredCount = notifications.filter(n => n.starred).length;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      default: return 'border-l-blue-500 bg-blue-50';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'alert': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'update': return <Info className="w-5 h-5 text-blue-600" />;
      case 'report': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'system': return <Settings className="w-5 h-5 text-gray-600" />;
      case 'achievement': return <Star className="w-5 h-5 text-yellow-600" />;
      default: return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const handleMarkAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, unread: false }
          : notification
      )
    );
    toast.success('Notification marked as read');
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, unread: false }))
    );
    toast.success('All notifications marked as read');
  };

  const handleToggleStar = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, starred: !notification.starred }
          : notification
      )
    );
  };

  const handleDelete = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
    toast.success('Notification deleted');
  };

  const handleBulkAction = (action: 'read' | 'delete' | 'star') => {
    if (selectedNotifications.length === 0) {
      toast.error('Please select notifications first');
      return;
    }

    switch (action) {
      case 'read':
        setNotifications(prev => 
          prev.map(notification => 
            selectedNotifications.includes(notification.id)
              ? { ...notification, unread: false }
              : notification
          )
        );
        toast.success(`${selectedNotifications.length} notifications marked as read`);
        break;
      case 'delete':
        setNotifications(prev => 
          prev.filter(notification => !selectedNotifications.includes(notification.id))
        );
        toast.success(`${selectedNotifications.length} notifications deleted`);
        break;
      case 'star':
        setNotifications(prev => 
          prev.map(notification => 
            selectedNotifications.includes(notification.id)
              ? { ...notification, starred: true }
              : notification
          )
        );
        toast.success(`${selectedNotifications.length} notifications starred`);
        break;
    }
    setSelectedNotifications([]);
  };

  const handleSelectNotification = (id: number) => {
    setSelectedNotifications(prev => 
      prev.includes(id) 
        ? prev.filter(nId => nId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedNotifications.length === filteredNotifications.length) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(filteredNotifications.map(n => n.id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">Notifications</h1>
          <p className="text-secondary-600 mt-2">
            Stay updated with important alerts and system updates
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <button
            onClick={handleMarkAllAsRead}
            disabled={unreadCount === 0}
            className="btn-outline disabled:opacity-50"
          >
            <CheckCheck className="w-4 h-4 mr-2" />
            Mark All Read
          </button>
          <button className="btn-primary">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total', value: notifications.length, color: 'from-blue-500 to-blue-600', icon: Bell },
          { label: 'Unread', value: unreadCount, color: 'from-red-500 to-red-600', icon: Eye },
          { label: 'Starred', value: starredCount, color: 'from-yellow-500 to-yellow-600', icon: Star },
          { label: 'Today', value: notifications.filter(n => n.timestamp > new Date(Date.now() - 24 * 60 * 60 * 1000)).length, color: 'from-green-500 to-green-600', icon: Calendar }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="stat-card"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-secondary-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-secondary-900">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="card">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary-400" />
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-9"
            />
          </div>

          {/* View Mode Tabs */}
          <div className="flex items-center space-x-1 bg-secondary-100 rounded-lg p-1">
            {[
              { key: 'all', label: 'All', count: notifications.length },
              { key: 'unread', label: 'Unread', count: unreadCount },
              { key: 'starred', label: 'Starred', count: starredCount }
            ].map((mode) => (
              <button
                key={mode.key}
                onClick={() => setViewMode(mode.key as any)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === mode.key
                    ? 'bg-white text-secondary-900 shadow-sm'
                    : 'text-secondary-600 hover:text-secondary-900'
                }`}
              >
                {mode.label} ({mode.count})
              </button>
            ))}
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-2">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="input text-sm"
            >
              <option value="all">All Categories</option>
              <option value="student">Student</option>
              <option value="intervention">Intervention</option>
              <option value="report">Report</option>
              <option value="system">System</option>
            </select>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedNotifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 bg-primary-50 border border-primary-200 rounded-lg"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-primary-900">
                {selectedNotifications.length} notification(s) selected
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleBulkAction('read')}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  Mark as Read
                </button>
                <button
                  onClick={() => handleBulkAction('star')}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  Star
                </button>
                <button
                  onClick={() => handleBulkAction('delete')}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Notifications List */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-secondary-900">
            Notifications ({filteredNotifications.length})
          </h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleSelectAll}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              {selectedNotifications.length === filteredNotifications.length ? 'Deselect All' : 'Select All'}
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <AnimatePresence>
            {filteredNotifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className={`p-4 border-l-4 rounded-r-xl transition-all duration-200 cursor-pointer hover:shadow-md ${
                  getSeverityColor(notification.severity)
                } ${notification.unread ? 'bg-opacity-100' : 'bg-opacity-50'}`}
              >
                <div className="flex items-start space-x-3">
                  {/* Selection Checkbox */}
                  <input
                    type="checkbox"
                    checked={selectedNotifications.includes(notification.id)}
                    onChange={() => handleSelectNotification(notification.id)}
                    className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
                  />

                  {/* Avatar or Icon */}
                  <div className="flex-shrink-0">
                    {notification.avatar ? (
                      <img
                        src={notification.avatar}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center">
                        {getTypeIcon(notification.type)}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={`font-semibold truncate ${
                        notification.unread ? 'text-secondary-900' : 'text-secondary-700'
                      }`}>
                        {notification.title}
                      </h4>
                      <div className="flex items-center space-x-2">
                        {notification.unread && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                        <span className="text-xs text-secondary-500">
                          {notification.time}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-secondary-600 mb-2 line-clamp-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        notification.severity === 'high' ? 'bg-red-100 text-red-800' :
                        notification.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {notification.severity} priority
                      </span>
                      <div className="flex items-center space-x-1">
                        {notification.unread && (
                          <button
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="p-1 hover:bg-white rounded transition-colors"
                            title="Mark as read"
                          >
                            <Check className="w-4 h-4 text-secondary-400" />
                          </button>
                        )}
                        <button
                          onClick={() => handleToggleStar(notification.id)}
                          className="p-1 hover:bg-white rounded transition-colors"
                          title={notification.starred ? "Remove star" : "Add star"}
                        >
                          {notification.starred ? (
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          ) : (
                            <StarOff className="w-4 h-4 text-secondary-400" />
                          )}
                        </button>
                        <button
                          onClick={() => handleDelete(notification.id)}
                          className="p-1 hover:bg-white rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredNotifications.length === 0 && (
            <div className="text-center py-12">
              <Bell className="w-12 h-12 text-secondary-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-secondary-900 mb-2">No notifications found</h3>
              <p className="text-secondary-600">
                {searchQuery || selectedFilter !== 'all' || viewMode !== 'all'
                  ? 'Try adjusting your filters or search query'
                  : 'You\'re all caught up! No new notifications.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}