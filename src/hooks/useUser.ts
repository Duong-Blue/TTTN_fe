"use client";
import { fetchUsersAPI, searchUsersAPI } from '@/services/userFetch';
import { User } from '@/types/user';
import { useEffect, useState } from 'react';

export default function useUser(limit = 5) {
  const [user, setUser] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState<string>('');

  async function loadUsers() {
    try {
      setLoading(true);
      setError(null);
      if (search.trim() !== '') {
        const { users, total } = await searchUsersAPI(search.trim());
        setUser(users);
        setTotal(total);
      } else {
        const skip = page * limit;
        const { users, total } = await fetchUsersAPI(skip, limit);
        setUser(users);
        setTotal(total);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, [page, limit, search]);

  return {
    user,
    loading,
    error,
    page,
    setPage,
    total,
    limit,
    search,
    setSearch,
  };
}