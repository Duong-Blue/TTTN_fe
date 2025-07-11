
import { User } from '@/types/user';
import Image from 'next/image';
import React from 'react';

export default function UserTable({ users }: { users: User[] }) {
  if (!users || users.length === 0) {
    return <p className="text-center text-gray-400">No user found</p>;
  }
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-700 shadow bg-black text-white">
      <table className="min-w-full divide-gray-700">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold">Id</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">Avatar</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">Name</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">Phone</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">Address</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">Company</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">Role</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-900 transition-colors">
              <td className="px-4 py-2 text-sm">{user.id}</td>
              <td className="px-4 py-2">
                <Image
                  src={user.image}
                  alt={user.firstName}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </td>
              <td className="px-4 py-2 text-sm font-medium">
                {user.firstName} {user.lastName}
              </td>
              <td className="px-4 py-2 text-sm">{user.email}</td>
              <td className="px-4 py-2 text-sm">{user.phone}</td>
              <td className="px-4 py-2 text-sm">
                {user.address.address}, {user.address.city}, {user.address.state}, {user.address.country}
              </td>
              <td className="px-4 py-2 text-sm">
                {user.company.name}
                <br />
                <span className="text-gray-400">{user.company.title}</span>
              </td>
              <td className="px-4 py-2 text-sm">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}