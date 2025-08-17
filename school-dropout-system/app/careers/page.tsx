'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  GraduationCap, 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Users, 
  Heart,
  Code,
  Brain,
  Target,
  Zap,
  Award,
  Coffee,
  Wifi,
  Car,
  Shield,
  TrendingUp,
  BookOpen,
  MessageCircle
} from 'lucide-react';

const jobOpenings = [
  {
    id: 1,
    title: 'Senior Full Stack Developer',
    department: 'Engineering',
    location: 'Remote / San Francisco, CA',
    type: 'Full-time',
    experience: '5+ years',
    description: 'Join our engineering team to build scalable solutions for educational data analytics and student success prediction.',
    requirements: [
      'Experience with React, Node.js, and TypeScript',
      'Knowledge of machine learning concepts',
      'Experience with cloud platforms (AWS/GCP)',
      'Strong problem-solving skills'
    ],
    benefits: ['Competitive salary', 'Equity package', 'Health insurance', 'Remote work']
  },
  {
    id: 2,
    title: 'Data Scientist - Education Analytics',
    department: 'Data Science',
    location: 'Remote / Boston, MA',
    type: 'Full-time',
    experience: '3+ years',
    description: 'Develop and improve machine learning models for predicting student dropout risk and academic outcomes.',
    requirements: [
      'PhD/MS in Data Science, Statistics, or related field',
      'Experience with Python, R, and ML frameworks',
      'Knowledge of educational data mining',
      'Strong statistical analysis skills'
    ],
    benefits: ['Research budget', 'Conference attendance', 'Flexible hours', 'Health insurance']
  },
  {
    id: 3,
    title: 'Product Manager - EdTech',
    department: 'Product',
    location: 'Hybrid / New York, NY',
    type: 'Full-time',
    experience: '4+ years',
    description: 'Lead product strategy and development for our student success platform, working closely with educators and administrators.',
    requirements: [
      'Experience in EdTech or SaaS products',
      'Understanding of educational workflows',
      'Strong analytical and communication skills',
      'Experience with agile development'
    ],
    benefits: ['Stock options', 'Professional development', 'Flexible PTO', 'Health insurance']
  },
  {
    id: 4,
    title: 'UX/UI Designer',
    department: 'Design',
    location: 'Remote / Austin, TX',
    type: 'Full-time',
    experience: '3+ years',
    description: 'Design intuitive and accessible interfaces for educators, students, and administrators using our platform.',
    requirements: [
      'Portfolio demonstrating UX/UI design skills',
      'Experience with Figma and design systems',
      'Understanding of accessibility principles',
      'Experience in B2B or EdTech design'
    ],
    benefits: ['Design tool budget', 'Creative freedom', 'Remote work', 'Health insurance']
  },
  {
    id: 5,
    title: 'Customer Success Manager',
    department: 'Customer Success',
    location: 'Remote / Chicago, IL',
    type: 'Full-time',
    experience: '2+ years',
    description: 'Help schools and districts successfully implement and maximize value from our dropout prevention platform.',
    requirements: [
      'Experience in customer success or account management',
      'Background in education preferred',
      'Excellent communication skills',
      'Problem-solving mindset'
    ],
    benefits: ['Travel opportunities', 'Impact on education', 'Growth potential', 'Health insurance']
  },
  {
    id: 6,
    title: 'DevOps Engineer',
    department: 'Engineering',
    location: 'Remote / Seattle, WA',
    type: 'Full-time',
    experience: '4+ years',
    description: 'Build and maintain our cloud infrastructure, ensuring scalability, security, and reliability of our platform.',
    requirements: [
      'Experience with AWS/GCP and Kubernetes',
      'Knowledge of CI/CD pipelines',
      'Security and compliance experience',
      'Infrastructure as Code (Terraform/CloudFormation)'
    ],
    benefits: ['Learning budget', 'Certification support', 'Remote work', 'Health insurance']
  }
];

