'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  Brain, 
  Target, 
  Eye, 
  RefreshCw,
  Zap,
  Shield,
  Clock,
  BookOpen,
  Users,
  Calendar,
  Phone,
  ChevronRight,
  Star,
  Activity,
  BarChart3,
  PieChart,
  Filter,
  Search
} from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area, BarChart, Bar } from 'recharts';

// Mock data for risk assessment
const riskFactors = [
  { factor: 'Academic Performance', current: 78, historical: 85, weight: 0.25, impact: 'High' },
  { factor: 'Attendance Rate', current: 72, historical: 88, weight: 0.20, impact: 'High' },
  { factor: 'Behavioral Issues', current: 65, historical: 70, weight: 0.15, impact: 'Medium' },
  { factor: 'Family Engagement', current: 45, historical: 60, weight: 0.15, impact: 'High' },
  { factor: 'Peer Relationships', current: 58, historical: 65, weight: 0.10, impact: 'Medium' },
  { factor: 'Economic Indicators', current: 35, historical: 40, weight: 0.15, impact: 'Medium' },
];

const studentRiskProfiles = [
  {
    id: '1',
    name: 'Sarah Johnson',
    grade: '9th',
    riskScore: 85,
    trend: 'increasing',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face',
    riskFactors: {
      academic: 92,
      attendance: 68,
      behavioral: 45,
      social: 75,
      family: 30
    },
    alerts: [
      { type: 'Academic', message: 'Math grade dropped by 2 points', severity: 'high' },
      { type: 'Attendance', message: 'Missed 4 days this week', severity: 'high' },
      { type: 'Behavioral', message: 'Disruptive behavior reported', severity: 'medium' }
    ],
    interventions: ['Math tutoring', 'Family counseling'],
    lastUpdate: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Emma Davis',
    grade: '10th',
    riskScore: 68,
    trend: 'stable',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    riskFactors: {
      academic: 75,
      attendance: 82,
      behavioral: 65,
      social: 50,
      family: 60
    },
    alerts: [
      { type: 'Social', message: 'Isolation from peer groups', severity: 'medium' },
      { type: 'Academic', message: 'Science grade declining', severity: 'low' }
    ],
    interventions: ['Peer mentoring'],
    lastUpdate: '2024-01-15T09:15:00Z'
  },
  {
    id: '3',
    name: 'David Wilson',
    grade: '12th',
    riskScore: 92,
    trend: 'critical',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    riskFactors: {
      academic: 35,
      attendance: 25,
      behavioral: 85,
      social: 20,
      family: 15
    },
    alerts: [
      { type: 'Attendance', message: 'Chronic absenteeism - 15+ days missed', severity: 'critical' },
      { type: 'Academic', message: 'Failing 3 core subjects', severity: 'critical' },
      { type: 'Behavioral', message: 'Multiple disciplinary actions', severity: 'high' }
    ],
    interventions: ['Intensive counseling', 'Family support', 'Academic recovery plan'],
    lastUpdate: '2024-01-15T08:45:00Z'
  }
];

const aiInsights = [
  {
    title: 'Predictive Alert',
    type: 'warning',
    message: '12 students show early warning signs and may be at risk within the next 30 days',
    confidence: 89,
    action: 'Schedule preventive interventions'
  },
  {
    title: 'Pattern Detection',
    type: 'info',
    message: 'Students with low family engagement are 3.2x more likely to have attendance issues',
    confidence: 94,
    action: 'Implement family outreach program'
  },
  {
    title: 'Intervention Recommendation',
    type: 'success',
    message: 'Peer mentoring programs show 78% success rate for socially isolated students',
    confidence: 87,
    action: 'Expand peer mentoring program'
  }
];

const riskTrendData = [
  { month: 'Aug', lowRisk: 85, mediumRisk: 12, highRisk: 8 },
  { month: 'Sep', lowRisk: 82, mediumRisk: 15, highRisk: 12 },
  { month: 'Oct', lowRisk: 79, mediumRisk: 18, highRisk: 14 },
  { month: 'Nov', lowRisk: 76, mediumRisk: 20, highRisk: 16 },
  { month: 'Dec', lowRisk: 78, mediumRisk: 18, highRisk: 15 },
  { month: 'Jan', lowRisk: 80, mediumRisk: 16, highRisk: 13 },
];

