'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  Video, 
  Phone, 
  Mail, 
  Plus,
  Save,
  X,
  ArrowLeft,
  User,
  Search,
  Filter,
  Bell,
  Link as LinkIcon,
  Copy,
  Send,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

// Mock data for students and staff
const mockStudents = [
  { id: '1', name: 'Sarah Johnson', grade: '9th', email: 'sarah.johnson@school.edu', riskScore: 85 },
  { id: '2', name: 'Michael Chen', grade: '11th', email: 'michael.chen@school.edu', riskScore: 45 },
  { id: '3', name: 'Emma Davis', grade: '10th', email: 'emma.davis@school.edu', riskScore: 62 },
  { id: '4', name: 'David Wilson', grade: '12th', email: 'david.wilson@school.edu', riskScore: 38 },
  { id: '5', name: 'Lisa Rodriguez', grade: '9th', email: 'lisa.rodriguez@school.edu', riskScore: 73 }
];

const mockStaff = [
  { id: '1', name: 'Dr. Sarah Martinez', role: 'Principal', email: 'sarah.martinez@school.edu' },
  { id: '2', name: 'John Smith', role: 'Counselor', email: 'john.smith@school.edu' },
  { id: '3', name: 'Mary Johnson', role: 'Teacher', email: 'mary.johnson@school.edu' },
  { id: '4', name: 'Robert Brown', role: 'Social Worker', email: 'robert.brown@school.edu' },
  { id: '5', name: 'Lisa Davis', role: 'Psychologist', email: 'lisa.davis@school.edu' }
];

const meetingTypes = [
  { value: 'parent-conference', label: 'Parent Conference', icon: Users, color: 'text-blue-600' },
  { value: 'student-meeting', label: 'Student Meeting', icon: User, color: 'text-green-600' },
  { value: 'staff-meeting', label: 'Staff Meeting', icon: Users, color: 'text-purple-600' },
  { value: 'intervention-review', label: 'Intervention Review', icon: CheckCircle, color: 'text-orange-600' },
  { value: 'crisis-meeting', label: 'Crisis Meeting', icon: AlertCircle, color: 'text-red-600' },
  { value: 'follow-up', label: 'Follow-up Meeting', icon: Clock, color: 'text-teal-600' }
];

const meetingFormats = [
  { value: 'in-person', label: 'In-Person', icon: MapPin },
  { value: 'video-call', label: 'Video Call', icon: Video },
  { value: 'phone-call', label: 'Phone Call', icon: Phone }
];

