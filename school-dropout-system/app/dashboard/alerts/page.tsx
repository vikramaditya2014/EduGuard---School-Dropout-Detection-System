'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Bell, 
  AlertTriangle, 
  Clock, 
  Users, 
  BookOpen,
  Search,
  Filter,
  Plus,
  Eye,
  Check,
  X,
  Archive,
  RefreshCw,
  MoreVertical,
  Calendar,
  User,
  GraduationCap,
  TrendingDown,
  Activity,
  MessageCircle,
  Mail,
  Phone,
  Target,
  Zap,
  Shield,
  Info,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { toast } from 'react-hot-toast';

// Mock alerts data
const mockAlerts = [
  {
    id: '1',
    title: 'High Risk Student Alert',
    message: 'Sarah Johnson\'s risk score has increased to 85 (Critical)',
    type: 'risk',
    severity: 'high',
    studentId: '1',
    studentName: 'Sarah Johnson',
    grade: '9th',
    createdAt: '2024-01-15T10:30:00Z',
    status: 'active',
    assignedTo: 'John Smith',
    category: 'Academic',
    details: {
      riskScore: 85,
      previousScore: 72,
      factors: ['Attendance decline', 'Grade drop in Math', 'Behavioral incidents'],
      recommendations: ['Schedule parent conference', 'Implement tutoring program', 'Counseling referral']
    }
  },
  {
    id: '2',
    title: 'Attendance Alert',
    message: 'Michael Chen has missed 4 consecutive days',
    type: 'attendance',
    severity: 'high',
    studentId: '2',
    studentName: 'Michael Chen',
    grade: '11th',
    createdAt: '2024-01-14T14:20:00Z',
    status: 'active',
    assignedTo: 'Mary Davis',
    category: 'Attendance',
    details: {
      consecutiveDays: 4,
      totalAbsences: 12,
      attendanceRate: 78,
      lastAttended: '2024-01-10',
      recommendations: ['Contact parent/guardian', 'Home visit', 'Attendance intervention plan']
    }
  },
  {
    id: '3',
    title: 'Grade Drop Alert',
    message: 'Emma Davis\'s Math grade dropped from B to D',
    type: 'academic',
    severity: 'medium',
    studentId: '3',
    studentName: 'Emma Davis',
    grade: '10th',
    createdAt: '2024-01-13T09:15:00Z',
    status: 'acknowledged',
    assignedTo: 'Robert Brown',
    category: 'Academic',
    details: {
      subject: 'Mathematics',
      previousGrade: 'B',
      currentGrade: 'D',
      gradeChange: -2.0,
      recommendations: ['Math tutoring', 'Teacher conference', 'Study skills assessment']
    }
  },
  {
    id: '4',
    title: 'Behavioral Incident',
    message: 'David Wilson involved in classroom disruption',
    type: 'behavioral',
    severity: 'medium',
    studentId: '4',
    studentName: 'David Wilson',
    grade: '12th',
    createdAt: '2024-01-12T11:45:00Z',
    status: 'resolved',
    assignedTo: 'Lisa Rodriguez',
    category: 'Behavioral',
    details: {
      incidentType: 'Classroom disruption',
      location: 'Room 205',
      witnesses: ['Teacher: Ms. Johnson', 'Student: Alex Smith'],
      actionTaken: 'Counseling session scheduled',
      recommendations: ['Behavioral intervention plan', 'Parent notification', 'Follow-up meeting']
    }
  },
  {
    id: '5',
    title: 'Intervention Required',
    message: 'Lisa Rodriguez showing multiple risk indicators',
    type: 'intervention',
    severity: 'high',
    studentId: '5',
    studentName: 'Lisa Rodriguez',
    grade: '9th',
    createdAt: '2024-01-11T16:30:00Z',
    status: 'active',
    assignedTo: 'Dr. Sarah Martinez',
    category: 'Multi-factor',
    details: {
      riskFactors: ['Low GPA (2.1)', 'Poor attendance (68%)', 'Family issues'],
      interventionsNeeded: ['Academic support', 'Counseling', 'Family engagement'],
      urgency: 'High',
      recommendations: ['Immediate intervention team meeting', 'Comprehensive assessment', 'Support plan development']
    }
  },
  {
    id: '6',
    title: 'System Alert',
    message: 'Weekly risk assessment completed - 3 new high-risk students identified',
    type: 'system',
    severity: 'low',
    studentId: null,
    studentName: null,
    grade: null,
    createdAt: '2024-01-10T08:00:00Z',
    status: 'acknowledged',
    assignedTo: 'System Administrator',
    category: 'System',
    details: {
      newHighRisk: 3,
      totalHighRisk: 12,
      studentsAssessed: 450,
      recommendations: ['Review new high-risk cases', 'Update intervention plans', 'Staff notification']
    }
  }
];

