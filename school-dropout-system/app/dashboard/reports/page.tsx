'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  FileText, 
  Download, 
  Calendar, 
  Users, 
  BarChart3, 
  TrendingUp,
  AlertTriangle,
  Target,
  Clock,
  Filter,
  Search,
  Plus,
  Eye,
  Share2,
  Trash2,
  Edit3,
  RefreshCw,
  BookOpen,
  GraduationCap,
  Award,
  Activity,
  PieChart,
  LineChart
} from 'lucide-react';
import { toast } from 'react-hot-toast';

// Mock reports data
const mockReports = [
  {
    id: '1',
    title: 'Monthly Risk Assessment Report',
    description: 'Comprehensive analysis of student risk factors for January 2024',
    type: 'Risk Assessment',
    createdDate: '2024-01-15',
    createdBy: 'Dr. Sarah Martinez',
    status: 'completed',
    format: 'PDF',
    size: '2.4 MB',
    downloads: 23,
    tags: ['risk', 'monthly', 'assessment']
  },
  {
    id: '2',
    title: 'Attendance Trends Analysis',
    description: 'Student attendance patterns and trends for Q1 2024',
    type: 'Attendance',
    createdDate: '2024-01-10',
    createdBy: 'John Smith',
    status: 'completed',
    format: 'Excel',
    size: '1.8 MB',
    downloads: 45,
    tags: ['attendance', 'trends', 'quarterly']
  },
  {
    id: '3',
    title: 'Intervention Effectiveness Report',
    description: 'Analysis of intervention program outcomes and success rates',
    type: 'Interventions',
    createdDate: '2024-01-08',
    createdBy: 'Mary Johnson',
    status: 'completed',
    format: 'PDF',
    size: '3.1 MB',
    downloads: 18,
    tags: ['interventions', 'effectiveness', 'outcomes']
  },
  {
    id: '4',
    title: 'Academic Performance Summary',
    description: 'Grade distribution and academic performance metrics',
    type: 'Academic',
    createdDate: '2024-01-05',
    createdBy: 'Robert Brown',
    status: 'completed',
    format: 'PDF',
    size: '2.7 MB',
    downloads: 67,
    tags: ['academic', 'grades', 'performance']
  },
  {
    id: '5',
    title: 'Weekly Alert Summary',
    description: 'Summary of alerts and notifications for the past week',
    type: 'Alerts',
    createdDate: '2024-01-14',
    createdBy: 'System Generated',
    status: 'processing',
    format: 'PDF',
    size: '0.9 MB',
    downloads: 0,
    tags: ['alerts', 'weekly', 'automated']
  }
];

const reportTypes = [
  { value: 'all', label: 'All Reports', icon: FileText, color: 'text-secondary-600' },
  { value: 'Risk Assessment', label: 'Risk Assessment', icon: AlertTriangle, color: 'text-red-600' },
  { value: 'Attendance', label: 'Attendance', icon: Clock, color: 'text-blue-600' },
  { value: 'Academic', label: 'Academic', icon: BookOpen, color: 'text-green-600' },
  { value: 'Interventions', label: 'Interventions', icon: Target, color: 'text-purple-600' },
  { value: 'Alerts', label: 'Alerts', icon: AlertTriangle, color: 'text-orange-600' }
];

const quickReports = [
  {
    title: 'Student Risk Summary',
    description: 'Current risk levels across all students',
    icon: AlertTriangle,
    color: 'from-red-500 to-red-600',
    action: 'Generate Now'
  },
  {
    title: 'Attendance Report',
    description: 'Weekly attendance summary',
    icon: Clock,
    color: 'from-blue-500 to-blue-600',
    action: 'Generate Now'
  },
  {
    title: 'Academic Performance',
    description: 'Grade distribution analysis',
    icon: BookOpen,
    color: 'from-green-500 to-green-600',
    action: 'Generate Now'
  },
  {
    title: 'Intervention Tracking',
    description: 'Active interventions status',
    icon: Target,
    color: 'from-purple-500 to-purple-600',
    action: 'Generate Now'
  }
];

