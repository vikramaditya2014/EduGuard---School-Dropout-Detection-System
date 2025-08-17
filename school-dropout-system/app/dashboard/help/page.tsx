'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HelpCircle, 
  Search, 
  Book, 
  Video, 
  MessageCircle, 
  Phone, 
  Mail, 
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Star,
  ThumbsUp,
  ThumbsDown,
  Download,
  Play,
  FileText,
  Users,
  Settings,
  BarChart3,
  AlertTriangle,
  Target,
  Lightbulb,
  Clock,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

// FAQ Data
const faqData = [
  {
    category: 'Getting Started',
    icon: Book,
    questions: [
      {
        id: 1,
        question: 'How do I add a new student to the system?',
        answer: 'To add a new student, navigate to the Students page and click the "Add Student" button. Fill in the required information including personal details, academic information, and parent/guardian contacts. The system will automatically generate a risk assessment profile.',
        helpful: 0,
        tags: ['students', 'setup']
      },
      {
        id: 2,
        question: 'What information is required for risk assessment?',
        answer: 'The risk assessment algorithm considers multiple factors including attendance rates, academic performance (GPA), behavioral incidents, family background, socioeconomic indicators, and engagement levels. The more complete the data, the more accurate the risk prediction.',
        helpful: 0,
        tags: ['risk-assessment', 'data']
      },
      {
        id: 3,
        question: 'How often is the risk score updated?',
        answer: 'Risk scores are updated in real-time as new data is entered into the system. Major updates occur daily with attendance data, weekly with academic performance, and immediately when behavioral incidents are reported.',
        helpful: 0,
        tags: ['risk-assessment', 'updates']
      }
    ]
  },
  {
    category: 'Risk Assessment',
    icon: AlertTriangle,
    questions: [
      {
        id: 4,
        question: 'How is the risk score calculated?',
        answer: 'The risk score is calculated using a machine learning algorithm that analyzes multiple data points including attendance patterns, academic performance trends, behavioral indicators, and demographic factors. Scores range from 0-100, with higher scores indicating greater dropout risk.',
        helpful: 0,
        tags: ['algorithm', 'calculation']
      },
      {
        id: 5,
        question: 'What do the different risk levels mean?',
        answer: 'Low Risk (0-30): Students performing well with minimal concerns. Medium Risk (31-70): Students showing some warning signs requiring monitoring. High Risk (71-100): Students at significant risk requiring immediate intervention.',
        helpful: 0,
        tags: ['risk-levels', 'interpretation']
      },
      {
        id: 6,
        question: 'Can I customize the risk assessment criteria?',
        answer: 'Yes, administrators can adjust the weighting of different factors in the risk assessment algorithm through the Settings page. You can emphasize certain indicators based on your school\'s specific needs and historical data.',
        helpful: 0,
        tags: ['customization', 'settings']
      }
    ]
  },
  {
    category: 'Interventions',
    icon: Target,
    questions: [
      {
        id: 7,
        question: 'How do I create an intervention program?',
        answer: 'Go to the Interventions page and click "Create New Intervention". Define the program goals, target student criteria, activities, timeline, and success metrics. You can assign staff members and track progress through the dashboard.',
        helpful: 0,
        tags: ['interventions', 'creation']
      },
      {
        id: 8,
        question: 'How do I track intervention effectiveness?',
        answer: 'The system automatically tracks key metrics like attendance improvement, grade changes, and behavioral incident reduction. You can view detailed reports on the Analytics page and adjust interventions based on performance data.',
        helpful: 0,
        tags: ['tracking', 'effectiveness']
      }
    ]
  },
  {
    category: 'Analytics & Reports',
    icon: BarChart3,
    questions: [
      {
        id: 9,
        question: 'What types of reports can I generate?',
        answer: 'You can generate various reports including risk assessment summaries, intervention effectiveness reports, attendance trends, academic performance analytics, and custom reports based on specific criteria.',
        helpful: 0,
        tags: ['reports', 'analytics']
      },
      {
        id: 10,
        question: 'How do I export data from the system?',
        answer: 'Most pages have an "Export" button that allows you to download data in CSV or PDF format. You can also schedule automated reports to be sent via email on a regular basis.',
        helpful: 0,
        tags: ['export', 'data']
      }
    ]
  }
];

