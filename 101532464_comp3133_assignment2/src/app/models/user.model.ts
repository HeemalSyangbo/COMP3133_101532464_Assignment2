export interface User {
  _id: string;
  username: string;
  email: string;
}

export interface AuthPayload {
  token: string;
  user: User;
}
