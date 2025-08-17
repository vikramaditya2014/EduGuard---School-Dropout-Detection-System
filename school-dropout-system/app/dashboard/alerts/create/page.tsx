'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  AlertTriangle, 
  Users, 
  Calendar, 
  Clock, 
  Mail, 
  MessageSquare,
  Save,
  X,
  Plus,
  Trash2,
  Eye,
  Settings,
  Target,
  Filter,
  Search,
  ChevronDown,
  Info,
  CheckCircle,
  ArrowLeft
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

// Mock data for students and conditions
const mockStudents = [
  { id: '1', name: 'Sarah Johnson', grade: '9th', riskScore: 85 },
  { id: '2', name: 'Michael Chen', grade: '11th', riskScore: 45 },
  { id: '3', name: 'Emma Davis', grade: '10th', riskScore: 62 },
  { id: '4', name: 'David Wilson', grade: '12th', riskScore: 38 },
  { id: '5', name: 'Lisa Rodriguez', grade: '9th', riskScore: 73 }
];

const alertTypes = [
  { value: 'attendance', label: 'Attendance Alert', icon: Clock, color: 'text-red-600' },
  { value: 'academic', label: 'Academic Performance', icon: Target, color: 'text-orange-600' },
  { value: 'behavioral', label: 'Behavioral Incident', icon: AlertTriangle, color: 'text-yellow-600' },
  { value: 'risk', label: 'Risk Score Change', icon: Users, color: 'text-purple-600' },
  { value: 'intervention', label: 'Intervention Required', icon: Bell, color: 'text-blue-600' },
  { value: 'custom', label: 'Custom Alert', icon: Settings, color: 'text-gray-600' }
];

const priorityLevels = [
  { value: 'low', label: 'Low Priority', color: 'bg-green-100 text-green-800' },
  { value: 'medium', label: 'Medium Priority', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'high', label: 'High Priority', color: 'bg-red-100 text-red-800' },
  { value: 'urgent', label: 'Urgent', color: 'bg-purple-100 text-purple-800' }
];

const conditionOperators = [
  { value: 'equals', label: 'Equals' },
  { value: 'greater_than', label: 'Greater than' },
  { value: 'less_than', label: 'Less than' },
  { value: 'contains', label: 'Contains' },
  { value: 'between', label: 'Between' }
];

