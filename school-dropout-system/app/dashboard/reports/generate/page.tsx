'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter, 
  Users, 
  BarChart3, 
  TrendingUp, 
  AlertTriangle,
  Target,
  Clock,
  Mail,
  Settings,
  Eye,
  Save,
  ArrowLeft,
  CheckCircle,
  X,
  Plus,
  Trash2,
  Copy,
  Share,
  Printer
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

// Report templates
const reportTemplates = [
  {
    id: 'student-risk',
    name: 'Student Risk Assessment Report',
    description: 'Comprehensive analysis of student risk scores and factors',
    icon: AlertTriangle,
    color: 'from-red-500 to-red-600',
    estimatedTime: '2-3 minutes',
    sections: ['Risk Distribution', 'High-Risk Students', 'Trend Analysis', 'Recommendations']
  },
  {
    id: 'attendance-analysis',
    name: 'Attendance Analysis Report',
    description: 'Detailed attendance patterns and trends',
    icon: Clock,
    color: 'from-blue-500 to-blue-600',
    estimatedTime: '1-2 minutes',
    sections: ['Attendance Rates', 'Chronic Absenteeism', 'Grade-wise Analysis', 'Monthly Trends']
  },
  {
    id: 'intervention-effectiveness',
    name: 'Intervention Effectiveness Report',
    description: 'Analysis of intervention programs and their outcomes',
    icon: Target,
    color: 'from-green-500 to-green-600',
    estimatedTime: '3-4 minutes',
    sections: ['Program Overview', 'Success Metrics', 'Student Outcomes', 'ROI Analysis']
  },
  {
    id: 'academic-performance',
    name: 'Academic Performance Report',
    description: 'Student academic achievements and grade trends',
    icon: BarChart3,
    color: 'from-purple-500 to-purple-600',
    estimatedTime: '2-3 minutes',
    sections: ['GPA Trends', 'Subject Performance', 'Grade Distribution', 'Improvement Areas']
  },
  {
    id: 'comprehensive',
    name: 'Comprehensive School Report',
    description: 'Complete overview of all metrics and indicators',
    icon: FileText,
    color: 'from-gray-500 to-gray-600',
    estimatedTime: '5-7 minutes',
    sections: ['Executive Summary', 'Risk Analysis', 'Academic Performance', 'Interventions', 'Recommendations']
  },
  {
    id: 'custom',
    name: 'Custom Report',
    description: 'Build your own report with selected metrics',
    icon: Settings,
    color: 'from-teal-500 to-teal-600',
    estimatedTime: 'Variable',
    sections: ['Customizable sections based on selection']
  }
];

// Date range presets
const dateRanges = [
  { value: 'last-week', label: 'Last Week' },
  { value: 'last-month', label: 'Last Month' },
  { value: 'last-quarter', label: 'Last Quarter' },
  { value: 'last-semester', label: 'Last Semester' },
  { value: 'current-year', label: 'Current Academic Year' },
  { value: 'custom', label: 'Custom Range' }
];

// Filter options
const filterOptions = {
  grades: ['9th', '10th', '11th', '12th'],
  riskLevels: ['Low Risk', 'Medium Risk', 'High Risk'],
  programs: ['Math Tutoring', 'Counseling', 'Mentoring', 'Family Support'],
  demographics: ['All Students', 'Free/Reduced Lunch', 'English Learners', 'Special Education']
};

