import { Student, AcademicRecord, AttendanceRecord, BehavioralIncident, Intervention } from '@/types';

export const mockStudents: Student[] = [
  {
    id: '1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@school.edu',
    grade: '9th',
    dateOfBirth: '2008-03-15',
    enrollmentDate: '2023-09-01',
    guardianName: 'Emily Johnson',
    guardianPhone: '+1 (555) 123-4567',
    address: '123 Elm Street, Springfield, IL 62701',
    riskScore: 85,
    status: 'at-risk',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
    createdAt: '2023-09-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael.chen@school.edu',
    grade: '11th',
    dateOfBirth: '2006-07-22',
    enrollmentDate: '2021-09-01',
    guardianName: 'Linda Chen',
    guardianPhone: '+1 (555) 234-5678',
    address: '456 Oak Avenue, Springfield, IL 62702',
    riskScore: 25,
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    createdAt: '2021-09-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '3',
    firstName: 'Emma',
    lastName: 'Davis',
    email: 'emma.davis@school.edu',
    grade: '10th',
    dateOfBirth: '2007-11-08',
    enrollmentDate: '2022-09-01',
    guardianName: 'Robert Davis',
    guardianPhone: '+1 (555) 345-6789',
    address: '789 Pine Road, Springfield, IL 62703',
    riskScore: 68,
    status: 'at-risk',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    createdAt: '2022-09-01T00:00:00Z',
    updatedAt: '2024-01-13T00:00:00Z'
  },
  {
    id: '4',
    firstName: 'David',
    lastName: 'Wilson',
    email: 'david.wilson@school.edu',
    grade: '12th',
    dateOfBirth: '2005-05-30',
    enrollmentDate: '2020-09-01',
    guardianName: 'Susan Wilson',
    guardianPhone: '+1 (555) 456-7890',
    address: '321 Maple Lane, Springfield, IL 62704',
    riskScore: 95,
    status: 'dropped-out',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    createdAt: '2020-09-01T00:00:00Z',
    updatedAt: '2023-12-20T00:00:00Z'
  },
  {
    id: '5',
    firstName: 'Olivia',
    lastName: 'Garcia',
    email: 'olivia.garcia@school.edu',
    grade: '9th',
    dateOfBirth: '2008-09-12',
    enrollmentDate: '2023-09-01',
    guardianName: 'Maria Garcia',
    guardianPhone: '+1 (555) 567-8901',
    address: '654 Cedar Street, Springfield, IL 62705',
    riskScore: 15,
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    createdAt: '2023-09-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '6',
    firstName: 'James',
    lastName: 'Rodriguez',
    email: 'james.rodriguez@school.edu',
    grade: '11th',
    dateOfBirth: '2006-02-18',
    enrollmentDate: '2021-09-01',
    guardianName: 'Carlos Rodriguez',
    guardianPhone: '+1 (555) 678-9012',
    address: '987 Birch Drive, Springfield, IL 62706',
    riskScore: 42,
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    createdAt: '2021-09-01T00:00:00Z',
    updatedAt: '2024-01-14T00:00:00Z'
  },
  {
    id: '7',
    firstName: 'Sophia',
    lastName: 'Martinez',
    email: 'sophia.martinez@school.edu',
    grade: '12th',
    dateOfBirth: '2005-12-03',
    enrollmentDate: '2020-09-01',
    guardianName: 'Ana Martinez',
    guardianPhone: '+1 (555) 789-0123',
    address: '147 Willow Way, Springfield, IL 62707',
    riskScore: 78,
    status: 'at-risk',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
    createdAt: '2020-09-01T00:00:00Z',
    updatedAt: '2024-01-12T00:00:00Z'
  },
  {
    id: '8',
    firstName: 'Alexander',
    lastName: 'Thompson',
    email: 'alexander.thompson@school.edu',
    grade: '10th',
    dateOfBirth: '2007-08-25',
    enrollmentDate: '2022-09-01',
    guardianName: 'Jennifer Thompson',
    guardianPhone: '+1 (555) 890-1234',
    address: '258 Spruce Court, Springfield, IL 62708',
    riskScore: 32,
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face',
    createdAt: '2022-09-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  }
];

export const mockInterventions: Intervention[] = [
  {
    id: '1',
    studentId: '1',
    type: 'academic',
    title: 'Math Tutoring Program',
    description: 'Weekly one-on-one tutoring sessions to improve math performance',
    startDate: '2024-01-08',
    assignedTo: 'Ms. Anderson',
    status: 'active',
    effectiveness: 'medium',
    notes: 'Student showing gradual improvement in algebra concepts',
    createdAt: '2024-01-08T00:00:00Z'
  },
  {
    id: '2',
    studentId: '1',
    type: 'counseling',
    title: 'Peer Support Group',
    description: 'Group sessions with other students facing similar challenges',
    startDate: '2024-01-10',
    assignedTo: 'Mr. Brown',
    status: 'active',
    effectiveness: 'high',
    notes: 'Student actively participating and building confidence',
    createdAt: '2024-01-10T00:00:00Z'
  },
  {
    id: '3',
    studentId: '3',
    type: 'behavioral',
    title: 'Attendance Improvement Plan',
    description: 'Daily check-ins and incentive system for regular attendance',
    startDate: '2024-01-05',
    assignedTo: 'Ms. Davis',
    status: 'active',
    effectiveness: 'medium',
    notes: 'Attendance improved from 65% to 78% over two weeks',
    createdAt: '2024-01-05T00:00:00Z'
  }
];

export const mockAcademicRecords: AcademicRecord[] = [
  {
    id: '1',
    studentId: '1',
    subject: 'Mathematics',
    grade: 2.1,
    semester: 'Fall',
    year: '2023',
    teacher: 'Ms. Anderson',
    createdAt: '2023-12-15T00:00:00Z'
  },
  {
    id: '2',
    studentId: '1',
    subject: 'English',
    grade: 2.8,
    semester: 'Fall',
    year: '2023',
    teacher: 'Mr. Johnson',
    createdAt: '2023-12-15T00:00:00Z'
  },
  {
    id: '3',
    studentId: '2',
    subject: 'Mathematics',
    grade: 3.9,
    semester: 'Fall',
    year: '2023',
    teacher: 'Ms. Anderson',
    createdAt: '2023-12-15T00:00:00Z'
  },
  {
    id: '4',
    studentId: '2',
    subject: 'Physics',
    grade: 3.7,
    semester: 'Fall',
    year: '2023',
    teacher: 'Dr. Wilson',
    createdAt: '2023-12-15T00:00:00Z'
  }
];

export const mockAttendanceRecords: AttendanceRecord[] = [
  {
    id: '1',
    studentId: '1',
    date: '2024-01-15',
    status: 'absent',
    reason: 'Illness',
    createdAt: '2024-01-15T08:00:00Z'
  },
  {
    id: '2',
    studentId: '1',
    date: '2024-01-14',
    status: 'late',
    createdAt: '2024-01-14T08:15:00Z'
  },
  {
    id: '3',
    studentId: '2',
    date: '2024-01-15',
    status: 'present',
    createdAt: '2024-01-15T08:00:00Z'
  },
  {
    id: '4',
    studentId: '2',
    date: '2024-01-14',
    status: 'present',
    createdAt: '2024-01-14T08:00:00Z'
  }
];

export const mockBehavioralIncidents: BehavioralIncident[] = [
  {
    id: '1',
    studentId: '1',
    type: 'negative',
    category: 'Classroom Disruption',
    description: 'Talking during lecture, distracting other students',
    severity: 'medium',
    date: '2024-01-12',
    reportedBy: 'Ms. Anderson',
    resolved: true,
    createdAt: '2024-01-12T14:30:00Z'
  },
  {
    id: '2',
    studentId: '3',
    type: 'positive',
    category: 'Academic Achievement',
    description: 'Helped struggling classmate with assignment',
    severity: 'low',
    date: '2024-01-10',
    reportedBy: 'Mr. Johnson',
    resolved: true,
    createdAt: '2024-01-10T11:20:00Z'
  },
  {
    id: '3',
    studentId: '7',
    type: 'negative',
    category: 'Attendance',
    description: 'Multiple unexcused absences',
    severity: 'high',
    date: '2024-01-08',
    reportedBy: 'Ms. Davis',
    resolved: false,
    createdAt: '2024-01-08T09:00:00Z'
  }
];