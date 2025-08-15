'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  Eye, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  TrendingUp,
  Users,
  BookOpen,
  Heart,
  MessageCircle,
  Calendar,
  User,
  Star,
  Award,
  Activity,
  Zap,
  X
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

// Mock data for interventions
const mockInterventions = [
  {
    id: '1',
    title: 'Academic Recovery Program',
    type: 'academic',
    description: 'Intensive tutoring and study skills development for students with declining grades',
    students: ['Sarah Johnson', 'Michael Brown', 'Jessica Lee'],
    assignedTo: 'Ms. Anderson',
    startDate: '2024-01-08',
    endDate: '2024-03-08',
    status: 'active',
    progress: 65,
    effectiveness: 'high',
    budget: 5000,
    spent: 2800,
    outcomes: {
      improved: 8,
      noChange: 2,
      declined: 1
    },
    activities: [
      { date: '2024-01-15', activity: 'Initial assessment completed for all students' },
      { date: '2024-01-12', activity: 'Weekly tutoring sessions started' },
      { date: '2024-01-08', activity: 'Program initiated' }
    ]
  },
  {
    id: '2',
    title: 'Peer Mentoring Initiative',
    type: 'social',
    description: 'Pairing at-risk students with high-achieving peers for social and academic support',
    students: ['Emma Davis', 'Alex Chen', 'Marcus Williams'],
    assignedTo: 'Mr. Brown',
    startDate: '2024-01-10',
    endDate: '2024-04-10',
    status: 'active',
    progress: 45,
    effectiveness: 'medium',
    budget: 3000,
    spent: 1200,
    outcomes: {
      improved: 5,
      noChange: 3,
      declined: 0
    },
    activities: [
      { date: '2024-01-14', activity: 'Monthly mentor-mentee meeting held' },
      { date: '2024-01-10', activity: 'Mentor training completed' }
    ]
  },
  {
    id: '3',
    title: 'Family Engagement Workshop',
    type: 'counseling',
    description: 'Monthly workshops for parents to improve communication and support at home',
    students: ['David Wilson', 'Lisa Garcia', 'Tom Johnson'],
    assignedTo: 'Dr. Smith',
    startDate: '2023-12-01',
    endDate: '2024-05-01',
    status: 'active',
    progress: 78,
    effectiveness: 'high',
    budget: 4500,
    spent: 3200,
    outcomes: {
      improved: 12,
      noChange: 4,
      declined: 2
    },
    activities: [
      { date: '2024-01-13', activity: 'January workshop: "Supporting Your Teen" - 18 families attended' },
      { date: '2024-01-06', activity: 'Follow-up calls with families completed' }
    ]
  },
  {
    id: '4',
    title: 'Attendance Incentive Program',
    type: 'behavioral',
    description: 'Reward system to improve student attendance rates through positive reinforcement',
    students: ['Sophia Martinez', 'James Rodriguez'],
    assignedTo: 'Ms. Davis',
    startDate: '2024-01-05',
    endDate: '2024-06-05',
    status: 'planning',
    progress: 20,
    effectiveness: 'pending',
    budget: 2500,
    spent: 300,
    outcomes: {
      improved: 0,
      noChange: 0,
      declined: 0
    },
    activities: [
      { date: '2024-01-05', activity: 'Incentive structure designed and approved' }
    ]
  }
];

const interventionTypes = [
  { type: 'academic', label: 'Academic Support', icon: BookOpen, color: 'bg-blue-500' },
  { type: 'behavioral', label: 'Behavioral', icon: Activity, color: 'bg-orange-500' },
  { type: 'social', label: 'Social Support', icon: Users, color: 'bg-green-500' },
  { type: 'counseling', label: 'Counseling', icon: Heart, color: 'bg-purple-500' }
];

const effectivenessData = [
  { month: 'Oct', academic: 78, behavioral: 65, social: 82, counseling: 89 },
  { month: 'Nov', academic: 85, behavioral: 71, social: 88, counseling: 92 },
  { month: 'Dec', academic: 82, behavioral: 68, social: 85, counseling: 87 },
  { month: 'Jan', academic: 89, behavioral: 74, social: 91, counseling: 94 },
];

