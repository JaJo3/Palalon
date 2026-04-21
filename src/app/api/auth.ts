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
export async function authLogin({ username, password }: LoginPayload): Promise<LoginResponse> {
  try {
    const responseBody = await fetch(BASE_URL + '/login', {
      ...options,
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const data: LoginResponse = await responseBody.json();
    console.log('Response data:', data);

    if (responseBody.status === 200) {
      console.log('LOGIN SUCCESS - Token received');
      return data;
    } else {
      throw new Error(data.errors?.password || 'Login failed');
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('LOGIN ERROR:', errorMessage);
    throw error;
  }
}
