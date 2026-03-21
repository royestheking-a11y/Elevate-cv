import { Mail, CheckCircle2, Circle } from "lucide-react";
import { useState, useEffect } from "react";
import { adminAPI } from "../../../lib/api";

interface MessageData {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [readIds, setReadIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    adminAPI.getMessages()
      .then((res) => setMessages(res.data))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const toggleRead = (id: string) => {
    setReadIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const timeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#3B2F2F] mb-8">Contact Messages</h1>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center">
            <div className="size-8 border-3 border-gray-300 border-t-[#D6A85F] rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-500">Loading messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="p-12 text-center text-gray-500">No messages yet</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {messages.map((msg) => {
              const isRead = readIds.has(msg._id);
              return (
                <div
                  key={msg._id}
                  className={`p-6 flex items-start gap-4 transition-colors hover:bg-gray-50/50 ${
                    !isRead ? "bg-orange-50/20" : ""
                  }`}
                >
                  <button onClick={() => toggleRead(msg._id)} className="mt-1 flex-shrink-0">
                    {isRead ? (
                      <CheckCircle2 className="size-5 text-gray-300 hover:text-gray-500" />
                    ) : (
                      <Circle className="size-5 text-[#D6A85F] hover:text-[#c29650] fill-[#D6A85F]/20" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={`text-lg font-medium truncate ${!isRead ? "text-[#3B2F2F] font-bold" : "text-gray-700"}`}>
                        {msg.name}
                      </h3>
                      <span className="text-sm text-gray-400 whitespace-nowrap ml-4">{timeAgo(msg.createdAt)}</span>
                    </div>
                    <div className="text-sm text-[#D6A85F] mb-2">{msg.email}</div>
                    <p className={`text-sm truncate ${!isRead ? "text-gray-800 font-medium" : "text-gray-500"}`}>
                      {msg.message}
                    </p>
                    <div className="mt-4 flex gap-2">
                      <button className="px-4 py-2 bg-[#FDFBF7] border border-gray-200 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                        <Mail className="size-4" />
                        Reply via Email
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}