const budgetData = [
  { category: 'Academic Programs', allocated: 25000, spent: 18500 },
  { category: 'Counseling Services', allocated: 20000, spent: 16200 },
  { category: 'Social Programs', allocated: 15000, spent: 11800 },
  { category: 'Behavioral Support', allocated: 12000, spent: 8900 },
];

const outcomeDistribution = [
  { name: 'Significantly Improved', value: 45, color: '#10b981' },
  { name: 'Moderately Improved', value: 32, color: '#3b82f6' },
  { name: 'No Change', value: 18, color: '#f59e0b' },
  { name: 'Declined', value: 5, color: '#ef4444' },
];

export default function InterventionsPage() {
  const [interventions] = useState(mockInterventions);
  const [selectedIntervention, setSelectedIntervention] = useState<typeof mockInterventions[0] | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredInterventions = interventions.filter(intervention => {
    const matchesSearch = intervention.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         intervention.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || intervention.status === statusFilter;
    const matchesType = typeFilter === 'all' || intervention.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEffectivenessColor = (effectiveness: string) => {
    switch (effectiveness) {
      case 'high': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getTypeIcon = (type: string) => {
    const typeInfo = interventionTypes.find(t => t.type === type);
    return typeInfo ? typeInfo.icon : Target;
  };

  const getTypeColor = (type: string) => {
    const typeInfo = interventionTypes.find(t => t.type === type);
    return typeInfo ? typeInfo.color : 'bg-gray-500';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">Intervention Management</h1>
          <p className="text-secondary-600 mt-2">Design, implement, and track intervention strategies</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="btn-primary mt-4 lg:mt-0"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Intervention
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Active Interventions', value: '12', icon: Target, color: 'from-blue-500 to-blue-600' },
          { title: 'Students Supported', value: '89', icon: Users, color: 'from-green-500 to-green-600' },
          { title: 'Success Rate', value: '87%', icon: TrendingUp, color: 'from-purple-500 to-purple-600' },
          { title: 'Total Budget', value: '$45K', icon: Award, color: 'from-orange-500 to-orange-600' },
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
              </div>
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Effectiveness Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <h3 className="text-xl font-bold text-secondary-900 mb-6">Intervention Effectiveness Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={effectivenessData}>
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
              <Line type="monotone" dataKey="academic" stroke="#3b82f6" strokeWidth={2} name="Academic" />
              <Line type="monotone" dataKey="behavioral" stroke="#f59e0b" strokeWidth={2} name="Behavioral" />
              <Line type="monotone" dataKey="social" stroke="#10b981" strokeWidth={2} name="Social" />
              <Line type="monotone" dataKey="counseling" stroke="#8b5cf6" strokeWidth={2} name="Counseling" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Budget Allocation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card"
        >
          <h3 className="text-xl font-bold text-secondary-900 mb-6">Budget Utilization</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={budgetData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0', 
                  borderRadius: '12px'
                }} 
              />
              <Bar dataKey="allocated" fill="#e2e8f0" name="Allocated" radius={[4, 4, 0, 0]} />
              <Bar dataKey="spent" fill="#3b82f6" name="Spent" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Interventions List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="card"
      >
        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
            <input
              type="text"
              placeholder="Search interventions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input w-40"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="planning">Planning</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="input w-40"
          >
            <option value="all">All Types</option>
            {interventionTypes.map(type => (
              <option key={type.type} value={type.type}>{type.label}</option>
            ))}
          </select>
        </div>

        {/* Interventions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredInterventions.map((intervention, index) => {
            const Icon = getTypeIcon(intervention.type);
            return (
              <motion.div
                key={intervention.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-secondary-200 rounded-xl p-6 hover:shadow-md transition-all duration-200 cursor-pointer"
                onClick={() => setSelectedIntervention(intervention)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 ${getTypeColor(intervention.type)} rounded-xl flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-secondary-900">{intervention.title}</h3>
                      <p className="text-sm text-secondary-600 capitalize">{intervention.type} intervention</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(intervention.status)}`}>
                    {intervention.status}
                  </span>
                </div>

                <p className="text-secondary-700 text-sm mb-4 line-clamp-2">{intervention.description}</p>

                <div className="space-y-3">
                  {/* Progress Bar */}
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-secondary-600">Progress</span>
                      <span className="font-medium text-secondary-900">{intervention.progress}%</span>
                    </div>
                    <div className="w-full bg-secondary-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${intervention.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-secondary-600">Students</p>
                      <p className="font-semibold text-secondary-900">{intervention.students.length}</p>
                    </div>
                    <div>
                      <p className="text-secondary-600">Effectiveness</p>
                      <p className={`font-semibold capitalize ${getEffectivenessColor(intervention.effectiveness)}`}>
                        {intervention.effectiveness}
                      </p>
                    </div>
                    <div>
                      <p className="text-secondary-600">Budget</p>
                      <p className="font-semibold text-secondary-900">
                        ${intervention.spent.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Assigned To */}
                  <div className="flex items-center justify-between pt-3 border-t border-secondary-100">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-secondary-400" />
                      <span className="text-sm text-secondary-600">{intervention.assignedTo}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-secondary-400" />
                      <span className="text-sm text-secondary-600">
                        {new Date(intervention.startDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Intervention Detail Modal */}
      <AnimatePresence>
        {selectedIntervention && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedIntervention(null)}
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
                  <div className={`w-12 h-12 ${getTypeColor(selectedIntervention.type)} rounded-xl flex items-center justify-center`}>
                    {(() => {
                      const Icon = getTypeIcon(selectedIntervention.type);
                      return <Icon className="w-6 h-6 text-white" />;
                    })()}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-secondary-900">{selectedIntervention.title}</h2>
                    <p className="text-secondary-600 capitalize">{selectedIntervention.type} Intervention</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedIntervention.status)}`}>
                    {selectedIntervention.status}
                  </span>
                  <button
                    onClick={() => setSelectedIntervention(null)}
                    className="p-2 hover:bg-secondary-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-3">Description</h3>
                    <p className="text-secondary-700 leading-relaxed">{selectedIntervention.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-3">Participating Students</h3>
                    <div className="space-y-2">
                      {selectedIntervention.students.map((student, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-secondary-50 rounded-lg">
                          <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-medium text-secondary-900">{student}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-3">Recent Activities</h3>
                    <div className="space-y-3">
                      {selectedIntervention.activities.map((activity, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 border-l-4 border-l-primary-500 bg-primary-50">
                          <Calendar className="w-4 h-4 text-primary-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-secondary-900">{activity.activity}</p>
                            <p className="text-sm text-secondary-600">
                              {new Date(activity.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                  <div className="bg-secondary-50 rounded-xl p-4">
                    <h4 className="font-semibold text-secondary-900 mb-3">Key Metrics</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-secondary-600">Progress</span>
                        <span className="font-semibold text-secondary-900">{selectedIntervention.progress}%</span>
                      </div>
                      <div className="w-full bg-secondary-200 rounded-full h-2">
                        <div 
                          className="bg-primary-600 h-2 rounded-full" 
                          style={{ width: `${selectedIntervention.progress}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-secondary-600">Effectiveness</span>
                        <span className={`font-semibold capitalize ${getEffectivenessColor(selectedIntervention.effectiveness)}`}>
                          {selectedIntervention.effectiveness}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-secondary-600">Budget Used</span>
                        <span className="font-semibold text-secondary-900">
                          ${selectedIntervention.spent.toLocaleString()} / ${selectedIntervention.budget.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-secondary-50 rounded-xl p-4">
                    <h4 className="font-semibold text-secondary-900 mb-3">Outcomes</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-secondary-600">Improved</span>
                        <span className="font-semibold text-green-600">{selectedIntervention.outcomes.improved}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-secondary-600">No Change</span>
                        <span className="font-semibold text-yellow-600">{selectedIntervention.outcomes.noChange}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-secondary-600">Declined</span>
                        <span className="font-semibold text-red-600">{selectedIntervention.outcomes.declined}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-secondary-50 rounded-xl p-4">
                    <h4 className="font-semibold text-secondary-900 mb-3">Timeline</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-secondary-600">Start Date</span>
                        <span className="font-semibold text-secondary-900">
                          {new Date(selectedIntervention.startDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-secondary-600">End Date</span>
                        <span className="font-semibold text-secondary-900">
                          {new Date(selectedIntervention.endDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-secondary-600">Assigned To</span>
                        <span className="font-semibold text-secondary-900">{selectedIntervention.assignedTo}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 mt-8 pt-6 border-t border-secondary-200">
                <button className="btn-outline">
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit
                </button>
                <button className="btn-primary">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Add Note
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}