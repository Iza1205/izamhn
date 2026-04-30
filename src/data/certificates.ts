export interface CertificateProps {
  title: string;
  issuer: string;
  year: string;
  category: string;
  image: string;
  href: string;
}

const certificates: CertificateProps[] = [
  {
    title: 'Seminar Beyond Productivity',
    issuer: 'PPM Manajemen',
    year: '2025',
    category: 'Business Development',
    image: '/certificate/cer1.jpg',
    href: 'https://credsverse.com/credentials/a1369e8a-cce6-4155-85d2-7cae0b5acaef',
  },
  {
    title: 'Graphic Design Fundamental',
    issuer: 'MySkill',
    year: '2025',
    category: 'Graphic Design',
    image: '/certificate/cer2.jpg',
    href: '/',
  },
  {
    title: 'Digital Imaging with Adobe Photoshop',
    issuer: 'Rubrik Grafis',
    year: '2024',
    category: 'Graphic Design',
    image: '/certificate/cer3.jpg',
    href: 'https://drive.google.com/file/d/1cfgrfO3_HRPnEnROa-577Dvqd6DlhCXQ/view',
  },
  {
    title: 'Kelas Digital Marketing',
    issuer: 'Muslim Creator',
    year: '2025',
    category: 'Digital Marketing',
    image: '/certificate/cer4.jpg',
    href: '/',
  },
  {
    title: 'Beriklan di Meta (Digital Entrepreneurship Academy)',
    issuer: 'Digital Talent Scholarship (KOMINFO)',
    year: '2021',
    category: 'Digital Marketing',
    image: '/certificate/cer5.jpg',
    href: '/',
  },
];

export default certificates;