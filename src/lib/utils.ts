import axios from 'axios';

export const fetcher = (url: string) => axios.get(url).then((r) => r.data);

export const ADMIN_EMAIL = 'izamahendra868@gmail.com';
export const SITE_NAME = 'Iza Mahendra';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://izamahendra.dev';
