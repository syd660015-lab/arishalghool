export enum Section {
  Dashboard = 'dashboard',
  Schools = 'schools',
  Subjects = 'subjects',
  Teachers = 'teachers',
  Reports = 'reports'
}

export interface Subject {
  id: string;
  name: string;
  weeklyHours: number;
  teacherLoad: number;
}

export interface School {
  id: string;
  name: string;
  classesCount: number;
  gender: string;
  city: string;
  district: string;
}

export interface Teacher {
  id: string;
  name: string;
  code: string;
  nationalId: string;
  qualification: string;
  qualificationDate: string;
  appointmentDate: string;
  jobDegree: string;
  specialization: string;
  status: 'أصلي' | 'منتدب' | 'تكليف';
  mobile: string;
  address: string;
  subjectId: string;
  schoolId: string;
  actualHours: number;
}

export interface DeficitSurplusResult {
  schoolId: string;
  subjectId: string;
  hoursNeeded: number;
  teachersNeeded: number;
  currentTeachers: number;
  deficit: number;
  surplus: number;
}