export default function CreateAlertPage() {
  const [alertData, setAlertData] = useState({
    title: '',
    description: '',
    type: 'attendance',
    priority: 'medium',
    targetStudents: 'all', // 'all', 'specific', 'conditions'
    selectedStudents: [] as string[],
    conditions: [
      { field: 'attendance', operator: 'less_than', value: '70', value2: '' }
    ],
    notifications: {
      email: true,
      dashboard: true,
      sms: false
    },
    recipients: [] as string[],
    schedule: {
      immediate: true,
      recurring: false,
      frequency: 'daily',
      time: '09:00'
    },
    active: true
  });

  const [showPreview, setShowPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setAlertData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedChange = (parent: string, field: string, value: any) => {
    setAlertData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof typeof prev] as any,
        [field]: value
      }
    }));
  };

  const handleConditionChange = (index: number, field: string, value: string) => {
    const newConditions = [...alertData.conditions];
    newConditions[index] = { ...newConditions[index], [field]: value };
    setAlertData(prev => ({ ...prev, conditions: newConditions }));
  };

  const addCondition = () => {
    setAlertData(prev => ({
      ...prev,
      conditions: [
        ...prev.conditions,
        { field: 'attendance', operator: 'less_than', value: '', value2: '' }
      ]
    }));
  };

  const removeCondition = (index: number) => {
    if (alertData.conditions.length > 1) {
      setAlertData(prev => ({
        ...prev,
        conditions: prev.conditions.filter((_, i) => i !== index)
      }));
    }
  };

  const handleStudentSelection = (studentId: string) => {
    setAlertData(prev => ({
      ...prev,
      selectedStudents: prev.selectedStudents.includes(studentId)
        ? prev.selectedStudents.filter(id => id !== studentId)
        : [...prev.selectedStudents, studentId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Alert created successfully!');
      // In a real app, redirect to alerts list
    } catch (error) {
      toast.error('Failed to create alert');
    } finally {
      setIsLoading(false);
    }
  };

  const selectedAlertType = alertTypes.find(type => type.value === alertData.type);
  const selectedPriority = priorityLevels.find(p => p.value === alertData.priority);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/dashboard"
            className="p-2 hover:bg-secondary-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-secondary-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">Create Alert</h1>
            <p className="text-secondary-600 mt-1">
              Set up automated alerts to monitor student conditions
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="btn-outline"
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="btn-primary"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Create Alert
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="card">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">Basic Information</h3>
            <div className="space-y-4">
              <div>
                <label className="label">Alert Title</label>
                <input
                  type="text"
                  value={alertData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="input"
                  placeholder="Enter alert title..."
                  required
                />
              </div>

              <div>
                <label className="label">Description</label>
                <textarea
                  value={alertData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="input"
                  rows={3}
                  placeholder="Describe what this alert monitors..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Alert Type</label>
                  <select
                    value={alertData.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="input"
                  >
                    {alertTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label">Priority Level</label>
                  <select
                    value={alertData.priority}
                    onChange={(e) => handleInputChange('priority', e.target.value)}
                    className="input"
                  >
                    {priorityLevels.map(priority => (
                      <option key={priority.value} value={priority.value}>
                        {priority.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Target Students */}
          <div className="card">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">Target Students</h3>
            <div className="space-y-4">
              <div className="flex space-x-4">
                {[
                  { value: 'all', label: 'All Students' },
                  { value: 'specific', label: 'Specific Students' },
                  { value: 'conditions', label: 'Based on Conditions' }
                ].map(option => (
                  <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="targetStudents"
                      value={option.value}
                      checked={alertData.targetStudents === option.value}
                      onChange={(e) => handleInputChange('targetStudents', e.target.value)}
                      className="text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm font-medium text-secondary-700">{option.label}</span>
                  </label>
                ))}
              </div>

              {alertData.targetStudents === 'specific' && (
                <div className="border border-secondary-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-secondary-900">Select Students</h4>
                    <span className="text-sm text-secondary-600">
                      {alertData.selectedStudents.length} selected
                    </span>
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {mockStudents.map(student => (
                      <label
                        key={student.id}
                        className="flex items-center space-x-3 p-2 hover:bg-secondary-50 rounded-lg cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={alertData.selectedStudents.includes(student.id)}
                          onChange={() => handleStudentSelection(student.id)}
                          className="text-primary-600 focus:ring-primary-500"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-secondary-900">{student.name}</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-secondary-600">{student.grade}</span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                student.riskScore >= 70 ? 'bg-red-100 text-red-800' :
                                student.riskScore >= 40 ? 'bg-yellow-100 text-yellow-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                Risk: {student.riskScore}
                              </span>
                            </div>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {alertData.targetStudents === 'conditions' && (
                <div className="border border-secondary-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-secondary-900">Alert Conditions</h4>
                    <button
                      onClick={addCondition}
                      className="btn-outline btn-sm"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Condition
                    </button>
                  </div>
                  <div className="space-y-3">
                    {alertData.conditions.map((condition, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <select
                          value={condition.field}
                          onChange={(e) => handleConditionChange(index, 'field', e.target.value)}
                          className="input flex-1"
                        >
                          <option value="attendance">Attendance Rate</option>
                          <option value="gpa">GPA</option>
                          <option value="risk_score">Risk Score</option>
                          <option value="absences">Absences</option>
                          <option value="grade">Grade Level</option>
                        </select>
                        <select
                          value={condition.operator}
                          onChange={(e) => handleConditionChange(index, 'operator', e.target.value)}
                          className="input"
                        >
                          {conditionOperators.map(op => (
                            <option key={op.value} value={op.value}>{op.label}</option>
                          ))}
                        </select>
                        <input
                          type="text"
                          value={condition.value}
                          onChange={(e) => handleConditionChange(index, 'value', e.target.value)}
                          className="input w-20"
                          placeholder="Value"
                        />
                        {condition.operator === 'between' && (
                          <input
                            type="text"
                            value={condition.value2}
                            onChange={(e) => handleConditionChange(index, 'value2', e.target.value)}
                            className="input w-20"
                            placeholder="To"
                          />
                        )}
                        {alertData.conditions.length > 1 && (
                          <button
                            onClick={() => removeCondition(index)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Notification Settings */}
          <div className="card">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">Notification Settings</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-secondary-900 mb-2">Notification Methods</h4>
                <div className="space-y-2">
                  {[
                    { key: 'dashboard', label: 'Dashboard Notification', icon: Bell },
                    { key: 'email', label: 'Email Notification', icon: Mail },
                    { key: 'sms', label: 'SMS Notification', icon: MessageSquare }
                  ].map(method => (
                    <label key={method.key} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={alertData.notifications[method.key as keyof typeof alertData.notifications]}
                        onChange={(e) => handleNestedChange('notifications', method.key, e.target.checked)}
                        className="text-primary-600 focus:ring-primary-500"
                      />
                      <method.icon className="w-4 h-4 text-secondary-400" />
                      <span className="text-sm font-medium text-secondary-700">{method.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="label">Additional Recipients (Email)</label>
                <input
                  type="text"
                  placeholder="Enter email addresses separated by commas"
                  className="input"
                />
              </div>
            </div>
          </div>

          {/* Schedule Settings */}
          <div className="card">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">Schedule Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="schedule"
                    checked={alertData.schedule.immediate}
                    onChange={() => handleNestedChange('schedule', 'immediate', true)}
                    className="text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm font-medium text-secondary-700">Immediate</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="schedule"
                    checked={!alertData.schedule.immediate}
                    onChange={() => handleNestedChange('schedule', 'immediate', false)}
                    className="text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm font-medium text-secondary-700">Scheduled</span>
                </label>
              </div>

              {!alertData.schedule.immediate && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Frequency</label>
                    <select
                      value={alertData.schedule.frequency}
                      onChange={(e) => handleNestedChange('schedule', 'frequency', e.target.value)}
                      className="input"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                  <div>
                    <label className="label">Time</label>
                    <input
                      type="time"
                      value={alertData.schedule.time}
                      onChange={(e) => handleNestedChange('schedule', 'time', e.target.value)}
                      className="input"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Preview Sidebar */}
        <div className="space-y-6">
          {/* Alert Preview */}
          <div className="card">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">Alert Preview</h3>
            <div className="space-y-4">
              <div className="p-4 border border-secondary-200 rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  {selectedAlertType && (
                    <selectedAlertType.icon className={`w-5 h-5 ${selectedAlertType.color}`} />
                  )}
                  <h4 className="font-semibold text-secondary-900">
                    {alertData.title || 'Alert Title'}
                  </h4>
                  {selectedPriority && (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${selectedPriority.color}`}>
                      {selectedPriority.label}
                    </span>
                  )}
                </div>
                <p className="text-sm text-secondary-600 mb-3">
                  {alertData.description || 'Alert description will appear here...'}
                </p>
                <div className="flex items-center justify-between text-xs text-secondary-500">
                  <span>
                    Target: {
                      alertData.targetStudents === 'all' ? 'All Students' :
                      alertData.targetStudents === 'specific' ? `${alertData.selectedStudents.length} Students` :
                      'Condition-based'
                    }
                  </span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h5 className="font-medium text-secondary-900">Notification Methods:</h5>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(alertData.notifications).map(([key, enabled]) => (
                    enabled && (
                      <span key={key} className="px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-full">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </span>
                    )
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h5 className="font-medium text-secondary-900">Schedule:</h5>
                <p className="text-sm text-secondary-600">
                  {alertData.schedule.immediate 
                    ? 'Immediate notification' 
                    : `${alertData.schedule.frequency} at ${alertData.schedule.time}`
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="card">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-secondary-600">Total Students</span>
                <span className="font-semibold text-secondary-900">{mockStudents.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-secondary-600">High Risk</span>
                <span className="font-semibold text-red-600">
                  {mockStudents.filter(s => s.riskScore >= 70).length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-secondary-600">Medium Risk</span>
                <span className="font-semibold text-yellow-600">
                  {mockStudents.filter(s => s.riskScore >= 40 && s.riskScore < 70).length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-secondary-600">Low Risk</span>
                <span className="font-semibold text-green-600">
                  {mockStudents.filter(s => s.riskScore < 40).length}
                </span>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="card">
            <div className="flex items-center space-x-2 mb-3">
              <Info className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-secondary-900">Tips</h3>
            </div>
            <div className="space-y-2 text-sm text-secondary-600">
              <p>• Use specific conditions to target the right students</p>
              <p>• Set appropriate priority levels for better organization</p>
              <p>• Test your alert with a small group first</p>
              <p>• Review and adjust alert frequency to avoid spam</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}