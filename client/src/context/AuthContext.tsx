import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  type LoginCredentials,
  type RegisterCredentials,
  type User,
} from "../types/user.types";
import { getToken } from "../utils/helpers";
import { authApi } from "../api/auth.api";
import type { ValidationErrors } from "../api/config.api";

type AuthAction =
  | {
      success: false;
      status: number | null;
      message: string;
      errors: ValidationErrors | null;
    }
  | {
      success: true;
      status: number;
      user: User;
    };

interface ContextType {
  user: User | null;
  isLoading: boolean;
  login(credentials: LoginCredentials): Promise<AuthAction>;
  register(credentials: RegisterCredentials): Promise<AuthAction>;
  logout(): Promise<void>;
  isAuthenticated: Boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<ContextType | null>(null);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMe = async () => {
      const token = getToken();
      if (!token) {
        setIsLoading(false);
        return;
      }
      const result = await authApi.me();
      setIsLoading(false);

      if (!result.success || !result.data) {
        localStorage.removeItem("auth_token");
        return;
      }

      setUser(result.data.user);
    };

    loadMe();
  }, []);

  async function login(credentials: LoginCredentials): Promise<AuthAction> {
    const result = await authApi.login(credentials);

    if (!result.success) {
      return {
        success: false,
        status: result.status,
        message: result.message,
        errors: result.errors,
      };
    }

    if (!result.data) {
      throw new Error("Login response is missing data");
    }

    const { user, token } = result.data;

    setUser(user);
    localStorage.setItem("auth_token", token);

    return {
      success: true,
      status: result.status,
      user: user,
    };
  }

  async function register(
    credentials: RegisterCredentials,
  ): Promise<AuthAction> {
    const result = await authApi.register(credentials);
    if (!result.success) {
      return {
        success: false,
        status: result.status,
        message: result.message,
        errors: result.errors,
      };
    }

    if (!result.data) {
      throw new Error("Register response is missing data");
    }

    const { user, token } = result.data;

    setUser(user);
    localStorage.setItem("auth_token", token);

    return {
      success: true,
      status: result.status,
      user: user,
    };
  }

  async function logout(): Promise<void> {
    await authApi.logout();
    localStorage.removeItem("auth_token");
    setUser(null);
  }

  const values = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: user !== null,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("No context");
  }

  return context;
}