export default function ReportsPage() {
  const [reports, setReports] = useState(mockReports);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredReports = reports.filter(report => {
    const matchesSearch = 
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.createdBy.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'all' || report.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || report.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  }).sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'title':
        aValue = a.title;
        bValue = b.title;
        break;
      case 'type':
        aValue = a.type;
        bValue = b.type;
        break;
      case 'downloads':
        aValue = a.downloads;
        bValue = b.downloads;
        break;
      default:
        aValue = new Date(a.createdDate);
        bValue = new Date(b.createdDate);
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleDownload = (reportId: string) => {
    const report = reports.find(r => r.id === reportId);
    if (report) {
      // Update download count
      setReports(prev => prev.map(r => 
        r.id === reportId ? { ...r, downloads: r.downloads + 1 } : r
      ));
      toast.success(`Downloading ${report.title}...`);
    }
  };

  const handleDelete = (reportId: string) => {
    setReports(prev => prev.filter(r => r.id !== reportId));
    toast.success('Report deleted successfully');
  };

  const handleQuickReport = (reportTitle: string) => {
    toast.success(`Generating ${reportTitle}...`);
    // In a real app, this would trigger report generation
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'processing': return 'text-yellow-600 bg-yellow-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-secondary-600 bg-secondary-100';
    }
  };

  const getTypeIcon = (type: string) => {
    const reportType = reportTypes.find(t => t.value === type);
    return reportType ? reportType.icon : FileText;
  };

  const getTypeColor = (type: string) => {
    const reportType = reportTypes.find(t => t.value === type);
    return reportType ? reportType.color : 'text-secondary-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">Reports</h1>
          <p className="text-secondary-600 mt-1">
            Generate and manage system reports
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => toast.success('Refreshing reports...')}
            className="btn-outline"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
          <Link href="/dashboard/reports/generate" className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Generate Report
          </Link>
        </div>
      </div>

      {/* Quick Reports */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickReports.map((report, index) => (
          <motion.div
            key={report.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleQuickReport(report.title)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${report.color} rounded-xl flex items-center justify-center`}>
                <report.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-primary-600">{report.action}</span>
            </div>
            <h3 className="font-semibold text-secondary-900 mb-2">{report.title}</h3>
            <p className="text-sm text-secondary-600">{report.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="card">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary-400" />
              <input
                type="text"
                placeholder="Search reports..."
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
              {reportTypes.map(type => (
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
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="processing">Processing</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          {/* Sort Options */}
          <div className="flex items-center space-x-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input w-auto"
            >
              <option value="date">Sort by Date</option>
              <option value="title">Sort by Title</option>
              <option value="type">Sort by Type</option>
              <option value="downloads">Sort by Downloads</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="btn-outline p-2"
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.length === 0 ? (
          <div className="card text-center py-12">
            <FileText className="w-16 h-16 text-secondary-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-secondary-900 mb-2">No Reports Found</h3>
            <p className="text-secondary-600 mb-4">
              {searchTerm || selectedType !== 'all' || selectedStatus !== 'all'
                ? 'Try adjusting your filters or search terms.'
                : 'Generate your first report to get started.'}
            </p>
            <Link href="/dashboard/reports/generate" className="btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              Generate Report
            </Link>
          </div>
        ) : (
          filteredReports.map((report, index) => {
            const TypeIcon = getTypeIcon(report.type);
            return (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="card hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="flex-shrink-0">
                      <TypeIcon className={`w-8 h-8 ${getTypeColor(report.type)}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="font-semibold text-secondary-900 truncate">
                          {report.title}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                          {report.status}
                        </span>
                      </div>
                      <p className="text-sm text-secondary-600 mb-2 line-clamp-2">
                        {report.description}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-secondary-500">
                        <span>By {report.createdBy}</span>
                        <span>•</span>
                        <span>{new Date(report.createdDate).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{report.format}</span>
                        <span>•</span>
                        <span>{report.size}</span>
                        <span>•</span>
                        <span>{report.downloads} downloads</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => toast.success('Opening report preview...')}
                      className="p-2 text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100 rounded-lg transition-colors"
                      title="Preview"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toast.success('Sharing report...')}
                      className="p-2 text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100 rounded-lg transition-colors"
                      title="Share"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDownload(report.id)}
                      className="p-2 text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100 rounded-lg transition-colors"
                      title="Download"
                      disabled={report.status !== 'completed'}
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(report.id)}
                      className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                {/* Tags */}
                {report.tags.length > 0 && (
                  <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-secondary-100">
                    {report.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-secondary-100 text-secondary-600 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })
        )}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-secondary-900">{reports.length}</p>
          <p className="text-sm text-secondary-600">Total Reports</p>
        </div>
        <div className="card text-center">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Download className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-secondary-900">
            {reports.reduce((sum, report) => sum + report.downloads, 0)}
          </p>
          <p className="text-sm text-secondary-600">Total Downloads</p>
        </div>
        <div className="card text-center">
          <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Clock className="w-6 h-6 text-yellow-600" />
          </div>
          <p className="text-2xl font-bold text-secondary-900">
            {reports.filter(r => r.status === 'processing').length}
          </p>
          <p className="text-sm text-secondary-600">Processing</p>
        </div>
        <div className="card text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <TrendingUp className="w-6 h-6 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-secondary-900">
            {Math.round(reports.reduce((sum, report) => sum + report.downloads, 0) / reports.length)}
          </p>
          <p className="text-sm text-secondary-600">Avg Downloads</p>
        </div>
      </div>
    </div>
  );
}