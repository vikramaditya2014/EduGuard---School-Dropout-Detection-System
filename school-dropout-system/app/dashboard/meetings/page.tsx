'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  Video, 
  Phone, 
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit3,
  Trash2,
  Copy,
  Send,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Mail,
  Bell,
  RefreshCw,
  Eye,
  MessageCircle,
  FileText,
  Download
} from 'lucide-react';
import { toast } from 'react-hot-toast';

// Mock meetings data
const mockMeetings = [
  {
    id: '1',
    title: 'Parent Conference - Sarah Johnson',
    description: 'Discuss academic progress and attendance concerns',
    type: 'parent-conference',
    format: 'in-person',
    date: '2024-01-20',
    time: '14:00',
    duration: 30,
    location: 'Conference Room A',
    status: 'scheduled',
    organizer: 'John Smith',
    participants: {
      students: ['Sarah Johnson'],
      staff: ['John Smith', 'Mary Davis'],
      parents: ['Mary Johnson']
    },
    agenda: [
      'Review current grades',
      'Discuss attendance issues',
      'Create action plan'
    ],
    reminders: true,
    recurring: false
  },
  {
    id: '2',
    title: 'Weekly Staff Meeting',
    description: 'Review student progress and intervention strategies',
    type: 'staff-meeting',
    format: 'video-call',
    date: '2024-01-18',
    time: '09:00',
    duration: 60,
    videoLink: 'https://meet.eduguard.com/staff-weekly',
    status: 'completed',
    organizer: 'Dr. Sarah Martinez',
    participants: {
      students: [],
      staff: ['Dr. Sarah Martinez', 'John Smith', 'Mary Davis', 'Robert Brown'],
      parents: []
    },
    agenda: [
      'Review weekly metrics',
      'Discuss high-risk students',
      'Plan interventions'
    ],
    reminders: true,
    recurring: true
  },
  {
    id: '3',
    title: 'Student Support Meeting - Michael Chen',
    description: 'Individual meeting to discuss academic support needs',
    type: 'student-meeting',
    format: 'in-person',
    date: '2024-01-19',
    time: '11:30',
    duration: 45,
    location: 'Counselor Office',
    status: 'in-progress',
    organizer: 'Mary Davis',
    participants: {
      students: ['Michael Chen'],
      staff: ['Mary Davis', 'Lisa Rodriguez'],
      parents: []
    },
    agenda: [
      'Assess current challenges',
      'Identify support resources',
      'Set goals and timeline'
    ],
    reminders: true,
    recurring: false
  },
  {
    id: '4',
    title: 'Crisis Intervention Meeting',
    description: 'Emergency meeting to address urgent student situation',
    type: 'crisis-meeting',
    format: 'phone-call',
    date: '2024-01-17',
    time: '16:00',
    duration: 30,
    status: 'completed',
    organizer: 'Robert Brown',
    participants: {
      students: ['Emma Davis'],
      staff: ['Robert Brown', 'Dr. Sarah Martinez'],
      parents: ['David Davis', 'Jennifer Davis']
    },
    agenda: [
      'Assess immediate safety',
      'Coordinate support services',
      'Follow-up plan'
    ],
    reminders: false,
    recurring: false
  },
  {
    id: '5',
    title: 'Intervention Review - Lisa Rodriguez',
    description: 'Review progress of current intervention programs',
    type: 'intervention-review',
    format: 'video-call',
    date: '2024-01-22',
    time: '13:00',
    duration: 45,
    videoLink: 'https://meet.eduguard.com/intervention-review',
    status: 'scheduled',
    organizer: 'Lisa Rodriguez',
    participants: {
      students: ['Lisa Rodriguez'],
      staff: ['Lisa Rodriguez', 'John Smith', 'Mary Davis'],
      parents: ['Carlos Rodriguez']
    },
    agenda: [
      'Review intervention progress',
      'Assess effectiveness',
      'Adjust strategies if needed'
    ],
    reminders: true,
    recurring: false
  }
];

