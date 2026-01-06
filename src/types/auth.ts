export interface AuthUser {
  id: string;
  email: string;
  user_metadata?: {
    full_name?: string;
    startup_name?: string;
  };
}

export interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
}
