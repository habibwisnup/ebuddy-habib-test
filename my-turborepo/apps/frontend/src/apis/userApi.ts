import axios from 'axios';

const API_URL = 'http://localhost:3000/api/user';

export const fetchUser = async (userId: string) => {
  const response = await axios.get(`${API_URL}/${userId}`, {
    headers: {
      Authorization: 'test-token', // Dummy token
    },
  });
  return response.data;
};

export const updateUser = async (userId: string, data: any) => {
  const response = await axios.put(`${API_URL}/${userId}`, data, {
    headers: {
      Authorization: 'test-token',
    },
  });
  return response.data;
};
