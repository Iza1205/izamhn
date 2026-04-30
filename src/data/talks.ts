export interface SpeakerProps {
  title: string;
  event: string;
  location: string;
  year: string;
  category: string;
  image: string;
  href: string;
}

const talks: SpeakerProps[] = [
  {
    title: 'Pelatihan Desain Grafis Menggunakan Figma',
    event: 'FKIST UIN Sunan Kalijaga Yogyakarta',
    location: 'Yogyakarta, Indonesia',
    year: '2024',
    category: 'Graphic Design',
    image: '/speaker/speaker1.jpg',
    href: '#',
  },
  {
    title: 'Innovative Design Strategy to Explore Your Creativity',
    event: 'MPM Poltekkes Kemenkes Palembang',
    location: 'Palembang, Indonesia',
    year: '2024',
    category: 'Graphic Design',
    image: '/speaker/speaker2.jpg',
    href: '#',
  },
];

export default talks;