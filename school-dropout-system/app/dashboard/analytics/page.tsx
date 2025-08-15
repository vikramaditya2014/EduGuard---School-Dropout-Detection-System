'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  AlertTriangle, 
  Calendar, 
  Download, 
  Filter, 
  RefreshCw,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  Activity,
  Target,
  Award,
  Clock,
  BookOpen,
  GraduationCap,
  Brain,
  Eye,
  ChevronDown,
  ArrowUp,
  ArrowDown,
  Info
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart as RechartsLineChart,
  Line,
  ComposedChart,
  Scatter,
  ScatterChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

// Comprehensive analytics data
const analyticsData = {
  enrollmentTrends: [
    { month: 'Aug 2023', enrolled: 2950, atRisk: 165, droppedOut: 8, retention: 99.7 },
    { month: 'Sep 2023', enrolled: 2934, atRisk: 158, droppedOut: 12, retention: 99.6 },
    { month: 'Oct 2023', enrolled: 2925, atRisk: 162, droppedOut: 15, retention: 99.5 },
    { month: 'Nov 2023', enrolled: 2908, atRisk: 159, droppedOut: 18, retention: 99.4 },
    { month: 'Dec 2023', enrolled: 2895, atRisk: 148, droppedOut: 14, retention: 99.5 },
    { month: 'Jan 2024', enrolled: 2879, atRisk: 142, droppedOut: 11, retention: 99.6 },
    { month: 'Feb 2024', enrolled: 2867, atRisk: 139, droppedOut: 9, retention: 99.7 },
    { month: 'Mar 2024', enrolled: 2855, atRisk: 135, droppedOut: 7, retention: 99.8 }
  ],

  riskDistribution: [
    { grade: '9th', lowRisk: 650, mediumRisk: 89, highRisk: 42, total: 781 },
    { grade: '10th', lowRisk: 598, mediumRisk: 76, highRisk: 38, total: 712 },
    { grade: '11th', lowRisk: 587, mediumRisk: 82, highRisk: 45, total: 714 },
    { grade: '12th', lowRisk: 570, mediumRisk: 68, heavyRisk: 32, total: 670 }
  ],

  riskByCategory: [
    { name: 'Low Risk', value: 2405, color: '#10b981', percentage: 84.3 },
    { name: 'Medium Risk', value: 315, color: '#f59e0b', percentage: 11.0 },
    { name: 'High Risk', value: 135, color: '#ef4444', percentage: 4.7 }
  ],

  interventionEffectiveness: [
    { 
      intervention: 'Academic Tutoring', 
      studentsHelped: 89, 
      successRate: 78, 
      avgImprovement: 0.8,
      cost: 15000,
      roi: 3.2 
    },
    { 
      intervention: 'Counseling Services', 
      studentsHelped: 67, 
      successRate: 85, 
      avgImprovement: 1.2,
      cost: 12000,
      roi: 4.1 
    },
    { 
      intervention: 'Peer Mentoring', 
      studentsHelped: 45, 
      successRate: 72, 
      avgImprovement: 0.6,
      cost: 8000,
      roi: 2.8 
    },
    { 
      intervention: 'Family Engagement', 
      studentsHelped: 78, 
      successRate: 82, 
      avgImprovement: 1.0,
      cost: 10000,
      roi: 3.8 
    },
    { 
      intervention: 'Attendance Support', 
      studentsHelped: 92, 
      successRate: 69, 
      avgImprovement: 0.7,
      cost: 9000,
      roi: 2.5 
    }
  ],

  performanceMetrics: [
    { month: 'Aug', avgGPA: 2.8, avgAttendance: 85, behavioralIncidents: 45, graduationRate: 89 },
    { month: 'Sep', avgGPA: 2.9, avgAttendance: 87, behavioralIncidents: 38, graduationRate: 90 },
    { month: 'Oct', avgGPA: 3.0, avgAttendance: 86, behavioralIncidents: 42, graduationRate: 89 },
    { month: 'Nov', avgGPA: 2.9, avgAttendance: 88, behavioralIncidents: 35, graduationRate: 91 },
    { month: 'Dec', avgGPA: 3.1, avgAttendance: 89, behavioralIncidents: 32, graduationRate: 92 },
    { month: 'Jan', avgGPA: 3.0, avgAttendance: 87, behavioralIncidents: 28, graduationRate: 93 }
  ],

  demographicBreakdown: [
    { category: 'Freshman', atRisk: 42, total: 781, percentage: 5.4 },
    { category: 'Sophomore', atRisk: 38, total: 712, percentage: 5.3 },
    { category: 'Junior', atRisk: 45, total: 714, percentage: 6.3 },
    { category: 'Senior', atRisk: 32, total: 670, percentage: 4.8 }
  ],

  predictiveModels: [
    { 
      model: 'Academic Performance',
      accuracy: 94.2,
      precision: 89.7,
      recall: 91.3,
      f1Score: 90.5,
      status: 'active'
    },
    { 
      model: 'Attendance Patterns',
      accuracy: 87.8,
      precision: 83.4,
      recall: 85.9,
      f1Score: 84.6,
      status: 'active'
    },
    { 
      model: 'Behavioral Indicators',
      accuracy: 91.5,
      precision: 88.2,
      recall: 89.6,
      f1Score: 88.9,
      status: 'training'
    },
    { 
      model: 'Socioeconomic Factors',
      accuracy: 85.3,
      precision: 81.7,
      recall: 84.2,
      f1Score: 82.9,
      status: 'active'
    }
  ]
};

