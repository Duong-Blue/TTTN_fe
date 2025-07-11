"use client";
import { fetchUserAPI, searchUsersAPI } from '@/services/userFetch';
import React, { useEffect, useState } from 'react';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image: string;
  address: {
    address: string;
    city: string;
    state: string;
    country: string;
  };
  company: {
    name: string;
    department: string;
    title: string;
  };
  role: string;
}

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
        const { users, total } = await fetchUserAPI(skip, limit);
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