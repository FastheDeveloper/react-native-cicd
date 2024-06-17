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
