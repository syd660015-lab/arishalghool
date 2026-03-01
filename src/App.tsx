/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  School as SchoolIcon, 
  Book, 
  LayoutDashboard, 
  BarChart3, 
  Plus, 
  Calculator, 
  Search, 
  Edit2, 
  Trash2, 
  X, 
  Link,
  ChevronLeft,
  Download,
  AlertCircle,
  CheckCircle2,
  Users,
  User,
  Clock,
  RefreshCw,
  Printer,
  Languages,
  Binary,
  Dna,
  Globe,
  Palette,
  Music,
  Trophy,
  Microscope,
  Atom,
  History,
  Map,
  Monitor
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Section, Subject, School, Teacher, JobDegree, JOB_DEGREE_LOADS } from './types';
import { 
  Document, 
  Packer, 
  Paragraph, 
  TextRun, 
  Table, 
  TableRow, 
  TableCell, 
  WidthType, 
  AlignmentType,
  BorderStyle,
  VerticalAlign
} from 'docx';
import { saveAs } from 'file-saver';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

const DEFAULT_SCHOOLS: School[] = [
  { id: '1', name: 'ابن خلدون للتعليم الأساسي المشتركة ع', classesCount: 12, grade1Classes: 4, grade2Classes: 4, grade3Classes: 4, type: 'تعليم أساسي', gender: 'مشترك', city: 'العريش', district: 'قسم أول العريش' },
  { id: '2', name: 'ابوبكر الصديق للتعليم الاساسى / ع بنين', classesCount: 12, grade1Classes: 4, grade2Classes: 4, grade3Classes: 4, type: 'تعليم أساسي', gender: 'بنين', city: 'العريش', district: 'قسم ثان العريش' },
  { id: '3', name: 'ابي صقل الجديدة للتعليم الأساسي ع', classesCount: 12, grade1Classes: 4, grade2Classes: 4, grade3Classes: 4, type: 'تعليم أساسي', gender: 'مشترك', city: 'العريش', district: 'قسم أول العريش' },
  { id: '4', name: 'اسماء بنت ابى بكر الاعدادية بنات', classesCount: 12, grade1Classes: 4, grade2Classes: 4, grade3Classes: 4, type: 'إعدادي', gender: 'بنات', city: 'العريش', district: 'قسم أول العريش' },
  { id: '5', name: 'السادات الاعداديـة', classesCount: 12, grade1Classes: 4, grade2Classes: 4, grade3Classes: 4, type: 'إعدادي', gender: 'بنين', city: 'العريش', district: 'قسم ثالث العريش' },
  { id: '6', name: 'السبيل للتعليم الاساسى / ع', classesCount: 12, grade1Classes: 4, grade2Classes: 4, grade3Classes: 4, type: 'تعليم أساسي', gender: 'مشترك', city: 'العريش', district: 'قسم رابع العريش' },
  { id: '7', name: 'السكاسكة الاعدادية المشتركة', classesCount: 12, grade1Classes: 4, grade2Classes: 4, grade3Classes: 4, type: 'إعدادي', gender: 'مشترك', city: 'العريش', district: 'قسم أول العريش' },
  { id: '8', name: 'السيده/ خديجة بنت خويلد ع بنات', classesCount: 12, grade1Classes: 4, grade2Classes: 4, grade3Classes: 4, type: 'إعدادي', gender: 'بنات', city: 'العريش', district: 'قسم أول العريش' },
  { id: '9', name: 'السيده/عائشة ام المؤمنين للتعليم الاساسى / ع بنات', classesCount: 12, grade1Classes: 4, grade2Classes: 4, grade3Classes: 4, type: 'تعليم أساسي', gender: 'بنات', city: 'العريش', district: 'قسم ثالث العريش' },
  { id: '10', name: 'الشريفات للتعليم الاساسى / ع', classesCount: 12, grade1Classes: 4, grade2Classes: 4, grade3Classes: 4, type: 'تعليم أساسي', gender: 'مشترك', city: 'العريش', district: 'قسم أول العريش' },
  { id: '11', name: 'الشهيد /حمدي العبد للتعليم الأساسي/ ع', classesCount: 12, grade1Classes: 4, grade2Classes: 4, grade3Classes: 4, type: 'تعليم أساسي', gender: 'مشترك', city: 'العريش', district: 'قسم ثالث العريش' },
  { id: '12', name: 'الشهيد الخفير عيد سلامه العبد حسين تعليم اساسي / ع', classesCount: 12, grade1Classes: 4, grade2Classes: 4, grade3Classes: 4, type: 'تعليم أساسي', gender: 'بنين', city: 'العريش', district: 'قسم ثالث العريش' },
  { id: '13', name: 'الشهيد الرائد/ رفيق عزت محمد خليل/ ع بنين', classesCount: 12, grade1Classes: 4, grade2Classes: 4, grade3Classes: 4, type: 'إعدادي', gender: 'بنين', city: 'العريش', district: 'قسم ثان العريش' },
  { id: '14', name: 'الشهيد النقيب/ عاصم احمد حسن عبدالوهاب / ع بنين', classesCount: 12, grade1Classes: 4, grade2Classes: 4, grade3Classes: 4, type: 'إعدادي', gender: 'بنين', city: 'العريش', district: 'قسم أول العريش' },
  { id: '15', name: 'الشهيد شريف محمد حسين للتعليم الاساسي / ع بنات', classesCount: 12, grade1Classes: 4, grade2Classes: 4, grade3Classes: 4, type: 'تعليم أساسي', gender: 'بنات', city: 'العريش', district: 'قسم ثان العريش' },
  { id: '16', name: 'الشهيد طارق اسماعيل صدقى / ع', classesCount: 12, grade1Classes: 4, grade2Classes: 4, grade3Classes: 4, type: 'إعدادي', gender: 'مشترك', city: 'العريش', district: 'قسم رابع العريش' },
  { id: '17', name: 'الشهيد عبد الخالق حسين الشهير براشد الرقاية متعددة المراحل / ع', classesCount: 12, grade1Classes: 4, grade2Classes: 4, grade3Classes: 4, type: 'تعليم أساسي', gender: 'مشترك', city: 'العريش', district: 'قسم ثالث العريش' },
  { id: '18', name: 'الشهيد عمر الأحامدة تعليم اساسي اعدادي', classesCount: 12, grade1Classes: 4, grade2Classes: 4, grade3Classes: 4, type: 'تعليم أساسي', gender: 'مشترك', city: 'العريش', district: 'قسم ثالث العريش' },
  { id: '19', name: 'الشهيد ملازم اول مصطفى يحى جاويش للتعليم الاساسى ع بنات', classesCount: 12, grade1Classes: 4, grade2Classes: 4, grade3Classes: 4, type: 'تعليم أساسي', gender: 'بنات', city: 'العريش', district: 'قسم ثالث العريش' },
  { id: '20', name: 'الشهيد/محمد الكاشف للتعليم الاساسي / ع بنين', classesCount: 12, grade1Classes: 4, grade2Classes: 4, grade3Classes: 4, type: 'تعليم أساسي', gender: 'بنين', city: 'العريش', district: 'قسم ثالث العريش' },
  { id: '21', name: 'الشهيده الدكتوره بسمه سعيد راشد للتعليم الأساسي ع بنات', classesCount: 12, grade1Classes: 4, grade2Classes: 4, grade3Classes: 4, type: 'تعليم أساسي', gender: 'بنات', city: 'العريش', district: 'قسم ثان العريش' },
  { id: '22', name: 'الشهيده ندى احمد خميس ابو اقرع تعليم اساسى / ع', classesCount: 12, grade1Classes: 4, grade2Classes: 4, grade3Classes: 4, type: 'تعليم أساسي', gender: 'مشترك', city: 'العريش', district: 'قسم ثالث العريش' },
  { id: '23', name: 'الشيخ محمود عبيد الاعدادية المهنية المشتركه', classesCount: 12, grade1Classes: 4, grade2Classes: 4, grade3Classes: 4, type: 'إعدادي', gender: 'بنين', city: 'العريش', district: 'قسم ثان العريش' },
  { id: '24', name: ' الصفوة متعددة المراحل / ع', classesCount: 12, grade1Classes: 4, grade2Classes: 4, grade3Classes: 4, type: 'تعليم أساسي', gender: 'مشترك', city: 'العريش', district: 'قسم ثالث العريش' },
  { id: '25', name: 'الطويل للتعليم الأساسي المشتركة / ع', classesCount: 12, grade1Classes: 4, grade2Classes: 4, grade3Classes: 4, type: 'تعليم أساسي', gender: 'مشترك', city: 'العريش', district: 'قسم أول العريش' },
  { id: '26', name: 'العاشر من رمضان / ع بنات', classesCount: 12, grade1Classes: 4, grade2Classes: 4, grade3Classes: 4, type: 'إعدادي', gender: 'بنات', city: 'العريش', district: 'قسم ثالث العريش' },
  { id: '27', name: 'العبور للتعليم الاساسى / ع', classesCount: 12, grade1Classes: 4, grade2Classes: 4, grade3Classes: 4, type: 'تعليم أساسي', gender: 'مشترك', city: 'العريش', district: 'قسم أول العريش' },
  { id: '28', name: 'الكرامة للتعليم الاساسى المشتركة / ع', classesCount: 12, grade1Classes: 4, grade2Classes: 4, grade3Classes: 4, type: 'تعليم أساسي', gender: 'مشترك', city: 'العريش', district: 'قسم أول العريش' },
  { id: '29', name: 'المراشدة للتعليم الاساسى / ع', classesCount: 12, grade1Classes: 4, grade2Classes: 4, grade3Classes: 4, type: 'تعليم أساسي', gender: 'مشترك', city: 'العريش', district: 'قسم أول العريش' },
  { id: '30', name: 'الميدان للتعليم الاساسى / ع', classesCount: 12, grade1Classes: 4, grade2Classes: 4, grade3Classes: 4, type: 'تعليم أساسي', gender: 'مشترك', city: 'العريش', district: 'قسم رابع العريش' },
  { id: '31', name: 'بئر لحفن للتعليم الاساسى / ع', classesCount: 12, grade1Classes: 4, grade2Classes: 4, grade3Classes: 4, type: 'تعليم أساسي', gender: 'مشترك', city: 'العريش', district: 'قسم أول العريش' },
  { id: '32', name: 'حمدان الخليلى للتعليم الاساسى / ع', classesCount: 12, grade1Classes: 4, grade2Classes: 4, grade3Classes: 4, type: 'تعليم أساسي', gender: 'بنات', city: 'العريش', district: 'قسم أول العريش' },
  { id: '33', name: 'خيرى طولسون ع بنين', classesCount: 12, grade1Classes: 4, grade2Classes: 4, grade3Classes: 4, type: 'إعدادي', gender: 'بنين', city: 'العريش', district: 'قسم أول العريش' },
  { id: '34', name: 'زارع الخير للتعليم الاساسى المشتركة / ع', classesCount: 12, grade1Classes: 4, grade2Classes: 4, grade3Classes: 4, type: 'تعليم أساسي', gender: 'مشترك', city: 'العريش', district: 'قسم رابع العريش' },
  { id: '35', name: 'صلاح الدين تعليم اساسى / ع بنين', classesCount: 12, grade1Classes: 4, grade2Classes: 4, grade3Classes: 4, type: 'تعليم أساسي', gender: 'مشترك', city: 'العريش', district: 'قسم ثالث العريش' },
  { id: '36', name: 'على بن ابى طالب الاعدادية', classesCount: 12, grade1Classes: 4, grade2Classes: 4, grade3Classes: 4, type: 'إعدادي', gender: 'بنين', city: 'العريش', district: 'قسم رابع العريش' },
  { id: '37', name: 'عمرو بن العاص للتعليم الاساسي ع بنين', classesCount: 12, grade1Classes: 4, grade2Classes: 4, grade3Classes: 4, type: 'تعليم أساسي', gender: 'بنين', city: 'العريش', district: 'قسم ثالث العريش' },
  { id: '38', name: 'فاطمة الزهراء ع بنات', classesCount: 12, grade1Classes: 4, grade2Classes: 4, grade3Classes: 4, type: 'إعدادي', gender: 'بنات', city: 'العريش', district: 'قسم ثان العريش' },
  { id: '39', name: 'يوسف الصديق تعليم أساسي اعدادي', classesCount: 12, grade1Classes: 4, grade2Classes: 4, grade3Classes: 4, type: 'تعليم أساسي', gender: 'مشترك', city: 'العريش', district: 'قسم ثالث العريش' },
];

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>(Section.Dashboard);
  const [schools, setSchools] = useState<School[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [jobDegreeLoads, setJobDegreeLoads] = useState<Record<JobDegree, number>>(JOB_DEGREE_LOADS);
  const [searchQuery, setSearchQuery] = useState('');
  const [reportSearchQuery, setReportSearchQuery] = useState('');
  const [schoolTypeFilter, setSchoolTypeFilter] = useState<string>('الكل');
  const [schoolGenderFilter, setSchoolGenderFilter] = useState<string>('الكل');
  const [teacherGenderFilter, setTeacherGenderFilter] = useState<string>('الكل');
  const [teacherAssignmentFilter, setTeacherAssignmentFilter] = useState<string>('الكل');

  const exportToWord = async () => {
    const doc = new Document({
      sections: [{
        properties: {
          page: {
            margin: {
              top: 720,
              right: 720,
              bottom: 720,
              left: 720,
            },
          },
        },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "تقرير العجز والزيادة للمرحلة الإعدادية",
                bold: true,
                size: 32,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `تاريخ التقرير: ${new Date().toLocaleDateString('ar-EG')}`,
                size: 24,
              }),
            ],
            spacing: { after: 400 },
          }),

          new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [
              new TextRun({
                text: "أولاً: تحليل الاحتياجات حسب المادة",
                bold: true,
                size: 28,
              }),
            ],
            spacing: { before: 400, after: 200 },
          }),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: "المادة", alignment: AlignmentType.CENTER })], verticalAlign: VerticalAlign.CENTER }),
                  new TableCell({ children: [new Paragraph({ text: "إجمالي الحصص", alignment: AlignmentType.CENTER })], verticalAlign: VerticalAlign.CENTER }),
                  new TableCell({ children: [new Paragraph({ text: "المطلوب", alignment: AlignmentType.CENTER })], verticalAlign: VerticalAlign.CENTER }),
                  new TableCell({ children: [new Paragraph({ text: "الحالي", alignment: AlignmentType.CENTER })], verticalAlign: VerticalAlign.CENTER }),
                  new TableCell({ children: [new Paragraph({ text: "الحالة", alignment: AlignmentType.CENTER })], verticalAlign: VerticalAlign.CENTER }),
                ],
              }),
              ...subjects.map(subject => {
                const totalHours = subject.weeklyHours * stats.totalClasses;
                const teachersNeeded = Math.ceil(totalHours / subject.teacherLoad);
                const currentTeachers = teachers.filter(t => t.subjectId === subject.id).length;
                const diff = currentTeachers - teachersNeeded;
                const statusText = diff > 0 ? `زيادة (${diff})` : diff < 0 ? `عجز (${Math.abs(diff)})` : "مكتمل";

                return new TableRow({
                  children: [
                    new TableCell({ children: [new Paragraph({ text: subject.name, alignment: AlignmentType.RIGHT })] }),
                    new TableCell({ children: [new Paragraph({ text: totalHours.toString(), alignment: AlignmentType.CENTER })] }),
                    new TableCell({ children: [new Paragraph({ text: teachersNeeded.toString(), alignment: AlignmentType.CENTER })] }),
                    new TableCell({ children: [new Paragraph({ text: currentTeachers.toString(), alignment: AlignmentType.CENTER })] }),
                    new TableCell({ children: [new Paragraph({ text: statusText, alignment: AlignmentType.CENTER })] }),
                  ],
                });
              }),
            ],
          }),

          new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [
              new TextRun({
                text: "ثانياً: تحليل أنصبة المعلمين (عجز وزيادة)",
                bold: true,
                size: 28,
              }),
            ],
            spacing: { before: 600, after: 200 },
          }),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: "المعلم", alignment: AlignmentType.CENTER })] }),
                  new TableCell({ children: [new Paragraph({ text: "المادة", alignment: AlignmentType.CENTER })] }),
                  new TableCell({ children: [new Paragraph({ text: "المدرسة", alignment: AlignmentType.CENTER })] }),
                  new TableCell({ children: [new Paragraph({ text: "النصاب الأسبوعي", alignment: AlignmentType.CENTER })] }),
                  new TableCell({ children: [new Paragraph({ text: "النصاب الفعلي", alignment: AlignmentType.CENTER })] }),
                  new TableCell({ children: [new Paragraph({ text: "الحالة والفرق", alignment: AlignmentType.CENTER })] }),
                ],
              }),
              ...teachers
                .filter(t => {
                  const search = reportSearchQuery.toLowerCase();
                  const school = schools.find(s => s.id === t.schoolId);
                  const matchesSearch = t.name.toLowerCase().includes(search) || 
                         subjects.find(s => s.id === t.subjectId)?.name.toLowerCase().includes(search) ||
                         school?.name.toLowerCase().includes(search);
                  const matchesType = schoolTypeFilter === 'الكل' || school?.type === schoolTypeFilter;
                  const matchesGender = schoolGenderFilter === 'الكل' || school?.gender === schoolGenderFilter;
                  const matchesTeacherGender = teacherGenderFilter === 'الكل' || t.gender === teacherGenderFilter;
                  return matchesSearch && matchesType && matchesGender && matchesTeacherGender;
                })
                .map(teacher => {
                  const subject = subjects.find(s => s.id === teacher.subjectId);
                  const school = schools.find(s => s.id === teacher.schoolId);
                  const load = jobDegreeLoads[teacher.jobDegree] || subject?.teacherLoad || 0;
                  const diff = teacher.actualHours - load;
                  const statusText = diff > 0 ? `زيادة (+${diff})` : diff < 0 ? `عجز (${diff})` : "مطابق";

                  return new TableRow({
                    children: [
                      new TableCell({ children: [new Paragraph({ text: `${teacher.name} (${teacher.gender})`, alignment: AlignmentType.RIGHT })] }),
                      new TableCell({ children: [new Paragraph({ text: subject?.name || "", alignment: AlignmentType.RIGHT })] }),
                      new TableCell({ children: [new Paragraph({ text: school?.name || "", alignment: AlignmentType.RIGHT })] }),
                      new TableCell({ children: [new Paragraph({ text: load.toString(), alignment: AlignmentType.CENTER })] }),
                      new TableCell({ children: [new Paragraph({ text: teacher.actualHours.toString(), alignment: AlignmentType.CENTER })] }),
                      new TableCell({ children: [new Paragraph({ text: statusText, alignment: AlignmentType.CENTER })] }),
                    ],
                  });
                }),
            ],
          }),

          new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [
              new TextRun({
                text: "ثالثاً: توزيع المعلمين (ذكر/أنثى) حسب المدرسة",
                bold: true,
                size: 28,
              }),
            ],
            spacing: { before: 600, after: 200 },
          }),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: "المدرسة", alignment: AlignmentType.CENTER })] }),
                  new TableCell({ children: [new Paragraph({ text: "ذكر", alignment: AlignmentType.CENTER })] }),
                  new TableCell({ children: [new Paragraph({ text: "أنثى", alignment: AlignmentType.CENTER })] }),
                  new TableCell({ children: [new Paragraph({ text: "الإجمالي", alignment: AlignmentType.CENTER })] }),
                ],
              }),
              ...schools
                .filter(s => {
                  const matchesType = schoolTypeFilter === 'الكل' || s.type === schoolTypeFilter;
                  const matchesGender = schoolGenderFilter === 'الكل' || s.gender === schoolGenderFilter;
                  return matchesType && matchesGender;
                })
                .map(school => {
                  const schoolTeachers = teachers.filter(t => t.schoolId === school.id);
                  const maleCount = schoolTeachers.filter(t => t.gender === 'ذكر').length;
                  const femaleCount = schoolTeachers.filter(t => t.gender === 'أنثى').length;
                  
                  if (schoolTeachers.length === 0) return null;

                  return new TableRow({
                    children: [
                      new TableCell({ children: [new Paragraph({ text: school.name, alignment: AlignmentType.RIGHT })] }),
                      new TableCell({ children: [new Paragraph({ text: maleCount.toString(), alignment: AlignmentType.CENTER })] }),
                      new TableCell({ children: [new Paragraph({ text: femaleCount.toString(), alignment: AlignmentType.CENTER })] }),
                      new TableCell({ children: [new Paragraph({ text: schoolTeachers.length.toString(), alignment: AlignmentType.CENTER })] }),
                    ],
                  });
                }).filter(row => row !== null) as TableRow[],
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "الإجمالي العام", bold: true })], alignment: AlignmentType.RIGHT })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: stats.totalMaleTeachers.toString(), bold: true })], alignment: AlignmentType.CENTER })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: stats.totalFemaleTeachers.toString(), bold: true })], alignment: AlignmentType.CENTER })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: stats.totalTeachers.toString(), bold: true })], alignment: AlignmentType.CENTER })] }),
                ],
              }),
            ],
          }),

          new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [
              new TextRun({
                text: "رابعاً: ملخص المرحلة",
                bold: true,
                size: 28,
              }),
            ],
            spacing: { before: 600, after: 200 },
          }),

          new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: `إجمالي المدارس: ${stats.totalSchools}` })] }),
          new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: `إجمالي الفصول: ${stats.totalClasses}` })] }),
          new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: `إجمالي المواد: ${stats.totalSubjects}` })] }),
          new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: `إجمالي المعلمين المطلوبين: ${stats.totalTeachersNeeded}`, bold: true })] }),
        ],
      }],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `تقرير_العجز_والزيادة_${new Date().toLocaleDateString('ar-EG')}.docx`);
  };
  
  // Modals state
  const [showSchoolModal, setShowSchoolModal] = useState(false);
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [showTeacherModal, setShowTeacherModal] = useState(false);
  const [showLoadsModal, setShowLoadsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteSubjectModal, setShowDeleteSubjectModal] = useState(false);
  const [showDeleteTeacherModal, setShowDeleteTeacherModal] = useState(false);
  const [showPersonnelModal, setShowPersonnelModal] = useState(false);
  const [schoolToDelete, setSchoolToDelete] = useState<string | null>(null);
  const [subjectToDelete, setSubjectToDelete] = useState<string | null>(null);
  const [teacherToDelete, setTeacherToDelete] = useState<string | null>(null);
  const [selectedSchoolForPersonnel, setSelectedSchoolForPersonnel] = useState<School | null>(null);
  const [editingSchool, setEditingSchool] = useState<School | null>(null);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [loadsForm, setLoadsForm] = useState<Record<JobDegree, number>>(JOB_DEGREE_LOADS);

  // Form states
  const [schoolForm, setSchoolForm] = useState({ 
    name: '', 
    classesCount: 0, 
    grade1Classes: 0,
    grade2Classes: 0,
    grade3Classes: 0,
    type: 'إعدادي' as 'إعدادي' | 'تعليم أساسي', 
    gender: 'مشترك' as 'بنين' | 'بنات' | 'مشترك', 
    city: 'العريش', 
    district: '' 
  });
  const [subjectForm, setSubjectForm] = useState({ name: '', weeklyHours: 0, teacherLoad: 0, icon: 'Book' });
  const [teacherForm, setTeacherForm] = useState({ 
    name: '', 
    code: '', 
    nationalId: '', 
    qualification: '', 
    qualificationDate: '', 
    appointmentDate: '', 
    jobDegree: 'معلم' as JobDegree, 
    gender: 'ذكر' as 'ذكر' | 'أنثى',
    specialization: '', 
    status: 'أصلي' as 'أصلي' | 'منتدب' | 'تكليف', 
    mobile: '', 
    address: '', 
    subjectId: '', 
    schoolId: '', 
    actualHours: 0 
  });

  // Load initial data
  useEffect(() => {
    const savedSchools = localStorage.getItem('schools');
    const savedSubjects = localStorage.getItem('subjects');
    const savedTeachers = localStorage.getItem('teachers');
    const savedLoads = localStorage.getItem('jobDegreeLoads');
    
    if (savedSchools) {
      const parsed = JSON.parse(savedSchools);
      if (parsed.length === 0) {
        setSchools(DEFAULT_SCHOOLS);
        localStorage.setItem('schools', JSON.stringify(DEFAULT_SCHOOLS));
      } else {
        setSchools(parsed);
      }
    } else {
      setSchools(DEFAULT_SCHOOLS);
      localStorage.setItem('schools', JSON.stringify(DEFAULT_SCHOOLS));
    }

    const defaultSubjects = [
      { id: '1', name: 'اللغة العربية', weeklyHours: 6, teacherLoad: 18, icon: 'Languages' },
      { id: '2', name: 'اللغة الإنجليزية', weeklyHours: 5, teacherLoad: 18, icon: 'Globe' },
      { id: '3', name: 'الرياضيات', weeklyHours: 5, teacherLoad: 18, icon: 'Binary' },
      { id: '4', name: 'العلوم', weeklyHours: 4, teacherLoad: 18, icon: 'Microscope' },
      { id: '5', name: 'الدراسات الاجتماعية', weeklyHours: 3, teacherLoad: 18, icon: 'Map' },
      { id: '6', name: 'اللغة الفرنسية', weeklyHours: 2, teacherLoad: 18, icon: 'Languages' },
      { id: '7', name: 'التربية الرياضية', weeklyHours: 2, teacherLoad: 18, icon: 'Trophy' },
      { id: '8', name: 'التربية الفنية', weeklyHours: 2, teacherLoad: 18, icon: 'Palette' },
      { id: '9', name: 'التربية الموسيقية', weeklyHours: 2, teacherLoad: 18, icon: 'Music' },
      { id: '10', name: 'الحاسب الآلي', weeklyHours: 2, teacherLoad: 18, icon: 'Monitor' },
    ];

    if (savedSubjects) {
      const currentSubjects: Subject[] = JSON.parse(savedSubjects);
      // Add missing default subjects
      const missingSubjects = defaultSubjects.filter(ds => 
        !currentSubjects.some(cs => cs.name === ds.name)
      );
      if (missingSubjects.length > 0) {
        const updated = [...currentSubjects, ...missingSubjects.map(ms => ({ ...ms, id: Date.now().toString() + Math.random() }))];
        setSubjects(updated);
        localStorage.setItem('subjects', JSON.stringify(updated));
      } else {
        setSubjects(currentSubjects);
      }
    } else {
      setSubjects(defaultSubjects);
      localStorage.setItem('subjects', JSON.stringify(defaultSubjects));
    }

    if (savedTeachers) setTeachers(JSON.parse(savedTeachers));
    else {
      const initialTeachers: Teacher[] = [
        { 
          id: '1', 
          name: 'أحمد محمد علي', 
          code: '123456', 
          nationalId: '29001010101234', 
          qualification: 'بكالوريوس تربية', 
          qualificationDate: '2012-05-01', 
          appointmentDate: '2013-09-01', 
          jobDegree: 'معلم', 
          gender: 'ذكر',
          specialization: 'لغة عربية', 
          status: 'أصلي', 
          mobile: '01012345678', 
          address: 'العريش', 
          subjectId: '1', 
          schoolId: '1', 
          actualHours: 18 
        },
        { 
          id: '2', 
          name: 'سارة محمود', 
          code: '654321', 
          nationalId: '29501010101234', 
          qualification: 'ليسانس آداب وتربية', 
          qualificationDate: '2015-05-01', 
          appointmentDate: '2016-09-01', 
          jobDegree: 'معلم مساعد', 
          gender: 'أنثى',
          specialization: 'لغة إنجليزية', 
          status: 'أصلي', 
          mobile: '01112345678', 
          address: 'العريش', 
          subjectId: '2', 
          schoolId: '1', 
          actualHours: 15 
        },
      ];
      setTeachers(initialTeachers);
      localStorage.setItem('teachers', JSON.stringify(initialTeachers));
    }

    if (savedLoads) {
      const parsed = JSON.parse(savedLoads);
      setJobDegreeLoads(parsed);
      setLoadsForm(parsed);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('schools', JSON.stringify(schools));
  }, [schools]);

  useEffect(() => {
    localStorage.setItem('subjects', JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem('teachers', JSON.stringify(teachers));
  }, [teachers]);

  useEffect(() => {
    localStorage.setItem('jobDegreeLoads', JSON.stringify(jobDegreeLoads));
  }, [jobDegreeLoads]);

  const filteredSchools = useMemo(() => {
    return schools.filter(s => {
      const matchesSearch = s.name.includes(searchQuery);
      const matchesType = schoolTypeFilter === 'الكل' || s.type === schoolTypeFilter;
      const matchesGender = schoolGenderFilter === 'الكل' || s.gender === schoolGenderFilter;
      return matchesSearch && matchesType && matchesGender;
    });
  }, [schools, searchQuery, schoolTypeFilter, schoolGenderFilter]);

  const stats = useMemo(() => {
    const filteredForStats = schools.filter(s => {
      const matchesType = schoolTypeFilter === 'الكل' || s.type === schoolTypeFilter;
      const matchesGender = schoolGenderFilter === 'الكل' || s.gender === schoolGenderFilter;
      return matchesType && matchesGender;
    });

    const totalClasses = filteredForStats.reduce((acc, s) => acc + s.classesCount, 0);
    const filteredTeachers = teachers.filter(t => filteredForStats.some(s => s.id === t.schoolId));
    const totalMaleTeachers = filteredTeachers.filter(t => t.gender === 'ذكر').length;
    const totalFemaleTeachers = filteredTeachers.filter(t => t.gender === 'أنثى').length;

    const totalTeachersNeeded = subjects.reduce((acc, sub) => {
      const hoursForSubject = sub.weeklyHours * totalClasses;
      return acc + Math.ceil(hoursForSubject / sub.teacherLoad);
    }, 0);

    return {
      totalSchools: filteredForStats.length,
      totalSubjects: subjects.length,
      totalTeachers: filteredTeachers.length,
      totalMaleTeachers,
      totalFemaleTeachers,
      totalClasses,
      totalTeachersNeeded
    };
  }, [schools, subjects, teachers, schoolTypeFilter, schoolGenderFilter]);

  const handleAddSchool = (e: React.FormEvent) => {
    e.preventDefault();
    const totalClasses = (schoolForm.grade1Classes || 0) + (schoolForm.grade2Classes || 0) + (schoolForm.grade3Classes || 0);
    const updatedForm = { ...schoolForm, classesCount: totalClasses };
    
    if (editingSchool) {
      setSchools(schools.map(s => s.id === editingSchool.id ? { ...editingSchool, ...updatedForm } : s));
      setEditingSchool(null);
    } else {
      const newSchool: School = {
        id: Date.now().toString(),
        ...updatedForm
      };
      setSchools([...schools, newSchool]);
    }
    setSchoolForm({ 
      name: '', 
      classesCount: 0, 
      grade1Classes: 0, 
      grade2Classes: 0, 
      grade3Classes: 0, 
      type: 'إعدادي', 
      gender: 'مشترك', 
      city: 'العريش', 
      district: '' 
    });
    setShowSchoolModal(false);
  };

  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSubject) {
      setSubjects(subjects.map(s => s.id === editingSubject.id ? { ...editingSubject, ...subjectForm } : s));
      setEditingSubject(null);
    } else {
      const newSubject: Subject = {
        id: Date.now().toString(),
        name: subjectForm.name,
        weeklyHours: subjectForm.weeklyHours,
        teacherLoad: subjectForm.teacherLoad,
        icon: subjectForm.icon
      };
      setSubjects([...subjects, newSubject]);
    }
    setSubjectForm({ name: '', weeklyHours: 0, teacherLoad: 0, icon: 'Book' });
    setShowSubjectModal(false);
  };

  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTeacher) {
      setTeachers(teachers.map(t => t.id === editingTeacher.id ? { ...editingTeacher, ...teacherForm } : t));
      setEditingTeacher(null);
    } else {
      const newTeacher: Teacher = {
        id: Date.now().toString(),
        ...teacherForm
      };
      setTeachers([...teachers, newTeacher]);
    }
    setTeacherForm({ 
      name: '', 
      code: '', 
      nationalId: '', 
      qualification: '', 
      qualificationDate: '', 
      appointmentDate: '', 
      jobDegree: 'معلم', 
      gender: 'ذكر',
      specialization: '', 
      status: 'أصلي', 
      mobile: '', 
      address: '', 
      subjectId: '', 
      schoolId: '', 
      actualHours: 0 
    });
    setShowTeacherModal(false);
  };

  const handleUpdateLoads = (e: React.FormEvent) => {
    e.preventDefault();
    setJobDegreeLoads(loadsForm);
    setShowLoadsModal(false);
  };

  const deleteSchool = (id: string) => {
    setSchoolToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDeleteSchool = () => {
    if (schoolToDelete) {
      setSchools(schools.filter(s => s.id !== schoolToDelete));
      setSchoolToDelete(null);
      setShowDeleteModal(false);
    }
  };

  const deleteSubject = (id: string) => {
    setSubjectToDelete(id);
    setShowDeleteSubjectModal(true);
  };

  const handleDeleteSubject = () => {
    if (subjectToDelete) {
      setSubjects(subjects.filter(s => s.id !== subjectToDelete));
      setSubjectToDelete(null);
      setShowDeleteSubjectModal(false);
    }
  };

  const deleteTeacher = (id: string) => {
    setTeacherToDelete(id);
    setShowDeleteTeacherModal(true);
  };

  const handleDeleteTeacher = () => {
    if (teacherToDelete) {
      setTeachers(teachers.filter(t => t.id !== teacherToDelete));
      setTeacherToDelete(null);
      setShowDeleteTeacherModal(false);
    }
  };

  const autoPopulateSchools = () => {
    const missingSchools = DEFAULT_SCHOOLS.filter(ds => 
      !schools.some(s => s.name === ds.name)
    );
    if (missingSchools.length > 0) {
      const updated = [...schools, ...missingSchools];
      setSchools(updated);
      localStorage.setItem('schools', JSON.stringify(updated));
      alert(`تم إضافة ${missingSchools.length} مدرسة جديدة بنجاح.`);
    } else {
      alert('جميع المدارس الافتراضية موجودة بالفعل.');
    }
  };

  const openEditSchool = (school: School) => {
    setEditingSchool(school);
    setSchoolForm({ 
      name: school.name, 
      classesCount: school.classesCount,
      grade1Classes: school.grade1Classes || 0,
      grade2Classes: school.grade2Classes || 0,
      grade3Classes: school.grade3Classes || 0,
      type: school.type || 'إعدادي',
      gender: school.gender || 'مشترك',
      city: school.city || 'العريش',
      district: school.district || ''
    });
    setShowSchoolModal(true);
  };

  const openEditSubject = (subject: Subject) => {
    setEditingSubject(subject);
    setSubjectForm({ 
      name: subject.name, 
      weeklyHours: subject.weeklyHours, 
      teacherLoad: subject.teacherLoad,
      icon: subject.icon || 'Book'
    });
    setShowSubjectModal(true);
  };

  const openEditTeacher = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setTeacherForm({ 
      name: teacher.name || '', 
      code: teacher.code || '',
      nationalId: teacher.nationalId || '',
      qualification: teacher.qualification || '',
      qualificationDate: teacher.qualificationDate || '',
      appointmentDate: teacher.appointmentDate || '',
      jobDegree: teacher.jobDegree || 'معلم',
      gender: teacher.gender || 'ذكر',
      specialization: teacher.specialization || '',
      status: teacher.status || 'أصلي',
      mobile: teacher.mobile || '',
      address: teacher.address || '',
      subjectId: teacher.subjectId || '', 
      schoolId: teacher.schoolId || '', 
      actualHours: teacher.actualHours || 0 
    });
    setShowTeacherModal(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      {/* Header */}
      <header className="bg-indigo-700 text-white py-8 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-2xl">
              <SchoolIcon size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">نظام إدارة العجز والزيادة لمدارس إدارة العريش التعليمية</h1>
              <p className="text-indigo-100 mt-1 opacity-90">تصميم وبرمجة: دكتور. أحمد حمدي عاشور الغول</p>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto no-scrollbar">
            {[
              { id: Section.Dashboard, label: 'لوحة التحكم', icon: LayoutDashboard },
              { id: Section.Schools, label: 'المدارس', icon: SchoolIcon },
              { id: Section.Subjects, label: 'المواد الدراسية', icon: Book },
              { id: Section.Teachers, label: 'المعلمون', icon: Users },
              { id: Section.Reports, label: 'التقارير', icon: BarChart3 },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all border-b-2 whitespace-nowrap ${
                  activeSection === item.id 
                    ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50' 
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex-grow">
        <AnimatePresence mode="wait">
          {activeSection === Section.Dashboard && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <LayoutDashboard className="text-indigo-600" />
                  لوحة التحكم الرئيسية
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                  title="إجمالي المدارس" 
                  value={stats.totalSchools} 
                  icon={<SchoolIcon className="text-blue-600" />} 
                  color="bg-blue-50"
                />
                <StatCard 
                  title="المواد الدراسية" 
                  value={stats.totalSubjects} 
                  icon={<Book className="text-emerald-600" />} 
                  color="bg-emerald-50"
                />
                <StatCard 
                  title="إجمالي الفصول" 
                  value={stats.totalClasses} 
                  icon={<LayoutDashboard className="text-amber-600" />} 
                  color="bg-amber-50"
                />
                <StatCard 
                  title="إجمالي المعلمين" 
                  value={stats.totalTeachers} 
                  icon={<Users className="text-indigo-600" />} 
                  color="bg-indigo-50"
                  subtitle={`${stats.totalMaleTeachers} ذكر / ${stats.totalFemaleTeachers} أنثى`}
                />
                <StatCard 
                  title="المعلمون المطلوبون" 
                  value={stats.totalTeachersNeeded} 
                  icon={<Calculator className="text-rose-600" />} 
                  color="bg-rose-50"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                  <h3 className="text-lg font-bold mb-6">إجراءات سريعة</h3>
                  <div className="flex flex-wrap gap-4">
                    <button 
                      onClick={() => { setEditingSchool(null); setSchoolForm({ name: '', classesCount: 0, grade1Classes: 0, grade2Classes: 0, grade3Classes: 0, type: 'إعدادي', gender: 'مشترك', city: 'العريش', district: '' }); setShowSchoolModal(true); }}
                      className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
                    >
                      <Plus size={20} />
                      إضافة مدرسة جديدة
                    </button>
                    <button 
                      onClick={() => { setEditingSubject(null); setSubjectForm({ name: '', weeklyHours: 0, teacherLoad: 0, icon: 'Book' }); setShowSubjectModal(true); }}
                      className="flex items-center gap-2 bg-white text-slate-700 border border-slate-200 px-6 py-3 rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
                    >
                      <Plus size={20} />
                      إضافة مادة دراسية
                    </button>
                    <button 
                      onClick={() => { 
                        setEditingTeacher(null); 
                        setTeacherForm({ 
                          name: '', 
                          code: '', 
                          nationalId: '', 
                          qualification: '', 
                          qualificationDate: '', 
                          appointmentDate: '', 
                          jobDegree: 'معلم', 
                          specialization: '', 
                          status: 'أصلي', 
                          mobile: '', 
                          address: '', 
                          subjectId: '', 
                          schoolId: '', 
                          actualHours: 0 
                        }); 
                        setShowTeacherModal(true); 
                      }}
                      className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition-colors shadow-sm"
                    >
                      <Plus size={20} />
                      إضافة معلم جديد
                    </button>
                    <button 
                      onClick={() => { setActiveSection(Section.Reports); setTimeout(() => window.print(), 500); }}
                      className="flex items-center gap-2 bg-slate-100 text-slate-700 px-6 py-3 rounded-xl hover:bg-slate-200 transition-colors shadow-sm"
                    >
                      <Printer size={20} />
                      طباعة التقارير
                    </button>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <Calculator size={20} className="text-indigo-600" />
                      الأنصبة القانونية (للمرحلة الإعدادية)
                    </h3>
                    <button 
                      onClick={() => { setLoadsForm(jobDegreeLoads); setShowLoadsModal(true); }}
                      className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                      title="تعديل الأنصبة"
                    >
                      <Edit2 size={18} />
                    </button>
                  </div>
                  <div className="space-y-3">
                    {Object.entries(jobDegreeLoads).map(([degree, load]) => (
                      <div key={degree} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <span className="font-medium text-slate-700">{degree}</span>
                        <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg font-bold text-sm">{load} حصة</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === Section.Schools && (
            <motion.div
              key="schools"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <SchoolIcon className="text-indigo-600" />
                  إدارة المدارس
                </h2>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={autoPopulateSchools}
                    className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2.5 rounded-xl hover:bg-emerald-100 transition-colors shadow-sm border border-emerald-100"
                  >
                    <RefreshCw size={18} />
                    إضافة كافة المدارس تلقائياً
                  </button>
                  <button 
                    onClick={() => {
                      if (confirm('هل أنت متأكد من رغبتك في إعادة ضبط قائمة المدارس إلى القائمة الافتراضية؟ سيؤدي ذلك إلى حذف أي مدارس قمت بإضافتها يدوياً.')) {
                        setSchools(DEFAULT_SCHOOLS);
                        localStorage.setItem('schools', JSON.stringify(DEFAULT_SCHOOLS));
                      }
                    }}
                    className="flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-2.5 rounded-xl hover:bg-slate-200 transition-colors shadow-sm"
                  >
                    <RefreshCw size={18} />
                    إعادة ضبط
                  </button>
                  <button 
                    onClick={() => { setEditingSchool(null); setSchoolForm({ name: '', classesCount: 0, grade1Classes: 0, grade2Classes: 0, grade3Classes: 0, type: 'إعدادي', gender: 'مشترك', city: 'العريش', district: '' }); setShowSchoolModal(true); }}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
                  >
                    <Plus size={18} />
                    إضافة مدرسة
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                  <div className="flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative flex-1 w-full">
                      <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        type="text" 
                        placeholder="البحث في المدارس..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pr-10 pl-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white"
                      />
                    </div>
                    <div className="flex gap-3 w-full md:w-auto">
                      <select 
                        value={schoolTypeFilter}
                        onChange={(e) => setSchoolTypeFilter(e.target.value)}
                        className="px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white text-sm"
                      >
                        <option value="الكل">كل الأنواع</option>
                        <option value="إعدادي">إعدادي</option>
                        <option value="تعليم أساسي">تعليم أساسي</option>
                      </select>
                      <select 
                        value={schoolGenderFilter}
                        onChange={(e) => setSchoolGenderFilter(e.target.value)}
                        className="px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white text-sm"
                      >
                        <option value="الكل">كل التصنيفات</option>
                        <option value="بنين">بنين</option>
                        <option value="بنات">بنات</option>
                        <option value="مشترك">مشترك</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-right">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 text-sm uppercase tracking-wider">
                        <th className="px-6 py-4 font-semibold">اسم المدرسة</th>
                        <th className="px-6 py-4 font-semibold">النوع</th>
                        <th className="px-6 py-4 font-semibold">التصنيف</th>
                        <th className="px-6 py-4 font-semibold">المنطقة</th>
                        <th className="px-6 py-4 font-semibold">عدد الفصول</th>
                        <th className="px-6 py-4 font-semibold">إجمالي الحصص</th>
                        <th className="px-6 py-4 font-semibold">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredSchools.map((school) => (
                        <tr key={school.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-4 font-medium">{school.name}</td>
                          <td className="px-6 py-4">
                            <span className="text-xs px-2 py-1 bg-indigo-50 text-indigo-700 rounded-lg font-medium">
                              {school.type}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-xs px-2 py-1 bg-slate-100 text-slate-700 rounded-lg">
                              {school.gender}
                            </span>
                          </td>
                          <td className="px-6 py-4">{school.district}</td>
                          <td className="px-6 py-4">{school.classesCount}</td>
                          <td className="px-6 py-4">
                            {subjects.reduce((acc, s) => acc + (s.weeklyHours * school.classesCount), 0)} حصة
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => { setSelectedSchoolForPersonnel(school); setShowPersonnelModal(true); }}
                                title="عرض قاعدة بيانات العاملين"
                                className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                              >
                                <Users size={16} />
                              </button>
                              <button 
                                onClick={() => openEditSchool(school)}
                                className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button 
                                onClick={() => deleteSchool(school.id)}
                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredSchools.length === 0 && (
                        <tr>
                          <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                            لا توجد مدارس مطابقة للبحث
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === Section.Subjects && (
            <motion.div
              key="subjects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Book className="text-indigo-600" />
                  إدارة المواد الدراسية
                </h2>
                <button 
                  onClick={() => { setEditingSubject(null); setSubjectForm({ name: '', weeklyHours: 0, teacherLoad: 0, icon: 'Book' }); setShowSubjectModal(true); }}
                  className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm self-start"
                >
                  <Plus size={18} />
                  إضافة مادة
                </button>
              </div>

              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-right">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 text-sm uppercase tracking-wider">
                        <th className="px-6 py-4 font-semibold">المادة الدراسية</th>
                        <th className="px-6 py-4 font-semibold">عدد الحصص أسبوعياً</th>
                        <th className="px-6 py-4 font-semibold">النصاب الأسبوعي للمعلم</th>
                        <th className="px-6 py-4 font-semibold">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {subjects.map((subject) => (
                        <tr key={subject.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-4 font-medium flex items-center gap-3">
                            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                              <SubjectIcon iconName={subject.icon} size={18} />
                            </div>
                            {subject.name}
                          </td>
                          <td className="px-6 py-4">{subject.weeklyHours} حصص</td>
                          <td className="px-6 py-4">{subject.teacherLoad} حصة</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => openEditSubject(subject)}
                                className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button 
                                onClick={() => deleteSubject(subject.id)}
                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === Section.Teachers && (
            <motion.div
              key="teachers"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Users className="text-indigo-600" />
                  إدارة المعلمين
                </h2>
                <div className="flex items-center gap-3">
                  <select 
                    value={teacherAssignmentFilter}
                    onChange={(e) => setTeacherAssignmentFilter(e.target.value)}
                    className="px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white text-sm"
                  >
                    <option value="الكل">كل حالات التسكين</option>
                    <option value="مسكن">مسكن بمدرسة</option>
                    <option value="غير مسكن">غير مسكن</option>
                  </select>
                  <select 
                    value={teacherGenderFilter}
                    onChange={(e) => setTeacherGenderFilter(e.target.value)}
                    className="px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white text-sm"
                  >
                    <option value="الكل">كل الأنواع</option>
                    <option value="ذكر">ذكر</option>
                    <option value="أنثى">أنثى</option>
                  </select>
                  <button 
                    onClick={() => { setEditingTeacher(null); setTeacherForm({ name: '', code: '', nationalId: '', qualification: '', qualificationDate: '', appointmentDate: '', jobDegree: 'معلم', gender: 'ذكر', specialization: '', status: 'أصلي', mobile: '', address: '', subjectId: '', schoolId: '', actualHours: 0 }); setShowTeacherModal(true); }}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm self-start"
                  >
                    <Plus size={18} />
                    إضافة معلم
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-right">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 text-sm uppercase tracking-wider">
                        <th className="px-6 py-4 font-semibold">اسم المعلم</th>
                        <th className="px-6 py-4 font-semibold">النوع</th>
                        <th className="px-6 py-4 font-semibold">كود المعلم</th>
                        <th className="px-6 py-4 font-semibold">المادة</th>
                        <th className="px-6 py-4 font-semibold">المدرسة</th>
                        <th className="px-6 py-4 font-semibold">الدرجة</th>
                        <th className="px-6 py-4 font-semibold">النصاب القانوني</th>
                        <th className="px-6 py-4 font-semibold">النصاب الفعلي</th>
                        <th className="px-6 py-4 font-semibold">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {teachers
                        .filter(t => {
                          const matchesGender = teacherGenderFilter === 'الكل' || t.gender === teacherGenderFilter;
                          const matchesAssignment = teacherAssignmentFilter === 'الكل' || 
                            (teacherAssignmentFilter === 'مسكن' ? t.schoolId !== '' : t.schoolId === '');
                          return matchesGender && matchesAssignment;
                        })
                        .map((teacher) => (
                        <tr key={teacher.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-4 font-medium">{teacher.name}</td>
                          <td className="px-6 py-4">
                            <span className={`text-[10px] px-2 py-0.5 rounded-full ${teacher.gender === 'ذكر' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'}`}>
                              {teacher.gender}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-mono text-xs">{teacher.code}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <SubjectIcon iconName={subjects.find(s => s.id === teacher.subjectId)?.icon} size={14} className="text-slate-400" />
                              {subjects.find(s => s.id === teacher.subjectId)?.name || 'غير محدد'}
                            </div>
                          </td>
                          <td className="px-6 py-4">{schools.find(s => s.id === teacher.schoolId)?.name || 'غير محدد'}</td>
                          <td className="px-6 py-4">
                            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-lg">
                              {teacher.jobDegree}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-bold text-indigo-600">
                            {jobDegreeLoads[teacher.jobDegree] || 0} حصة
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <span className="font-bold">{teacher.actualHours} حصة</span>
                              {teacher.actualHours > (jobDegreeLoads[teacher.jobDegree] || 0) && (
                                <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-md">زيادة</span>
                              )}
                              {teacher.actualHours < (jobDegreeLoads[teacher.jobDegree] || 0) && (
                                <span className="text-[10px] bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded-md">عجز</span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              {teacher.schoolId === '' && (
                                <button 
                                  onClick={() => openEditTeacher(teacher)}
                                  title="تسكين المعلم بمدرسة"
                                  className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                                >
                                  <Link size={16} />
                                </button>
                              )}
                              <button 
                                onClick={() => openEditTeacher(teacher)}
                                className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button 
                                onClick={() => deleteTeacher(teacher.id)}
                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {teachers.length === 0 && (
                        <tr>
                          <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                            لا يوجد معلمون مسجلون حالياً
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === Section.Reports && (
            <motion.div
              key="reports"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Print Only Header */}
              <div className="hidden print:block mb-8 border-b-2 border-slate-800 pb-4 text-center">
                <h1 className="text-3xl font-bold mb-2">نظام إدارة العجز والزيادة لمدارس إدارة العريش التعليمية</h1>
                <h2 className="text-xl font-bold mb-2">تقرير العجز والزيادة للمرحلة الإعدادية</h2>
                <div className="flex justify-between text-sm text-slate-600 mt-4">
                  <span>تاريخ التقرير: {new Date().toLocaleDateString('ar-EG')}</span>
                  <span>تصميم وبرمجة: دكتور. أحمد حمدي عاشور الغول</span>
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <BarChart3 className="text-indigo-600" />
                  التقارير والإحصائيات
                </h2>
                <div className="flex items-center gap-3 no-print">
                  <select 
                    value={schoolTypeFilter}
                    onChange={(e) => setSchoolTypeFilter(e.target.value)}
                    className="px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white text-sm"
                  >
                    <option value="الكل">كل أنواع المدارس</option>
                    <option value="إعدادي">إعدادي فقط</option>
                    <option value="تعليم أساسي">تعليم أساسي</option>
                  </select>
                  <select 
                    value={schoolGenderFilter}
                    onChange={(e) => setSchoolGenderFilter(e.target.value)}
                    className="px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white text-sm"
                  >
                    <option value="الكل">كل التصنيفات</option>
                    <option value="بنين">بنين</option>
                    <option value="بنات">بنات</option>
                    <option value="مشترك">مشترك</option>
                  </select>
                  <select 
                    value={teacherGenderFilter}
                    onChange={(e) => setTeacherGenderFilter(e.target.value)}
                    className="px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white text-sm"
                  >
                    <option value="الكل">كل أنواع المعلمين</option>
                    <option value="ذكر">ذكر</option>
                    <option value="أنثى">أنثى</option>
                  </select>
                  <button 
                    onClick={exportToWord}
                    className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 transition-colors shadow-sm self-start"
                  >
                    <Download size={18} />
                    تصدير Word
                  </button>
                  <button 
                    onClick={() => window.print()}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm self-start"
                  >
                    <Printer size={18} />
                    طباعة التقرير
                  </button>
                </div>
              </div>

              {/* Visualization Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 no-print">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                  <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <BarChart3 size={20} className="text-indigo-600" />
                    تحليل العجز والزيادة حسب المادة
                  </h3>
                  <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={subjects.map(subject => {
                          const totalHours = subject.weeklyHours * stats.totalClasses;
                          const teachersNeeded = Math.ceil(totalHours / subject.teacherLoad);
                          const currentTeachers = teachers.filter(t => t.subjectId === subject.id).length;
                          return {
                            name: subject.name,
                            المطلوب: teachersNeeded,
                            الحالي: currentTeachers
                          };
                        })}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                        <Tooltip 
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        />
                        <Legend iconType="circle" />
                        <Bar dataKey="المطلوب" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={20} />
                        <Bar dataKey="الحالي" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                  <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <Users size={20} className="text-indigo-600" />
                    توزيع المعلمين حسب المادة
                  </h3>
                  <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={subjects.map(subject => ({
                            name: subject.name,
                            value: teachers.filter(t => t.subjectId === subject.id).length
                          })).filter(d => d.value > 0)}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {subjects.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={[
                              '#6366f1', '#10b981', '#f59e0b', '#ef4444', 
                              '#8b5cf6', '#ec4899', '#06b6d4', '#f97316'
                            ][index % 8]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        />
                        <Legend iconType="circle" />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-bold">تحليل الاحتياجات حسب المادة</h3>
                      <button 
                        onClick={() => window.print()}
                        className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all no-print"
                        title="طباعة هذا التحليل"
                      >
                        <Printer size={20} />
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-right text-sm">
                        <thead>
                          <tr className="text-slate-500 border-b border-slate-100">
                            <th className="pb-4 pr-2">المادة</th>
                            <th className="pb-4">إجمالي الحصص</th>
                            <th className="pb-4">المطلوب</th>
                            <th className="pb-4">الحالي</th>
                            <th className="pb-4">الحالة</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {subjects.map(subject => {
                            const totalHours = subject.weeklyHours * stats.totalClasses;
                            const teachersNeeded = Math.ceil(totalHours / subject.teacherLoad);
                            const currentTeachers = teachers.filter(t => t.subjectId === subject.id).length;
                            const deficit = Math.max(0, teachersNeeded - currentTeachers);
                            const surplus = Math.max(0, currentTeachers - teachersNeeded);

                            return (
                              <tr key={subject.id} className="hover:bg-slate-50/50">
                                <td className="py-4 pr-2 font-bold flex items-center gap-2">
                                  <SubjectIcon iconName={subject.icon} size={16} className="text-indigo-500" />
                                  {subject.name}
                                </td>
                                <td className="py-4">{totalHours}</td>
                                <td className="py-4 font-medium">{teachersNeeded}</td>
                                <td className="py-4">{currentTeachers}</td>
                                <td className="py-4">
                                  {deficit > 0 && (
                                    <span className="px-2 py-1 bg-rose-50 text-rose-700 rounded-lg text-xs font-bold border border-rose-100">عجز: {deficit}</span>
                                  )}
                                  {surplus > 0 && (
                                    <span className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold border border-emerald-100">زيادة: {surplus}</span>
                                  )}
                                  {deficit === 0 && surplus === 0 && (
                                    <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold border border-blue-100">مكتمل</span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Teacher Details Section in Reports */}
                  <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                      <h3 className="text-lg font-bold flex items-center gap-2">
                        <Users size={20} className="text-indigo-600" />
                        تحليل أنصبة المعلمين (عجز وزيادة)
                      </h3>
                      <div className="flex items-center gap-3 no-print">
                        <button 
                          onClick={() => window.print()}
                          className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                          title="طباعة هذا الجدول"
                        >
                          <Printer size={20} />
                        </button>
                        <div className="relative w-full md:w-64">
                          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                          <input 
                            type="text" 
                            placeholder="بحث عن معلم..."
                            value={reportSearchQuery}
                            className="w-full pr-10 pl-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-sm"
                            onChange={(e) => setReportSearchQuery(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Summary Mini-Cards */}
                    <div className="grid grid-cols-3 gap-4 mb-6 print-row">
                      <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex-1">
                        <p className="text-xs text-blue-600 font-bold mb-1">مطابق</p>
                        <p className="text-xl font-bold text-blue-700">
                          {teachers.filter(t => {
                            const s = subjects.find(sub => sub.id === t.subjectId);
                            return t.actualHours === (s?.teacherLoad || 0);
                          }).length}
                        </p>
                      </div>
                      <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 flex-1">
                        <p className="text-xs text-emerald-600 font-bold mb-1">زيادة</p>
                        <p className="text-xl font-bold text-emerald-700">
                          {teachers.filter(t => {
                            const s = subjects.find(sub => sub.id === t.subjectId);
                            return t.actualHours > (s?.teacherLoad || 0);
                          }).length}
                        </p>
                      </div>
                      <div className="bg-rose-50 p-4 rounded-2xl border border-rose-100 flex-1">
                        <p className="text-xs text-rose-600 font-bold mb-1">عجز</p>
                        <p className="text-xl font-bold text-rose-700">
                          {teachers.filter(t => {
                            const s = subjects.find(sub => sub.id === t.subjectId);
                            return t.actualHours < (s?.teacherLoad || 0);
                          }).length}
                        </p>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-right text-sm">
                        <thead>
                          <tr className="text-slate-500 border-b border-slate-100">
                            <th className="pb-4 pr-2">المعلم</th>
                            <th className="pb-4">المادة</th>
                            <th className="pb-4">المدرسة</th>
                            <th className="pb-4">النصاب الأسبوعي</th>
                            <th className="pb-4">النصاب الفعلي</th>
                            <th className="pb-4">الحالة والفرق</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {teachers
                            .filter(t => {
                              const search = reportSearchQuery.toLowerCase();
                              const school = schools.find(s => s.id === t.schoolId);
                              const matchesSearch = t.name.toLowerCase().includes(search) || 
                                     subjects.find(s => s.id === t.subjectId)?.name.toLowerCase().includes(search) ||
                                     school?.name.toLowerCase().includes(search);
                              const matchesType = schoolTypeFilter === 'الكل' || school?.type === schoolTypeFilter;
                              const matchesGender = schoolGenderFilter === 'الكل' || school?.gender === schoolGenderFilter;
                              const matchesTeacherGender = teacherGenderFilter === 'الكل' || t.gender === teacherGenderFilter;
                              return matchesSearch && matchesType && matchesGender && matchesTeacherGender;
                            })
                            .map(teacher => {
                              const subject = subjects.find(s => s.id === teacher.subjectId);
                              const school = schools.find(s => s.id === teacher.schoolId);
                              const load = jobDegreeLoads[teacher.jobDegree] || subject?.teacherLoad || 0;
                              const diff = teacher.actualHours - load;
                              
                              return (
                                <tr key={teacher.id} className="hover:bg-slate-50/50">
                                  <td className="py-4 pr-2 font-medium">{teacher.name}</td>
                                  <td className="py-4">
                                    <div className="flex items-center gap-2">
                                      <SubjectIcon iconName={subject?.icon} size={14} className="text-slate-400" />
                                      {subject?.name}
                                    </div>
                                  </td>
                                  <td className="py-4">{school?.name}</td>
                                  <td className="py-4">{load}</td>
                                  <td className={`py-4 font-bold ${
                                    diff > 0 ? 'text-emerald-600' : 
                                    diff < 0 ? 'text-rose-600' : 
                                    'text-slate-900'
                                  }`}>
                                    {teacher.actualHours}
                                  </td>
                                  <td className={`py-4 px-2 ${
                                    diff > 0 ? 'bg-emerald-50/50' : 
                                    diff < 0 ? 'bg-rose-50/50' : 
                                    ''
                                  }`}>
                                    {diff > 0 ? (
                                      <span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold border border-emerald-200 inline-block whitespace-nowrap">زيادة (+{diff})</span>
                                    ) : diff < 0 ? (
                                      <span className="px-2 py-1 bg-rose-100 text-rose-800 rounded-lg text-xs font-bold border border-rose-200 inline-block whitespace-nowrap">عجز ({diff})</span>
                                    ) : (
                                      <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold border border-slate-200 inline-block whitespace-nowrap">مطابق</span>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                      <Users size={18} className="text-indigo-600" />
                      توزيع المعلمين (ذكر/أنثى)
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-right text-xs">
                        <thead>
                          <tr className="text-slate-500 border-b border-slate-100">
                            <th className="pb-2 pr-1">المدرسة</th>
                            <th className="pb-2 text-center">ذكر</th>
                            <th className="pb-2 text-center">أنثى</th>
                            <th className="pb-2 text-center">ج</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {schools
                            .filter(s => {
                              const matchesType = schoolTypeFilter === 'الكل' || s.type === schoolTypeFilter;
                              const matchesGender = schoolGenderFilter === 'الكل' || s.gender === schoolGenderFilter;
                              return matchesType && matchesGender;
                            })
                            .map(school => {
                              const schoolTeachers = teachers.filter(t => t.schoolId === school.id);
                              const maleCount = schoolTeachers.filter(t => t.gender === 'ذكر').length;
                              const femaleCount = schoolTeachers.filter(t => t.gender === 'أنثى').length;
                              
                              if (schoolTeachers.length === 0) return null;

                              return (
                                <tr key={school.id} className="hover:bg-slate-50/50">
                                  <td className="py-2 pr-1 truncate max-w-[80px]" title={school.name}>{school.name}</td>
                                  <td className="py-2 text-center text-blue-600 font-bold">{maleCount}</td>
                                  <td className="py-2 text-center text-pink-600 font-bold">{femaleCount}</td>
                                  <td className="py-2 text-center font-bold bg-slate-50">{schoolTeachers.length}</td>
                                </tr>
                              );
                            })}
                          <tr className="bg-indigo-50 font-bold">
                            <td className="py-2 pr-1">الإجمالي</td>
                            <td className="py-2 text-center text-blue-700">{stats.totalMaleTeachers}</td>
                            <td className="py-2 text-center text-pink-700">{stats.totalFemaleTeachers}</td>
                            <td className="py-2 text-center text-indigo-700">{stats.totalTeachers}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-indigo-600 text-white p-8 rounded-3xl shadow-lg print:bg-white print:text-slate-900 print:border print:border-slate-200 print:shadow-none">
                    <h3 className="text-lg font-bold mb-4">ملخص المرحلة</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between border-b border-indigo-500/50 print:border-slate-200 pb-2">
                        <span>إجمالي المدارس</span>
                        <span className="font-bold">{stats.totalSchools}</span>
                      </div>
                      <div className="flex justify-between border-b border-indigo-500/50 print:border-slate-200 pb-2">
                        <span>إجمالي الفصول</span>
                        <span className="font-bold">{stats.totalClasses}</span>
                      </div>
                      <div className="flex justify-between border-b border-indigo-500/50 print:border-slate-200 pb-2">
                        <span>إجمالي المواد</span>
                        <span className="font-bold">{stats.totalSubjects}</span>
                      </div>
                      <div className="pt-4">
                        <p className="text-indigo-200 print:text-slate-500 text-sm">إجمالي المعلمين المطلوبين</p>
                        <p className="text-4xl font-bold">{stats.totalTeachersNeeded}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                    <h4 className="font-bold mb-4 flex items-center gap-2">
                      <AlertCircle size={18} className="text-amber-500" />
                      ملاحظات هامة
                    </h4>
                    <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside">
                      <li>يتم حساب عدد المعلمين بناءً على النصاب القانوني لكل مادة.</li>
                      <li>الكسور في عدد المعلمين يتم تقريبها للأعلى لضمان تغطية الحصص.</li>
                      <li>هذا التقرير استرشادي لتوزيع القوى العاملة.</li>
                    </ul>
                  </div>

                  {/* Print Only Signature Area */}
                  <div className="hidden print:grid grid-cols-3 gap-8 mt-12 text-center">
                    <div className="space-y-8">
                      <p className="font-bold">معد التقرير</p>
                      <div className="border-b border-slate-400 w-32 mx-auto"></div>
                    </div>
                    <div className="space-y-8">
                      <p className="font-bold">رئيس القسم</p>
                      <div className="border-b border-slate-400 w-32 mx-auto"></div>
                    </div>
                    <div className="space-y-8">
                      <p className="font-bold">مدير الإدارة</p>
                      <div className="border-b border-slate-400 w-32 mx-auto"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 mt-auto no-print">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-600 font-bold">نظام إدارة العجز والزيادة لمدارس إدارة العريش التعليمية</p>
          <p className="text-slate-400 text-sm mt-2">تصميم وبرمجة: دكتور. أحمد حمدي عاشور الغول</p>
          <p className="text-slate-300 text-xs mt-4">© {new Date().getFullYear()} جميع الحقوق محفوظة</p>
        </div>
      </footer>

      {/* Modals */}
      <Modal 
        isOpen={showTeacherModal} 
        onClose={() => setShowTeacherModal(false)} 
        title={editingTeacher ? 'تعديل بيانات معلم' : 'إضافة معلم جديد'}
      >
        <form onSubmit={handleAddTeacher} className="space-y-4 max-h-[70vh] overflow-y-auto px-2">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">اسم المعلم رباعي</label>
            <input 
              type="text" 
              required
              value={teacherForm.name || ''}
              onChange={(e) => setTeacherForm({ ...teacherForm, name: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
              placeholder="أدخل الاسم الرباعي"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">كود المعلم</label>
              <input 
                type="text" 
                required
                value={teacherForm.code || ''}
                onChange={(e) => setTeacherForm({ ...teacherForm, code: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">الرقم القومي (14 رقم)</label>
              <input 
                type="text" 
                required
                maxLength={14}
                pattern="\d{14}"
                value={teacherForm.nationalId || ''}
                onChange={(e) => setTeacherForm({ ...teacherForm, nationalId: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">المؤهل الدراسي</label>
              <input 
                type="text" 
                required
                value={teacherForm.qualification || ''}
                onChange={(e) => setTeacherForm({ ...teacherForm, qualification: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">تاريخ المؤهل</label>
              <input 
                type="date" 
                required
                value={teacherForm.qualificationDate || ''}
                onChange={(e) => setTeacherForm({ ...teacherForm, qualificationDate: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">تاريخ التعيين</label>
              <input 
                type="date" 
                required
                value={teacherForm.appointmentDate || ''}
                onChange={(e) => setTeacherForm({ ...teacherForm, appointmentDate: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">الدرجة الوظيفية</label>
              <select 
                required
                value={teacherForm.jobDegree || 'معلم'}
                onChange={(e) => setTeacherForm({ ...teacherForm, jobDegree: e.target.value as JobDegree })}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none bg-white"
              >
                {Object.keys(jobDegreeLoads).map(degree => (
                  <option key={degree} value={degree}>{degree}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">النوع</label>
              <select 
                required
                value={teacherForm.gender || 'ذكر'}
                onChange={(e) => setTeacherForm({ ...teacherForm, gender: e.target.value as 'ذكر' | 'أنثى' })}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none bg-white"
              >
                <option value="ذكر">ذكر</option>
                <option value="أنثى">أنثى</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">التخصص</label>
              <input 
                type="text" 
                required
                value={teacherForm.specialization || ''}
                onChange={(e) => setTeacherForm({ ...teacherForm, specialization: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">الحالة</label>
              <select 
                required
                value={teacherForm.status || 'أصلي'}
                onChange={(e) => setTeacherForm({ ...teacherForm, status: e.target.value as any })}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none bg-white"
              >
                <option value="أصلي">أصلي</option>
                <option value="منتدب">منتدب</option>
                <option value="تكليف">تكليف</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">المادة</label>
              <select 
                required
                value={teacherForm.subjectId || ''}
                onChange={(e) => setTeacherForm({ ...teacherForm, subjectId: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none bg-white"
              >
                <option value="">اختر المادة</option>
                {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">المدرسة</label>
              <select 
                required
                value={teacherForm.schoolId || ''}
                onChange={(e) => setTeacherForm({ ...teacherForm, schoolId: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none bg-white"
              >
                <option value="">اختر المدرسة</option>
                {schools.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">رقم الموبايل (11 رقم)</label>
              <input 
                type="text" 
                required
                maxLength={11}
                pattern="\d{11}"
                value={teacherForm.mobile || ''}
                onChange={(e) => setTeacherForm({ ...teacherForm, mobile: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">النصاب الفعلي</label>
              <input 
                type="number" 
                required
                min="0"
                value={teacherForm.actualHours ?? 0}
                onChange={(e) => setTeacherForm({ ...teacherForm, actualHours: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">العنوان</label>
            <input 
              type="text" 
              required
              value={teacherForm.address || ''}
              onChange={(e) => setTeacherForm({ ...teacherForm, address: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button type="submit" className="flex-1 bg-indigo-600 text-white py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-colors">
              {editingTeacher ? 'حفظ التعديلات' : 'إضافة المعلم'}
            </button>
            <button type="button" onClick={() => setShowTeacherModal(false)} className="flex-1 bg-slate-100 text-slate-700 py-2.5 rounded-xl font-bold hover:bg-slate-200 transition-colors">
              إلغاء
            </button>
          </div>
        </form>
      </Modal>

      <Modal 
        isOpen={showSchoolModal} 
        onClose={() => setShowSchoolModal(false)} 
        title={editingSchool ? 'تعديل بيانات مدرسة' : 'إضافة مدرسة جديدة'}
      >
        <form onSubmit={handleAddSchool} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">اسم المدرسة</label>
            <input 
              type="text" 
              required
              value={schoolForm.name || ''}
              onChange={(e) => setSchoolForm({ ...schoolForm, name: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
              placeholder="أدخل اسم المدرسة"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">نوع المدرسة</label>
              <select 
                required
                value={schoolForm.type || 'إعدادي'}
                onChange={(e) => setSchoolForm({ ...schoolForm, type: e.target.value as 'إعدادي' | 'تعليم أساسي' })}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none bg-white"
              >
                <option value="إعدادي">إعدادي</option>
                <option value="تعليم أساسي">تعليم أساسي</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">تصنيف الطلاب</label>
              <select 
                required
                value={schoolForm.gender || 'مشترك'}
                onChange={(e) => setSchoolForm({ ...schoolForm, gender: e.target.value as 'بنين' | 'بنات' | 'مشترك' })}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none bg-white"
              >
                <option value="مشترك">مشترك</option>
                <option value="بنين">بنين</option>
                <option value="بنات">بنات</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">فصول الصف الأول</label>
              <input 
                type="number" 
                required
                min="0"
                value={schoolForm.grade1Classes}
                onChange={(e) => setSchoolForm({ ...schoolForm, grade1Classes: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">فصول الصف الثاني</label>
              <input 
                type="number" 
                required
                min="0"
                value={schoolForm.grade2Classes}
                onChange={(e) => setSchoolForm({ ...schoolForm, grade2Classes: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">فصول الصف الثالث</label>
              <input 
                type="number" 
                required
                min="0"
                value={schoolForm.grade3Classes}
                onChange={(e) => setSchoolForm({ ...schoolForm, grade3Classes: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">المدينة</label>
              <input 
                type="text" 
                required
                value={schoolForm.city || ''}
                onChange={(e) => setSchoolForm({ ...schoolForm, city: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">المنطقة (القسم)</label>
              <input 
                type="text" 
                required
                value={schoolForm.district || ''}
                onChange={(e) => setSchoolForm({ ...schoolForm, district: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button type="submit" className="flex-1 bg-indigo-600 text-white py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-colors">
              {editingSchool ? 'حفظ التعديلات' : 'إضافة المدرسة'}
            </button>
            <button type="button" onClick={() => setShowSchoolModal(false)} className="flex-1 bg-slate-100 text-slate-700 py-2.5 rounded-xl font-bold hover:bg-slate-200 transition-colors">
              إلغاء
            </button>
          </div>
        </form>
      </Modal>

      <Modal 
        isOpen={showSubjectModal} 
        onClose={() => setShowSubjectModal(false)} 
        title={editingSubject ? 'تعديل مادة' : 'إضافة مادة دراسية جديدة'}
      >
        <form onSubmit={handleAddSubject} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">اسم المادة</label>
            <input 
              type="text" 
              required
              value={subjectForm.name || ''}
              onChange={(e) => setSubjectForm({ ...subjectForm, name: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
              placeholder="أدخل اسم المادة"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">الحصص أسبوعياً</label>
              <input 
                type="number" 
                required
                min="1"
                value={subjectForm.weeklyHours || ''}
                onChange={(e) => setSubjectForm({ ...subjectForm, weeklyHours: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">نصاب المعلم</label>
              <input 
                type="number" 
                required
                min="1"
                value={subjectForm.teacherLoad || ''}
                onChange={(e) => setSubjectForm({ ...subjectForm, teacherLoad: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">أيقونة المادة</label>
            <div className="grid grid-cols-6 gap-2 p-2 border border-slate-200 rounded-xl bg-slate-50/50">
              {['Languages', 'Binary', 'Dna', 'Globe', 'Palette', 'Music', 'Trophy', 'Microscope', 'Atom', 'History', 'Map', 'Monitor', 'Book'].map((iconName) => (
                <button
                  key={iconName}
                  type="button"
                  onClick={() => setSubjectForm({ ...subjectForm, icon: iconName })}
                  className={`p-2 rounded-lg flex items-center justify-center transition-all ${
                    subjectForm.icon === iconName 
                      ? 'bg-indigo-600 text-white shadow-md scale-110' 
                      : 'bg-white text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-100'
                  }`}
                >
                  <SubjectIcon iconName={iconName} size={18} />
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button type="submit" className="flex-1 bg-indigo-600 text-white py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-colors">
              {editingSubject ? 'حفظ التعديلات' : 'إضافة المادة'}
            </button>
            <button type="button" onClick={() => setShowSubjectModal(false)} className="flex-1 bg-slate-100 text-slate-700 py-2.5 rounded-xl font-bold hover:bg-slate-200 transition-colors">
              إلغاء
            </button>
          </div>
        </form>
      </Modal>

      <Modal 
        isOpen={showDeleteModal} 
        onClose={() => setShowDeleteModal(false)} 
        title="تأكيد الحذف"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-rose-50 text-rose-700 rounded-2xl border border-rose-100">
            <AlertCircle size={24} />
            <p className="font-medium">هل أنت متأكد من حذف هذه المدرسة؟ سيؤدي ذلك إلى حذف جميع البيانات المرتبطة بها.</p>
          </div>
          <div className="flex gap-3 pt-2">
            <button 
              onClick={handleDeleteSchool}
              className="flex-1 bg-rose-600 text-white py-2.5 rounded-xl font-bold hover:bg-rose-700 transition-colors"
            >
              تأكيد الحذف
            </button>
            <button 
              onClick={() => setShowDeleteModal(false)}
              className="flex-1 bg-slate-100 text-slate-700 py-2.5 rounded-xl font-bold hover:bg-slate-200 transition-colors"
            >
              إلغاء
            </button>
          </div>
        </div>
      </Modal>

      <Modal 
        isOpen={showDeleteSubjectModal} 
        onClose={() => setShowDeleteSubjectModal(false)} 
        title="تأكيد حذف المادة"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-rose-50 text-rose-700 rounded-2xl border border-rose-100">
            <AlertCircle size={24} />
            <p className="font-medium">هل أنت متأكد من حذف هذه المادة؟ سيؤدي ذلك إلى حذف جميع البيانات المرتبطة بها.</p>
          </div>
          <div className="flex gap-3 pt-2">
            <button 
              onClick={handleDeleteSubject}
              className="flex-1 bg-rose-600 text-white py-2.5 rounded-xl font-bold hover:bg-rose-700 transition-colors"
            >
              تأكيد الحذف
            </button>
            <button 
              onClick={() => setShowDeleteSubjectModal(false)}
              className="flex-1 bg-slate-100 text-slate-700 py-2.5 rounded-xl font-bold hover:bg-slate-200 transition-colors"
            >
              إلغاء
            </button>
          </div>
        </div>
      </Modal>

      <Modal 
        isOpen={showDeleteTeacherModal} 
        onClose={() => setShowDeleteTeacherModal(false)} 
        title="تأكيد حذف المعلم"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-rose-50 text-rose-700 rounded-2xl border border-rose-100">
            <AlertCircle size={24} />
            <p className="font-medium">هل أنت متأكد من حذف هذا المعلم؟ سيؤدي ذلك إلى حذف جميع بياناته من النظام.</p>
          </div>
          <div className="flex gap-3 pt-2">
            <button 
              onClick={handleDeleteTeacher}
              className="flex-1 bg-rose-600 text-white py-2.5 rounded-xl font-bold hover:bg-rose-700 transition-colors"
            >
              تأكيد الحذف
            </button>
            <button 
              onClick={() => setShowDeleteTeacherModal(false)}
              className="flex-1 bg-slate-100 text-slate-700 py-2.5 rounded-xl font-bold hover:bg-slate-200 transition-colors"
            >
              إلغاء
            </button>
          </div>
        </div>
      </Modal>

      <Modal 
        isOpen={showLoadsModal} 
        onClose={() => setShowLoadsModal(false)} 
        title="تعديل الأنصبة القانونية (للمرحلة الإعدادية)"
      >
        <form onSubmit={handleUpdateLoads} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {Object.keys(jobDegreeLoads).map((degree) => (
              <div key={degree} className="space-y-1">
                <label className="text-sm font-medium text-slate-700">{degree}</label>
                <input 
                  type="number" 
                  required
                  min="1"
                  value={loadsForm[degree as JobDegree] || 0}
                  onChange={(e) => setLoadsForm({ ...loadsForm, [degree]: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                />
              </div>
            ))}
          </div>
          <div className="flex gap-3 pt-4">
            <button type="submit" className="flex-1 bg-indigo-600 text-white py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-colors">
              حفظ التعديلات
            </button>
            <button type="button" onClick={() => setShowLoadsModal(false)} className="flex-1 bg-slate-100 text-slate-700 py-2.5 rounded-xl font-bold hover:bg-slate-200 transition-colors">
              إلغاء
            </button>
          </div>
        </form>
      </Modal>

      <Modal 
        isOpen={showPersonnelModal} 
        onClose={() => setShowPersonnelModal(false)} 
        title={`إدارة هيئة التدريس - ${selectedSchoolForPersonnel?.name}`}
      >
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="text-sm text-slate-500">
              إجمالي المعلمين: <span className="font-bold text-indigo-600">{teachers.filter(t => t.schoolId === selectedSchoolForPersonnel?.id).length}</span>
            </div>
            <button 
              onClick={() => {
                setEditingTeacher(null);
                setTeacherForm({ 
                  ...teacherForm,
                  name: '', 
                  code: '', 
                  schoolId: selectedSchoolForPersonnel?.id || '',
                  subjectId: subjects[0]?.id || '',
                  actualHours: 0
                });
                setShowTeacherModal(true);
              }}
              className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl hover:bg-emerald-700 transition-colors text-sm font-bold shadow-sm"
            >
              <Plus size={16} />
              إضافة معلم للمدرسة
            </button>
          </div>

          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
            {subjects.map(subject => {
              const schoolTeachers = teachers.filter(t => t.schoolId === selectedSchoolForPersonnel?.id && t.subjectId === subject.id);
              if (schoolTeachers.length === 0) return null;

              return (
                <div key={subject.id} className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                  <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
                    <div className="flex items-center gap-2 font-bold text-slate-700">
                      <SubjectIcon iconName={subject.icon} size={16} className="text-indigo-600" />
                      {subject.name}
                    </div>
                    <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                      {schoolTeachers.length} معلم
                    </span>
                  </div>
                  <div className="space-y-2">
                    {schoolTeachers.map(teacher => (
                      <div key={teacher.id} className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-100 hover:border-indigo-200 transition-colors group">
                        <div>
                          <p className="font-bold text-sm">{teacher.name}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-[10px] text-slate-500 flex items-center gap-1">
                              <User size={10} />
                              {teacher.jobDegree}
                            </span>
                            <span className="text-[10px] text-indigo-600 font-bold flex items-center gap-1">
                              <Clock size={10} />
                              {teacher.actualHours} حصة
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => openEditTeacher(teacher)}
                            className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                            title="تعديل"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button 
                            onClick={() => deleteTeacher(teacher.id)}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            title="حذف"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {teachers.filter(t => t.schoolId === selectedSchoolForPersonnel?.id).length === 0 && (
              <div className="py-12 text-center text-slate-400 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                <Users size={48} className="mx-auto mb-3 opacity-20" />
                <p className="italic">لا يوجد معلمون مسجلون لهذه المدرسة حالياً</p>
                <button 
                  onClick={() => {
                    setEditingTeacher(null);
                    setTeacherForm({ 
                      ...teacherForm,
                      name: '', 
                      code: '', 
                      schoolId: selectedSchoolForPersonnel?.id || '',
                      subjectId: subjects[0]?.id || '',
                      actualHours: 0
                    });
                    setShowTeacherModal(true);
                  }}
                  className="mt-4 text-indigo-600 font-bold text-sm hover:underline"
                >
                  ابدأ بإضافة أول معلم الآن
                </button>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button 
              onClick={() => setShowPersonnelModal(false)}
              className="bg-slate-100 text-slate-700 px-8 py-2.5 rounded-xl font-bold hover:bg-slate-200 transition-colors"
            >
              إغلاق
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function StatCard({ title, value, icon, color, subtitle }: { title: string, value: string | number, icon: React.ReactNode, color: string, subtitle?: string }) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex items-center gap-4 hover:shadow-md transition-shadow">
      <div className={`p-4 rounded-2xl ${color}`}>
        {icon}
      </div>
      <div>
        <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
        <p className="text-slate-500 text-sm font-medium">{title}</p>
        {subtitle && <p className="text-[10px] text-slate-400 mt-1">{subtitle}</p>}
      </div>
    </div>
  );
}

function Modal({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 modal-overlay"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="font-bold text-lg">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-xl transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

function SubjectIcon({ iconName, size = 20, className = "" }: { iconName?: string, size?: number, className?: string }) {
  const icons: Record<string, any> = {
    Languages,
    Binary,
    Dna,
    Globe,
    Palette,
    Music,
    Trophy,
    Microscope,
    Atom,
    History,
    Map,
    Monitor,
    Book
  };

  const IconComponent = iconName && icons[iconName] ? icons[iconName] : Book;
  return <IconComponent size={size} className={className} />;
}
