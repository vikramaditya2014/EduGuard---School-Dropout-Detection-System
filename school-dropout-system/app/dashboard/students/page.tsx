'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  Eye, 
  Phone, 
  Mail, 
  MapPin,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Activity,
  Calendar,
  Download,
  Upload,
  Grid,
  List,
  Star,
  Award,
  Clock,
  CheckCircle,
  XCircle,
  BookOpen,
  GraduationCap,
  X,
  Save,
  Camera,
  User,
  FileText,
  MessageSquare,
  Bell
} from 'lucide-react';
import { toast } from 'react-hot-toast';

// Enhanced student data with more realistic information
const initialStudentsData = [
  {
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
    address: '123 Main St, Springfield',
    parentName: 'Mary Johnson',
    parentEmail: 'mary.johnson@email.com',
    parentPhone: '(555) 123-4568',
    enrollmentDate: '2023-08-15',
    lastActivity: '2024-01-15T10:30:00Z',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
    notes: 'Struggling with math and attendance issues. Family situation challenging.',
    interventions: ['Math tutoring', 'Family counseling'],
    alerts: [
      { type: 'Attendance', message: 'Missed 4 days this week', severity: 'high', date: '2024-01-15' },
      { type: 'Academic', message: 'Math grade dropped by 2 points', severity: 'high', date: '2024-01-14' }
    ],
    subjects: [
      { name: 'Math', grade: 'D', points: 1.0, teacher: 'Mr. Smith' },
      { name: 'English', grade: 'C+', points: 2.3, teacher: 'Ms. Davis' },
      { name: 'Science', grade: 'C', points: 2.0, teacher: 'Dr. Brown' },
      { name: 'History', grade: 'B-', points: 2.7, teacher: 'Mrs. Wilson' }
    ]
  },
  {
    id: '2',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael.chen@school.edu',
    phone: '(555) 234-5678',
    grade: '11th',
    age: 17,
    riskScore: 45,
    status: 'active',
    gpa: 3.2,
    attendance: 89,
    address: '456 Oak Ave, Springfield',
    parentName: 'Lisa Chen',
    parentEmail: 'lisa.chen@email.com',
    parentPhone: '(555) 234-5679',
    enrollmentDate: '2021-08-20',
    lastActivity: '2024-01-15T14:20:00Z',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    notes: 'Good student overall, occasional behavioral issues.',
    interventions: ['Peer mentoring'],
    alerts: [
      { type: 'Behavioral', message: 'Minor disruption in class', severity: 'medium', date: '2024-01-14' }
    ],
    subjects: [
      { name: 'Advanced Math', grade: 'B+', points: 3.3, teacher: 'Mr. Johnson' },
      { name: 'English', grade: 'A-', points: 3.7, teacher: 'Ms. Davis' },
      { name: 'Physics', grade: 'B', points: 3.0, teacher: 'Dr. Taylor' },
      { name: 'History', grade: 'B+', points: 3.3, teacher: 'Mrs. Wilson' }
    ]
  },
  {
    id: '3',
    firstName: 'Emma',
    lastName: 'Davis',
    email: 'emma.davis@school.edu',
    phone: '(555) 345-6789',
    grade: '10th',
    age: 16,
    riskScore: 25,
    status: 'active',
    gpa: 3.8,
    attendance: 95,
    address: '789 Pine St, Springfield',
    parentName: 'Robert Davis',
    parentEmail: 'robert.davis@email.com',
    parentPhone: '(555) 345-6780',
    enrollmentDate: '2022-08-18',
    lastActivity: '2024-01-15T16:45:00Z',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    notes: 'Excellent student, very engaged in extracurricular activities.',
    interventions: [],
    alerts: [],
    subjects: [
      { name: 'Math', grade: 'A', points: 4.0, teacher: 'Mr. Smith' },
      { name: 'English', grade: 'A-', points: 3.7, teacher: 'Ms. Davis' },
      { name: 'Chemistry', grade: 'A', points: 4.0, teacher: 'Dr. Brown' },
      { name: 'History', grade: 'A-', points: 3.7, teacher: 'Mrs. Wilson' }
    ]
  },
  {
    id: '4',
    firstName: 'David',
    lastName: 'Wilson',
    email: 'david.wilson@school.edu',
    phone: '(555) 456-7890',
    grade: '12th',
    age: 18,
    riskScore: 92,
    status: 'at-risk',
    gpa: 1.8,
    attendance: 45,
    address: '321 Elm St, Springfield',
    parentName: 'Patricia Wilson',
    parentEmail: 'patricia.wilson@email.com',
    parentPhone: '(555) 456-7891',
    enrollmentDate: '2020-08-10',
    lastActivity: '2024-01-12T08:15:00Z',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    notes: 'High risk of dropping out. Multiple intervention attempts.',
    interventions: ['Intensive counseling', 'Academic recovery', 'Family support'],
    alerts: [
      { type: 'Attendance', message: 'Chronic absenteeism', severity: 'critical', date: '2024-01-15' },
      { type: 'Academic', message: 'Failing multiple subjects', severity: 'critical', date: '2024-01-14' },
      { type: 'Behavioral', message: 'Disciplinary action required', severity: 'high', date: '2024-01-13' }
    ],
    subjects: [
      { name: 'Math', grade: 'F', points: 0.0, teacher: 'Mr. Smith' },
      { name: 'English', grade: 'D-', points: 0.7, teacher: 'Ms. Davis' },
      { name: 'Science', grade: 'F', points: 0.0, teacher: 'Dr. Brown' },
      { name: 'History', grade: 'D', points: 1.0, teacher: 'Mrs. Wilson' }
    ]
  },
  {
    id: '5',
    firstName: 'Jessica',
    lastName: 'Martinez',
    email: 'jessica.martinez@school.edu',
    phone: '(555) 567-8901',
    grade: '9th',
    age: 15,
    riskScore: 38,
    status: 'active',
    gpa: 3.1,
    attendance: 82,
    address: '654 Maple Ave, Springfield',
    parentName: 'Carlos Martinez',
    parentEmail: 'carlos.martinez@email.com',
    parentPhone: '(555) 567-8902',
    enrollmentDate: '2023-08-15',
    lastActivity: '2024-01-15T12:30:00Z',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    notes: 'Adjusting well to high school. Some language barrier challenges.',
    interventions: ['ESL support'],
    alerts: [
      { type: 'Academic', message: 'English comprehension needs attention', severity: 'low', date: '2024-01-13' }
    ],
    subjects: [
      { name: 'Math', grade: 'B', points: 3.0, teacher: 'Mr. Smith' },
      { name: 'English', grade: 'C', points: 2.0, teacher: 'Ms. Davis' },
      { name: 'Science', grade: 'B+', points: 3.3, teacher: 'Dr. Brown' },
      { name: 'History', grade: 'B-', points: 2.7, teacher: 'Mrs. Wilson' }
    ]
  }
];