export default function RiskAssessmentPage() {
  const [selectedStudent, setSelectedStudent] = useState<typeof studentRiskProfiles[0] | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');

  const filteredStudents = studentRiskProfiles.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = riskFilter === 'all' || 
      (riskFilter === 'high' && student.riskScore >= 70) ||
      (riskFilter === 'medium' && student.riskScore >= 40 && student.riskScore < 70) ||
      (riskFilter === 'low' && student.riskScore < 40);
    return matchesSearch && matchesRisk;
  });

  const getRiskColor = (score: number) => {
    if (score >= 80) return 'text-red-600 bg-red-100';
    if (score >= 60) return 'text-orange-600 bg-orange-100';
    if (score >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="w-4 h-4 text-red-500" />;
      case 'decreasing': return <TrendingDown className="w-4 h-4 text-green-500" />;
      case 'critical': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Activity className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">AI Risk Assessment</h1>
          <p className="text-secondary-600 mt-2">Advanced machine learning powered early warning system</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <button className="btn-outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh AI Model
          </button>
          <button className="btn-primary">
            <Zap className="w-4 h-4 mr-2" />
            Run Prediction
          </button>
        </div>
      </div>

      {/* AI Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {aiInsights.map((insight, index) => (
          <motion.div
            key={insight.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`card border-l-4 ${
              insight.type === 'warning' ? 'border-l-orange-500 bg-orange-50' :
              insight.type === 'success' ? 'border-l-green-500 bg-green-50' :
              'border-l-blue-500 bg-blue-50'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-primary-600" />
                <h3 className="font-semibold text-secondary-900">{insight.title}</h3>
              </div>
              <div className="bg-white px-2 py-1 rounded-full text-xs font-medium text-secondary-600">
                {insight.confidence}% confidence
              </div>
            </div>
            <p className="text-secondary-700 mb-4 text-sm leading-relaxed">{insight.message}</p>
            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
              {insight.action}
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Risk Distribution & Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Overall Risk Factors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <h3 className="text-xl font-bold text-secondary-900 mb-6">Risk Factor Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={riskFactors}>
              <PolarGrid gridType="polygon" stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="factor" tick={{ fill: '#64748b', fontSize: 11 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 10 }} />
              <Radar name="Current" dataKey="current" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} strokeWidth={2} />
              <Radar name="Historical" dataKey="historical" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} strokeWidth={2} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0', 
                  borderRadius: '12px'
                }} 
              />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Risk Trends Over Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <h3 className="text-xl font-bold text-secondary-900 mb-6">Risk Level Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={riskTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0', 
                  borderRadius: '12px'
                }} 
              />
              <Area type="monotone" dataKey="highRisk" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.8} />
              <Area type="monotone" dataKey="mediumRisk" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.8} />
              <Area type="monotone" dataKey="lowRisk" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.8} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Student Risk Profiles */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h3 className="text-xl font-bold text-secondary-900 mb-4 sm:mb-0">High-Risk Students</h3>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary-400" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-9 w-64"
              />
            </div>
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
        </div>

        <div className="space-y-4">
          {filteredStudents.map((student, index) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 border border-secondary-200 rounded-xl hover:shadow-md transition-all duration-200 cursor-pointer"
              onClick={() => setSelectedStudent(student)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center ${
                      student.riskScore >= 80 ? 'bg-red-500' :
                      student.riskScore >= 60 ? 'bg-orange-500' : 'bg-yellow-500'
                    }`}>
                      <AlertTriangle className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-secondary-900">{student.name}</h4>
                    <p className="text-secondary-600">{student.grade} Grade</p>
                    <div className="flex items-center space-x-2 mt-1">
                      {getTrendIcon(student.trend)}
                      <span className="text-sm text-secondary-600 capitalize">{student.trend} risk</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(student.riskScore)}`}>
                    {student.riskScore}% Risk
                  </div>
                  <p className="text-xs text-secondary-500 mt-1">
                    Updated {new Date(student.lastUpdate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 lg:grid-cols-5 gap-3">
                {Object.entries(student.riskFactors).map(([factor, score]) => (
                  <div key={factor} className="text-center">
                    <div className={`w-full h-2 rounded-full bg-secondary-200 overflow-hidden`}>
                      <div 
                        className={`h-full rounded-full ${score >= 70 ? 'bg-red-500' : score >= 50 ? 'bg-orange-500' : 'bg-green-500'}`}
                        style={{ width: `${score}%` }}
                      />
                    </div>
                    <p className="text-xs text-secondary-600 mt-1 capitalize">{factor}</p>
                    <p className="text-xs font-medium text-secondary-900">{score}%</p>
                  </div>
                ))}
              </div>

              {student.alerts.length > 0 && (
                <div className="mt-4 flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                  <p className="text-sm text-secondary-700">
                    {student.alerts.length} active alert{student.alerts.length > 1 ? 's' : ''} - 
                    <span className="font-medium ml-1">{student.alerts[0].message}</span>
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

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
              className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={selectedStudent.avatar}
                    alt={selectedStudent.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-2xl font-bold text-secondary-900">{selectedStudent.name}</h2>
                    <p className="text-secondary-600">{selectedStudent.grade} Grade Risk Profile</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="p-2 hover:bg-secondary-100 rounded-lg transition-colors"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Risk Radar Chart */}
                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-4">Risk Factor Breakdown</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={Object.entries(selectedStudent.riskFactors).map(([key, value]) => ({
                      factor: key.charAt(0).toUpperCase() + key.slice(1),
                      score: value
                    }))}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="factor" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar dataKey="score" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                {/* Alerts and Actions */}
                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-4">Active Alerts</h3>
                  <div className="space-y-3">
                    {selectedStudent.alerts.map((alert, index) => (
                      <div key={index} className={`p-4 rounded-lg border-l-4 ${
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
                        <p className="text-sm text-secondary-700">{alert.message}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <h4 className="font-medium text-secondary-900 mb-3">Active Interventions</h4>
                    <div className="space-y-2">
                      {selectedStudent.interventions.map((intervention, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-secondary-700">{intervention}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 mt-8 pt-6 border-t border-secondary-200">
                <button className="btn-outline">
                  <Target className="w-4 h-4 mr-2" />
                  Create Intervention
                </button>
                <button className="btn-primary">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Guardian
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}