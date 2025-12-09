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

type ActionResponse<T = null> = {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details?: Record<string, string[]>;
  };
  status?: number;
};

type SuccessResponse<T = null> = ActionResponse<T> & { success: true };
type ErrorResponse = ActionResponse<undefined> & { success: false };

type APIErrorEsponse = NextResponse<ErrorResponse>;
type APISuccessResponse<T = null> = NextResponse<SuccessResponse<T> | ErrorResponse>;