const meetingTypes = [
  { value: 'all', label: 'All Meetings', color: 'text-secondary-600' },
  { value: 'parent-conference', label: 'Parent Conference', color: 'text-blue-600' },
  { value: 'student-meeting', label: 'Student Meeting', color: 'text-green-600' },
  { value: 'staff-meeting', label: 'Staff Meeting', color: 'text-purple-600' },
  { value: 'intervention-review', label: 'Intervention Review', color: 'text-orange-600' },
  { value: 'crisis-meeting', label: 'Crisis Meeting', color: 'text-red-600' },
  { value: 'follow-up', label: 'Follow-up Meeting', color: 'text-teal-600' }
];

const meetingStatuses = [
  { value: 'all', label: 'All Status' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' }
];

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState(mockMeetings);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

  const filteredMeetings = meetings.filter(meeting => {
    const matchesSearch = 
      meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meeting.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meeting.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'all' || meeting.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || meeting.status === selectedStatus;
    const matchesDate = !selectedDate || meeting.date === selectedDate;
    
    return matchesSearch && matchesType && matchesStatus && matchesDate;
  }).sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.time}`);
    const dateB = new Date(`${b.date} ${b.time}`);
    return dateA.getTime() - dateB.getTime();
  });

  const handleDeleteMeeting = (meetingId: string) => {
    setMeetings(prev => prev.filter(m => m.id !== meetingId));
    toast.success('Meeting deleted successfully');
  };

  const handleCopyLink = (meeting: any) => {
    if (meeting.videoLink) {
      navigator.clipboard.writeText(meeting.videoLink);
      toast.success('Video link copied to clipboard');
    } else {
      toast.error('No video link available');
    }
  };

  const handleSendReminder = (meetingId: string) => {
    toast.success('Reminder sent to all participants');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'text-blue-600 bg-blue-100';
      case 'in-progress': return 'text-green-600 bg-green-100';
      case 'completed': return 'text-gray-600 bg-gray-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-secondary-600 bg-secondary-100';
    }
  };

  const getTypeColor = (type: string) => {
    const meetingType = meetingTypes.find(t => t.value === type);
    return meetingType ? meetingType.color : 'text-secondary-600';
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'video-call': return Video;
      case 'phone-call': return Phone;
      default: return MapPin;
    }
  };

  const isUpcoming = (date: string, time: string) => {
    const meetingDateTime = new Date(`${date} ${time}`);
    return meetingDateTime > new Date();
  };

  const formatDateTime = (date: string, time: string) => {
    const meetingDate = new Date(`${date} ${time}`);
    return {
      date: meetingDate.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      }),
      time: meetingDate.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      })
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">Meetings</h1>
          <p className="text-secondary-600 mt-1">
            Manage and track all meetings and conferences
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => toast.success('Refreshing meetings...')}
            className="btn-outline"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
          <Link href="/dashboard/meetings/schedule" className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Schedule Meeting
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { 
            label: 'Total Meetings', 
            value: meetings.length, 
            icon: Calendar, 
            color: 'from-blue-500 to-blue-600' 
          },
          { 
            label: 'Scheduled', 
            value: meetings.filter(m => m.status === 'scheduled').length, 
            icon: Clock, 
            color: 'from-green-500 to-green-600' 
          },
          { 
            label: 'In Progress', 
            value: meetings.filter(m => m.status === 'in-progress').length, 
            icon: Users, 
            color: 'from-orange-500 to-orange-600' 
          },
          { 
            label: 'This Week', 
            value: meetings.filter(m => {
              const meetingDate = new Date(m.date);
              const now = new Date();
              const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
              const weekEnd = new Date(weekStart);
              weekEnd.setDate(weekStart.getDate() + 6);
              return meetingDate >= weekStart && meetingDate <= weekEnd;
            }).length, 
            icon: Bell, 
            color: 'from-purple-500 to-purple-600' 
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="stat-card"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <p className="text-sm text-secondary-600 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-secondary-900">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary-400" />
              <input
                type="text"
                placeholder="Search meetings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-9 w-full sm:w-64"
              />
            </div>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="input w-full sm:w-auto"
            >
              {meetingTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="input w-full sm:w-auto"
            >
              {meetingStatuses.map(status => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>

            {/* Date Filter */}
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="input w-full sm:w-auto"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' 
                  ? 'bg-primary-100 text-primary-600' 
                  : 'text-secondary-400 hover:text-secondary-600'
              }`}
            >
              <FileText className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'calendar' 
                  ? 'bg-primary-100 text-primary-600' 
                  : 'text-secondary-400 hover:text-secondary-600'
              }`}
            >
              <Calendar className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Meetings List */}
      <div className="space-y-4">
        {filteredMeetings.length === 0 ? (
          <div className="card text-center py-12">
            <Calendar className="w-16 h-16 text-secondary-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-secondary-900 mb-2">No Meetings Found</h3>
            <p className="text-secondary-600 mb-4">
              {searchTerm || selectedType !== 'all' || selectedStatus !== 'all' || selectedDate
                ? 'Try adjusting your filters or search terms.'
                : 'Schedule your first meeting to get started.'}
            </p>
            <Link href="/dashboard/meetings/schedule" className="btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              Schedule Meeting
            </Link>
          </div>
        ) : (
          filteredMeetings.map((meeting, index) => {
            const FormatIcon = getFormatIcon(meeting.format);
            const { date, time } = formatDateTime(meeting.date, meeting.time);
            const upcoming = isUpcoming(meeting.date, meeting.time);
            
            return (
              <motion.div
                key={meeting.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`card hover:shadow-md transition-shadow ${
                  upcoming && meeting.status === 'scheduled' ? 'border-l-4 border-l-primary-500' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        meeting.status === 'scheduled' ? 'bg-blue-100' :
                        meeting.status === 'in-progress' ? 'bg-green-100' :
                        meeting.status === 'completed' ? 'bg-gray-100' :
                        'bg-red-100'
                      }`}>
                        <FormatIcon className={`w-6 h-6 ${
                          meeting.status === 'scheduled' ? 'text-blue-600' :
                          meeting.status === 'in-progress' ? 'text-green-600' :
                          meeting.status === 'completed' ? 'text-gray-600' :
                          'text-red-600'
                        }`} />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-secondary-900 truncate">
                          {meeting.title}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(meeting.status)}`}>
                          {meeting.status}
                        </span>
                        {meeting.recurring && (
                          <span className="px-2 py-1 bg-purple-100 text-purple-600 text-xs rounded-full">
                            Recurring
                          </span>
                        )}
                      </div>
                      
                      <p className="text-sm text-secondary-600 mb-3 line-clamp-2">
                        {meeting.description}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-sm text-secondary-500 mb-3">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{time} ({meeting.duration}min)</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{meeting.organizer}</span>
                        </div>
                      </div>
                      
                      {(meeting.location || meeting.videoLink) && (
                        <div className="flex items-center space-x-1 text-sm text-secondary-500 mb-3">
                          <FormatIcon className="w-4 h-4" />
                          <span>
                            {meeting.location || 'Video Conference'}
                          </span>
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-4 text-sm text-secondary-500">
                        <span>
                          {meeting.participants.students.length + 
                           meeting.participants.staff.length + 
                           meeting.participants.parents.length} participants
                        </span>
                        {meeting.agenda.length > 0 && (
                          <>
                            <span>•</span>
                            <span>{meeting.agenda.length} agenda items</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    {meeting.videoLink && (
                      <button
                        onClick={() => handleCopyLink(meeting)}
                        className="p-2 text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100 rounded-lg transition-colors"
                        title="Copy video link"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    )}
                    
                    {upcoming && meeting.status === 'scheduled' && (
                      <button
                        onClick={() => handleSendReminder(meeting.id)}
                        className="p-2 text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100 rounded-lg transition-colors"
                        title="Send reminder"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    )}
                    
                    <button
                      onClick={() => toast.success('Opening meeting details...')}
                      className="p-2 text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100 rounded-lg transition-colors"
                      title="View details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => toast.success('Opening edit form...')}
                      className="p-2 text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100 rounded-lg transition-colors"
                      title="Edit meeting"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => handleDeleteMeeting(meeting.id)}
                      className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete meeting"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}