export default function StudentsPage() {
  const [students, setStudents] = useState(initialStudentsData);
  const [selectedStudent, setSelectedStudent] = useState<typeof initialStudentsData[0] | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<any>(null);

  // Filter and sort students
  const filteredAndSortedStudents = useMemo(() => {
    let filtered = students.filter(student => {
      const matchesSearch = 
        student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesGrade = selectedGrade === 'all' || student.grade === selectedGrade;
      const matchesStatus = selectedStatus === 'all' || student.status === selectedStatus;
      
      let matchesRisk = true;
      if (riskFilter === 'high') matchesRisk = student.riskScore >= 70;
      else if (riskFilter === 'medium') matchesRisk = student.riskScore >= 40 && student.riskScore < 70;
      else if (riskFilter === 'low') matchesRisk = student.riskScore < 40;
      
      return matchesSearch && matchesGrade && matchesStatus && matchesRisk;
    });

    // Sort students
    filtered.sort((a, b) => {
      let compareValue = 0;
      
      switch (sortBy) {
        case 'name':
          compareValue = `${a.lastName} ${a.firstName}`.localeCompare(`${b.lastName} ${b.firstName}`);
          break;
        case 'grade':
          compareValue = a.grade.localeCompare(b.grade);
          break;
        case 'riskScore':
          compareValue = a.riskScore - b.riskScore;
          break;
        case 'gpa':
          compareValue = a.gpa - b.gpa;
          break;
        case 'attendance':
          compareValue = a.attendance - b.attendance;
          break;
        default:
          compareValue = 0;
      }
      
      return sortOrder === 'asc' ? compareValue : -compareValue;
    });

    return filtered;
  }, [students, searchTerm, selectedGrade, selectedStatus, riskFilter, sortBy, sortOrder]);

  const getRiskColor = (score: number) => {
    if (score >= 80) return 'text-red-700 bg-red-100 border-red-200';
    if (score >= 60) return 'text-orange-700 bg-orange-100 border-orange-200';
    if (score >= 40) return 'text-yellow-700 bg-yellow-100 border-yellow-200';
    return 'text-green-700 bg-green-100 border-green-200';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'at-risk': return 'text-red-700 bg-red-100';
      case 'active': return 'text-green-700 bg-green-100';
      case 'inactive': return 'text-gray-700 bg-gray-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (current < previous) return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <Activity className="w-4 h-4 text-blue-600" />;
  };

  const handleAddStudent = (studentData: any) => {
    const newStudent = {
      ...studentData,
      id: (students.length + 1).toString(),
      avatar: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000000)}?w=150&h=150&fit=crop&crop=face`,
      lastActivity: new Date().toISOString(),
      alerts: [],
      interventions: [],
      subjects: []
    };
    setStudents([...students, newStudent]);
    setShowAddModal(false);
    toast.success('Student added successfully!');
  };

  const handleEditStudent = (studentData: any) => {
    setStudents(students.map(s => 
      s.id === studentData.id ? { ...s, ...studentData } : s
    ));
    setShowEditModal(false);
    setEditingStudent(null);
    setSelectedStudent(students.find(s => s.id === studentData.id) || null);
    toast.success('Student updated successfully!');
  };

  const handleDeleteStudent = (studentId: string) => {
    if (confirm('Are you sure you want to delete this student?')) {
      setStudents(students.filter(s => s.id !== studentId));
      setSelectedStudent(null);
      toast.success('Student deleted successfully!');
    }
  };

  const exportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Name,Email,Grade,Risk Score,GPA,Attendance,Status\n" +
      filteredAndSortedStudents.map(s => 
        `"${s.firstName} ${s.lastName}","${s.email}","${s.grade}",${s.riskScore},${s.gpa},${s.attendance}%,"${s.status}"`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "students_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Data exported successfully!');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">Student Management</h1>
          <p className="text-secondary-600 mt-2">
            Monitor and manage your students' academic progress and risk factors
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <button 
            onClick={exportData}
            className="btn-outline"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button className="btn-outline">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="btn-primary"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Student
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'Total Students',
            value: students.length.toString(),
            change: '+2.5%',
            icon: Users,
            color: 'from-blue-500 to-blue-600'
          },
          {
            title: 'At-Risk Students',
            value: students.filter(s => s.status === 'at-risk').length.toString(),
            change: '-5.2%',
            icon: AlertTriangle,
            color: 'from-red-500 to-red-600'
          },
          {
            title: 'Average GPA',
            value: (students.reduce((sum, s) => sum + s.gpa, 0) / students.length).toFixed(2),
            change: '+0.3',
            icon: Star,
            color: 'from-green-500 to-green-600'
          },
          {
            title: 'Avg Attendance',
            value: `${Math.round(students.reduce((sum, s) => sum + s.attendance, 0) / students.length)}%`,
            change: '+2.1%',
            icon: Calendar,
            color: 'from-purple-500 to-purple-600'
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="stat-card"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-secondary-600">{stat.title}</p>
                <p className="text-2xl font-bold text-secondary-900">{stat.value}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <span className="text-sm text-green-600">{stat.change}</span>
                  <TrendingUp className="w-3 h-3 text-green-600" />
                </div>
              </div>
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters and Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10 w-64"
              />
            </div>
            
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="input w-32"
            >
              <option value="all">All Grades</option>
              <option value="9th">9th Grade</option>
              <option value="10th">10th Grade</option>
              <option value="11th">11th Grade</option>
              <option value="12th">12th Grade</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="input w-32"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="at-risk">At-Risk</option>
              <option value="inactive">Inactive</option>
            </select>

            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="input w-32"
            >
              <option value="all">All Risk</option>
              <option value="high">High Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="low">Low Risk</option>
            </select>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-secondary-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-secondary-200'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-secondary-200'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input w-40"
            >
              <option value="name">Sort by Name</option>
              <option value="grade">Sort by Grade</option>
              <option value="riskScore">Sort by Risk</option>
              <option value="gpa">Sort by GPA</option>
              <option value="attendance">Sort by Attendance</option>
            </select>

            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="btn-outline p-2"
            >
              {sortOrder === 'asc' ? 
                <TrendingUp className="w-4 h-4" /> : 
                <TrendingDown className="w-4 h-4" />
              }
            </button>
          </div>
        </div>

        <div className="mt-4 text-sm text-secondary-600">
          Showing {filteredAndSortedStudents.length} of {students.length} students
        </div>
      </motion.div>

      {/* Students Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedStudents.map((student, index) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="card hover:shadow-lg transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedStudent(student)}
            >
              {/* Student Card Header */}
              <div className="relative mb-4">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={student.avatar}
                      alt={`${student.firstName} ${student.lastName}`}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center ${
                      student.riskScore >= 70 ? 'bg-red-500' :
                      student.riskScore >= 40 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}>
                      {student.riskScore >= 70 ? 
                        <AlertTriangle className="w-3 h-3 text-white" /> :
                        <CheckCircle className="w-3 h-3 text-white" />
                      }
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-secondary-900 group-hover:text-primary-600 transition-colors">
                      {student.firstName} {student.lastName}
                    </h3>
                    <p className="text-secondary-600 text-sm">{student.grade} Grade • Age {student.age}</p>
                  </div>
                </div>

                <div className="absolute top-0 right-0">
                  <div className="dropdown">
                    <button className="p-2 hover:bg-secondary-100 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4 text-secondary-400" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Risk Score */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-secondary-600">Risk Score</span>
                  <span className={`font-semibold px-2 py-1 rounded-full text-xs ${getRiskColor(student.riskScore)}`}>
                    {student.riskScore}%
                  </span>
                </div>
                <div className="w-full bg-secondary-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      student.riskScore >= 70 ? 'bg-red-500' :
                      student.riskScore >= 40 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${student.riskScore}%` }}
                  />
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-secondary-900">{student.gpa}</p>
                  <p className="text-xs text-secondary-600">GPA</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-secondary-900">{student.attendance}%</p>
                  <p className="text-xs text-secondary-600">Attendance</p>
                </div>
              </div>

              {/* Status and Alerts */}
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                  {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                </span>
                {student.alerts.length > 0 && (
                  <div className="flex items-center space-x-1">
                    <Bell className="w-4 h-4 text-red-500" />
                    <span className="text-xs text-red-600">{student.alerts.length}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="card"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-secondary-200">
                  <th className="text-left py-3 px-4 font-semibold text-secondary-900">Student</th>
                  <th className="text-left py-3 px-4 font-semibold text-secondary-900">Grade</th>
                  <th className="text-left py-3 px-4 font-semibold text-secondary-900">Risk Score</th>
                  <th className="text-left py-3 px-4 font-semibold text-secondary-900">GPA</th>
                  <th className="text-left py-3 px-4 font-semibold text-secondary-900">Attendance</th>
                  <th className="text-left py-3 px-4 font-semibold text-secondary-900">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-secondary-900">Alerts</th>
                  <th className="text-left py-3 px-4 font-semibold text-secondary-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedStudents.map((student, index) => (
                  <motion.tr
                    key={student.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.02 }}
                    className="border-b border-secondary-100 hover:bg-secondary-50 transition-colors cursor-pointer"
                    onClick={() => setSelectedStudent(student)}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={student.avatar}
                          alt={`${student.firstName} ${student.lastName}`}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-secondary-900">
                            {student.firstName} {student.lastName}
                          </p>
                          <p className="text-sm text-secondary-600">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-secondary-900">{student.grade}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskColor(student.riskScore)}`}>
                        {student.riskScore}%
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`font-medium ${
                        student.gpa >= 3.5 ? 'text-green-600' :
                        student.gpa >= 2.5 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {student.gpa}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <span className={`font-medium ${
                          student.attendance >= 90 ? 'text-green-600' :
                          student.attendance >= 70 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {student.attendance}%
                        </span>
                        <div className="w-16 bg-secondary-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              student.attendance >= 90 ? 'bg-green-500' :
                              student.attendance >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${student.attendance}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                        {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      {student.alerts.length > 0 ? (
                        <div className="flex items-center space-x-1">
                          <Bell className="w-4 h-4 text-red-500" />
                          <span className="text-sm text-red-600">{student.alerts.length}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-secondary-400">None</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedStudent(student);
                          }}
                          className="p-2 hover:bg-secondary-100 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4 text-secondary-400" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingStudent(student);
                            setShowEditModal(true);
                          }}
                          className="p-2 hover:bg-secondary-100 rounded-lg transition-colors"
                        >
                          <Edit3 className="w-4 h-4 text-secondary-400" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteStudent(student.id);
                          }}
                          className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Student Detail Modal */}
      <AnimatePresence>
        {selectedStudent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedStudent(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-secondary-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={selectedStudent.avatar}
                      alt={`${selectedStudent.firstName} ${selectedStudent.lastName}`}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h2 className="text-2xl font-bold text-secondary-900">
                        {selectedStudent.firstName} {selectedStudent.lastName}
                      </h2>
                      <p className="text-secondary-600">{selectedStudent.grade} Grade • {selectedStudent.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => {
                        setEditingStudent(selectedStudent);
                        setShowEditModal(true);
                        setSelectedStudent(null);
                      }}
                      className="btn-outline"
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit
                    </button>
                    <button
                      onClick={() => setSelectedStudent(null)}
                      className="p-2 hover:bg-secondary-100 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column - Overview */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Risk Assessment */}
                    <div className="bg-secondary-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-secondary-900 mb-4">Risk Assessment</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className={`text-3xl font-bold ${
                            selectedStudent.riskScore >= 70 ? 'text-red-600' :
                            selectedStudent.riskScore >= 40 ? 'text-yellow-600' : 'text-green-600'
                          }`}>
                            {selectedStudent.riskScore}%
                          </div>
                          <p className="text-sm text-secondary-600">Risk Score</p>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-secondary-900">{selectedStudent.gpa}</div>
                          <p className="text-sm text-secondary-600">GPA</p>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-secondary-900">{selectedStudent.attendance}%</div>
                          <p className="text-sm text-secondary-600">Attendance</p>
                        </div>
                      </div>
                    </div>

                    {/* Academic Performance */}
                    <div>
                      <h3 className="text-lg font-semibold text-secondary-900 mb-4">Academic Performance</h3>
                      <div className="space-y-3">
                        {selectedStudent.subjects.map((subject, index) => (
                          <div key={index} className="flex items-center justify-between p-4 bg-white rounded-xl border border-secondary-200">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <BookOpen className="w-5 h-5 text-blue-600" />
                              </div>
                              <div>
                                <h4 className="font-medium text-secondary-900">{subject.name}</h4>
                                <p className="text-sm text-secondary-600">Teacher: {subject.teacher}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className={`text-lg font-bold ${
                                subject.points >= 3.5 ? 'text-green-600' :
                                subject.points >= 2.5 ? 'text-yellow-600' : 'text-red-600'
                              }`}>
                                {subject.grade}
                              </div>
                              <p className="text-sm text-secondary-600">{subject.points} pts</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Active Interventions */}
                    {selectedStudent.interventions.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-secondary-900 mb-4">Active Interventions</h3>
                        <div className="space-y-2">
                          {selectedStudent.interventions.map((intervention, index) => (
                            <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                              <CheckCircle className="w-5 h-5 text-green-600" />
                              <span className="text-secondary-900">{intervention}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Notes */}
                    <div>
                      <h3 className="text-lg font-semibold text-secondary-900 mb-4">Notes</h3>
                      <div className="p-4 bg-secondary-50 rounded-xl">
                        <p className="text-secondary-700">{selectedStudent.notes}</p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Contact & Alerts */}
                  <div className="space-y-6">
                    {/* Contact Information */}
                    <div>
                      <h3 className="text-lg font-semibold text-secondary-900 mb-4">Contact Information</h3>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <Mail className="w-5 h-5 text-secondary-400" />
                          <div>
                            <p className="text-sm font-medium text-secondary-900">Email</p>
                            <p className="text-sm text-secondary-600">{selectedStudent.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="w-5 h-5 text-secondary-400" />
                          <div>
                            <p className="text-sm font-medium text-secondary-900">Phone</p>
                            <p className="text-sm text-secondary-600">{selectedStudent.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-5 h-5 text-secondary-400" />
                          <div>
                            <p className="text-sm font-medium text-secondary-900">Address</p>
                            <p className="text-sm text-secondary-600">{selectedStudent.address}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Parent/Guardian */}
                    <div>
                      <h3 className="text-lg font-semibold text-secondary-900 mb-4">Parent/Guardian</h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-secondary-900">{selectedStudent.parentName}</p>
                          <p className="text-sm text-secondary-600">{selectedStudent.parentEmail}</p>
                          <p className="text-sm text-secondary-600">{selectedStudent.parentPhone}</p>
                        </div>
                      </div>
                    </div>

                    {/* Recent Alerts */}
                    {selectedStudent.alerts.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-secondary-900 mb-4">Recent Alerts</h3>
                        <div className="space-y-3">
                          {selectedStudent.alerts.map((alert, index) => (
                            <div key={index} className={`p-4 rounded-xl border-l-4 ${
                              alert.severity === 'critical' ? 'bg-red-50 border-l-red-500' :
                              alert.severity === 'high' ? 'bg-orange-50 border-l-orange-500' :
                              alert.severity === 'medium' ? 'bg-yellow-50 border-l-yellow-500' :
                              'bg-blue-50 border-l-blue-500'
                            }`}>
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-secondary-900">{alert.type}</span>
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  alert.severity === 'critical' ? 'bg-red-100 text-red-800' :
                                  alert.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                                  alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-blue-100 text-blue-800'
                                }`}>
                                  {alert.severity}
                                </span>
                              </div>
                              <p className="text-sm text-secondary-700 mb-2">{alert.message}</p>
                              <p className="text-xs text-secondary-500">{new Date(alert.date).toLocaleDateString()}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Quick Actions */}
                    <div>
                      <h3 className="text-lg font-semibold text-secondary-900 mb-4">Quick Actions</h3>
                      <div className="space-y-3">
                        <button className="btn-primary w-full">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Contact Parent
                        </button>
                        <button className="btn-outline w-full">
                          <FileText className="w-4 h-4 mr-2" />
                          Create Report
                        </button>
                        <button className="btn-outline w-full">
                          <Calendar className="w-4 h-4 mr-2" />
                          Schedule Meeting
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Student Modal */}
      <StudentFormModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddStudent}
        title="Add New Student"
      />

      {/* Edit Student Modal */}
      <StudentFormModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingStudent(null);
        }}
        onSubmit={handleEditStudent}
        student={editingStudent}
        title="Edit Student"
      />
    </div>
  );
}

// Student Form Modal Component
function StudentFormModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  student = null, 
  title 
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  student?: any;
  title: string;
}) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    grade: '9th',
    age: 15,
    gpa: 3.0,
    attendance: 90,
    address: '',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    notes: '',
    riskScore: 25,
    status: 'active'
  });

  useEffect(() => {
    if (student) {
      setFormData(student);
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        grade: '9th',
        age: 15,
        gpa: 3.0,
        attendance: 90,
        address: '',
        parentName: '',
        parentEmail: '',
        parentPhone: '',
        notes: '',
        riskScore: 25,
        status: 'active'
      });
    }
  }, [student, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 border-b border-secondary-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-secondary-900">{title}</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-secondary-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="label">First Name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="input"
                  required
                />
              </div>
              
              <div>
                <label className="label">Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="label">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="label">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="input"
                />
              </div>

              <div>
                <label className="label">Grade</label>
                <select
                  value={formData.grade}
                  onChange={(e) => setFormData({...formData, grade: e.target.value})}
                  className="input"
                >
                  <option value="9th">9th Grade</option>
                  <option value="10th">10th Grade</option>
                  <option value="11th">11th Grade</option>
                  <option value="12th">12th Grade</option>
                </select>
              </div>

              <div>
                <label className="label">Age</label>
                <input
                  type="number"
                  min="13"
                  max="20"
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: parseInt(e.target.value)})}
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="label">GPA</label>
                <input
                  type="number"
                  min="0"
                  max="4"
                  step="0.1"
                  value={formData.gpa}
                  onChange={(e) => setFormData({...formData, gpa: parseFloat(e.target.value)})}
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="label">Attendance (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.attendance}
                  onChange={(e) => setFormData({...formData, attendance: parseInt(e.target.value)})}
                  className="input"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="label">Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="input"
                />
              </div>

              <div>
                <label className="label">Parent/Guardian Name</label>
                <input
                  type="text"
                  value={formData.parentName}
                  onChange={(e) => setFormData({...formData, parentName: e.target.value})}
                  className="input"
                />
              </div>

              <div>
                <label className="label">Parent/Guardian Email</label>
                <input
                  type="email"
                  value={formData.parentEmail}
                  onChange={(e) => setFormData({...formData, parentEmail: e.target.value})}
                  className="input"
                />
              </div>

              <div className="md:col-span-2">
                <label className="label">Parent/Guardian Phone</label>
                <input
                  type="tel"
                  value={formData.parentPhone}
                  onChange={(e) => setFormData({...formData, parentPhone: e.target.value})}
                  className="input"
                />
              </div>

              <div className="md:col-span-2">
                <label className="label">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  className="input"
                  rows={4}
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 mt-8">
              <button type="button" onClick={onClose} className="btn-outline">
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                <Save className="w-4 h-4 mr-2" />
                {student ? 'Update Student' : 'Add Student'}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}