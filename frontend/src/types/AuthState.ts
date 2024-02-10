
export default interface AuthState {
  loading: boolean;
  username: string | null;
  token: string | null | undefined;
  error: string | null | unknown;
  success: boolean;
  isLoggedIn: boolean;
  isNewData: boolean;
}
