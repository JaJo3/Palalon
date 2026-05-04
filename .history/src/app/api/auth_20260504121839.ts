export interface LoginResponse {
  token?: string;
  access_token?: string;
  user?: any;
  errors?: {
    password?: string;
    [key: string]: string | undefined;
  };
}

export interface LoginPayload {
  username: string;
  password: string;
}

const BASE_URL = 'http://10.0.2.2:8000/api';

const options: RequestInit = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

// Sends login request to the authentication API with username and password
// Properly handles 401 Unauthorized and other error responses from Symfony backend
export async function authLogin({ username, password }: LoginPayload): Promise<LoginResponse> {
  try {
    const response = await fetch(BASE_URL + '/login', {
      ...options,
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const text = await response.text(); // Get the raw response first
    console.log("Raw Server Response:", text); // This will show you the HTML error causing the crash

    const data: LoginResponse = JSON.parse(text); // Now try to parse
    console.log('Response data:', data);

    // Check if response is successful (2xx status code)
    if (!response.ok) {
      // Handle 401 Unauthorized and other error responses
      const errorMessage = data.errors?.password || 'Invalid credentials';
      throw new Error(errorMessage);
    }

    console.log('LOGIN SUCCESS - Token received');
    return data;
  } catch (e) {
    console.error("Login Error:", e instanceof Error ? e.message : String(e));
    throw e;
  }
}