export default function ScheduleMeetingPage() {
  const [meetingData, setMeetingData] = useState({
    title: '',
    description: '',
    type: 'parent-conference',
    format: 'in-person',
    date: '',
    time: '',
    duration: '30',
    location: '',
    videoLink: '',
    participants: {
      students: [] as string[],
      staff: [] as string[],
      parents: [] as { name: string; email: string; phone: string }[]
    },
    agenda: [''],
    reminders: {
      email: true,
      sms: false,
      days: '1'
    },
    recurring: false,
    recurringPattern: {
      frequency: 'weekly',
      interval: 1,
      endDate: ''
    }
  });

  const [showParentForm, setShowParentForm] = useState(false);
  const [newParent, setNewParent] = useState({ name: '', email: '', phone: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (field: string, value: any) => {
    setMeetingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedChange = (parent: string, field: string, value: any) => {
    setMeetingData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof typeof prev] as any,
        [field]: value
      }
    }));
  };

  const handleParticipantToggle = (type: 'students' | 'staff', id: string) => {
    setMeetingData(prev => ({
      ...prev,
      participants: {
        ...prev.participants,
        [type]: prev.participants[type].includes(id)
          ? prev.participants[type].filter(participantId => participantId !== id)
          : [...prev.participants[type], id]
      }
    }));
  };

  const addParent = () => {
    if (newParent.name && newParent.email) {
      setMeetingData(prev => ({
        ...prev,
        participants: {
          ...prev.participants,
          parents: [...prev.participants.parents, newParent]
        }
      }));
      setNewParent({ name: '', email: '', phone: '' });
      setShowParentForm(false);
      toast.success('Parent added to meeting');
    }
  };

  const removeParent = (index: number) => {
    setMeetingData(prev => ({
      ...prev,
      participants: {
        ...prev.participants,
        parents: prev.participants.parents.filter((_, i) => i !== index)
      }
    }));
  };

  const addAgendaItem = () => {
    setMeetingData(prev => ({
      ...prev,
      agenda: [...prev.agenda, '']
    }));
  };

  const updateAgendaItem = (index: number, value: string) => {
    setMeetingData(prev => ({
      ...prev,
      agenda: prev.agenda.map((item, i) => i === index ? value : item)
    }));
  };

  const removeAgendaItem = (index: number) => {
    if (meetingData.agenda.length > 1) {
      setMeetingData(prev => ({
        ...prev,
        agenda: prev.agenda.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Meeting scheduled successfully!');
      // In a real app, redirect to meetings list or calendar
    } catch (error) {
      toast.error('Failed to schedule meeting');
    } finally {
      setIsLoading(false);
    }
  };

  const generateVideoLink = () => {
    const meetingId = Math.random().toString(36).substring(2, 15);
    const videoLink = `https://meet.eduguard.com/${meetingId}`;
    setMeetingData(prev => ({ ...prev, videoLink }));
    toast.success('Video link generated');
  };

  const copyVideoLink = () => {
    navigator.clipboard.writeText(meetingData.videoLink);
    toast.success('Video link copied to clipboard');
  };

  const selectedMeetingType = meetingTypes.find(type => type.value === meetingData.type);
  const selectedFormat = meetingFormats.find(format => format.value === meetingData.format);

  const filteredStudents = mockStudents.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.grade.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredStaff = mockStaff.filter(staff =>
    staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <h1 className="text-3xl font-bold text-secondary-900">Schedule Meeting</h1>
            <p className="text-secondary-600 mt-1">
              Organize meetings with students, parents, and staff
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
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
            Schedule Meeting
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="card">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">Meeting Details</h3>
            <div className="space-y-4">
              <div>
                <label className="label">Meeting Title</label>
                <input
                  type="text"
                  value={meetingData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="input"
                  placeholder="Enter meeting title..."
                  required
                />
              </div>

              <div>
                <label className="label">Description</label>
                <textarea
                  value={meetingData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="input"
                  rows={3}
                  placeholder="Describe the purpose of this meeting..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Meeting Type</label>
                  <select
                    value={meetingData.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="input"
                  >
                    {meetingTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label">Format</label>
                  <select
                    value={meetingData.format}
                    onChange={(e) => handleInputChange('format', e.target.value)}
                    className="input"
                  >
                    {meetingFormats.map(format => (
                      <option key={format.value} value={format.value}>
                        {format.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Date and Time */}
          <div className="card">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">Schedule</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="label">Date</label>
                  <input
                    type="date"
                    value={meetingData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="label">Time</label>
                  <input
                    type="time"
                    value={meetingData.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="label">Duration (minutes)</label>
                  <select
                    value={meetingData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                    className="input"
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="90">1.5 hours</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>
              </div>

              {/* Location/Video Link */}
              {meetingData.format === 'in-person' && (
                <div>
                  <label className="label">Location</label>
                  <input
                    type="text"
                    value={meetingData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="input"
                    placeholder="Enter meeting location..."
                  />
                </div>
              )}

              {meetingData.format === 'video-call' && (
                <div>
                  <label className="label">Video Conference Link</label>
                  <div className="flex space-x-2">
                    <input
                      type="url"
                      value={meetingData.videoLink}
                      onChange={(e) => handleInputChange('videoLink', e.target.value)}
                      className="input flex-1"
                      placeholder="Enter video conference link..."
                    />
                    <button
                      type="button"
                      onClick={generateVideoLink}
                      className="btn-outline"
                    >
                      Generate
                    </button>
                    {meetingData.videoLink && (
                      <button
                        type="button"
                        onClick={copyVideoLink}
                        className="btn-outline"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Recurring Options */}
              <div className="space-y-3">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={meetingData.recurring}
                    onChange={(e) => handleInputChange('recurring', e.target.checked)}
                    className="text-primary-600 focus:ring-primary-500"
                  />
                  <span className="font-medium text-secondary-700">Recurring Meeting</span>
                </label>

                {meetingData.recurring && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pl-6">
                    <div>
                      <label className="label">Frequency</label>
                      <select
                        value={meetingData.recurringPattern.frequency}
                        onChange={(e) => handleNestedChange('recurringPattern', 'frequency', e.target.value)}
                        className="input"
                      >
                        <option value="weekly">Weekly</option>
                        <option value="biweekly">Bi-weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                    <div>
                      <label className="label">Interval</label>
                      <select
                        value={meetingData.recurringPattern.interval}
                        onChange={(e) => handleNestedChange('recurringPattern', 'interval', parseInt(e.target.value))}
                        className="input"
                      >
                        <option value="1">Every</option>
                        <option value="2">Every 2nd</option>
                        <option value="3">Every 3rd</option>
                        <option value="4">Every 4th</option>
                      </select>
                    </div>
                    <div>
                      <label className="label">End Date</label>
                      <input
                        type="date"
                        value={meetingData.recurringPattern.endDate}
                        onChange={(e) => handleNestedChange('recurringPattern', 'endDate', e.target.value)}
                        className="input"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Participants */}
          <div className="card">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">Participants</h3>
            
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary-400" />
              <input
                type="text"
                placeholder="Search students and staff..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-9"
              />
            </div>

            <div className="space-y-6">
              {/* Students */}
              <div>
                <h4 className="font-medium text-secondary-900 mb-3">Students</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {filteredStudents.map(student => (
                    <label
                      key={student.id}
                      className="flex items-center space-x-3 p-3 hover:bg-secondary-50 rounded-lg cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={meetingData.participants.students.includes(student.id)}
                        onChange={() => handleParticipantToggle('students', student.id)}
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
                        <p className="text-sm text-secondary-500">{student.email}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Staff */}
              <div>
                <h4 className="font-medium text-secondary-900 mb-3">Staff Members</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {filteredStaff.map(staff => (
                    <label
                      key={staff.id}
                      className="flex items-center space-x-3 p-3 hover:bg-secondary-50 rounded-lg cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={meetingData.participants.staff.includes(staff.id)}
                        onChange={() => handleParticipantToggle('staff', staff.id)}
                        className="text-primary-600 focus:ring-primary-500"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-secondary-900">{staff.name}</span>
                          <span className="text-sm text-secondary-600">{staff.role}</span>
                        </div>
                        <p className="text-sm text-secondary-500">{staff.email}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Parents/Guardians */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-secondary-900">Parents/Guardians</h4>
                  <button
                    type="button"
                    onClick={() => setShowParentForm(true)}
                    className="btn-outline btn-sm"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Parent
                  </button>
                </div>

                {meetingData.participants.parents.length > 0 && (
                  <div className="space-y-2">
                    {meetingData.participants.parents.map((parent, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                        <div>
                          <span className="font-medium text-secondary-900">{parent.name}</span>
                          <p className="text-sm text-secondary-500">{parent.email}</p>
                          {parent.phone && (
                            <p className="text-sm text-secondary-500">{parent.phone}</p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeParent(index)}
                          className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {showParentForm && (
                  <div className="mt-3 p-4 border border-secondary-200 rounded-lg">
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Parent/Guardian Name"
                        value={newParent.name}
                        onChange={(e) => setNewParent(prev => ({ ...prev, name: e.target.value }))}
                        className="input"
                      />
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={newParent.email}
                        onChange={(e) => setNewParent(prev => ({ ...prev, email: e.target.value }))}
                        className="input"
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number (Optional)"
                        value={newParent.phone}
                        onChange={(e) => setNewParent(prev => ({ ...prev, phone: e.target.value }))}
                        className="input"
                      />
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={addParent}
                          className="btn-primary btn-sm"
                        >
                          Add Parent
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowParentForm(false)}
                          className="btn-outline btn-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Agenda */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-secondary-900">Meeting Agenda</h3>
              <button
                type="button"
                onClick={addAgendaItem}
                className="btn-outline btn-sm"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Item
              </button>
            </div>
            <div className="space-y-3">
              {meetingData.agenda.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-secondary-600 w-8">
                    {index + 1}.
                  </span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateAgendaItem(index, e.target.value)}
                    className="input flex-1"
                    placeholder="Enter agenda item..."
                  />
                  {meetingData.agenda.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeAgendaItem(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Reminders */}
          <div className="card">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">Reminders</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={meetingData.reminders.email}
                    onChange={(e) => handleNestedChange('reminders', 'email', e.target.checked)}
                    className="text-primary-600 focus:ring-primary-500"
                  />
                  <Mail className="w-4 h-4 text-secondary-400" />
                  <span className="font-medium text-secondary-700">Email Reminders</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={meetingData.reminders.sms}
                    onChange={(e) => handleNestedChange('reminders', 'sms', e.target.checked)}
                    className="text-primary-600 focus:ring-primary-500"
                  />
                  <Bell className="w-4 h-4 text-secondary-400" />
                  <span className="font-medium text-secondary-700">SMS Reminders</span>
                </label>
              </div>

              <div>
                <label className="label">Send Reminder</label>
                <select
                  value={meetingData.reminders.days}
                  onChange={(e) => handleNestedChange('reminders', 'days', e.target.value)}
                  className="input max-w-xs"
                >
                  <option value="1">1 day before</option>
                  <option value="2">2 days before</option>
                  <option value="3">3 days before</option>
                  <option value="7">1 week before</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Sidebar */}
        <div className="space-y-6">
          {/* Meeting Summary */}
          <div className="card">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">Meeting Summary</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                {selectedMeetingType && (
                  <selectedMeetingType.icon className={`w-5 h-5 ${selectedMeetingType.color}`} />
                )}
                <div>
                  <h4 className="font-semibold text-secondary-900">
                    {meetingData.title || 'Meeting Title'}
                  </h4>
                  <p className="text-sm text-secondary-600">{selectedMeetingType?.label}</p>
                </div>
              </div>

              {meetingData.date && meetingData.time && (
                <div className="flex items-center space-x-2 text-sm text-secondary-600">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(meetingData.date).toLocaleDateString()} at {meetingData.time}
                  </span>
                </div>
              )}

              <div className="flex items-center space-x-2 text-sm text-secondary-600">
                <Clock className="w-4 h-4" />
                <span>{meetingData.duration} minutes</span>
              </div>

              {selectedFormat && (
                <div className="flex items-center space-x-2 text-sm text-secondary-600">
                  <selectedFormat.icon className="w-4 h-4" />
                  <span>{selectedFormat.label}</span>
                </div>
              )}

              {meetingData.location && meetingData.format === 'in-person' && (
                <div className="flex items-center space-x-2 text-sm text-secondary-600">
                  <MapPin className="w-4 h-4" />
                  <span>{meetingData.location}</span>
                </div>
              )}

              {meetingData.videoLink && meetingData.format === 'video-call' && (
                <div className="flex items-center space-x-2 text-sm text-secondary-600">
                  <LinkIcon className="w-4 h-4" />
                  <span className="truncate">Video Conference</span>
                </div>
              )}
            </div>
          </div>

          {/* Participants Count */}
          <div className="card">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">Participants</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-secondary-600">Students</span>
                <span className="font-semibold text-secondary-900">
                  {meetingData.participants.students.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-secondary-600">Staff</span>
                <span className="font-semibold text-secondary-900">
                  {meetingData.participants.staff.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-secondary-600">Parents</span>
                <span className="font-semibold text-secondary-900">
                  {meetingData.participants.parents.length}
                </span>
              </div>
              <div className="border-t border-secondary-200 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-secondary-900">Total</span>
                  <span className="font-bold text-secondary-900">
                    {meetingData.participants.students.length + 
                     meetingData.participants.staff.length + 
                     meetingData.participants.parents.length}
                  </span>
                </div>
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
              <p>• Send invitations at least 24 hours in advance</p>
              <p>• Include a clear agenda to keep the meeting focused</p>
              <p>• For video calls, test the link before the meeting</p>
              <p>• Set reminders to ensure good attendance</p>
              <p>• Follow up with action items after the meeting</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}