export default function GenerateReportPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [reportConfig, setReportConfig] = useState({
    title: '',
    description: '',
    dateRange: 'last-month',
    customStartDate: '',
    customEndDate: '',
    filters: {
      grades: [] as string[],
      riskLevels: [] as string[],
      programs: [] as string[],
      demographics: 'All Students'
    },
    format: 'pdf',
    includeCharts: true,
    includeRawData: false,
    schedule: {
      enabled: false,
      frequency: 'weekly',
      day: 'monday',
      time: '09:00',
      recipients: [] as string[]
    }
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const selectedTemplateData = reportTemplates.find(t => t.id === selectedTemplate);

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = reportTemplates.find(t => t.id === templateId);
    if (template) {
      setReportConfig(prev => ({
        ...prev,
        title: template.name,
        description: template.description
      }));
    }
    setCurrentStep(2);
  };

  const handleFilterChange = (category: string, value: string) => {
    if (category === 'demographics') {
      setReportConfig(prev => ({
        ...prev,
        filters: { ...prev.filters, demographics: value }
      }));
    } else {
      setReportConfig(prev => ({
        ...prev,
        filters: {
          ...prev.filters,
          [category]: prev.filters[category as keyof typeof prev.filters].includes(value)
            ? (prev.filters[category as keyof typeof prev.filters] as string[]).filter(item => item !== value)
            : [...(prev.filters[category as keyof typeof prev.filters] as string[]), value]
        }
      }));
    }
  };

  const handleGenerateReport = async () => {
    if (!selectedTemplate) {
      toast.error('Please select a report template');
      return;
    }

    setIsGenerating(true);
    try {
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast.success('Report generated successfully!');
      // In a real app, this would trigger a download or redirect to the report
    } catch (error) {
      toast.error('Failed to generate report');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleScheduleReport = () => {
    setShowScheduleModal(true);
  };

  const saveSchedule = () => {
    toast.success('Report scheduled successfully!');
    setShowScheduleModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/dashboard/analytics"
            className="p-2 hover:bg-secondary-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-secondary-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">Generate Report</h1>
            <p className="text-secondary-600 mt-1">
              Create comprehensive reports and analytics
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {selectedTemplate && (
            <>
              <button
                onClick={handleScheduleReport}
                className="btn-outline"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule
              </button>
              <button
                onClick={handleGenerateReport}
                disabled={isGenerating}
                className="btn-primary"
              >
                {isGenerating ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : (
                  <Download className="w-4 h-4 mr-2" />
                )}
                Generate Report
              </button>
            </>
          )}
        </div>
      </div>

      {/* Progress Steps */}
      <div className="card">
        <div className="flex items-center justify-between">
          {[
            { step: 1, title: 'Select Template', icon: FileText },
            { step: 2, title: 'Configure Options', icon: Settings },
            { step: 3, title: 'Generate Report', icon: Download }
          ].map((item, index) => (
            <div key={item.step} className="flex items-center">
              <div className={`flex items-center space-x-3 ${
                currentStep >= item.step ? 'text-primary-600' : 'text-secondary-400'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= item.step 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-secondary-200 text-secondary-400'
                }`}>
                  {currentStep > item.step ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <item.icon className="w-4 h-4" />
                  )}
                </div>
                <span className="font-medium">{item.title}</span>
              </div>
              {index < 2 && (
                <div className={`w-16 h-0.5 mx-4 ${
                  currentStep > item.step ? 'bg-primary-600' : 'bg-secondary-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Template Selection */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">Choose Report Template</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reportTemplates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleTemplateSelect(template.id)}
                  className="p-6 border border-secondary-200 rounded-xl hover:shadow-lg transition-all duration-200 cursor-pointer group hover:border-primary-300"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${template.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                      <template.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-secondary-900 group-hover:text-primary-600 transition-colors">
                        {template.name}
                      </h4>
                      <p className="text-sm text-secondary-500">{template.estimatedTime}</p>
                    </div>
                  </div>
                  <p className="text-sm text-secondary-600 mb-4">{template.description}</p>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-secondary-700">Includes:</p>
                    {template.sections.slice(0, 3).map((section, idx) => (
                      <p key={idx} className="text-xs text-secondary-500">• {section}</p>
                    ))}
                    {template.sections.length > 3 && (
                      <p className="text-xs text-secondary-500">• +{template.sections.length - 3} more sections</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Configuration */}
      {currentStep === 2 && selectedTemplateData && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Report Details */}
            <div className="card">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">Report Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="label">Report Title</label>
                  <input
                    type="text"
                    value={reportConfig.title}
                    onChange={(e) => setReportConfig(prev => ({ ...prev, title: e.target.value }))}
                    className="input"
                    placeholder="Enter report title..."
                  />
                </div>
                <div>
                  <label className="label">Description (Optional)</label>
                  <textarea
                    value={reportConfig.description}
                    onChange={(e) => setReportConfig(prev => ({ ...prev, description: e.target.value }))}
                    className="input"
                    rows={3}
                    placeholder="Add a description for this report..."
                  />
                </div>
              </div>
            </div>

            {/* Date Range */}
            <div className="card">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">Date Range</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {dateRanges.map(range => (
                    <button
                      key={range.value}
                      onClick={() => setReportConfig(prev => ({ ...prev, dateRange: range.value }))}
                      className={`p-3 text-sm font-medium rounded-lg border transition-colors ${
                        reportConfig.dateRange === range.value
                          ? 'border-primary-300 bg-primary-50 text-primary-700'
                          : 'border-secondary-200 hover:border-secondary-300 text-secondary-700'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>

                {reportConfig.dateRange === 'custom' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="label">Start Date</label>
                      <input
                        type="date"
                        value={reportConfig.customStartDate}
                        onChange={(e) => setReportConfig(prev => ({ ...prev, customStartDate: e.target.value }))}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="label">End Date</label>
                      <input
                        type="date"
                        value={reportConfig.customEndDate}
                        onChange={(e) => setReportConfig(prev => ({ ...prev, customEndDate: e.target.value }))}
                        className="input"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Filters */}
            <div className="card">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">Filters</h3>
              <div className="space-y-6">
                {/* Grade Levels */}
                <div>
                  <h4 className="font-medium text-secondary-900 mb-2">Grade Levels</h4>
                  <div className="flex flex-wrap gap-2">
                    {filterOptions.grades.map(grade => (
                      <button
                        key={grade}
                        onClick={() => handleFilterChange('grades', grade)}
                        className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                          reportConfig.filters.grades.includes(grade)
                            ? 'border-primary-300 bg-primary-50 text-primary-700'
                            : 'border-secondary-200 hover:border-secondary-300 text-secondary-700'
                        }`}
                      >
                        {grade}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Risk Levels */}
                <div>
                  <h4 className="font-medium text-secondary-900 mb-2">Risk Levels</h4>
                  <div className="flex flex-wrap gap-2">
                    {filterOptions.riskLevels.map(level => (
                      <button
                        key={level}
                        onClick={() => handleFilterChange('riskLevels', level)}
                        className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                          reportConfig.filters.riskLevels.includes(level)
                            ? 'border-primary-300 bg-primary-50 text-primary-700'
                            : 'border-secondary-200 hover:border-secondary-300 text-secondary-700'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Demographics */}
                <div>
                  <h4 className="font-medium text-secondary-900 mb-2">Student Demographics</h4>
                  <select
                    value={reportConfig.filters.demographics}
                    onChange={(e) => handleFilterChange('demographics', e.target.value)}
                    className="input max-w-xs"
                  >
                    {filterOptions.demographics.map(demo => (
                      <option key={demo} value={demo}>{demo}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Output Options */}
            <div className="card">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">Output Options</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-secondary-900 mb-2">Format</h4>
                  <div className="flex space-x-4">
                    {[
                      { value: 'pdf', label: 'PDF Document' },
                      { value: 'excel', label: 'Excel Spreadsheet' },
                      { value: 'csv', label: 'CSV Data' }
                    ].map(format => (
                      <label key={format.value} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="format"
                          value={format.value}
                          checked={reportConfig.format === format.value}
                          onChange={(e) => setReportConfig(prev => ({ ...prev, format: e.target.value }))}
                          className="text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm font-medium text-secondary-700">{format.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={reportConfig.includeCharts}
                      onChange={(e) => setReportConfig(prev => ({ ...prev, includeCharts: e.target.checked }))}
                      className="text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm font-medium text-secondary-700">Include Charts and Visualizations</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={reportConfig.includeRawData}
                      onChange={(e) => setReportConfig(prev => ({ ...prev, includeRawData: e.target.checked }))}
                      className="text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm font-medium text-secondary-700">Include Raw Data Tables</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentStep(1)}
                className="btn-outline"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Templates
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                className="btn-primary"
              >
                Continue to Generate
                <Download className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>

          {/* Preview Sidebar */}
          <div className="space-y-6">
            {/* Selected Template */}
            <div className="card">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">Selected Template</h3>
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-10 h-10 bg-gradient-to-r ${selectedTemplateData.color} rounded-lg flex items-center justify-center`}>
                  <selectedTemplateData.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-secondary-900">{selectedTemplateData.name}</h4>
                  <p className="text-sm text-secondary-500">{selectedTemplateData.estimatedTime}</p>
                </div>
              </div>
              <div className="space-y-2">
                <h5 className="font-medium text-secondary-900">Report Sections:</h5>
                {selectedTemplateData.sections.map((section, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-secondary-700">{section}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Configuration Summary */}
            <div className="card">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">Configuration Summary</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-secondary-900">Date Range:</span>
                  <p className="text-secondary-600">
                    {dateRanges.find(r => r.value === reportConfig.dateRange)?.label}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-secondary-900">Format:</span>
                  <p className="text-secondary-600 capitalize">{reportConfig.format}</p>
                </div>
                <div>
                  <span className="font-medium text-secondary-900">Filters Applied:</span>
                  <div className="mt-1 space-y-1">
                    {reportConfig.filters.grades.length > 0 && (
                      <p className="text-secondary-600">Grades: {reportConfig.filters.grades.join(', ')}</p>
                    )}
                    {reportConfig.filters.riskLevels.length > 0 && (
                      <p className="text-secondary-600">Risk: {reportConfig.filters.riskLevels.join(', ')}</p>
                    )}
                    <p className="text-secondary-600">Demographics: {reportConfig.filters.demographics}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Estimated File Size */}
            <div className="card">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">Estimated Output</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-secondary-600">File Size:</span>
                  <span className="font-medium text-secondary-900">2.5 - 4.2 MB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600">Pages:</span>
                  <span className="font-medium text-secondary-900">15 - 25 pages</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600">Generation Time:</span>
                  <span className="font-medium text-secondary-900">{selectedTemplateData.estimatedTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Generate */}
      {currentStep === 3 && (
        <div className="card text-center">
          <div className="max-w-md mx-auto">
            {isGenerating ? (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                </div>
                <h3 className="text-xl font-semibold text-secondary-900">Generating Report...</h3>
                <p className="text-secondary-600">
                  Please wait while we compile your report. This may take a few minutes.
                </p>
                <div className="w-full bg-secondary-200 rounded-full h-2">
                  <div className="bg-primary-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-900">Ready to Generate</h3>
                <p className="text-secondary-600">
                  Your report configuration is complete. Click the button below to generate your report.
                </p>
                <div className="flex items-center justify-center space-x-3">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="btn-outline"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Configure
                  </button>
                  <button
                    onClick={handleGenerateReport}
                    className="btn-primary"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Generate Report
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-secondary-900">Schedule Report</h3>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="p-2 hover:bg-secondary-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-secondary-400" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="label">Frequency</label>
                <select className="input">
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Day</label>
                  <select className="input">
                    <option value="monday">Monday</option>
                    <option value="tuesday">Tuesday</option>
                    <option value="wednesday">Wednesday</option>
                    <option value="thursday">Thursday</option>
                    <option value="friday">Friday</option>
                  </select>
                </div>
                <div>
                  <label className="label">Time</label>
                  <input type="time" className="input" defaultValue="09:00" />
                </div>
              </div>
              <div>
                <label className="label">Email Recipients</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter email addresses separated by commas"
                />
              </div>
              <div className="flex items-center justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="btn-outline"
                >
                  Cancel
                </button>
                <button
                  onClick={saveSchedule}
                  className="btn-primary"
                >
                  Schedule Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}