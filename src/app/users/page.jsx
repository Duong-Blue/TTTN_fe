'use client';
import useUser from '@/hooks/useUser';
import React from 'react';
import UserTable from '../../components/UseList';

export default function Page() {
  const { user, loading, error, page, setPage, total, limit, search, setSearch } = useUser(5);
  const totalPage = Math.ceil(total / limit);

  return (
    <main className="max-w-6xl mx-auto p-4 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">User Management</h1>

      <input
        type="text"
        placeholder="Search users by name, email..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(0);
        }}
        className="w-full mb-6 px-4 py-2 rounded border border-gray-700 bg-black text-white placeholder-gray-400 focus:outline-none focus:ring focus:border-gray-500"
      />

      {loading && <p className="text-center text-gray-400">Loading users...</p>}
      {error && <p className="text-center text-red-400">Error: {error}</p>}

      {!loading && !error && (
        <>
          <UserTable users={user} />

          <div className="flex items-center justify-between mt-6">
            <button
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 rounded border border-gray-700 disabled:opacity-50 bg-black text-white hover:bg-gray-800 transition-colors"
            >
              Previous
            </button>

            <span className="text-sm text-gray-700">
              Page {page + 1} of {totalPage}
            </span>

            <button
              disabled={page + 1 >= totalPage}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 rounded border border-gray-700 disabled:opacity-50 bg-black text-white hover:bg-gray-800 transition-colors"
            >
              Next
            </button>
          </div>
        </>
      )}
    </main>
  );
}