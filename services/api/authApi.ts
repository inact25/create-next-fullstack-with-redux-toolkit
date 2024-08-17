import client from './client';
import { User } from '@/types/authTypes';

const login = (credentials: { email: string; password: string }) =>
  client.post<User>('/auth/login', credentials);
const register = (credentials: { email: string; password: string }) =>
  client.post<User>('/auth/register', credentials);
const fetchUser = () => client.get<User>('/auth/me');

export default {
  login,
  register,
  fetchUser,
};
