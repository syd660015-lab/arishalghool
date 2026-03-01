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
  icon?: string;
}

export interface School {
  id: string;
  name: string;
  classesCount: number;
  grade1Classes: number;
  grade2Classes: number;
  grade3Classes: number;
  type: 'إعدادي' | 'تعليم أساسي';
  gender: 'بنين' | 'بنات' | 'مشترك';
  city: string;
  district: string;
}

export type JobDegree = 'معلم مساعد' | 'معلم' | 'معلم أول' | 'معلم أول أ' | 'معلم خبير' | 'كبير معلمين';

export const JOB_DEGREE_LOADS: Record<JobDegree, number> = {
  'معلم مساعد': 21,
  'معلم': 21,
  'معلم أول': 19,
  'معلم أول أ': 18,
  'معلم خبير': 17,
  'كبير معلمين': 16
};

export interface Teacher {
  id: string;
  name: string;
  code: string;
  nationalId: string;
  qualification: string;
  qualificationDate: string;
  appointmentDate: string;
  jobDegree: JobDegree;
  gender: 'ذكر' | 'أنثى';
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
