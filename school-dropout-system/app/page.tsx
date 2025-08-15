'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  GraduationCap, 
  ArrowRight, 
  CheckCircle, 
  TrendingUp, 
  Users, 
  Shield, 
  BarChart3,
  Brain,
  AlertTriangle,
  Target,
  Sparkles,
  Star,
  ChevronRight,
  Play,
  Zap,
  Award,
  Clock,
  Globe,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Eye,
  BookOpen,
  MessageCircle,
  ExternalLink,
  ChevronDown,
  Lightbulb
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from './providers';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Risk Detection',
    description: 'Advanced machine learning algorithms analyze student data patterns to predict dropout risk with 95% accuracy.',
    color: 'from-blue-500 to-cyan-500',
    stats: '95% accuracy',
    benefits: ['Early identification', 'Predictive analytics', 'Pattern recognition', 'Automated scoring']
  },
  {
    icon: BarChart3,
    title: 'Real-time Analytics',
    description: 'Comprehensive dashboards provide instant insights into student performance, attendance, and behavioral patterns.',
    color: 'from-purple-500 to-pink-500',
    stats: 'Real-time updates',
    benefits: ['Live dashboards', 'Interactive charts', 'Data visualization', 'Trend analysis']
  },
  {
    icon: AlertTriangle,
    title: 'Early Warning System',
    description: 'Automated alerts notify educators when students show early signs of disengagement or academic decline.',
    color: 'from-orange-500 to-red-500',
    stats: '24/7 monitoring',
    benefits: ['Instant alerts', 'Priority scoring', 'Custom triggers', 'Multi-channel notifications']
  },
  {
    icon: Target,
    title: 'Intervention Tracking',
    description: 'Monitor the effectiveness of interventions and adjust strategies based on real-time feedback and outcomes.',
    color: 'from-green-500 to-emerald-500',
    stats: '78% success rate',
    benefits: ['Strategy tracking', 'ROI measurement', 'Progress monitoring', 'Outcome analysis']
  },
  {
    icon: Users,
    title: 'Collaborative Platform',
    description: 'Connect teachers, counselors, and administrators in a unified platform for coordinated student support.',
    color: 'from-indigo-500 to-blue-500',
    stats: 'Multi-role access',
    benefits: ['Team collaboration', 'Role-based permissions', 'Shared insights', 'Communication tools']
  },
  {
    icon: Shield,
    title: 'Privacy & Security',
    description: 'Enterprise-grade security ensures student data remains protected while maintaining full compliance.',
    color: 'from-teal-500 to-cyan-500',
    stats: 'FERPA compliant',
    benefits: ['Data encryption', 'Access controls', 'Audit trails', 'Compliance reporting']
  }
];

const stats = [
  { icon: GraduationCap, label: 'Students Monitored', value: '50,000+', description: 'Across 500+ institutions' },
  { icon: TrendingUp, label: 'Dropout Rate Reduction', value: '73%', description: 'Average improvement' },
  { icon: Eye, label: 'Early Detection Rate', value: '95%', description: 'Prediction accuracy' },
  { icon: Award, label: 'Schools Using System', value: '500+', description: 'Worldwide deployment' }
];

const testimonials = [
  {
    name: 'Dr. Sarah Martinez',
    role: 'Principal',
    school: 'Springfield High School',
    content: 'EduGuard has revolutionized how we identify and support at-risk students. The early warning system has helped us prevent dozens of dropouts this year.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=80&h=80&fit=crop&crop=face'
  },
  {
    name: 'Michael Johnson',
    role: 'Guidance Counselor',
    school: 'Lincoln Academy',
    content: 'The intervention tracking features are incredible. We can now measure the actual impact of our support programs and adjust strategies in real-time.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face'
  },
  {
    name: 'Jennifer Adams',
    role: 'District Administrator',
    school: 'Metro School District',
    content: 'The analytics dashboard provides insights we never had before. We\'ve improved our district-wide retention rate by 40% since implementing EduGuard.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face'
  }
];

