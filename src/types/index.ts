export interface GuestbookReply {
  id: number;
  name: string;
  email: string;
  image?: string | null;
  message: string;
  created_at: string;
}

export interface GuestbookEntry {
  id: number;
  name: string;
  email: string;
  image?: string | null;
  message: string;
  created_at: string;
  replies: GuestbookReply[];
}

export interface PortfolioItem {
  id: number;
  title: string;
  client: string;
  description: string;
  tags: string[];
  year: string;
}

export interface Tool {
  name: string;
  category: string;
  icon: string;
  description: string;
}

export interface DailyUse {
  name: string;
  description: string;
  category: string;
  link?: string;
}
