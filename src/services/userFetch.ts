import { User } from "@/types/user";

export const fetchUsersAPI = async (skip: number, limit: number): Promise<{ users: User[]; total: number }> => {
  const res = await fetch(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`);
  if (!res.ok) throw new Error('failed to fetch users');
  const data = await res.json();
  return { users: data.users, total: data.total };
}

export const searchUsersAPI = async (query: string): Promise<{ users: User[]; total: number }> => {
  const res = await fetch(`https://dummyjson.com/users/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('failed to search user');
  const data = await res.json();
  return { users: data.users, total: data.total || 0 };
};