const faqs = [
  {
    question: 'How accurate is the AI prediction system?',
    answer: 'Our AI system maintains 95% accuracy in identifying at-risk students, using advanced machine learning algorithms trained on millions of data points from educational institutions worldwide.'
  },
  {
    question: 'Is student data secure and compliant?',
    answer: 'Absolutely. EduGuard is fully FERPA compliant with enterprise-grade security, including data encryption, role-based access controls, and comprehensive audit trails.'
  },
  {
    question: 'How quickly can we see results?',
    answer: 'Most schools see measurable improvements in student retention within 60 days of implementation. Early warning alerts begin working immediately upon system activation.'
  },
  {
    question: 'Do you provide training and support?',
    answer: 'Yes! We provide comprehensive training, 24/7 support, and ongoing consultation to ensure your team maximizes the system\'s potential for student success.'
  },
  {
    question: 'Can it integrate with existing systems?',
    answer: 'EduGuard seamlessly integrates with most Student Information Systems (SIS), Learning Management Systems (LMS), and other educational software through our robust API.'
  }
];

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const router = useRouter();
  const { user } = useAuth();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -25]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => router.push('/')}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">EduGuard</h1>
                <p className="text-xs text-slate-600">Dropout Detection System</p>
              </div>
            </motion.div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['Features', 'Demo', 'About', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden md:flex items-center space-x-4"
            >
              {user ? (
                <Link href="/dashboard" className="btn-primary">
                  Go to Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              ) : (
                <>
                  <Link href="/auth/signin" className="btn-outline">
                    Sign In
                  </Link>
                  <Link href="/auth/signup" className="btn-primary">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </>
              )}
            </motion.div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 py-4 border-t border-slate-200"
            >
              <div className="space-y-4">
                {['Features', 'Demo', 'About', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      scrollToSection(item.toLowerCase());
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left text-slate-600 hover:text-blue-600 font-medium transition-colors py-2"
                  >
                    {item}
                  </button>
                ))}
                <div className="pt-4 space-y-3">
                  {user ? (
                    <Link href="/dashboard" className="btn-primary w-full">
                      Go to Dashboard
                    </Link>
                  ) : (
                    <>
                      <Link href="/auth/signin" className="btn-outline w-full">
                        Sign In
                      </Link>
                      <Link href="/auth/signup" className="btn-primary w-full">
                        Get Started
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 pt-32 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                <span>Trusted by 500+ Schools Worldwide</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
                Prevent Student{' '}
                <span className="gradient-text">Dropouts</span>
                <br />
                Before They Happen
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-slate-600 mb-8 max-w-4xl mx-auto">
                Revolutionary AI-powered system that identifies at-risk students early, 
                enabling targeted interventions to improve retention rates and student success.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12"
            >
              {user ? (
                <Link href="/dashboard" className="btn-primary text-lg px-8 py-4 w-full sm:w-auto">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Go to Dashboard
                </Link>
              ) : (
                <Link href="/auth/signup" className="btn-primary text-lg px-8 py-4 w-full sm:w-auto">
                  <Zap className="w-5 h-5 mr-2" />
                  Start Free Trial
                </Link>
              )}
              <button 
                onClick={() => scrollToSection('demo')}
                className="btn-outline text-lg px-8 py-4 w-full sm:w-auto"
              >
                <Play className="w-5 h-5 mr-2" />
                View Demo
              </button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center space-x-8 text-sm text-slate-500"
            >
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>FERPA Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4" />
                <span>ISO 27001 Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>24/7 Support</span>
              </div>
            </motion.div>
          </div>

          {/* Floating Animation Elements */}
          <motion.div style={{ y: y1 }} className="absolute top-20 left-10 w-20 h-20 bg-blue-200/30 rounded-full blur-xl" />
          <motion.div style={{ y: y2 }} className="absolute top-40 right-20 w-16 h-16 bg-purple-200/30 rounded-full blur-xl" />
          <motion.div style={{ y: y1 }} className="absolute bottom-20 left-1/4 w-24 h-24 bg-cyan-200/30 rounded-full blur-xl" />
        </div>
      </section>

      {/* Interactive Stats Section */}
      <section className="px-6 py-20 bg-white/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Transforming Education with <span className="gradient-text">Proven Results</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="text-center group cursor-pointer"
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-4xl font-bold text-slate-900 mb-2">{stat.value}</h3>
                <p className="text-xl font-semibold text-slate-700 mb-1">{stat.label}</p>
                <p className="text-sm text-slate-500">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Features Section */}
      <section id="features" className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Powerful Features for
              <span className="gradient-text"> Student Success</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our comprehensive suite of tools empowers educators with actionable insights 
              to identify, support, and retain at-risk students.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Feature Navigation */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                    selectedFeature === index 
                      ? 'bg-white shadow-lg border-l-4 border-blue-500' 
                      : 'bg-white/50 hover:bg-white hover:shadow-md'
                  }`}
                  onClick={() => setSelectedFeature(index)}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center flex-shrink-0`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-slate-900">{feature.title}</h3>
                        <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                          {feature.stats}
                        </span>
                      </div>
                      <p className="text-slate-600 mb-3">{feature.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {feature.benefits.map((benefit, idx) => (
                          <span key={idx} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Feature Visualization */}
            <div className="relative">
              <motion.div
                key={selectedFeature}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl p-8 shadow-2xl"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${features[selectedFeature].color} flex items-center justify-center mb-6`}>
                  {(() => {
                    const Icon = features[selectedFeature].icon;
                    return <Icon className="w-8 h-8 text-white" />;
                  })()}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  {features[selectedFeature].title}
                </h3>
                <p className="text-slate-600 text-lg leading-relaxed mb-6">
                  {features[selectedFeature].description}
                </p>
                <div className="space-y-3">
                  {features[selectedFeature].benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-slate-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="px-6 py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              See EduGuard in Action
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Experience the power of AI-driven student success. Watch how our system 
              identifies at-risk students and helps educators take action.
            </p>
            <div className="relative inline-block">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300 group">
                <Play className="w-8 h-8 text-white ml-1" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-ping opacity-20"></div>
            </div>
            <p className="text-slate-400 mt-4">Click to watch 2-minute demo</p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Trusted by <span className="gradient-text">Educational Leaders</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              See what educators are saying about their experience with EduGuard
            </p>
          </motion.div>

          <div className="relative">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
                <div className="flex items-center mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-2xl md:text-3xl text-slate-700 font-medium leading-relaxed mb-8">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonials[currentTestimonial].avatar}
                    alt={testimonials[currentTestimonial].name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-xl font-bold text-slate-900">
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className="text-slate-600">
                      {testimonials[currentTestimonial].role}, {testimonials[currentTestimonial].school}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Testimonial Navigation */}
            <div className="flex justify-center space-x-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    index === currentTestimonial ? 'bg-blue-600' : 'bg-slate-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-xl text-slate-600">
              Everything you need to know about EduGuard
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full text-left p-6 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-900 pr-4">
                      {faq.question}
                    </h3>
                    <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-200 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`} />
                  </div>
                  {openFaq === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-4"
                    >
                      <p className="text-slate-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center space-x-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Lightbulb className="w-4 h-4" />
              <span>Join 500+ Schools Already Seeing Results</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Ready to Transform
              <br />Student Outcomes?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Start your free trial today and see how EduGuard can help you identify 
              at-risk students early and implement effective intervention strategies.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              {user ? (
                <Link href="/dashboard" className="btn bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-4 w-full sm:w-auto">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Go to Dashboard
                </Link>
              ) : (
                <Link href="/auth/signup" className="btn bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-4 w-full sm:w-auto">
                  <Zap className="w-5 h-5 mr-2" />
                  Start Free Trial
                </Link>
              )}
              <button 
                onClick={() => scrollToSection('contact')}
                className="btn border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4 w-full sm:w-auto"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Talk to Sales
              </button>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 mt-8 text-blue-100">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Setup in under 1 hour</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-6 py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Get in Touch
              </h2>
              <p className="text-xl text-slate-600 mb-8">
                Ready to transform your school's approach to student retention? 
                Our team is here to help you get started.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Email Us</h3>
                    <p className="text-slate-600">support@eduguard.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Call Us</h3>
                    <p className="text-slate-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Visit Us</h3>
                    <p className="text-slate-600">123 Education Blvd, Tech City, TC 12345</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-xl"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Request a Demo
              </h3>
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label">First Name</label>
                    <input type="text" className="input" placeholder="John" />
                  </div>
                  <div>
                    <label className="label">Last Name</label>
                    <input type="text" className="input" placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label className="label">Email</label>
                  <input type="email" className="input" placeholder="john.doe@school.edu" />
                </div>
                <div>
                  <label className="label">School/Institution</label>
                  <input type="text" className="input" placeholder="Springfield High School" />
                </div>
                <div>
                  <label className="label">Role</label>
                  <select className="input">
                    <option value="">Select your role</option>
                    <option value="administrator">Administrator</option>
                    <option value="principal">Principal</option>
                    <option value="teacher">Teacher</option>
                    <option value="counselor">Counselor</option>
                  </select>
                </div>
                <div>
                  <label className="label">Message</label>
                  <textarea 
                    className="input" 
                    rows={4} 
                    placeholder="Tell us about your needs..."
                  />
                </div>
                <button type="submit" className="btn-primary w-full">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Request Demo
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">EduGuard</h3>
                  <p className="text-xs text-slate-400">Dropout Detection System</p>
                </div>
              </div>
              <p className="text-slate-400 mb-4">
                Empowering educators with AI-driven insights to prevent student dropouts 
                and improve educational outcomes.
              </p>
              <div className="flex space-x-4">
                {/* Social Media Icons */}
                <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-700">
                  <Globe className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <div className="space-y-2 text-slate-400">
                <button onClick={() => scrollToSection('features')} className="block hover:text-white transition-colors">Features</button>
                <button onClick={() => scrollToSection('demo')} className="block hover:text-white transition-colors">Demo</button>
                <Link href="/auth/register" className="block hover:text-white transition-colors">Sign Up</Link>
                <Link href="/auth/login" className="block hover:text-white transition-colors">Login</Link>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-slate-400">
                <button onClick={() => scrollToSection('about')} className="block hover:text-white transition-colors">About</button>
                <button onClick={() => scrollToSection('contact')} className="block hover:text-white transition-colors">Contact</button>
                <a href="#" className="block hover:text-white transition-colors">Careers</a>
                <a href="#" className="block hover:text-white transition-colors">Blog</a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-slate-400">
                <a href="#" className="block hover:text-white transition-colors">Help Center</a>
                <a href="#" className="block hover:text-white transition-colors">Documentation</a>
                <a href="#" className="block hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="block hover:text-white transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
            <p>
              © 2024 EduGuard. All rights reserved. Empowering education through AI.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}