const alertTypes = [
  { value: 'all', label: 'All Alerts', icon: Bell, color: 'text-secondary-600' },
  { value: 'risk', label: 'Risk Alerts', icon: AlertTriangle, color: 'text-red-600' },
  { value: 'attendance', label: 'Attendance', icon: Clock, color: 'text-blue-600' },
  { value: 'academic', label: 'Academic', icon: BookOpen, color: 'text-green-600' },
  { value: 'behavioral', label: 'Behavioral', icon: Users, color: 'text-orange-600' },
  { value: 'intervention', label: 'Intervention', icon: Target, color: 'text-purple-600' },
  { value: 'system', label: 'System', icon: Activity, color: 'text-gray-600' }
];

const alertSeverities = [
  { value: 'all', label: 'All Severities' },
  { value: 'high', label: 'High Priority' },
  { value: 'medium', label: 'Medium Priority' },
  { value: 'low', label: 'Low Priority' }
];

const alertStatuses = [
  { value: 'all', label: 'All Status' },
  { value: 'active', label: 'Active' },
  { value: 'acknowledged', label: 'Acknowledged' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'archived', label: 'Archived' }
];

export default function AlertsPage() {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = 
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (alert.studentName && alert.studentName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      alert.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'all' || alert.type === selectedType;
    const matchesSeverity = selectedSeverity === 'all' || alert.severity === selectedSeverity;
    const matchesStatus = selectedStatus === 'all' || alert.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesSeverity && matchesStatus;
  }).sort((a, b) => {
    // Sort by severity first (high -> medium -> low), then by date (newest first)
    const severityOrder = { high: 3, medium: 2, low: 1 };
    const severityDiff = severityOrder[b.severity as keyof typeof severityOrder] - severityOrder[a.severity as keyof typeof severityOrder];
    if (severityDiff !== 0) return severityDiff;
    
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const handleAcknowledge = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, status: 'acknowledged' } : alert
    ));
    toast.success('Alert acknowledged');
  };

  const handleResolve = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, status: 'resolved' } : alert
    ));
    toast.success('Alert resolved');
  };

  const handleArchive = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, status: 'archived' } : alert
    ));
    toast.success('Alert archived');
  };

  const handleViewDetails = (alert: any) => {
    setSelectedAlert(alert);
    setShowDetails(true);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-100 border-blue-200';
      default: return 'text-secondary-600 bg-secondary-100 border-secondary-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-red-600 bg-red-100';
      case 'acknowledged': return 'text-yellow-600 bg-yellow-100';
      case 'resolved': return 'text-green-600 bg-green-100';
      case 'archived': return 'text-gray-600 bg-gray-100';
      default: return 'text-secondary-600 bg-secondary-100';
    }
  };

  const getTypeIcon = (type: string) => {
    const alertType = alertTypes.find(t => t.value === type);
    return alertType ? alertType.icon : Bell;
  };

  const getTypeColor = (type: string) => {
    const alertType = alertTypes.find(t => t.value === type);
    return alertType ? alertType.color : 'text-secondary-600';
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">Alerts</h1>
          <p className="text-secondary-600 mt-1">
            Monitor and manage system alerts and notifications
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => toast.success('Refreshing alerts...')}
            className="btn-outline"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
          <Link href="/dashboard/alerts/create" className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Create Alert
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { 
            label: 'Active Alerts', 
            value: alerts.filter(a => a.status === 'active').length, 
            icon: Bell, 
            color: 'from-red-500 to-red-600' 
          },
          { 
            label: 'High Priority', 
            value: alerts.filter(a => a.severity === 'high').length, 
            icon: AlertTriangle, 
            color: 'from-orange-500 to-orange-600' 
          },
          { 
            label: 'Acknowledged', 
            value: alerts.filter(a => a.status === 'acknowledged').length, 
            icon: Eye, 
            color: 'from-yellow-500 to-yellow-600' 
          },
          { 
            label: 'Resolved Today', 
            value: alerts.filter(a => {
              const today = new Date().toDateString();
              return a.status === 'resolved' && new Date(a.createdAt).toDateString() === today;
            }).length, 
            icon: CheckCircle, 
            color: 'from-green-500 to-green-600' 
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
                placeholder="Search alerts..."
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
              {alertTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>

            {/* Severity Filter */}
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="input w-full sm:w-auto"
            >
              {alertSeverities.map(severity => (
                <option key={severity.value} value={severity.value}>
                  {severity.label}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="input w-full sm:w-auto"
            >
              {alertStatuses.map(status => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="card text-center py-12">
            <Bell className="w-16 h-16 text-secondary-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-secondary-900 mb-2">No Alerts Found</h3>
            <p className="text-secondary-600 mb-4">
              {searchTerm || selectedType !== 'all' || selectedSeverity !== 'all' || selectedStatus !== 'all'
                ? 'Try adjusting your filters or search terms.'
                : 'No alerts match your current criteria.'}
            </p>
            <Link href="/dashboard/alerts/create" className="btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              Create Alert
            </Link>
          </div>
        ) : (
          filteredAlerts.map((alert, index) => {
            const TypeIcon = getTypeIcon(alert.type);
            
            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`card hover:shadow-md transition-shadow border-l-4 ${
                  alert.severity === 'high' ? 'border-l-red-500' :
                  alert.severity === 'medium' ? 'border-l-yellow-500' :
                  'border-l-blue-500'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        alert.severity === 'high' ? 'bg-red-100' :
                        alert.severity === 'medium' ? 'bg-yellow-100' :
                        'bg-blue-100'
                      }`}>
                        <TypeIcon className={`w-6 h-6 ${
                          alert.severity === 'high' ? 'text-red-600' :
                          alert.severity === 'medium' ? 'text-yellow-600' :
                          'text-blue-600'
                        }`} />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-secondary-900 truncate">
                          {alert.title}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                          {alert.severity} priority
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                          {alert.status}
                        </span>
                      </div>
                      
                      <p className="text-sm text-secondary-600 mb-3">
                        {alert.message}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-sm text-secondary-500 mb-2">
                        {alert.studentName && (
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>{alert.studentName} ({alert.grade})</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatTimeAgo(alert.createdAt)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>Assigned to {alert.assignedTo}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(alert.type)} bg-secondary-100`}>
                          {alert.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleViewDetails(alert)}
                      className="p-2 text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100 rounded-lg transition-colors"
                      title="View details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    
                    {alert.status === 'active' && (
                      <button
                        onClick={() => handleAcknowledge(alert.id)}
                        className="p-2 text-yellow-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                        title="Acknowledge"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    )}
                    
                    {(alert.status === 'active' || alert.status === 'acknowledged') && (
                      <button
                        onClick={() => handleResolve(alert.id)}
                        className="p-2 text-green-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Resolve"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    )}
                    
                    {alert.status === 'resolved' && (
                      <button
                        onClick={() => handleArchive(alert.id)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                        title="Archive"
                      >
                        <Archive className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Alert Details Modal */}
      {showDetails && selectedAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-secondary-900">Alert Details</h2>
                <button
                  onClick={() => setShowDetails(false)}
                  className="p-2 hover:bg-secondary-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-secondary-600" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-secondary-900 mb-2">{selectedAlert.title}</h3>
                  <p className="text-secondary-700">{selectedAlert.message}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-secondary-600">Type</label>
                    <p className="text-secondary-900">{selectedAlert.type}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-secondary-600">Severity</label>
                    <p className="text-secondary-900">{selectedAlert.severity}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-secondary-600">Status</label>
                    <p className="text-secondary-900">{selectedAlert.status}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-secondary-600">Assigned To</label>
                    <p className="text-secondary-900">{selectedAlert.assignedTo}</p>
                  </div>
                </div>
                
                {selectedAlert.studentName && (
                  <div>
                    <label className="text-sm font-medium text-secondary-600">Student</label>
                    <p className="text-secondary-900">{selectedAlert.studentName} ({selectedAlert.grade})</p>
                  </div>
                )}
                
                <div>
                  <label className="text-sm font-medium text-secondary-600">Created</label>
                  <p className="text-secondary-900">{new Date(selectedAlert.createdAt).toLocaleString()}</p>
                </div>
                
                {selectedAlert.details && (
                  <div>
                    <h4 className="font-semibold text-secondary-900 mb-3">Additional Details</h4>
                    <div className="bg-secondary-50 rounded-lg p-4">
                      <pre className="text-sm text-secondary-700 whitespace-pre-wrap">
                        {JSON.stringify(selectedAlert.details, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-secondary-200">
                <button
                  onClick={() => setShowDetails(false)}
                  className="btn-outline"
                >
                  Close
                </button>
                {selectedAlert.status === 'active' && (
                  <button
                    onClick={() => {
                      handleAcknowledge(selectedAlert.id);
                      setShowDetails(false);
                    }}
                    className="btn-primary"
                  >
                    Acknowledge
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}