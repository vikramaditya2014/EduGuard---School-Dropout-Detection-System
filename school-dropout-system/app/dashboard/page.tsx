'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  Target, 
  BookOpen, 
  Clock, 
  Bell, 
  Search,
  Filter,
  MoreVertical,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  Eye,
  MessageCircle,
  Calendar,
  Download,
  RefreshCw,
  Zap,
  Shield,
  Award,
  Star,
  CheckCircle,
  XCircle,
  Activity,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart as RechartsLineChart,
  Line
} from 'recharts';

// Mock data with more realistic and dynamic content
const initialDashboardData = {
  overview: {
    totalStudents: 2847,
    atRiskStudents: 142,
    activeInterventions: 23,
    averageAttendance: 87.3,
    dropoutRate: 3.2,
    improvementRate: 23.5
  },
  trends: [
    { month: 'Jan', enrolled: 2920, atRisk: 156, dropped: 12 },
    { month: 'Feb', enrolled: 2895, atRisk: 148, dropped: 8 },
    { month: 'Mar', enrolled: 2887, atRisk: 152, dropped: 15 },
    { month: 'Apr', enrolled: 2881, atRisk: 145, dropped: 11 },
    { month: 'May', enrolled: 2868, atRisk: 138, dropped: 9 },
    { month: 'Jun', enrolled: 2847, atRisk: 142, dropped: 7 }
  ],
  riskDistribution: [
    { name: 'Low Risk', value: 2405, color: '#10b981' },
    { name: 'Medium Risk', value: 300, color: '#f59e0b' },
    { name: 'High Risk', value: 142, color: '#ef4444' }
  ],
  recentAlerts: [
    {
      id: 1,
      student: 'Sarah Johnson',
      grade: '9th',
      issue: 'Attendance dropped below 70%',
      severity: 'high',
      time: '2 hours ago',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 2,
      student: 'Michael Chen',
      grade: '11th',
      issue: 'GPA declined by 0.5 points',
      severity: 'medium',
      time: '4 hours ago',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 3,
      student: 'Emma Davis',
      grade: '10th',
      issue: 'Behavioral incident reported',
      severity: 'medium',
      time: '6 hours ago',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 4,
      student: 'David Wilson',
      grade: '12th',
      issue: 'Missing assignments increased',
      severity: 'low',
      time: '8 hours ago',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
    }
  ],
  activeInterventions: [
    {
      id: 1,
      title: 'Academic Recovery Program',
      students: 12,
      progress: 68,
      type: 'academic',
      status: 'active',
      effectiveness: 'high'
    },
    {
      id: 2,
      title: 'Peer Mentoring Initiative',
      students: 8,
      progress: 45,
      type: 'social',
      status: 'active',
      effectiveness: 'medium'
    },
    {
      id: 3,
      title: 'Family Engagement Workshop',
      students: 15,
      progress: 82,
      type: 'counseling',
      status: 'active',
      effectiveness: 'high'
    }
  ],
  upcomingTasks: [
    {
      id: 1,
      task: 'Review Sarah Johnson\'s risk assessment',
      priority: 'high',
      dueDate: 'Today',
      type: 'assessment'
    },
    {
      id: 2,
      task: 'Schedule parent meeting for Michael Chen',
      priority: 'medium',
      dueDate: 'Tomorrow',
      type: 'meeting'
    },
    {
      id: 3,
      task: 'Update intervention progress reports',
      priority: 'low',
      dueDate: 'This week',
      type: 'report'
    }
  ]
};

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState(initialDashboardData);
  const [selectedTimeRange, setSelectedTimeRange] = useState('6m');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState('overview');
  const [showAlerts, setShowAlerts] = useState(true);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setDashboardData(prev => ({
        ...prev,
        overview: {
          ...prev.overview,
          totalStudents: prev.overview.totalStudents + Math.floor(Math.random() * 3) - 1,
          atRiskStudents: Math.max(0, prev.overview.atRiskStudents + Math.floor(Math.random() * 3) - 1),
          averageAttendance: Math.max(0, Math.min(100, prev.overview.averageAttendance + (Math.random() - 0.5) * 0.5))
        }
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600';
      case 'completed': return 'text-blue-600';
      case 'paused': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getEffectivenessIcon = (effectiveness: string) => {
    switch (effectiveness) {
      case 'high': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'medium': return <Activity className="w-4 h-4 text-yellow-600" />;
      case 'low': return <ArrowDown className="w-4 h-4 text-red-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header with Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">Dashboard Overview</h1>
          <p className="text-secondary-600 mt-2">
            Welcome back! Here's what's happening with your students today.
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <div className="flex items-center space-x-2 bg-white rounded-lg border border-secondary-200 px-3 py-2">
            <Calendar className="w-4 h-4 text-secondary-400" />
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="text-sm font-medium text-secondary-700 bg-transparent border-none outline-none"
            >
              <option value="1m">Last Month</option>
              <option value="3m">Last 3 Months</option>
              <option value="6m">Last 6 Months</option>
              <option value="1y">Last Year</option>
            </select>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="btn-outline"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button className="btn-primary">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {[
          {
            title: 'Total Students',
            value: dashboardData.overview.totalStudents.toLocaleString(),
            change: '+2.3%',
            changeType: 'positive',
            icon: Users,
            color: 'from-blue-500 to-blue-600'
          },
          {
            title: 'At-Risk Students',
            value: dashboardData.overview.atRiskStudents.toLocaleString(),
            change: '-5.2%',
            changeType: 'positive',
            icon: AlertTriangle,
            color: 'from-red-500 to-red-600'
          },
          {
            title: 'Active Interventions',
            value: dashboardData.overview.activeInterventions.toLocaleString(),
            change: '+12.5%',
            changeType: 'positive',
            icon: Target,
            color: 'from-green-500 to-green-600'
          },
          {
            title: 'Avg. Attendance',
            value: `${dashboardData.overview.averageAttendance.toFixed(1)}%`,
            change: '+1.8%',
            changeType: 'positive',
            icon: BookOpen,
            color: 'from-purple-500 to-purple-600'
          },
          {
            title: 'Dropout Rate',
            value: `${dashboardData.overview.dropoutRate}%`,
            change: '-18.3%',
            changeType: 'positive',
            icon: TrendingUp,
            color: 'from-orange-500 to-orange-600'
          },
          {
            title: 'Improvement Rate',
            value: `${dashboardData.overview.improvementRate}%`,
            change: '+8.7%',
            changeType: 'positive',
            icon: Award,
            color: 'from-teal-500 to-teal-600'
          }
        ].map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="stat-card group hover:shadow-lg transition-all duration-300 cursor-pointer"
            onClick={() => setSelectedMetric(metric.title.toLowerCase())}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${metric.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <metric.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center space-x-1">
                {metric.changeType === 'positive' ? (
                  <ArrowUp className="w-4 h-4 text-green-600" />
                ) : (
                  <ArrowDown className="w-4 h-4 text-red-600" />
                )}
                <span className={`text-sm font-medium ${
                  metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change}
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm text-secondary-600 mb-1">{metric.title}</p>
              <p className="text-2xl font-bold text-secondary-900">{metric.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* Enrollment Trends Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="card"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-secondary-900">Enrollment & Risk Trends</h3>
                <p className="text-secondary-600 text-sm">Student population and risk assessment over time</p>
              </div>
              <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-secondary-600">Enrolled</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-secondary-600">At Risk</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-secondary-600">Dropped</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={dashboardData.trends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0', 
                    borderRadius: '12px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="enrolled" 
                  stackId="1" 
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  fillOpacity={0.1} 
                  strokeWidth={2}
                  name="Enrolled Students"
                />
                <Area 
                  type="monotone" 
                  dataKey="atRisk" 
                  stackId="2" 
                  stroke="#ef4444" 
                  fill="#ef4444" 
                  fillOpacity={0.8} 
                  strokeWidth={2}
                  name="At-Risk Students"
                />
                <Area 
                  type="monotone" 
                  dataKey="dropped" 
                  stackId="3" 
                  stroke="#f59e0b" 
                  fill="#f59e0b" 
                  fillOpacity={0.8} 
                  strokeWidth={2}
                  name="Dropped Out"
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Active Interventions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="card"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-secondary-900">Active Interventions</h3>
              <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                View All
                <ChevronRight className="w-4 h-4 inline ml-1" />
              </button>
            </div>
            <div className="space-y-4">
              {dashboardData.activeInterventions.map((intervention, index) => (
                <motion.div
                  key={intervention.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="p-4 bg-secondary-50 rounded-xl hover:bg-secondary-100 transition-colors duration-200 cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(intervention.status) === 'text-green-600' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                      <h4 className="font-semibold text-secondary-900">{intervention.title}</h4>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getEffectivenessIcon(intervention.effectiveness)}
                      <span className="text-sm text-secondary-600">{intervention.students} students</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
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
                    <button className="ml-4 p-2 hover:bg-white rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4 text-secondary-400" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Risk Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="card"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-secondary-900">Risk Distribution</h3>
              <button className="p-2 hover:bg-secondary-100 rounded-lg transition-colors">
                <PieChart className="w-5 h-5 text-secondary-400" />
              </button>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <RechartsPieChart>
                <Pie
                  data={dashboardData.riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {dashboardData.riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0', 
                    borderRadius: '12px' 
                  }} 
                />
              </RechartsPieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {dashboardData.riskDistribution.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-secondary-700">{item.name}</span>
                  </div>
                  <span className="font-semibold text-secondary-900">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Alerts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="card"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-red-500" />
                <h3 className="text-xl font-bold text-secondary-900">Recent Alerts</h3>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowAlerts(!showAlerts)}
                  className="p-2 hover:bg-secondary-100 rounded-lg transition-colors"
                >
                  <Eye className="w-4 h-4 text-secondary-400" />
                </button>
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            
            <AnimatePresence>
              {showAlerts && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-3 max-h-96 overflow-y-auto"
                >
                  {dashboardData.recentAlerts.map((alert, index) => (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 border-l-4 border-l-red-400 bg-red-50 rounded-r-xl hover:bg-red-100 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start space-x-3">
                        <img
                          src={alert.avatar}
                          alt={alert.student}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-secondary-900 truncate">
                              {alert.student}
                            </h4>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(alert.severity)}`}>
                              {alert.severity}
                            </span>
                          </div>
                          <p className="text-sm text-secondary-700 mb-2">{alert.issue}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-secondary-500">{alert.grade} • {alert.time}</span>
                            <div className="flex items-center space-x-1">
                              <button className="p-1 hover:bg-red-200 rounded transition-colors">
                                <Eye className="w-3 h-3 text-red-600" />
                              </button>
                              <button className="p-1 hover:bg-red-200 rounded transition-colors">
                                <MessageCircle className="w-3 h-3 text-red-600" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Upcoming Tasks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="card"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-secondary-900">Upcoming Tasks</h3>
              <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                View All
              </button>
            </div>
            <div className="space-y-3">
              {dashboardData.upcomingTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 + index * 0.1 }}
                  className="flex items-center space-x-3 p-3 bg-secondary-50 rounded-xl hover:bg-secondary-100 transition-colors cursor-pointer"
                >
                  <div className="flex-shrink-0">
                    <div className={`w-3 h-3 rounded-full ${
                      task.priority === 'high' ? 'bg-red-500' :
                      task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-secondary-900 truncate">
                      {task.task}
                    </p>
                    <p className="text-xs text-secondary-500">{task.dueDate}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      task.priority === 'high' ? 'bg-red-100 text-red-800' :
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {task.priority}
                    </span>
                    <button className="p-1 hover:bg-white rounded transition-colors">
                      <ChevronRight className="w-4 h-4 text-secondary-400" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="card"
      >
        <h3 className="text-xl font-bold text-secondary-900 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { icon: Users, label: 'Add Student', color: 'from-blue-500 to-blue-600' },
            { icon: Target, label: 'Create Intervention', color: 'from-green-500 to-green-600' },
            { icon: BarChart3, label: 'Generate Report', color: 'from-purple-500 to-purple-600' },
            { icon: Bell, label: 'Set Alert', color: 'from-red-500 to-red-600' },
            { icon: MessageCircle, label: 'Send Message', color: 'from-yellow-500 to-yellow-600' },
            { icon: Download, label: 'Export Data', color: 'from-teal-500 to-teal-600' }
          ].map((action, index) => (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3 + index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 bg-white border border-secondary-200 rounded-xl hover:shadow-md transition-all duration-200 group"
            >
              <div className={`w-12 h-12 mx-auto mb-3 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm font-medium text-secondary-700 group-hover:text-secondary-900">
                {action.label}
              </p>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}