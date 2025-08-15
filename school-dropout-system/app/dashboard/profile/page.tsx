'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/app/providers';
import { updateProfile, updatePassword } from 'firebase/auth';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { 
  User, 
  Mail, 
  School, 
  MapPin, 
  Phone, 
  Calendar, 
  Save, 
  Camera, 
  Lock, 
  Eye, 
  EyeOff,
  Bell,
  Shield,
  Settings as SettingsIcon
} from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function ProfilePage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [personalData, setPersonalData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    school: '',
    department: '',
    role: '',
    bio: ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    alertsOnly: false
  });

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    if (!user) return;

    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setPersonalData({
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          email: user.email || '',
          phone: userData.phone || '',
          school: userData.school || '',
          department: userData.department || '',
          role: userData.role || '',
          bio: userData.bio || ''
        });
      } else {
        // Set defaults from Firebase Auth
        setPersonalData({
          firstName: user.displayName?.split(' ')[0] || '',
          lastName: user.displayName?.split(' ').slice(1).join(' ') || '',
          email: user.email || '',
          phone: '',
          school: '',
          department: '',
          role: '',
          bio: ''
        });
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      toast.error('Failed to load profile data');
    }
  };

  const handlePersonalDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPersonalData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePreferenceChange = (key: string) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const savePersonalInfo = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Update Firebase Auth profile
      await updateProfile(user, {
        displayName: `${personalData.firstName} ${personalData.lastName}`
      });

      // Update Firestore document
      await updateDoc(doc(db, 'users', user.uid), {
        firstName: personalData.firstName,
        lastName: personalData.lastName,
        phone: personalData.phone,
        school: personalData.school,
        department: personalData.department,
        role: personalData.role,
        bio: personalData.bio,
        displayName: `${personalData.firstName} ${personalData.lastName}`,
        updatedAt: new Date().toISOString()
      });

      toast.success('Profile updated successfully!');
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async () => {
    if (!user) return;

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    try {
      await updatePassword(user, passwordData.newPassword);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      toast.success('Password updated successfully!');
    } catch (error: any) {
      console.error('Error updating password:', error);
      toast.error(error.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'personal', name: 'Personal Info', icon: User },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'preferences', name: 'Preferences', icon: SettingsIcon }
  ];

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-secondary-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-secondary-900">Profile Settings</h1>
        <p className="text-secondary-600 mt-2">
          Manage your account information and preferences
        </p>
      </div>

      {/* Profile Overview Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <div className="flex items-center space-x-6">
          <div className="relative">
            <img
              src={user.photoURL || 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=80&h=80&fit=crop&crop=face'}
              alt={user.displayName || 'User'}
              className="w-20 h-20 rounded-full object-cover"
            />
            <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-secondary-900">
              {user.displayName || 'User'}
            </h2>
            <p className="text-secondary-600">{user.email}</p>
            <p className="text-sm text-secondary-500 mt-1">
              Member since {new Date(user.metadata.creationTime || '').toLocaleDateString()}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-secondary-100 p-1 rounded-xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-secondary-600 hover:text-secondary-900'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        {activeTab === 'personal' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-secondary-900">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="label">First Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
                  <input
                    type="text"
                    name="firstName"
                    value={personalData.firstName}
                    onChange={handlePersonalDataChange}
                    className="input pl-11"
                    placeholder="Enter first name"
                  />
                </div>
              </div>

              <div>
                <label className="label">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={personalData.lastName}
                  onChange={handlePersonalDataChange}
                  className="input"
                  placeholder="Enter last name"
                />
              </div>

              <div>
                <label className="label">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
                  <input
                    type="email"
                    name="email"
                    value={personalData.email}
                    className="input pl-11 bg-secondary-50"
                    disabled
                    placeholder="Email address"
                  />
                </div>
                <p className="text-xs text-secondary-500 mt-1">Email cannot be changed from this page</p>
              </div>

              <div>
                <label className="label">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={personalData.phone}
                    onChange={handlePersonalDataChange}
                    className="input pl-11"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              <div>
                <label className="label">School</label>
                <div className="relative">
                  <School className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
                  <input
                    type="text"
                    name="school"
                    value={personalData.school}
                    onChange={handlePersonalDataChange}
                    className="input pl-11"
                    placeholder="Enter school name"
                  />
                </div>
              </div>

              <div>
                <label className="label">Role</label>
                <select
                  name="role"
                  value={personalData.role}
                  onChange={handlePersonalDataChange}
                  className="input"
                >
                  <option value="">Select role</option>
                  <option value="teacher">Teacher</option>
                  <option value="counselor">Counselor</option>
                  <option value="administrator">Administrator</option>
                  <option value="principal">Principal</option>
                </select>
              </div>
            </div>

            <div>
              <label className="label">Bio</label>
              <textarea
                name="bio"
                value={personalData.bio}
                onChange={handlePersonalDataChange}
                rows={3}
                className="input"
                placeholder="Tell us a bit about yourself..."
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={savePersonalInfo}
                disabled={loading}
                className="btn-primary flex items-center space-x-2"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-secondary-900">Security Settings</h3>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Lock className="w-5 h-5 text-yellow-600" />
                <p className="text-sm font-medium text-yellow-800">Change Password</p>
              </div>
              <p className="text-sm text-yellow-700 mt-1">
                Choose a strong password to keep your account secure
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="label">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="input pl-11 pr-11"
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
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="input pl-11 pr-11"
                    placeholder="Confirm new password"
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
            </div>

            <div className="flex justify-end">
              <button
                onClick={changePassword}
                disabled={loading || !passwordData.newPassword || !passwordData.confirmPassword}
                className="btn-primary flex items-center space-x-2"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <Shield className="w-4 h-4" />
                )}
                <span>Update Password</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'preferences' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-secondary-900">Notification Preferences</h3>
            
            <div className="space-y-4">
              {[
                {
                  key: 'emailNotifications',
                  title: 'Email Notifications',
                  description: 'Receive important updates and alerts via email'
                },
                {
                  key: 'pushNotifications',
                  title: 'Push Notifications',
                  description: 'Get instant notifications in your browser'
                },
                {
                  key: 'weeklyReports',
                  title: 'Weekly Reports',
                  description: 'Receive weekly summary reports of student data'
                },
                {
                  key: 'alertsOnly',
                  title: 'Critical Alerts Only',
                  description: 'Only receive notifications for high-priority alerts'
                }
              ].map((pref) => (
                <div key={pref.key} className="flex items-center justify-between p-4 border border-secondary-200 rounded-lg">
                  <div>
                    <p className="font-medium text-secondary-900">{pref.title}</p>
                    <p className="text-sm text-secondary-600">{pref.description}</p>
                  </div>
                  <button
                    onClick={() => handlePreferenceChange(pref.key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                      preferences[pref.key as keyof typeof preferences]
                        ? 'bg-primary-600'
                        : 'bg-secondary-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        preferences[pref.key as keyof typeof preferences]
                          ? 'translate-x-6'
                          : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}