// Chart color schemes
const colors = {
  primary: ['#3b82f6', '#1d4ed8', '#1e40af'],
  success: ['#10b981', '#059669', '#047857'],
  warning: ['#f59e0b', '#d97706', '#b45309'],
  danger: ['#ef4444', '#dc2626', '#b91c1c'],
  mixed: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4']
};

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('6m');
  const [selectedMetric, setSelectedMetric] = useState('overview');
  const [activeTab, setActiveTab] = useState('trends');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedChart, setSelectedChart] = useState('enrollment');

  // Calculate key metrics
  const keyMetrics = useMemo(() => {
    const latest = analyticsData.enrollmentTrends[analyticsData.enrollmentTrends.length - 1];
    const previous = analyticsData.enrollmentTrends[analyticsData.enrollmentTrends.length - 2];
    
    return {
      totalStudents: {
        value: latest.enrolled,
        change: ((latest.enrolled - previous.enrolled) / previous.enrolled * 100).toFixed(1)
      },
      atRiskStudents: {
        value: latest.atRisk,
        change: ((latest.atRisk - previous.atRisk) / previous.atRisk * 100).toFixed(1)
      },
      retentionRate: {
        value: latest.retention,
        change: ((latest.retention - previous.retention)).toFixed(1)
      },
      interventionSuccess: {
        value: Math.round(analyticsData.interventionEffectiveness.reduce((sum, i) => sum + i.successRate, 0) / analyticsData.interventionEffectiveness.length),
        change: '+2.3'
      }
    };
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  const exportData = (type: string) => {
    // Mock export functionality
    console.log(`Exporting ${type} data...`);
  };

  const tabs = [
    { id: 'trends', name: 'Enrollment Trends', icon: TrendingUp },
    { id: 'risk', name: 'Risk Analysis', icon: AlertTriangle },
    { id: 'interventions', name: 'Interventions', icon: Target },
    { id: 'performance', name: 'Performance', icon: BarChart3 },
    { id: 'predictions', name: 'AI Predictions', icon: Brain }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">Analytics Dashboard</h1>
          <p className="text-secondary-600 mt-2">
            Comprehensive insights and data-driven analytics for student success
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="input w-40"
          >
            <option value="1m">Last Month</option>
            <option value="3m">Last 3 Months</option>
            <option value="6m">Last 6 Months</option>
            <option value="1y">Last Year</option>
            <option value="all">All Time</option>
          </select>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="btn-outline"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button
            onClick={() => exportData('all')}
            className="btn-primary"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'Total Students',
            value: keyMetrics.totalStudents.value.toLocaleString(),
            change: keyMetrics.totalStudents.change + '%',
            changeType: parseFloat(keyMetrics.totalStudents.change) >= 0 ? 'positive' : 'negative',
            icon: Users,
            color: 'from-blue-500 to-blue-600'
          },
          {
            title: 'At-Risk Students',
            value: keyMetrics.atRiskStudents.value.toString(),
            change: keyMetrics.atRiskStudents.change + '%',
            changeType: parseFloat(keyMetrics.atRiskStudents.change) <= 0 ? 'positive' : 'negative',
            icon: AlertTriangle,
            color: 'from-red-500 to-red-600'
          },
          {
            title: 'Retention Rate',
            value: keyMetrics.retentionRate.value + '%',
            change: keyMetrics.retentionRate.change + '%',
            changeType: parseFloat(keyMetrics.retentionRate.change) >= 0 ? 'positive' : 'negative',
            icon: Award,
            color: 'from-green-500 to-green-600'
          },
          {
            title: 'Intervention Success',
            value: keyMetrics.interventionSuccess.value + '%',
            change: keyMetrics.interventionSuccess.change + '%',
            changeType: 'positive',
            icon: Target,
            color: 'from-purple-500 to-purple-600'
          }
        ].map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="stat-card hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-secondary-600 mb-1">{metric.title}</p>
                <p className="text-2xl font-bold text-secondary-900 mb-2">{metric.value}</p>
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
                  <span className="text-xs text-secondary-500">vs last period</span>
                </div>
              </div>
              <div className={`w-16 h-16 bg-gradient-to-r ${metric.color} rounded-2xl flex items-center justify-center`}>
                <metric.icon className="w-8 h-8 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tab Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl shadow-sm border border-secondary-200 p-2"
      >
        <div className="flex flex-wrap items-center space-x-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'text-secondary-600 hover:text-secondary-900 hover:bg-secondary-50'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-8"
      >
        {/* Enrollment Trends Tab */}
        {activeTab === 'trends' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-secondary-900">Enrollment Trends Over Time</h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setSelectedChart('enrollment')}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        selectedChart === 'enrollment' 
                          ? 'bg-primary-100 text-primary-700' 
                          : 'text-secondary-600 hover:text-secondary-900'
                      }`}
                    >
                      Enrollment
                    </button>
                    <button
                      onClick={() => setSelectedChart('retention')}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        selectedChart === 'retention' 
                          ? 'bg-primary-100 text-primary-700' 
                          : 'text-secondary-600 hover:text-secondary-900'
                      }`}
                    >
                      Retention
                    </button>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={400}>
                  {selectedChart === 'enrollment' ? (
                    <ComposedChart data={analyticsData.enrollmentTrends}>
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
                      <Legend />
                      <Bar dataKey="enrolled" fill="#3b82f6" name="Total Enrolled" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="atRisk" fill="#f59e0b" name="At Risk" radius={[4, 4, 0, 0]} />
                      <Line type="monotone" dataKey="droppedOut" stroke="#ef4444" strokeWidth={3} name="Dropped Out" />
                    </ComposedChart>
                  ) : (
                    <LineChart data={analyticsData.enrollmentTrends}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="month" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#64748b', fontSize: 12 }} 
                      />
                      <YAxis 
                        domain={[98, 100]}
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#64748b', fontSize: 12 }} 
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e2e8f0', 
                          borderRadius: '12px' 
                        }}
                        formatter={(value) => [`${value}%`, 'Retention Rate']}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="retention" 
                        stroke="#10b981" 
                        strokeWidth={3}
                        dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
                        activeDot={{ r: 8, fill: '#10b981' }}
                      />
                    </LineChart>
                  )}
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-6">
              {/* Grade Distribution */}
              <div className="card">
                <h3 className="text-lg font-bold text-secondary-900 mb-4">Grade Distribution</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <RechartsPieChart>
                    <Pie
                      data={analyticsData.riskDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
                      fill="#8884d8"
                      dataKey="total"
                      label={({ grade, percentage }) => `${grade}: ${((percentage || 0) * 100).toFixed(1)}%`}
                    >
                      {analyticsData.riskDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors.mixed[index % colors.mixed.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>

              {/* Quick Stats */}
              <div className="card">
                <h3 className="text-lg font-bold text-secondary-900 mb-4">Key Insights</h3>
                <div className="space-y-4">
                  {[
                    { 
                      label: 'Avg Monthly Improvement', 
                      value: '2.3%', 
                      icon: TrendingUp, 
                      color: 'text-green-600' 
                    },
                    { 
                      label: 'Students Helped This Month', 
                      value: '89', 
                      icon: Users, 
                      color: 'text-blue-600' 
                    },
                    { 
                      label: 'Early Detection Success', 
                      value: '94%', 
                      icon: Eye, 
                      color: 'text-purple-600' 
                    }
                  ].map((stat, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <stat.icon className={`w-5 h-5 ${stat.color}`} />
                        <span className="text-sm text-secondary-700">{stat.label}</span>
                      </div>
                      <span className="font-semibold text-secondary-900">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Risk Analysis Tab */}
        {activeTab === 'risk' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-xl font-bold text-secondary-900 mb-6">Risk Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={analyticsData.riskByCategory}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name} (${percentage}%)`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {analyticsData.riskByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [value.toLocaleString(), name]} />
                </RechartsPieChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-3 gap-4">
                {analyticsData.riskByCategory.map((category) => (
                  <div key={category.name} className="text-center">
                    <div 
                      className="w-4 h-4 rounded-full mx-auto mb-2"
                      style={{ backgroundColor: category.color }}
                    />
                    <p className="text-sm font-medium text-secondary-900">{category.value}</p>
                    <p className="text-xs text-secondary-600">{category.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold text-secondary-900 mb-6">Risk by Grade Level</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analyticsData.riskDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="grade" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="lowRisk" stackId="a" fill="#10b981" name="Low Risk" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="mediumRisk" stackId="a" fill="#f59e0b" name="Medium Risk" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="highRisk" stackId="a" fill="#ef4444" name="High Risk" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="lg:col-span-2">
              <div className="card">
                <h3 className="text-xl font-bold text-secondary-900 mb-6">Demographic Risk Analysis</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {analyticsData.demographicBreakdown.map((demographic, index) => (
                    <div key={demographic.category} className="text-center">
                      <div className="relative w-24 h-24 mx-auto mb-4">
                        <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="2"
                          />
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke={demographic.percentage > 6 ? "#ef4444" : demographic.percentage > 4 ? "#f59e0b" : "#10b981"}
                            strokeWidth="2"
                            strokeDasharray={`${demographic.percentage * 3.14159}, 100`}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-lg font-bold text-secondary-900">
                            {demographic.percentage}%
                          </span>
                        </div>
                      </div>
                      <h4 className="font-semibold text-secondary-900 mb-1">{demographic.category}</h4>
                      <p className="text-sm text-secondary-600">
                        {demographic.atRisk} of {demographic.total} students
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Interventions Tab */}
        {activeTab === 'interventions' && (
          <div className="space-y-8">
            <div className="card">
              <h3 className="text-xl font-bold text-secondary-900 mb-6">Intervention Effectiveness Analysis</h3>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={analyticsData.interventionEffectiveness}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="intervention" axisLine={false} tickLine={false} angle={-45} textAnchor="end" height={80} />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} />
                  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e2e8f0', 
                      borderRadius: '12px' 
                    }} 
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="studentsHelped" fill="#3b82f6" name="Students Helped" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="left" dataKey="successRate" fill="#10b981" name="Success Rate %" radius={[4, 4, 0, 0]} />
                  <Line yAxisId="right" type="monotone" dataKey="roi" stroke="#f59e0b" strokeWidth={3} name="ROI" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {analyticsData.interventionEffectiveness.map((intervention, index) => (
                <motion.div
                  key={intervention.intervention}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-secondary-900">{intervention.intervention}</h4>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      intervention.successRate >= 80 ? 'bg-green-100 text-green-800' :
                      intervention.successRate >= 70 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {intervention.successRate}% Success
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-secondary-600">Students Helped</span>
                      <span className="font-semibold">{intervention.studentsHelped}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-secondary-600">Avg Improvement</span>
                      <span className="font-semibold">+{intervention.avgImprovement} GPA</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-secondary-600">Cost</span>
                      <span className="font-semibold">${intervention.cost.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-secondary-600">ROI</span>
                      <span className="font-semibold text-green-600">{intervention.roi}x</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-secondary-200">
                    <div className="w-full bg-secondary-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${intervention.successRate}%` }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Performance Tab */}
        {activeTab === 'performance' && (
          <div className="space-y-8">
            <div className="card">
              <h3 className="text-xl font-bold text-secondary-900 mb-6">Academic Performance Trends</h3>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={analyticsData.performanceMetrics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} />
                  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="avgGPA" stroke="#3b82f6" strokeWidth={3} name="Average GPA" />
                  <Line yAxisId="left" type="monotone" dataKey="avgAttendance" stroke="#10b981" strokeWidth={3} name="Average Attendance" />
                  <Bar yAxisId="right" dataKey="behavioralIncidents" fill="#ef4444" name="Behavioral Incidents" />
                  <Line yAxisId="left" type="monotone" dataKey="graduationRate" stroke="#8b5cf6" strokeWidth={3} name="Graduation Rate" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="card">
                <h3 className="text-lg font-bold text-secondary-900 mb-4">Performance Indicators</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Average GPA Trend', value: '+0.3', status: 'improving' },
                    { label: 'Attendance Rate', value: '87%', status: 'stable' },
                    { label: 'Behavioral Incidents', value: '-38%', status: 'improving' },
                    { label: 'Graduation Rate', value: '93%', status: 'improving' }
                  ].map((indicator, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-secondary-50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          indicator.status === 'improving' ? 'bg-green-500' :
                          indicator.status === 'declining' ? 'bg-red-500' : 'bg-yellow-500'
                        }`} />
                        <span className="font-medium text-secondary-900">{indicator.label}</span>
                      </div>
                      <span className={`font-semibold ${
                        indicator.status === 'improving' ? 'text-green-600' :
                        indicator.status === 'declining' ? 'text-red-600' : 'text-yellow-600'
                      }`}>
                        {indicator.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-bold text-secondary-900 mb-4">Monthly Achievements</h3>
                <div className="space-y-4">
                  {[
                    { achievement: 'Reduced dropouts by 23%', icon: Award, color: 'text-green-600' },
                    { achievement: 'Improved avg attendance by 4%', icon: Calendar, color: 'text-blue-600' },
                    { achievement: 'Decreased behavioral issues by 38%', icon: Activity, color: 'text-purple-600' },
                    { achievement: 'Increased intervention success to 85%', icon: Target, color: 'text-orange-600' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 border border-secondary-200 rounded-xl">
                      <item.icon className={`w-6 h-6 ${item.color}`} />
                      <span className="text-secondary-900">{item.achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI Predictions Tab */}
        {activeTab === 'predictions' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="card">
                <h3 className="text-xl font-bold text-secondary-900 mb-6">AI Model Performance</h3>
                <div className="space-y-4">
                  {analyticsData.predictiveModels.map((model, index) => (
                    <motion.div
                      key={model.model}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 border border-secondary-200 rounded-xl"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-secondary-900">{model.model}</h4>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          model.status === 'active' ? 'bg-green-100 text-green-800' :
                          model.status === 'training' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {model.status}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-secondary-600">Accuracy</p>
                          <p className="font-semibold">{model.accuracy}%</p>
                        </div>
                        <div>
                          <p className="text-secondary-600">Precision</p>
                          <p className="font-semibold">{model.precision}%</p>
                        </div>
                        <div>
                          <p className="text-secondary-600">Recall</p>
                          <p className="font-semibold">{model.recall}%</p>
                        </div>
                        <div>
                          <p className="text-secondary-600">F1-Score</p>
                          <p className="font-semibold">{model.f1Score}%</p>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <div className="w-full bg-secondary-200 rounded-full h-2">
                          <div 
                            className="bg-primary-600 h-2 rounded-full transition-all duration-500" 
                            style={{ width: `${model.accuracy}%` }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="card">
                <h3 className="text-xl font-bold text-secondary-900 mb-6">Model Accuracy Comparison</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={analyticsData.predictiveModels}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="model" />
                    <PolarRadiusAxis angle={30} domain={[75, 100]} />
                    <Radar name="Accuracy" dataKey="accuracy" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} strokeWidth={2} />
                    <Radar name="Precision" dataKey="precision" stroke="#10b981" fill="#10b981" fillOpacity={0.3} strokeWidth={2} />
                    <Radar name="Recall" dataKey="recall" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} strokeWidth={2} />
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold text-secondary-900 mb-6">Prediction Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Students at Risk Next Month',
                    value: '23',
                    confidence: '94%',
                    trend: 'decreasing',
                    description: 'Based on current academic and behavioral patterns'
                  },
                  {
                    title: 'Intervention Candidates',
                    value: '45',
                    confidence: '87%',
                    trend: 'stable',
                    description: 'Students who would benefit from targeted support'
                  },
                  {
                    title: 'Potential Graduates',
                    value: '612',
                    confidence: '92%',
                    trend: 'increasing',
                    description: 'Senior students likely to graduate on time'
                  }
                ].map((insight, index) => (
                  <motion.div
                    key={insight.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 bg-gradient-to-br from-primary-50 to-blue-50 rounded-xl border border-primary-200"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <Brain className="w-8 h-8 text-primary-600" />
                      <div className="flex items-center space-x-1">
                        {insight.trend === 'increasing' ? 
                          <ArrowUp className="w-4 h-4 text-green-600" /> :
                          insight.trend === 'decreasing' ?
                          <ArrowDown className="w-4 h-4 text-red-600" /> :
                          <Activity className="w-4 h-4 text-blue-600" />
                        }
                        <span className="text-sm font-medium text-primary-700">{insight.confidence}</span>
                      </div>
                    </div>
                    
                    <h4 className="text-lg font-semibold text-secondary-900 mb-2">{insight.title}</h4>
                    <p className="text-3xl font-bold text-primary-600 mb-3">{insight.value}</p>
                    <p className="text-sm text-secondary-600">{insight.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}