export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  grade: string;
  dateOfBirth: string;
  enrollmentDate: string;
  guardianName: string;
  guardianPhone: string;
  address: string;
  riskScore: number;
  status: 'active' | 'at-risk' | 'dropped-out';
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AcademicRecord {
  id: string;
  studentId: string;
  subject: string;
  grade: number;
  semester: string;
  year: string;
  teacher: string;
  createdAt: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  reason?: string;
  createdAt: string;
}

export interface BehavioralIncident {
  id: string;
  studentId: string;
  type: 'positive' | 'negative';
  category: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  date: string;
  reportedBy: string;
  resolved: boolean;
  createdAt: string;
}

export interface Intervention {
  id: string;
  studentId: string;
  type: 'academic' | 'behavioral' | 'social' | 'counseling';
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  assignedTo: string;
  status: 'planned' | 'active' | 'completed' | 'cancelled';
  effectiveness?: 'low' | 'medium' | 'high';
  notes?: string;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'teacher' | 'counselor' | 'principal';
  avatar?: string;
  createdAt: string;
}

export interface DashboardStats {
  totalStudents: number;
  atRiskStudents: number;
  droppedOutStudents: number;
  averageAttendance: number;
  interventionsActive: number;
  trendsData: {
    month: string;
    enrolled: number;
    droppedOut: number;
    atRisk: number;
  }[];
}

export interface RiskFactor {
  factor: string;
  weight: number;
  description: string;
  category: 'academic' | 'behavioral' | 'social' | 'economic';
}

export interface PredictionModel {
  id: string;
  name: string;
  version: string;
  accuracy: number;
  lastTrained: string;
  features: string[];
  isActive: boolean;
}