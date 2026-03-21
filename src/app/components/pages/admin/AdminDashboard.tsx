import { motion } from "motion/react";
import { Users, FileText, Mail, Activity, ImageIcon, Sparkles, Wand2, AlertTriangle, Wrench } from "lucide-react";
import { useState, useEffect } from "react";
import { adminAPI } from "../../../lib/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>({
    totalUsers: 0,
    totalCVs: 0,
    totalMessages: 0,
    totalAssets: 0,
    aiStats: { totalGroqCalls: 0, totalGeminiCalls: 0, totalFailures: 0 }
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    adminAPI.getStats()
      .then((res) => setStats(res.data))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const statCards = [
    { title: "Uploaded Assets", value: stats.totalAssets.toLocaleString(), icon: Activity, color: "text-purple-500" },
    { title: "AI Repairs", value: (stats.aiStats.totalResumesRepaired || 0).toLocaleString(), icon: Wrench, color: "text-[#D6A85F]" },
    { title: "AI Emails", value: (stats.aiStats.totalEmailsGenerated || 0).toLocaleString(), icon: Mail, color: "text-blue-500" },
    { title: "AI Cover Letters", value: (stats.aiStats.totalCoverLettersGenerated || 0).toLocaleString(), icon: FileText, color: "text-purple-500" },
    { title: "Groq Usage", value: stats.aiStats.totalGroqCalls.toLocaleString(), icon: Sparkles, color: "text-indigo-500" },
    { title: "Gemini Usage", value: stats.aiStats.totalGeminiCalls.toLocaleString(), icon: Wand2, color: "text-cyan-500" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#3B2F2F] mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="size-12 bg-[#FDFBF7] rounded-xl flex items-center justify-center text-[#D6A85F]">
                <stat.icon className="size-6" />
              </div>
              {isLoading && (
                <div className="size-4 border-2 border-gray-300 border-t-gray-500 rounded-full animate-spin" />
              )}
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-[#3B2F2F]">{isLoading ? "..." : stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-xl font-bold text-[#3B2F2F] mb-4">System Info</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="p-4 bg-gray-50 rounded-xl">
            <span className="text-gray-500">Database</span>
            <p className="font-semibold text-[#3B2F2F]">MongoDB Atlas — elevatecv</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <span className="text-gray-500">Media Storage</span>
            <p className="font-semibold text-[#3B2F2F]">Cloudinary — elevatecv folder</p>
          </div>
        </div>
      </div>
    </div>
  );
}