export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  last_login: Date | null;
  last_ip: string | null;
  is_active: boolean;
  failed_login_attempts: number;
  reset_token: string | null;
  reset_token_expires: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface News {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  featured_image: string | null;
  author_id: number | null;
  is_published: boolean;
  published_at: Date | null;
  created_at: Date;
  updated_at: Date;
  views: number;
}

export interface GalleryImage {
  id: number;
  title: string;
  description: string | null;
  image_path: string;
  category: string | null;
  is_featured: boolean;
  created_at: Date;
  updated_at: Date;
  views: number;
  likes_count?: number;
}

export interface Subscriber {
  id: number;
  email: string;
  name: string | null;
  is_active: boolean;
  subscribed_at: Date;
  unsubscribed_at: Date | null;
  verification_token: string | null;
  is_verified: boolean;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  is_read: boolean;
  replied: boolean;
  created_at: Date;
}

export interface SliderImage {
  id: number;
  title: string;
  description: string | null;
  image_path: string;
  link_url: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Comment {
  id: number;
  entity_type: 'news' | 'gallery';
  entity_id: number;
  author_name: string;
  author_email: string;
  content: string;
  is_approved: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface LeadershipCEO {
  id: number;
  name: string;
  title: string;
  bio: string | null;
  image_path: string | null;
  whatsapp_url: string | null;
  twitter_url: string | null;
  linkedin_url: string | null;
  facebook_url: string | null;
  instagram_url: string | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface LeadershipLeader {
  id: number;
  name: string;
  title: string;
  bio: string | null;
  image_path: string | null;
  whatsapp_url: string | null;
  twitter_url: string | null;
  linkedin_url: string | null;
  facebook_url: string | null;
  instagram_url: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image: string | null;
  author: string;
  is_published: boolean;
  views: number;
  created_at: Date;
  published_at: Date;
  updated_at: Date;
}

export interface AdminSession {
  id: number;
  user_id: number;
  session_id: string;
  ip_address: string;
  user_agent: string | null;
  is_active: boolean;
  last_activity: Date;
  created_at: Date;
}

export interface GalleryLike {
  id: number;
  gallery_id: number;
  user_ip: string;
  created_at: Date;
}

export interface CompanyStats {
  cattle: number;
  acres: number;
  years: number;
  employees: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}
