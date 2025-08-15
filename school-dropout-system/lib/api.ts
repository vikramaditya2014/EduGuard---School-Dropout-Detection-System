import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  onSnapshot,
  DocumentData,
  QueryConstraint
} from 'firebase/firestore';
import { db } from './firebase';
import { Student, Intervention, AcademicRecord, AttendanceRecord, BehavioralIncident, User } from '@/types';

// Generic API functions
export class FirebaseAPI {
  // Get all documents from a collection
  static async getCollection<T>(collectionName: string, constraints: QueryConstraint[] = []): Promise<T[]> {
    try {
      const collectionRef = collection(db, collectionName);
      const q = constraints.length > 0 ? query(collectionRef, ...constraints) : collectionRef;
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as T));
    } catch (error) {
      console.error(`Error fetching ${collectionName}:`, error);
      throw error;
    }
  }

  // Get a single document by ID
  static async getDocument<T>(collectionName: string, id: string): Promise<T | null> {
    try {
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as T;
      }
      return null;
    } catch (error) {
      console.error(`Error fetching document ${id}:`, error);
      throw error;
    }
  }

  // Add a new document
  static async addDocument<T>(collectionName: string, data: Omit<T, 'id'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      return docRef.id;
    } catch (error) {
      console.error(`Error adding document to ${collectionName}:`, error);
      throw error;
    }
  }

  // Update a document
  static async updateDocument<T>(collectionName: string, id: string, data: Partial<T>): Promise<void> {
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error(`Error updating document ${id}:`, error);
      throw error;
    }
  }

  // Delete a document
  static async deleteDocument(collectionName: string, id: string): Promise<void> {
    try {
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error(`Error deleting document ${id}:`, error);
      throw error;
    }
  }

  // Subscribe to real-time updates
  static subscribeToCollection<T>(
    collectionName: string, 
    callback: (data: T[]) => void,
    constraints: QueryConstraint[] = []
  ) {
    const collectionRef = collection(db, collectionName);
    const q = constraints.length > 0 ? query(collectionRef, ...constraints) : collectionRef;
    
    return onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as T));
      callback(data);
    });
  }
}

// Student-specific API functions
export class StudentAPI extends FirebaseAPI {
  static async getAllStudents(): Promise<Student[]> {
    return this.getCollection<Student>('students', [orderBy('lastName', 'asc')]);
  }

  static async getStudentsByRiskLevel(minRisk: number): Promise<Student[]> {
    return this.getCollection<Student>('students', [
      where('riskScore', '>=', minRisk),
      orderBy('riskScore', 'desc')
    ]);
  }

  static async getStudentsByGrade(grade: string): Promise<Student[]> {
    return this.getCollection<Student>('students', [
      where('grade', '==', grade),
      orderBy('lastName', 'asc')
    ]);
  }

  static async updateRiskScore(studentId: string, riskScore: number): Promise<void> {
    await this.updateDocument<Student>('students', studentId, { 
      riskScore,
      status: riskScore >= 70 ? 'at-risk' : 'active'
    });
  }

  static async getStudentWithRecords(studentId: string) {
    const [student, academicRecords, attendanceRecords, behavioralIncidents] = await Promise.all([
      this.getDocument<Student>('students', studentId),
      this.getCollection<AcademicRecord>('academicRecords', [
        where('studentId', '==', studentId),
        orderBy('createdAt', 'desc')
      ]),
      this.getCollection<AttendanceRecord>('attendanceRecords', [
        where('studentId', '==', studentId),
        orderBy('date', 'desc'),
        limit(30)
      ]),
      this.getCollection<BehavioralIncident>('behavioralIncidents', [
        where('studentId', '==', studentId),
        orderBy('date', 'desc'),
        limit(10)
      ])
    ]);

    return {
      student,
      academicRecords,
      attendanceRecords,
      behavioralIncidents
    };
  }
}

// Intervention-specific API functions
export class InterventionAPI extends FirebaseAPI {
  static async getActiveInterventions(): Promise<Intervention[]> {
    return this.getCollection<Intervention>('interventions', [
      where('status', '==', 'active'),
      orderBy('startDate', 'desc')
    ]);
  }

  static async getInterventionsByStudent(studentId: string): Promise<Intervention[]> {
    return this.getCollection<Intervention>('interventions', [
      where('studentId', '==', studentId),
      orderBy('startDate', 'desc')
    ]);
  }

  static async getInterventionsByType(type: string): Promise<Intervention[]> {
    return this.getCollection<Intervention>('interventions', [
      where('type', '==', type),
      orderBy('startDate', 'desc')
    ]);
  }

  static async completeIntervention(interventionId: string, effectiveness: 'low' | 'medium' | 'high'): Promise<void> {
    await this.updateDocument<Intervention>('interventions', interventionId, {
      status: 'completed',
      endDate: new Date().toISOString(),
      effectiveness
    });
  }
}

// Analytics and Reporting
export class AnalyticsAPI extends FirebaseAPI {
  static async getDashboardStats() {
    const [students, interventions] = await Promise.all([
      this.getCollection<Student>('students'),
      this.getCollection<Intervention>('interventions', [where('status', '==', 'active')])
    ]);

    const totalStudents = students.length;
    const atRiskStudents = students.filter(s => s.status === 'at-risk').length;
    const droppedOutStudents = students.filter(s => s.status === 'dropped-out').length;
    const activeInterventions = interventions.length;

    // Calculate average attendance (mock calculation)
    const averageAttendance = students.reduce((sum, student) => {
      // In real implementation, this would come from attendance records
      return sum + (Math.random() * 20 + 80); // Mock: 80-100%
    }, 0) / totalStudents;

    return {
      totalStudents,
      atRiskStudents,
      droppedOutStudents,
      averageAttendance: Math.round(averageAttendance * 10) / 10,
      interventionsActive: activeInterventions
    };
  }

