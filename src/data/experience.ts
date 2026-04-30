// ============================================================
// DATA EXPERIENCE — edit di sini untuk update pengalaman kerja
// ============================================================

export type Position = {
  role: string;
  employmentType: 'Full-time' | 'Part-time' | 'Freelance' | 'Internship' | 'Contract';
  locationType: 'On-Site' | 'Remote' | 'Hybrid';
  startDate: string;   // e.g. "Feb 2025"
  endDate: string;     // e.g. "Jan 2025" atau "Present"
  duration: string;    // e.g. "1 yr 3 mos"
  responsibilities?: string[];
};

export type Experience = {
  company: string;
  companyFull: string;
  location: string;
  logo: string;        // path dari /public, e.g. "/exp/ppm.png"
  positions: Position[];
};

export const experiences: Experience[] = [
  {
    company: 'PPM Manajemen',
    companyFull: 'PT PPM Manajemen',
    location: 'Jakarta Pusat, Indonesia',
    logo: '/exp/ppm.jpg',
    positions: [
      {
        role: 'Staff Knowledge Management',
        employmentType: 'Full-time',
        locationType: 'On-Site',
        startDate: 'Feb 2025',
        endDate: 'Present',
        duration: '1 yr 3 mos',
      },
    ],
  },
  {
    company: 'AMAL',
    companyFull: 'Yayasan Amanah Kemanusiaan Global',
    location: 'Yogyakarta, Indonesia',
    logo: '/exp/amal.png',
    positions: [
      {
        role: 'Graphic Designer',
        employmentType: 'Full-time',
        locationType: 'On-Site',
        startDate: 'Oct 2023',
        endDate: 'Jan 2025',
        duration: '1 yr 4 mos',
      },
      {
        role: 'Digital Marketing Strategist',
        employmentType: 'Full-time',
        locationType: 'On-Site',
        startDate: 'Jan 2025',
        endDate: 'Jan 2025',
        duration: '1 mo',
      },
    ],
  },
  {
    company: 'Nurul Ashri',
    companyFull: 'Yayasan Nurul Ashri',
    location: 'Yogyakarta, Indonesia',
    logo: '/exp/nurul.png',
    positions: [
      {
        role: 'Freelance Graphic Designer',
        employmentType: 'Part-time',
        locationType: 'On-Site',
        startDate: 'Jan 2024',
        endDate: 'Oct 2025',
        duration: '1 yr 10 mos',
      },
    ],
  },
  {
    company: 'AATC Aviaton',
    companyFull: 'A-Line Aviation Training Centre',
    location: 'Yogyakarta, Indonesia',
    logo: '/exp/aatc.png',
    positions: [
      {
        role: 'Graphic Designer',
        employmentType: 'Part-time',
        locationType: 'On-Site',
        startDate: 'May 2021',
        endDate: 'Sept 2022',
        duration: '1 yr 5 mos',
      },
    ],
  },
    {
    company: 'Inspektorat',
    companyFull: 'Pemerintah Kab. Kuantan Singingi',
    location: 'Riau, Indonesia',
    logo: '/exp/kuan.jpg',
    positions: [
      {
        role: 'Administrative Assistant',
        employmentType: 'Internship',
        locationType: 'On-Site',
        startDate: 'Feb 2018',
        endDate: 'May 2018',
        duration: '3 mos',
      },
    ],
  },
];