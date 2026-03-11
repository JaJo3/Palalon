const BASE_URL = 'http://10.0.2.2:8000/api';

let options = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

export async function authLogin({ username, password }) {
  try {
    const responseBody = await fetch(BASE_URL + '/login', {
      ...options,
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const data = await responseBody.json();
    console.log('Response data:', data);

    if (responseBody.status === 200) {
      console.log('LOGIN SUCCESS - Token received');
      return data;
    } else {
      throw new Error(data.errors?.password || 'Login failed');
    }
  } catch (error) {
    console.error('LOGIN ERROR:', error.message);
    throw error;
  }
}
