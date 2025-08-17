'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  GraduationCap, 
  ArrowLeft, 
  Shield, 
  Eye, 
  Lock, 
  Database,
  Users,
  Globe,
  AlertTriangle,
  CheckCircle,
  Mail,
  Phone,
  FileText
} from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
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
          
          <h2 className="text-3xl font-bold text-secondary-900 mb-2">Privacy Policy</h2>
          <p className="text-secondary-600">
            Last updated: January 15, 2024
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg border border-secondary-200 p-8"
        >
          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <div className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
              <div className="flex items-center space-x-2 mb-3">
                <Shield className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-semibold text-blue-900">Our Commitment to Privacy</h3>
              </div>
              <p className="text-blue-800 leading-relaxed">
                EduGuard is committed to protecting the privacy and security of student information. This Privacy Policy explains how we collect, use, and safeguard information when you use our dropout detection system. We comply with all applicable privacy laws including FERPA, COPPA, and GDPR.
              </p>
            </div>

            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <Database className="w-6 h-6 text-primary-600" />
                <h3 className="text-xl font-semibold text-secondary-900">1. Information We Collect</h3>
              </div>
              
              <h4 className="text-lg font-semibold text-secondary-900 mb-3">Student Information</h4>
              <p className="text-secondary-700 leading-relaxed mb-4">
                We collect and process the following types of student information:
              </p>
              <ul className="list-disc list-inside text-secondary-700 space-y-2 ml-4 mb-6">
                <li><strong>Academic Records:</strong> Grades, test scores, course enrollment, academic progress</li>
                <li><strong>Attendance Data:</strong> Daily attendance, tardiness, absences, patterns</li>
                <li><strong>Behavioral Information:</strong> Disciplinary records, behavioral incidents, interventions</li>
                <li><strong>Demographic Data:</strong> Age, grade level, enrollment date, graduation status</li>
                <li><strong>Contact Information:</strong> Student and parent/guardian contact details</li>
                <li><strong>Special Programs:</strong> Special education services, English learner status, free/reduced lunch eligibility</li>
              </ul>

              <h4 className="text-lg font-semibold text-secondary-900 mb-3">User Account Information</h4>
              <ul className="list-disc list-inside text-secondary-700 space-y-2 ml-4">
                <li>Name, email address, and role (teacher, counselor, administrator)</li>
                <li>School or district affiliation</li>
                <li>Login credentials and authentication data</li>
                <li>Usage patterns and system interactions</li>
              </ul>
            </div>

            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <Eye className="w-6 h-6 text-primary-600" />
                <h3 className="text-xl font-semibold text-secondary-900">2. How We Use Information</h3>
              </div>
              <p className="text-secondary-700 leading-relaxed mb-4">
                We use collected information solely for legitimate educational purposes:
              </p>
              <ul className="list-disc list-inside text-secondary-700 space-y-2 ml-4">
                <li><strong>Risk Assessment:</strong> Identify students at risk of dropping out using predictive analytics</li>
                <li><strong>Early Intervention:</strong> Enable timely support and intervention programs</li>
                <li><strong>Progress Monitoring:</strong> Track student progress and intervention effectiveness</li>
                <li><strong>Reporting:</strong> Generate reports for educators and administrators</li>
                <li><strong>System Improvement:</strong> Enhance our algorithms and user experience</li>
                <li><strong>Compliance:</strong> Meet legal and regulatory requirements</li>
              </ul>
            </div>

            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <Users className="w-6 h-6 text-primary-600" />
                <h3 className="text-xl font-semibold text-secondary-900">3. Information Sharing</h3>
              </div>
              <p className="text-secondary-700 leading-relaxed mb-4">
                We do not sell, trade, or rent student information. We may share information only in the following circumstances:
              </p>
              
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <h5 className="font-semibold text-green-900">Authorized Educational Personnel</h5>
                  </div>
                  <p className="text-green-800 text-sm">
                    With teachers, counselors, and administrators who have legitimate educational interests
                  </p>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <h5 className="font-semibold text-green-900">Parent/Guardian Consent</h5>
                  </div>
                  <p className="text-green-800 text-sm">
                    When required by law or with explicit parental consent
                  </p>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <h5 className="font-semibold text-green-900">Legal Compliance</h5>
                  </div>
                  <p className="text-green-800 text-sm">
                    To comply with legal obligations, court orders, or government requests
                  </p>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <h5 className="font-semibold text-green-900">Service Providers</h5>
                  </div>
                  <p className="text-green-800 text-sm">
                    With trusted service providers who assist in system operations (under strict confidentiality agreements)
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <Lock className="w-6 h-6 text-primary-600" />
                <h3 className="text-xl font-semibold text-secondary-900">4. Data Security</h3>
              </div>
              <p className="text-secondary-700 leading-relaxed mb-4">
                We implement comprehensive security measures to protect student information:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="p-4 bg-secondary-50 rounded-lg">
                  <h5 className="font-semibold text-secondary-900 mb-2">Technical Safeguards</h5>
                  <ul className="text-sm text-secondary-700 space-y-1">
                    <li>• End-to-end encryption</li>
                    <li>• Secure data transmission (SSL/TLS)</li>
                    <li>• Regular security audits</li>
                    <li>• Multi-factor authentication</li>
                  </ul>
                </div>
                <div className="p-4 bg-secondary-50 rounded-lg">
                  <h5 className="font-semibold text-secondary-900 mb-2">Administrative Safeguards</h5>
                  <ul className="text-sm text-secondary-700 space-y-1">
                    <li>• Role-based access controls</li>
                    <li>• Regular staff training</li>
                    <li>• Incident response procedures</li>
                    <li>• Data breach protocols</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <Globe className="w-6 h-6 text-primary-600" />
                <h3 className="text-xl font-semibold text-secondary-900">5. Data Retention</h3>
              </div>
              <p className="text-secondary-700 leading-relaxed mb-4">
                We retain student information only as long as necessary for educational purposes or as required by law:
              </p>
              <ul className="list-disc list-inside text-secondary-700 space-y-2 ml-4">
                <li><strong>Active Students:</strong> Data retained while student is enrolled</li>
                <li><strong>Graduated/Transferred Students:</strong> Data retained for 3 years after graduation/transfer</li>
                <li><strong>Account Data:</strong> User accounts deleted within 30 days of deactivation</li>
                <li><strong>Legal Requirements:</strong> Some data may be retained longer to comply with state/federal laws</li>
              </ul>
            </div>

            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="w-6 h-6 text-primary-600" />
                <h3 className="text-xl font-semibold text-secondary-900">6. Your Rights</h3>
              </div>
              <p className="text-secondary-700 leading-relaxed mb-4">
                Parents, students (where applicable), and users have the following rights:
              </p>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-secondary-900">Access</h5>
                    <p className="text-sm text-secondary-700">Request access to personal information we hold</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-secondary-900">Correction</h5>
                    <p className="text-sm text-secondary-700">Request correction of inaccurate information</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-secondary-900">Deletion</h5>
                    <p className="text-sm text-secondary-700">Request deletion of personal information (subject to legal requirements)</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-secondary-900">Portability</h5>
                    <p className="text-sm text-secondary-700">Request transfer of data to another system</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <AlertTriangle className="w-6 h-6 text-primary-600" />
                <h3 className="text-xl font-semibold text-secondary-900">7. Cookies and Tracking</h3>
              </div>
              <p className="text-secondary-700 leading-relaxed mb-4">
                EduGuard uses cookies and similar technologies to:
              </p>
              <ul className="list-disc list-inside text-secondary-700 space-y-2 ml-4">
                <li>Maintain user sessions and authentication</li>
                <li>Remember user preferences and settings</li>
                <li>Analyze system usage and performance</li>
                <li>Improve user experience and functionality</li>
              </ul>
              <p className="text-secondary-700 leading-relaxed mt-4">
                You can control cookie settings through your browser, but disabling cookies may affect system functionality.
              </p>
            </div>

            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <Globe className="w-6 h-6 text-primary-600" />
                <h3 className="text-xl font-semibold text-secondary-900">8. International Data Transfers</h3>
              </div>
              <p className="text-secondary-700 leading-relaxed">
                Student data is stored and processed within the United States. If data must be transferred internationally, we ensure appropriate safeguards are in place, including standard contractual clauses and adequacy decisions.
              </p>
            </div>

            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="w-6 h-6 text-primary-600" />
                <h3 className="text-xl font-semibold text-secondary-900">9. Changes to This Policy</h3>
              </div>
              <p className="text-secondary-700 leading-relaxed">
                We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will notify users of significant changes via email or through the platform. Continued use of EduGuard after changes constitutes acceptance of the updated policy.
              </p>
            </div>

            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <Mail className="w-6 h-6 text-primary-600" />
                <h3 className="text-xl font-semibold text-secondary-900">10. Contact Us</h3>
              </div>
              <p className="text-secondary-700 leading-relaxed mb-4">
                If you have questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-secondary-50 rounded-lg p-4 space-y-3">
                <div>
                  <h5 className="font-semibold text-secondary-900 mb-2">Privacy Officer</h5>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-secondary-600" />
                      <span className="text-secondary-700">privacy@eduguard.com</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-secondary-600" />
                      <span className="text-secondary-700">1-800-EDU-GUARD ext. 2</span>
                    </div>
                  </div>
                </div>
                <div className="text-secondary-700">
                  <strong>EduGuard Privacy Department</strong><br />
                  123 Education Way<br />
                  Springfield, IL 62701<br />
                  United States
                </div>
              </div>
            </div>

            <div className="border-t border-secondary-200 pt-6">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800 text-center">
                  <strong>Student Privacy Pledge:</strong> EduGuard has signed the Student Privacy Pledge, demonstrating our commitment to protecting student privacy and using data responsibly for educational purposes only.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex items-center justify-between"
        >
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-secondary-600 hover:text-secondary-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <Link
            href="/terms"
            className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            Terms of Service →
          </Link>
        </motion.div>
      </div>
    </div>
  );
}