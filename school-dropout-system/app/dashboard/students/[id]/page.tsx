'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  GraduationCap, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  Clock,
  BookOpen,
  Target,
  MessageCircle,
  Edit3,
  Save,
  X,
  Plus,
  Eye,
  Download,
  Bell,
  Activity,
  BarChart3,
  FileText,
  Users,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Star,
  Award,
  Camera
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart as RechartsBarChart,
  Bar
} from 'recharts';

// Mock student data
const getStudentData = (id: string) => {
  const students = {
    '1': {
      id: '1',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@school.edu',
      phone: '(555) 123-4567',
      grade: '9th',
      age: 15,
      riskScore: 85,
      status: 'at-risk',
      gpa: 2.1,
      attendance: 68,
      address: '123 Main St, Springfield, IL 62701',
      parentName: 'Mary Johnson',
      parentEmail: 'mary.johnson@email.com',
      parentPhone: '(555) 123-4568',
      enrollmentDate: '2023-08-15',
      lastActivity: '2024-01-15T10:30:00Z',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
      notes: 'Struggling with math and attendance issues. Family situation challenging. Requires additional support and monitoring.',
      interventions: [
        { id: 1, name: 'Math Tutoring', status: 'active', startDate: '2024-01-01', progress: 65 },
        { id: 2, name: 'Family Counseling', status: 'active', startDate: '2023-12-15', progress: 40 }
      ],
      alerts: [
        { id: 1, type: 'Attendance', message: 'Missed 4 days this week', severity: 'high', date: '2024-01-15' },
        { id: 2, type: 'Academic', message: 'Math grade dropped by 2 points', severity: 'high', date: '2024-01-14' },
        { id: 3, type: 'Behavioral', message: 'Late to class 3 times', severity: 'medium', date: '2024-01-12' }
      ],
      subjects: [
        { name: 'Math', grade: 'D', points: 1.0, teacher: 'Mr. Smith', trend: 'down' },
        { name: 'English', grade: 'C+', points: 2.3, teacher: 'Ms. Davis', trend: 'up' },
        { name: 'Science', grade: 'C', points: 2.0, teacher: 'Dr. Brown', trend: 'stable' },
        { name: 'History', grade: 'B-', points: 2.7, teacher: 'Mrs. Wilson', trend: 'up' },
        { name: 'PE', grade: 'A', points: 4.0, teacher: 'Coach Martinez', trend: 'stable' },
        { name: 'Art', grade: 'B+', points: 3.3, teacher: 'Ms. Garcia', trend: 'up' }
      ],
      attendanceHistory: [
        { month: 'Aug', rate: 95 },
        { month: 'Sep', rate: 88 },
        { month: 'Oct', rate: 82 },
        { month: 'Nov', rate: 75 },
        { month: 'Dec', rate: 70 },
        { month: 'Jan', rate: 68 }
      ],
      gradeHistory: [
        { month: 'Aug', gpa: 2.8 },
        { month: 'Sep', gpa: 2.6 },
        { month: 'Oct', gpa: 2.4 },
        { month: 'Nov', gpa: 2.2 },
        { month: 'Dec', gpa: 2.1 },
        { month: 'Jan', gpa: 2.1 }
      ],
      riskHistory: [
        { month: 'Aug', score: 35 },
        { month: 'Sep', score: 45 },
        { month: 'Oct', score: 58 },
        { month: 'Nov', score: 72 },
        { month: 'Dec', score: 82 },
        { month: 'Jan', score: 85 }
      ]
    }
  };
  
  return students[id as keyof typeof students] || null;
};

