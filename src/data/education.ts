export interface EducationProps {
  degree: string;
  major: string;
  school: string;
  location: string;
  startYear: string;
  endYear: string;
  logo: string;
}

const educations: EducationProps[] = [
  {
    degree: 'Bachelor (S1)',
    major: 'Bachelor of Economics, (S.E)',
    school: 'Universitas Cendekia Mitra Indonesia',
    location: 'Yogyakarta, Indonesia',
    startYear: '2020',
    endYear: '2024',
    logo: '/education/unicimi.png',
  },
  {
    degree: 'Senior High School (SMA)',
    major: 'Computer and Network Engineering',
    school: 'SMA Negeri 2 Teluk Kuantan',
    location: 'RIau, Indonesia',
    startYear: '2017',
    endYear: '2020',
    logo: '/education/smk2.png',
  },
];

export default educations;