'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Database, 
  Mail, 
  Phone, 
  Building, 
  Save, 
  Camera,
  Key,
  Globe,
  Clock,
  AlertCircle,
  CheckCircle,
  Download,
  Upload,
  Trash2,
  RefreshCw,
  Eye,
  EyeOff
} from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@school.edu',
    phone: '+1 (555) 123-4567',
    role: 'Administrator',
    institution: 'Springfield High School',
    department: 'Student Affairs',
    bio: 'Dedicated educator with 15+ years of experience in student support and dropout prevention.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    weeklyReports: true,
    riskAlerts: true,
    interventionUpdates: true,
    systemUpdates: false
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    passwordExpiry: '90',
    sessionTimeout: '30',
    ipRestriction: false
  });

  const [systemPreferences, setSystemPreferences] = useState({
    theme: 'light',
    language: 'en',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    currency: 'USD',
    defaultDashboard: 'overview'
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'preferences', name: 'Preferences', icon: Palette },
    { id: 'data', name: 'Data & Export', icon: Database }
  ];

  const handleSave = async (section: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(`${section} settings saved successfully!`);
    } catch (error) {
      toast.error(`Failed to save ${section} settings`);
    } finally {
      setLoading(false);
    }
  };

  const renderProfileTab = () => (
    <div className="space-y-8">
      {/* Profile Picture */}
      <div className="flex items-center space-x-6">
        <div className="relative">
          <img
            src={profileData.avatar}
            alt="Profile"
            className="w-24 h-24 rounded-2xl object-cover"
          />
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white hover:bg-primary-700 transition-colors">
            <Camera className="w-4 h-4" />
          </button>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-secondary-900">Profile Photo</h3>
          <p className="text-secondary-600 text-sm">Update your profile picture</p>
          <div className="flex space-x-3 mt-3">
            <button className="btn-outline text-sm">Upload New</button>
            <button className="btn-outline text-sm text-red-600 hover:text-red-700">Remove</button>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div>
        <h3 className="text-lg font-semibold text-secondary-900 mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="label">First Name</label>
            <input
              type="text"
              value={profileData.firstName}
              onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
              className="input"
            />
          </div>
          <div>
            <label className="label">Last Name</label>
            <input
              type="text"
              value={profileData.lastName}
              onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
              className="input"
            />
          </div>
          <div>
            <label className="label">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                className="input pl-10"
              />
            </div>
          </div>
          <div>
            <label className="label">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                className="input pl-10"
              />
            </div>
          </div>
          <div>
            <label className="label">Role</label>
            <select
              value={profileData.role}
              onChange={(e) => setProfileData({...profileData, role: e.target.value})}
              className="input"
            >
              <option value="Administrator">Administrator</option>
              <option value="Principal">Principal</option>
              <option value="Teacher">Teacher</option>
              <option value="Counselor">Counselor</option>
            </select>
          </div>
          <div>
            <label className="label">Institution</label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
              <input
                type="text"
                value={profileData.institution}
                onChange={(e) => setProfileData({...profileData, institution: e.target.value})}
                className="input pl-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div>
        <label className="label">Bio</label>
        <textarea
          value={profileData.bio}
          onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
          className="input"
          rows={4}
          placeholder="Tell us about yourself..."
        />
      </div>

      <div className="flex justify-end">
        <button 
          onClick={() => handleSave('Profile')}
          disabled={loading}
          className="btn-primary"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </button>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-secondary-900 mb-4">Email Notifications</h3>
        <div className="space-y-4">
          {[
            { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive notifications via email' },
            { key: 'weeklyReports', label: 'Weekly Reports', description: 'Get weekly summary reports' },
            { key: 'riskAlerts', label: 'Risk Alerts', description: 'High priority alerts for at-risk students' },
            { key: 'interventionUpdates', label: 'Intervention Updates', description: 'Updates on intervention progress' },
            { key: 'systemUpdates', label: 'System Updates', description: 'System maintenance and update notifications' }
          ].map((setting) => (
            <div key={setting.key} className="flex items-center justify-between p-4 bg-secondary-50 rounded-xl">
              <div>
                <h4 className="font-medium text-secondary-900">{setting.label}</h4>
                <p className="text-sm text-secondary-600">{setting.description}</p>
              </div>
              <div className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  checked={notificationSettings[setting.key as keyof typeof notificationSettings]}
                  onChange={(e) => setNotificationSettings({
                    ...notificationSettings,
                    [setting.key]: e.target.checked
                  })}
                  className="sr-only"
                />
                <div 
                  onClick={() => setNotificationSettings({
                    ...notificationSettings,
                    [setting.key]: !notificationSettings[setting.key as keyof typeof notificationSettings]
                  })}
                  className={`cursor-pointer inline-block w-12 h-6 rounded-full transition-colors duration-200 ${
                    notificationSettings[setting.key as keyof typeof notificationSettings] ? 'bg-primary-600' : 'bg-secondary-300'
                  }`}
                >
                  <div 
                    className={`inline-block w-5 h-5 bg-white rounded-full transform transition-transform duration-200 ${
                      notificationSettings[setting.key as keyof typeof notificationSettings] ? 'translate-x-6' : 'translate-x-0.5'
                    } mt-0.5`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-secondary-900 mb-4">Push Notifications</h3>
        <div className="flex items-center justify-between p-4 bg-secondary-50 rounded-xl">
          <div>
            <h4 className="font-medium text-secondary-900">Browser Push Notifications</h4>
            <p className="text-sm text-secondary-600">Receive real-time push notifications in your browser</p>
          </div>
          <div className="relative inline-block w-12 h-6">
            <div 
              onClick={() => setNotificationSettings({
                ...notificationSettings,
                pushNotifications: !notificationSettings.pushNotifications
              })}
              className={`cursor-pointer inline-block w-12 h-6 rounded-full transition-colors duration-200 ${
                notificationSettings.pushNotifications ? 'bg-primary-600' : 'bg-secondary-300'
              }`}
            >
              <div 
                className={`inline-block w-5 h-5 bg-white rounded-full transform transition-transform duration-200 ${
                  notificationSettings.pushNotifications ? 'translate-x-6' : 'translate-x-0.5'
                } mt-0.5`}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button 
          onClick={() => handleSave('Notification')}
          disabled={loading}
          className="btn-primary"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </button>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-8">
      {/* Change Password */}
      <div>
        <h3 className="text-lg font-semibold text-secondary-900 mb-4">Change Password</h3>
        <div className="space-y-4 max-w-md">
          <div>
            <label className="label">Current Password</label>
            <div className="relative">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                className="input pr-10"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-secondary-600"
              >
                {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
          <div>
            <label className="label">New Password</label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                className="input pr-10"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-secondary-600"
              >
                {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
          <div>
            <label className="label">Confirm New Password</label>
            <input
              type="password"
              className="input"
              placeholder="Confirm new password"
            />
          </div>
          <button className="btn-primary">
            <Key className="w-4 h-4 mr-2" />
            Update Password
          </button>
        </div>
      </div>

      {/* Security Settings */}
      <div>
        <h3 className="text-lg font-semibold text-secondary-900 mb-4">Security Options</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-secondary-50 rounded-xl">
            <div>
              <h4 className="font-medium text-secondary-900">Two-Factor Authentication</h4>
              <p className="text-sm text-secondary-600">Add an extra layer of security to your account</p>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`text-sm ${securitySettings.twoFactorAuth ? 'text-green-600' : 'text-secondary-600'}`}>
                {securitySettings.twoFactorAuth ? 'Enabled' : 'Disabled'}
              </span>
              <button 
                onClick={() => setSecuritySettings({...securitySettings, twoFactorAuth: !securitySettings.twoFactorAuth})}
                className={`btn-outline text-sm ${securitySettings.twoFactorAuth ? 'text-red-600 hover:text-red-700' : ''}`}
              >
                {securitySettings.twoFactorAuth ? 'Disable' : 'Enable'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Password Expiry (days)</label>
              <select
                value={securitySettings.passwordExpiry}
                onChange={(e) => setSecuritySettings({...securitySettings, passwordExpiry: e.target.value})}
                className="input"
              >
                <option value="30">30 days</option>
                <option value="60">60 days</option>
                <option value="90">90 days</option>
                <option value="never">Never</option>
              </select>
            </div>
            <div>
              <label className="label">Session Timeout (minutes)</label>
              <select
                value={securitySettings.sessionTimeout}
                onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: e.target.value})}
                className="input"
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button 
          onClick={() => handleSave('Security')}
          disabled={loading}
          className="btn-primary"
        >
          <Shield className="w-4 h-4 mr-2" />
          Save Security Settings
        </button>
      </div>
    </div>
  );

  const renderPreferencesTab = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-secondary-900 mb-4">Display Preferences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="label">Theme</label>
            <select
              value={systemPreferences.theme}
              onChange={(e) => setSystemPreferences({...systemPreferences, theme: e.target.value})}
              className="input"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div>
          <div>
            <label className="label">Language</label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
              <select
                value={systemPreferences.language}
                onChange={(e) => setSystemPreferences({...systemPreferences, language: e.target.value})}
                className="input pl-10"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-secondary-900 mb-4">Regional Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="label">Timezone</label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
              <select
                value={systemPreferences.timezone}
                onChange={(e) => setSystemPreferences({...systemPreferences, timezone: e.target.value})}
                className="input pl-10"
              >
                <option value="America/New_York">Eastern Time</option>
                <option value="America/Chicago">Central Time</option>
                <option value="America/Denver">Mountain Time</option>
                <option value="America/Los_Angeles">Pacific Time</option>
              </select>
            </div>
          </div>
          <div>
            <label className="label">Date Format</label>
            <select
              value={systemPreferences.dateFormat}
              onChange={(e) => setSystemPreferences({...systemPreferences, dateFormat: e.target.value})}
              className="input"
            >
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button 
          onClick={() => handleSave('Preferences')}
          disabled={loading}
          className="btn-primary"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Preferences
        </button>
      </div>
    </div>
  );

  const renderDataTab = () => (
    <div className="space-y-8">
      {/* Data Export */}
      <div>
        <h3 className="text-lg font-semibold text-secondary-900 mb-4">Data Export</h3>
        <div className="space-y-4">
          <div className="p-4 border border-secondary-200 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-medium text-secondary-900">Student Data</h4>
                <p className="text-sm text-secondary-600">Export all student information and records</p>
              </div>
              <button className="btn-outline">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </button>
            </div>
          </div>
          
          <div className="p-4 border border-secondary-200 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-medium text-secondary-900">Analytics Reports</h4>
                <p className="text-sm text-secondary-600">Download comprehensive analytics and insights</p>
              </div>
              <button className="btn-outline">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Data Import */}
      <div>
        <h3 className="text-lg font-semibold text-secondary-900 mb-4">Data Import</h3>
        <div className="p-6 border-2 border-dashed border-secondary-300 rounded-xl text-center">
          <Upload className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
          <h4 className="font-medium text-secondary-900 mb-2">Import Student Data</h4>
          <p className="text-sm text-secondary-600 mb-4">
            Upload CSV files to import student information
          </p>
          <button className="btn-primary">
            <Upload className="w-4 h-4 mr-2" />
            Choose File
          </button>
        </div>
      </div>

      {/* Data Management */}
      <div>
        <h3 className="text-lg font-semibold text-secondary-900 mb-4">Data Management</h3>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-red-900 mb-2">Danger Zone</h4>
              <p className="text-sm text-red-700 mb-4">
                These actions are permanent and cannot be undone. Please proceed with caution.
              </p>
              <div className="space-y-3">
                <button className="btn bg-red-600 text-white hover:bg-red-700 text-sm">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete All Student Data
                </button>
                <button className="btn bg-red-600 text-white hover:bg-red-700 text-sm ml-3">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset All Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-secondary-900">Settings</h1>
        <p className="text-secondary-600 mt-2">Manage your account settings and preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-left ${
                  activeTab === tab.id
                    ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                    : 'text-secondary-600 hover:text-secondary-900 hover:bg-secondary-50'
                }`}
              >
                <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-primary-600' : 'text-secondary-400'}`} />
                <span className="font-medium">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="card"
          >
            {activeTab === 'profile' && renderProfileTab()}
            {activeTab === 'notifications' && renderNotificationsTab()}
            {activeTab === 'security' && renderSecurityTab()}
            {activeTab === 'preferences' && renderPreferencesTab()}
            {activeTab === 'data' && renderDataTab()}
          </motion.div>
        </div>
      </div>
    </div>
  );
}