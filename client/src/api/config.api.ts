const VITE_API_URL = import.meta.env.VITE_API_URL;

type ValidationErrors = Record<string, string[]>;

type ApiSuccess<T> = {
  success: true;
  status: number;
  message: string;
  data: T | null;
};

type ApiError = {
  success: false;
  status: number | null;
  message: string;
  errors: ValidationErrors | null;
};

type ApiResponse<T> = ApiSuccess<T> | ApiError;

function getToken() {
  return localStorage.getItem("auth_token");
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  try {
    const token = getToken();

    const headers = new Headers(options.headers);

    headers.set("Accept", "application/json");

    const hasBody = options.body !== undefined;

    if (hasBody) {
      headers.set("Content-Type", "application/json");
    }

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    const response = await fetch(`${VITE_API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        status: response.status,
        message: data.message ?? "Something error",
        errors: data.errors || null,
      };
    }

    return {
      success: true,
      status: response.status,
      message: data.message ?? "All good",
      data: data.data ?? null,
    };
  } catch (err) {
    return {
      success: false,
      status: null,
      message: "Network error",
      errors: null,
    };
  }
}
export { request };
