export interface Author {
  _id: string;
  name: string;
  avatarUrl: string;
}

export interface Tag {
  _id: string;
  name: string;
  questions?: number;
}

export interface Question {
  _id: string;
  title: string;
  description: string;
  tags: Tag[] | string[];
  author: Author;
  upvotes: number;
  answers: number;
  views: number;
  createdAt: Date;
}
