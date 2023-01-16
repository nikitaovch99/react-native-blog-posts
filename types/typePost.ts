export interface User {
  id: number;
  email: string;
  phone: string;
}

export interface userPost {
  id: number;
  title: string;
  body: string;
}

export interface PostFromServer {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface PostCommentFromServer {
  postId: number;
  name: string;
  body: string;
}

export interface PostComment {
  name: string;
  body: string;
}
