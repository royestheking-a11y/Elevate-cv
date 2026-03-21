import { useState, useEffect } from "react";
import { Search, Edit2, Shield, Ban } from "lucide-react";
import { adminAPI } from "../../../lib/api";

interface UserData {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  totalAiUsage?: {
    resume: number;
    email: number;
    coverLetter: number;
  };
}

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    adminAPI.getUsers()
      .then((res) => setUsers(res.data))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#3B2F2F]">User Management</h1>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
          <input
            type="text"
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D6A85F]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center">
            <div className="size-8 border-3 border-gray-300 border-t-[#D6A85F] rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-500">Loading users...</p>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-sm">
              <tr>
                <th className="px-6 py-4 font-medium">User</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Joined</th>
                <th className="px-6 py-4 font-medium text-center">AI Usage</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-[#3B2F2F]">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center space-x-4 text-xs">
                      <div className="flex flex-col items-center" title="Resumes">
                        <span className="text-[#D6A85F] font-bold">{user.totalAiUsage?.resume || 0}</span>
                        <span className="text-gray-400">R</span>
                      </div>
                      <div className="flex flex-col items-center" title="Emails">
                        <span className="text-blue-500 font-bold">{user.totalAiUsage?.email || 0}</span>
                        <span className="text-gray-400">E</span>
                      </div>
                      <div className="flex flex-col items-center" title="Cover Letters">
                        <span className="text-purple-500 font-bold">{user.totalAiUsage?.coverLetter || 0}</span>
                        <span className="text-gray-400">C</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end space-x-2">
                      <button className="p-2 text-gray-400 hover:text-[#D6A85F] transition-colors" title="Edit"><Edit2 className="size-4" /></button>
                      <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors" title="Role"><Shield className="size-4" /></button>
                      <button className="p-2 text-gray-400 hover:text-red-500 transition-colors" title="Suspend"><Ban className="size-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}