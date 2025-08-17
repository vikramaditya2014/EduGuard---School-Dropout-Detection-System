'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  GraduationCap, 
  ArrowLeft, 
  FileText, 
  Shield, 
  Users, 
  AlertTriangle,
  Calendar,
  Mail,
  Phone
} from 'lucide-react';

export default function TermsPage() {
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
          
          <h2 className="text-3xl font-bold text-secondary-900 mb-2">Terms of Service</h2>
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
            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="w-6 h-6 text-primary-600" />
                <h3 className="text-xl font-semibold text-secondary-900">1. Acceptance of Terms</h3>
              </div>
              <p className="text-secondary-700 leading-relaxed">
                By accessing and using EduGuard ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>

            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <Users className="w-6 h-6 text-primary-600" />
                <h3 className="text-xl font-semibold text-secondary-900">2. Use License</h3>
              </div>
              <p className="text-secondary-700 leading-relaxed mb-4">
                Permission is granted to temporarily download one copy of EduGuard per device for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside text-secondary-700 space-y-2 ml-4">
                <li>modify or copy the materials</li>
                <li>use the materials for any commercial purpose or for any public display (commercial or non-commercial)</li>
                <li>attempt to decompile or reverse engineer any software contained in EduGuard</li>
                <li>remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </div>

            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="w-6 h-6 text-primary-600" />
                <h3 className="text-xl font-semibold text-secondary-900">3. Privacy and Data Protection</h3>
              </div>
              <p className="text-secondary-700 leading-relaxed mb-4">
                EduGuard is committed to protecting student privacy and complying with applicable data protection laws, including:
              </p>
              <ul className="list-disc list-inside text-secondary-700 space-y-2 ml-4">
                <li>Family Educational Rights and Privacy Act (FERPA)</li>
                <li>Children's Online Privacy Protection Act (COPPA)</li>
                <li>General Data Protection Regulation (GDPR) where applicable</li>
                <li>State and local privacy regulations</li>
              </ul>
              <p className="text-secondary-700 leading-relaxed mt-4">
                All student data is encrypted, stored securely, and used solely for educational purposes as outlined in our Privacy Policy.
              </p>
            </div>

            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <AlertTriangle className="w-6 h-6 text-primary-600" />
                <h3 className="text-xl font-semibold text-secondary-900">4. User Responsibilities</h3>
              </div>
              <p className="text-secondary-700 leading-relaxed mb-4">
                Users of EduGuard agree to:
              </p>
              <ul className="list-disc list-inside text-secondary-700 space-y-2 ml-4">
                <li>Use the service only for legitimate educational purposes</li>
                <li>Maintain the confidentiality of student information</li>
                <li>Report any suspected data breaches or security issues immediately</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Not share login credentials with unauthorized individuals</li>
                <li>Use the system in accordance with school district policies</li>
              </ul>
            </div>

            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <Calendar className="w-6 h-6 text-primary-600" />
                <h3 className="text-xl font-semibold text-secondary-900">5. Service Availability</h3>
              </div>
              <p className="text-secondary-700 leading-relaxed">
                While we strive to maintain 99.9% uptime, EduGuard does not guarantee uninterrupted service. Scheduled maintenance will be announced in advance when possible. We reserve the right to modify or discontinue the service with reasonable notice.
              </p>
            </div>

            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="w-6 h-6 text-primary-600" />
                <h3 className="text-xl font-semibold text-secondary-900">6. Limitation of Liability</h3>
              </div>
              <p className="text-secondary-700 leading-relaxed">
                In no event shall EduGuard or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use EduGuard, even if EduGuard or an authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </div>

            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="w-6 h-6 text-primary-600" />
                <h3 className="text-xl font-semibold text-secondary-900">7. Accuracy of Materials</h3>
              </div>
              <p className="text-secondary-700 leading-relaxed">
                The materials appearing in EduGuard could include technical, typographical, or photographic errors. EduGuard does not warrant that any of the materials on its service are accurate, complete, or current. EduGuard may make changes to the materials contained in its service at any time without notice.
              </p>
            </div>

            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <Users className="w-6 h-6 text-primary-600" />
                <h3 className="text-xl font-semibold text-secondary-900">8. Modifications</h3>
              </div>
              <p className="text-secondary-700 leading-relaxed">
                EduGuard may revise these terms of service at any time without notice. By using this service, you are agreeing to be bound by the then current version of these terms of service. Users will be notified of significant changes via email or through the platform.
              </p>
            </div>

            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <AlertTriangle className="w-6 h-6 text-primary-600" />
                <h3 className="text-xl font-semibold text-secondary-900">9. Governing Law</h3>
              </div>
              <p className="text-secondary-700 leading-relaxed">
                These terms and conditions are governed by and construed in accordance with the laws of the United States and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
              </p>
            </div>

            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <Mail className="w-6 h-6 text-primary-600" />
                <h3 className="text-xl font-semibold text-secondary-900">10. Contact Information</h3>
              </div>
              <p className="text-secondary-700 leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-secondary-50 rounded-lg p-4 space-y-2">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-secondary-600" />
                  <span className="text-secondary-700">legal@eduguard.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-secondary-600" />
                  <span className="text-secondary-700">1-800-EDU-GUARD</span>
                </div>
                <div className="text-secondary-700">
                  <strong>EduGuard Legal Department</strong><br />
                  123 Education Way<br />
                  Springfield, IL 62701<br />
                  United States
                </div>
              </div>
            </div>

            <div className="border-t border-secondary-200 pt-6">
              <p className="text-sm text-secondary-500 text-center">
                These terms of service are effective as of January 15, 2024, and will remain in effect except with respect to any changes in its provisions in the future, which will be in effect immediately after being posted on this page.
              </p>
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
            href="/privacy"
            className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            Privacy Policy →
          </Link>
        </motion.div>
      </div>
    </div>
  );
}