  static async getRiskTrends(months: number = 6) {
    // Mock implementation - in real app, this would aggregate historical data
    const trends = [];
    const currentDate = new Date();
    
    for (let i = months - 1; i >= 0; i--) {
      const date = new Date(currentDate);
      date.setMonth(date.getMonth() - i);
      
      trends.push({
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        enrolled: Math.floor(Math.random() * 50 + 1150),
        droppedOut: Math.floor(Math.random() * 20 + 30),
        atRisk: Math.floor(Math.random() * 50 + 150)
      });
    }
    
    return trends;
  }

  static async getInterventionEffectiveness() {
    const interventions = await this.getCollection<Intervention>('interventions', [
      where('status', '==', 'completed'),
      where('effectiveness', '!=', null)
    ]);

    const effectiveness = interventions.reduce((acc, intervention) => {
      const type = intervention.type;
      if (!acc[type]) {
        acc[type] = { high: 0, medium: 0, low: 0, total: 0 };
      }
      acc[type][intervention.effectiveness!]++;
      acc[type].total++;
      return acc;
    }, {} as Record<string, { high: number; medium: number; low: number; total: number }>);

    return Object.entries(effectiveness).map(([type, data]) => ({
      intervention: type,
      success: Math.round((data.high + data.medium * 0.7) / data.total * 100),
      total: data.total
    }));
  }
}

// User management
export class UserAPI extends FirebaseAPI {
  static async getUserById(userId: string): Promise<User | null> {
    return this.getDocument<User>('users', userId);
  }

  static async createUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<string> {
    return this.addDocument<User>('users', userData);
  }

  static async updateUserProfile(userId: string, updates: Partial<User>): Promise<void> {
    await this.updateDocument<User>('users', userId, updates);
  }
}

// Real-time subscriptions for dashboard
export class RealtimeAPI {
  static subscribeToStudents(callback: (students: Student[]) => void) {
    return FirebaseAPI.subscribeToCollection<Student>('students', callback, [
      orderBy('lastName', 'asc')
    ]);
  }

  static subscribeToAlerts(callback: (alerts: any[]) => void) {
    // This would subscribe to alerts collection
    // Mock implementation for now
    const mockAlerts = [
      { id: 1, student: 'Sarah Johnson', grade: '9th', issue: 'Declining attendance', severity: 'high', time: '2 hours ago' },
      { id: 2, student: 'Michael Chen', grade: '11th', issue: 'Academic performance drop', severity: 'medium', time: '4 hours ago' }
    ];
    callback(mockAlerts);
  }

  static subscribeToInterventions(callback: (interventions: Intervention[]) => void) {
    return FirebaseAPI.subscribeToCollection<Intervention>('interventions', callback, [
      where('status', '==', 'active'),
      orderBy('startDate', 'desc')
    ]);
  }
}

// Risk assessment utilities
export class RiskAssessmentAPI {
  static calculateRiskScore(student: Student, records: {
    academic: AcademicRecord[];
    attendance: AttendanceRecord[];
    behavioral: BehavioralIncident[];
  }): number {
    let score = 0;
    
    // Academic performance (40% weight)
    if (records.academic.length > 0) {
      const avgGrade = records.academic.reduce((sum, record) => sum + record.grade, 0) / records.academic.length;
      const academicScore = avgGrade < 2.0 ? 40 : avgGrade < 2.5 ? 25 : avgGrade < 3.0 ? 15 : 0;
      score += academicScore;
    }
    
    // Attendance (30% weight)
    if (records.attendance.length > 0) {
      const attendanceRate = records.attendance.filter(r => r.status === 'present').length / records.attendance.length;
      const attendanceScore = attendanceRate < 0.7 ? 30 : attendanceRate < 0.8 ? 20 : attendanceRate < 0.9 ? 10 : 0;
      score += attendanceScore;
    }
    
    // Behavioral issues (20% weight)
    const negativeIncidents = records.behavioral.filter(b => b.type === 'negative').length;
    const behavioralScore = negativeIncidents > 5 ? 20 : negativeIncidents > 2 ? 15 : negativeIncidents > 0 ? 10 : 0;
    score += behavioralScore;
    
    // Other factors (10% weight)
    // This could include socioeconomic factors, family engagement, etc.
    
    return Math.min(score, 100);
  }

  static async runRiskAssessment(studentId: string): Promise<number> {
    const { student, academicRecords, attendanceRecords, behavioralIncidents } = await StudentAPI.getStudentWithRecords(studentId);
    
    if (!student) {
      throw new Error('Student not found');
    }
    
    const riskScore = this.calculateRiskScore(student, {
      academic: academicRecords,
      attendance: attendanceRecords,
      behavioral: behavioralIncidents
    });
    
    // Update student's risk score
    await StudentAPI.updateRiskScore(studentId, riskScore);
    
    return riskScore;
  }

  static async runBulkRiskAssessment(): Promise<void> {
    const students = await StudentAPI.getAllStudents();
    
    for (const student of students) {
      try {
        await this.runRiskAssessment(student.id);
        // Add small delay to avoid overwhelming the database
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`Error assessing risk for student ${student.id}:`, error);
      }
    }
  }
}