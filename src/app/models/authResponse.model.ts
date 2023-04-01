export interface AuthResponse{
  status: string;
  result: Result;
}

interface Result {
  token: string;
}