// Tutorial Videos
const tutorials = [
  {
    id: 1,
    title: 'Getting Started with EduGuard',
    description: 'Learn the basics of navigating the dashboard and key features',
    duration: '5:30',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop',
    category: 'Basics'
  },
  {
    id: 2,
    title: 'Understanding Risk Assessment',
    description: 'Deep dive into how risk scores are calculated and interpreted',
    duration: '8:45',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
    category: 'Risk Assessment'
  },
  {
    id: 3,
    title: 'Creating Effective Interventions',
    description: 'Best practices for designing and implementing intervention programs',
    duration: '12:20',
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=200&fit=crop',
    category: 'Interventions'
  },
  {
    id: 4,
    title: 'Analytics and Reporting',
    description: 'How to generate insights and create meaningful reports',
    duration: '7:15',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
    category: 'Analytics'
  }
];

// Quick Links
const quickLinks = [
  { title: 'User Manual', icon: FileText, description: 'Complete documentation', link: '#' },
  { title: 'Video Tutorials', icon: Video, description: 'Step-by-step guides', link: '#' },
  { title: 'Best Practices', icon: Lightbulb, description: 'Tips and recommendations', link: '#' },
  { title: 'API Documentation', icon: Settings, description: 'For developers', link: '#' },
  { title: 'Release Notes', icon: Clock, description: 'Latest updates', link: '#' },
  { title: 'Community Forum', icon: Users, description: 'Connect with other users', link: '#' }
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'faq' | 'tutorials' | 'contact'>('faq');

  const filteredFAQs = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      (selectedCategory === 'all' || category.category.toLowerCase().includes(selectedCategory.toLowerCase())) &&
      (q.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
       q.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
       q.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
    )
  })).filter(category => category.questions.length > 0);

  const handleFAQToggle = (id: number) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const handleHelpful = (questionId: number, helpful: boolean) => {
    // In a real app, this would update the database
    console.log(`Question ${questionId} marked as ${helpful ? 'helpful' : 'not helpful'}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">Help & Support</h1>
          <p className="text-secondary-600 mt-2">
            Find answers to common questions and get the help you need
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <button className="btn-outline">
            <Download className="w-4 h-4 mr-2" />
            User Manual
          </button>
          <button className="btn-primary">
            <MessageCircle className="w-4 h-4 mr-2" />
            Contact Support
          </button>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickLinks.map((link, index) => (
          <motion.a
            key={link.title}
            href={link.link}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card hover:shadow-lg transition-all duration-200 cursor-pointer group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                <link.icon className="w-5 h-5 text-primary-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-secondary-900 group-hover:text-primary-600 transition-colors">
                  {link.title}
                </h3>
                <p className="text-sm text-secondary-600">{link.description}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-secondary-400 group-hover:text-primary-600 transition-colors" />
            </div>
          </motion.a>
        ))}
      </div>

      {/* Search */}
      <div className="card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
          <input
            type="text"
            placeholder="Search for help articles, tutorials, or FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input pl-10 text-lg"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="card">
        <div className="flex space-x-1 bg-secondary-100 rounded-lg p-1 mb-6">
          {[
            { key: 'faq', label: 'FAQ', icon: HelpCircle },
            { key: 'tutorials', label: 'Tutorials', icon: Video },
            { key: 'contact', label: 'Contact', icon: MessageCircle }
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

        {/* FAQ Tab */}
        {activeTab === 'faq' && (
          <div className="space-y-6">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-primary-100 text-primary-800'
                    : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
                }`}
              >
                All Categories
              </button>
              {faqData.map((category) => (
                <button
                  key={category.category}
                  onClick={() => setSelectedCategory(category.category)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.category
                      ? 'bg-primary-100 text-primary-800'
                      : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
                  }`}
                >
                  {category.category}
                </button>
              ))}
            </div>

            {/* FAQ List */}
            <div className="space-y-4">
              {filteredFAQs.map((category) => (
                <div key={category.category}>
                  <div className="flex items-center space-x-2 mb-3">
                    <category.icon className="w-5 h-5 text-primary-600" />
                    <h3 className="text-lg font-semibold text-secondary-900">{category.category}</h3>
                  </div>
                  <div className="space-y-2">
                    {category.questions.map((faq) => (
                      <div key={faq.id} className="border border-secondary-200 rounded-lg">
                        <button
                          onClick={() => handleFAQToggle(faq.id)}
                          className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary-50 transition-colors"
                        >
                          <span className="font-medium text-secondary-900">{faq.question}</span>
                          {expandedFAQ === faq.id ? (
                            <ChevronDown className="w-5 h-5 text-secondary-400" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-secondary-400" />
                          )}
                        </button>
                        <AnimatePresence>
                          {expandedFAQ === faq.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="border-t border-secondary-200"
                            >
                              <div className="p-4">
                                <p className="text-secondary-700 mb-4">{faq.answer}</p>
                                <div className="flex items-center justify-between">
                                  <div className="flex flex-wrap gap-1">
                                    {faq.tags.map((tag) => (
                                      <span
                                        key={tag}
                                        className="px-2 py-1 bg-secondary-100 text-secondary-600 text-xs rounded-full"
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-sm text-secondary-600">Was this helpful?</span>
                                    <button
                                      onClick={() => handleHelpful(faq.id, true)}
                                      className="p-1 hover:bg-green-100 rounded transition-colors"
                                    >
                                      <ThumbsUp className="w-4 h-4 text-green-600" />
                                    </button>
                                    <button
                                      onClick={() => handleHelpful(faq.id, false)}
                                      className="p-1 hover:bg-red-100 rounded transition-colors"
                                    >
                                      <ThumbsDown className="w-4 h-4 text-red-600" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tutorials Tab */}
        {activeTab === 'tutorials' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tutorials.map((tutorial, index) => (
              <motion.div
                key={tutorial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-secondary-50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer group"
              >
                <div className="relative">
                  <img
                    src={tutorial.thumbnail}
                    alt={tutorial.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                      <Play className="w-8 h-8 text-primary-600 ml-1" />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                    {tutorial.duration}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-full">
                      {tutorial.category}
                    </span>
                  </div>
                  <h3 className="font-semibold text-secondary-900 mb-2">{tutorial.title}</h3>
                  <p className="text-sm text-secondary-600">{tutorial.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === 'contact' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-secondary-900">Get in Touch</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 bg-secondary-50 rounded-lg">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-secondary-900">Email Support</h4>
                    <p className="text-sm text-secondary-600">support@eduguard.com</p>
                    <p className="text-xs text-secondary-500">Response within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-secondary-50 rounded-lg">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-secondary-900">Phone Support</h4>
                    <p className="text-sm text-secondary-600">1-800-EDU-GUARD</p>
                    <p className="text-xs text-secondary-500">Mon-Fri, 9AM-5PM EST</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-secondary-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-secondary-900">Live Chat</h4>
                    <p className="text-sm text-secondary-600">Available 24/7</p>
                    <p className="text-xs text-secondary-500">Click the chat icon in bottom right</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-6">Send us a Message</h3>
              <form className="space-y-4">
                <div>
                  <label className="label">Subject</label>
                  <select className="input">
                    <option>General Question</option>
                    <option>Technical Issue</option>
                    <option>Feature Request</option>
                    <option>Account Problem</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="label">Message</label>
                  <textarea
                    rows={4}
                    className="input"
                    placeholder="Describe your question or issue..."
                  />
                </div>
                <button type="submit" className="btn-primary w-full">
                  Send Message
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}