const benefits = [
  {
    icon: Heart,
    title: 'Health & Wellness',
    description: 'Comprehensive health, dental, and vision insurance for you and your family'
  },
  {
    icon: Clock,
    title: 'Flexible Schedule',
    description: 'Work-life balance with flexible hours and unlimited PTO policy'
  },
  {
    icon: Wifi,
    title: 'Remote First',
    description: 'Work from anywhere with occasional team gatherings and conferences'
  },
  {
    icon: TrendingUp,
    title: 'Growth & Learning',
    description: 'Professional development budget and opportunities for career advancement'
  },
  {
    icon: Award,
    title: 'Equity & Bonuses',
    description: 'Competitive salary with equity participation and performance bonuses'
  },
  {
    icon: Coffee,
    title: 'Great Perks',
    description: 'Home office setup, team retreats, and wellness stipends'
  }
];

const values = [
  {
    icon: Target,
    title: 'Impact First',
    description: 'Every decision we make is guided by our mission to help students succeed'
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'We believe diverse perspectives and teamwork drive the best outcomes'
  },
  {
    icon: Brain,
    title: 'Innovation',
    description: 'We embrace new ideas and technologies to solve complex educational challenges'
  },
  {
    icon: Shield,
    title: 'Integrity',
    description: 'We handle student data with the highest standards of privacy and security'
  }
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Link href="/" className="inline-flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold gradient-text">EduGuard</h1>
              <p className="text-xs text-secondary-600">Dropout Detection System</p>
            </div>
          </Link>
          
          <h2 className="text-4xl font-bold text-secondary-900 mb-4">Join Our Mission</h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Help us build technology that transforms education and ensures every student has the opportunity to succeed.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card mb-12 text-center"
        >
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-secondary-900 mb-4">Why EduGuard?</h3>
            <p className="text-lg text-secondary-700 leading-relaxed">
              Every year, millions of students drop out of school, limiting their future opportunities. 
              At EduGuard, we're using AI and data science to identify at-risk students early and 
              provide educators with the tools they need to intervene effectively. Join us in making 
              a real difference in students' lives.
            </p>
          </div>
        </motion.div>

        {/* Company Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-secondary-900 text-center mb-8">Our Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="card text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-secondary-900 mb-2">{value.title}</h4>
                <p className="text-secondary-600 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-secondary-900 text-center mb-8">Benefits & Perks</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="card hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-secondary-900 mb-2">{benefit.title}</h4>
                    <p className="text-secondary-600 text-sm">{benefit.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Open Positions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-secondary-900 text-center mb-8">Open Positions</h3>
          <div className="space-y-6">
            {jobOpenings.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="card hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-xl font-semibold text-secondary-900">{job.title}</h4>
                      <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full">
                        {job.department}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-secondary-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{job.experience}</span>
                      </div>
                    </div>
                    
                    <p className="text-secondary-700 mb-4">{job.description}</p>
                    
                    <div className="mb-4">
                      <h5 className="font-semibold text-secondary-900 mb-2">Key Requirements:</h5>
                      <ul className="list-disc list-inside text-sm text-secondary-600 space-y-1">
                        {job.requirements.map((req, reqIndex) => (
                          <li key={reqIndex}>{req}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {job.benefits.map((benefit, benefitIndex) => (
                        <span
                          key={benefitIndex}
                          className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs rounded-full"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-4 lg:mt-0 lg:ml-6">
                    <button className="btn-primary w-full lg:w-auto">
                      Apply Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Application Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="card mb-12"
        >
          <h3 className="text-2xl font-bold text-secondary-900 text-center mb-8">Our Hiring Process</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Application', description: 'Submit your resume and cover letter' },
              { step: '2', title: 'Phone Screen', description: '30-minute call with our recruiting team' },
              { step: '3', title: 'Technical Interview', description: 'Role-specific technical assessment' },
              { step: '4', title: 'Final Interview', description: 'Meet the team and discuss culture fit' }
            ].map((process, index) => (
              <div key={process.step} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">{process.step}</span>
                </div>
                <h4 className="font-semibold text-secondary-900 mb-2">{process.title}</h4>
                <p className="text-sm text-secondary-600">{process.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="card text-center"
        >
          <h3 className="text-2xl font-bold text-secondary-900 mb-4">Don't See a Perfect Fit?</h3>
          <p className="text-secondary-700 mb-6">
            We're always looking for talented individuals who share our passion for education. 
            Send us your resume and tell us how you'd like to contribute to our mission.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <a
              href="mailto:careers@eduguard.com"
              className="btn-primary inline-flex items-center"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Contact Us
            </a>
            <Link href="/" className="btn-outline inline-flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}