export default function StudentDetailPage() {
  const params = useParams();
  const studentId = params.id as string;
  const [student, setStudent] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'academic' | 'attendance' | 'interventions' | 'notes'>('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editedNotes, setEditedNotes] = useState('');
  const [newNote, setNewNote] = useState('');
  const [showAddNote, setShowAddNote] = useState(false);

  useEffect(() => {
    const studentData = getStudentData(studentId);
    if (studentData) {
      setStudent(studentData);
      setEditedNotes(studentData.notes);
    }
  }, [studentId]);

  if (!student) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <User className="w-16 h-16 text-secondary-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-secondary-900 mb-2">Student Not Found</h3>
          <p className="text-secondary-600">The requested student could not be found.</p>
          <Link href="/dashboard/students" className="btn-primary mt-4">
            Back to Students
          </Link>
        </div>
      </div>
    );
  }

  const handleSaveNotes = () => {
    setStudent((prev: any) => ({ ...prev, notes: editedNotes }));
    setIsEditing(false);
    toast.success('Notes updated successfully');
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      // In a real app, this would add to a notes history
      toast.success('Note added successfully');
      setNewNote('');
      setShowAddNote(false);
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 70) return 'text-red-600 bg-red-100';
    if (score >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600 bg-green-100';
    if (grade.startsWith('B')) return 'text-blue-600 bg-blue-100';
    if (grade.startsWith('C')) return 'text-yellow-600 bg-yellow-100';
    if (grade.startsWith('D')) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/dashboard/students"
            className="p-2 hover:bg-secondary-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-secondary-600" />
          </Link>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={student.avatar}
                alt={`${student.firstName} ${student.lastName}`}
                className="w-16 h-16 rounded-full object-cover"
              />
              <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white hover:bg-primary-700 transition-colors">
                <Camera className="w-3 h-3" />
              </button>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-secondary-900">
                {student.firstName} {student.lastName}
              </h1>
              <div className="flex items-center space-x-4 mt-1">
                <span className="text-secondary-600">{student.grade} Grade • Age {student.age}</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(student.riskScore)}`}>
                  Risk Score: {student.riskScore}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn-outline">
            <MessageCircle className="w-4 h-4 mr-2" />
            Contact
          </button>
          <button className="btn-outline">
            <Bell className="w-4 h-4 mr-2" />
            Create Alert
          </button>
          <button className="btn-primary">
            <Target className="w-4 h-4 mr-2" />
            Add Intervention
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'GPA', value: student.gpa.toFixed(1), change: '-0.7', changeType: 'negative', icon: BookOpen, color: 'from-blue-500 to-blue-600' },
          { label: 'Attendance', value: `${student.attendance}%`, change: '-27%', changeType: 'negative', icon: Clock, color: 'from-red-500 to-red-600' },
          { label: 'Active Interventions', value: student.interventions.filter((i: any) => i.status === 'active').length, change: '+1', changeType: 'positive', icon: Target, color: 'from-green-500 to-green-600' },
          { label: 'Recent Alerts', value: student.alerts.length, change: '+2', changeType: 'negative', icon: AlertTriangle, color: 'from-orange-500 to-orange-600' }
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
              <div className="flex items-center space-x-1">
                {stat.changeType === 'positive' ? (
                  <TrendingUp className="w-4 h-4 text-green-600" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-600" />
                )}
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm text-secondary-600 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-secondary-900">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="card">
        <div className="flex space-x-1 bg-secondary-100 rounded-lg p-1 mb-6">
          {[
            { key: 'overview', label: 'Overview', icon: User },
            { key: 'academic', label: 'Academic', icon: BookOpen },
            { key: 'attendance', label: 'Attendance', icon: Clock },
            { key: 'interventions', label: 'Interventions', icon: Target },
            { key: 'notes', label: 'Notes', icon: FileText }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? 'bg-white text-secondary-900 shadow-sm'
                  : 'text-secondary-600 hover:text-secondary-900'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-secondary-400" />
                      <div>
                        <p className="text-sm text-secondary-600">Email</p>
                        <p className="font-medium text-secondary-900">{student.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-secondary-400" />
                      <div>
                        <p className="text-sm text-secondary-600">Phone</p>
                        <p className="font-medium text-secondary-900">{student.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-secondary-400" />
                      <div>
                        <p className="text-sm text-secondary-600">Address</p>
                        <p className="font-medium text-secondary-900">{student.address}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-secondary-400" />
                      <div>
                        <p className="text-sm text-secondary-600">Enrollment Date</p>
                        <p className="font-medium text-secondary-900">
                          {new Date(student.enrollmentDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <GraduationCap className="w-5 h-5 text-secondary-400" />
                      <div>
                        <p className="text-sm text-secondary-600">Grade Level</p>
                        <p className="font-medium text-secondary-900">{student.grade}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Activity className="w-5 h-5 text-secondary-400" />
                      <div>
                        <p className="text-sm text-secondary-600">Last Activity</p>
                        <p className="font-medium text-secondary-900">
                          {new Date(student.lastActivity).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Parent/Guardian Information */}
              <div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">Parent/Guardian</h3>
                <div className="bg-secondary-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-secondary-600">Name</p>
                      <p className="font-medium text-secondary-900">{student.parentName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-secondary-600">Email</p>
                      <p className="font-medium text-secondary-900">{student.parentEmail}</p>
                    </div>
                    <div>
                      <p className="text-sm text-secondary-600">Phone</p>
                      <p className="font-medium text-secondary-900">{student.parentPhone}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Risk Score Trend */}
              <div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">Risk Score Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={student.riskHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#ef4444" 
                      fill="#ef4444" 
                      fillOpacity={0.1}
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-6">
              {/* Recent Alerts */}
              <div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">Recent Alerts</h3>
                <div className="space-y-3">
                  {student.alerts.map((alert: any) => (
                    <div
                      key={alert.id}
                      className={`p-3 rounded-lg border-l-4 ${
                        alert.severity === 'high' ? 'border-l-red-500 bg-red-50' :
                        alert.severity === 'medium' ? 'border-l-yellow-500 bg-yellow-50' :
                        'border-l-blue-500 bg-blue-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-secondary-900">{alert.type}</span>
                        <span className="text-xs text-secondary-500">{alert.date}</span>
                      </div>
                      <p className="text-sm text-secondary-700">{alert.message}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Interventions */}
              <div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">Active Interventions</h3>
                <div className="space-y-3">
                  {student.interventions.filter((i: any) => i.status === 'active').map((intervention: any) => (
                    <div key={intervention.id} className="p-3 bg-secondary-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-secondary-900">{intervention.name}</span>
                        <span className="text-sm text-green-600 font-medium">{intervention.progress}%</span>
                      </div>
                      <div className="w-full bg-secondary-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${intervention.progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-secondary-500 mt-1">
                        Started: {new Date(intervention.startDate).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Academic Tab */}
        {activeTab === 'academic' && (
          <div className="space-y-6">
            {/* GPA Trend */}
            <div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">GPA Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={student.gradeHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 4]} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="gpa" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Subject Performance */}
            <div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">Subject Performance</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {student.subjects.map((subject: any, index: number) => (
                  <motion.div
                    key={subject.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-secondary-50 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-secondary-900">{subject.name}</h4>
                      {getTrendIcon(subject.trend)}
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-1 rounded-full text-sm font-medium ${getGradeColor(subject.grade)}`}>
                        {subject.grade}
                      </span>
                      <span className="text-sm text-secondary-600">{subject.points} pts</span>
                    </div>
                    <p className="text-xs text-secondary-500">{subject.teacher}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Attendance Tab */}
        {activeTab === 'attendance' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">Attendance Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={student.attendanceHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 100]} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="rate" 
                    stroke="#f59e0b" 
                    fill="#f59e0b" 
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card">
                <h4 className="font-semibold text-secondary-900 mb-2">Current Rate</h4>
                <p className="text-3xl font-bold text-red-600">{student.attendance}%</p>
                <p className="text-sm text-secondary-600">Below target of 90%</p>
              </div>
              <div className="card">
                <h4 className="font-semibold text-secondary-900 mb-2">Days Missed</h4>
                <p className="text-3xl font-bold text-secondary-900">32</p>
                <p className="text-sm text-secondary-600">This academic year</p>
              </div>
              <div className="card">
                <h4 className="font-semibold text-secondary-900 mb-2">Consecutive Absences</h4>
                <p className="text-3xl font-bold text-orange-600">4</p>
                <p className="text-sm text-secondary-600">Current streak</p>
              </div>
            </div>
          </div>
        )}

        {/* Interventions Tab */}
        {activeTab === 'interventions' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-secondary-900">Interventions</h3>
              <button className="btn-primary">
                <Plus className="w-4 h-4 mr-2" />
                Add Intervention
              </button>
            </div>

            <div className="space-y-4">
              {student.interventions.map((intervention: any) => (
                <div key={intervention.id} className="card">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        intervention.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                      }`} />
                      <h4 className="font-semibold text-secondary-900">{intervention.name}</h4>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        intervention.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {intervention.status}
                      </span>
                      <button className="p-1 hover:bg-secondary-100 rounded">
                        <Eye className="w-4 h-4 text-secondary-400" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-secondary-600">Progress</span>
                        <span className="font-medium text-secondary-900">{intervention.progress}%</span>
                      </div>
                      <div className="w-full bg-secondary-200 rounded-full h-2">
                        <div 
                          className="bg-primary-600 h-2 rounded-full transition-all duration-500" 
                          style={{ width: `${intervention.progress}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-secondary-600">
                      <span>Started: {new Date(intervention.startDate).toLocaleDateString()}</span>
                      <span>Duration: 12 weeks</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notes Tab */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-secondary-900">Notes</h3>
              <div className="flex items-center space-x-2">
                {!showAddNote && (
                  <button
                    onClick={() => setShowAddNote(true)}
                    className="btn-outline"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Note
                  </button>
                )}
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn-outline"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit
                  </button>
                ) : (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleSaveNotes}
                      className="btn-primary"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setEditedNotes(student.notes);
                      }}
                      className="btn-outline"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>

            {showAddNote && (
              <div className="card">
                <h4 className="font-semibold text-secondary-900 mb-3">Add New Note</h4>
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="input mb-3"
                  rows={3}
                  placeholder="Enter your note..."
                />
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleAddNote}
                    className="btn-primary"
                  >
                    Add Note
                  </button>
                  <button
                    onClick={() => {
                      setShowAddNote(false);
                      setNewNote('');
                    }}
                    className="btn-outline"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="card">
              <h4 className="font-semibold text-secondary-900 mb-3">Student Notes</h4>
              {isEditing ? (
                <textarea
                  value={editedNotes}
                  onChange={(e) => setEditedNotes(e.target.value)}
                  className="input"
                  rows={6}
                />
              ) : (
                <div className="prose prose-sm max-w-none">
                  <p className="text-secondary-700 whitespace-pre-wrap">{student.notes}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}