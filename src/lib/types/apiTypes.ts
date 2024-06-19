export interface UserMetadata {
  creationTime: number;
  lastSignInTime: number;
}

export interface MultiFactor {
  enrolledFactors: any[]; // Adjust the type of enrolledFactors as needed
}

export interface UserType {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  uid: string;
}

export interface Source {
  id: string;
  name: string;
}

export interface NewsArticle {
  source: Source;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface NewNewsArticle {
  article_id: string;
  title: string;
  link: string;
  keywords: string[];
  creator: string[];
  video_url: string | null;
  description: string;
  content: string;
  pubDate: string;
  image_url: string;
  source_id: string;
  source_priority: number;
  source_url: string;
  source_icon: string;
  language: string;
  country: string[];
  category: string[];
  ai_tag: string;
  sentiment: string;
  sentiment_stats: string;
  ai_region: string;
  ai_org: string;
}
