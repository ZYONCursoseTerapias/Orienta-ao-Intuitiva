export interface User {
  id: number;
  full_name: string;
  email: string;
  whatsapp?: string;
  birth_date: string;
  birth_time?: string;
  birth_place?: string;
  birth_lat?: number;
  birth_lng?: number;
  whatsapp_notifications: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserRegisterPayload {
  full_name: string;
  email: string;
  password: string;
  whatsapp?: string;
  birth_date: string;
  birth_time?: string;
  birth_place?: string;
  whatsapp_notifications: boolean;
}

export interface UserLoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: Omit<User, 'password_hash'>;
}

export interface ApiError {
  message: string;
  field?: string;
}
