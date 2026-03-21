import { Link } from "react-router";
import { motion } from "motion/react";
import { FileText, Mail, Wrench, BriefcaseBusiness, ArrowRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const tools = [
  {
    title: "Resume Builder",
    desc: "Create a job-winning CV with live preview.",
    href: "/dashboard/resume-builder",
    icon: FileText,
    color: "bg-blue-50 text-blue-600",
    hoverColor: "hover:bg-blue-600 hover:text-white hover:shadow-blue-600/20"
  },
  {
    title: "Resume Repair",
    desc: "Redesign your old CV instantly.",
    href: "/dashboard/resume-repair",
    icon: Wrench,
    color: "bg-orange-50 text-orange-600",
    hoverColor: "hover:bg-orange-600 hover:text-white hover:shadow-orange-600/20"
  },
  {
    title: "Cover Letter",
    desc: "Auto-generate tailored cover letters.",
    href: "/dashboard/cover-letter",
    icon: Mail,
    color: "bg-emerald-50 text-emerald-600",
    hoverColor: "hover:bg-emerald-600 hover:text-white hover:shadow-emerald-600/20"
  },
  {
    title: "Email Writer",
    desc: "Write professional outreach emails.",
    href: "/dashboard/email-writer",
    icon: BriefcaseBusiness,
    color: "bg-purple-50 text-purple-600",
    hoverColor: "hover:bg-purple-600 hover:text-white hover:shadow-purple-600/20"
  }
];

export default function DashboardHome() {
  const { user } = useAuth();

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-[#3B2F2F] mb-2">
          Welcome back{user?.name ? `, ${user.name}` : ''}! 👋
        </h1>
        <p className="text-gray-600">What would you like to build today?</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {tools.map((tool, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link
              to={tool.href}
              className={`block p-8 rounded-3xl bg-white border border-gray-100 shadow-sm transition-all duration-300 group ${tool.hoverColor}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className={`size-14 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 ${tool.color} group-hover:bg-white/20 group-hover:text-white`}>
                    <tool.icon className="size-7" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 transition-colors duration-300 group-hover:text-white">{tool.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed transition-colors duration-300 group-hover:text-white/80">{tool.desc}</p>
                </div>
                <div className="size-10 rounded-full bg-gray-50 flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:-translate-y-1 group-hover:translate-x-1">
                  <ArrowRight className="size-5 text-gray-400 group-hover:text-[#3B2F2F]" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 bg-gradient-to-br from-[#3B2F2F] to-[#2B2222] rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D6A85F] rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">Pro Tip: Keep it Concise</h2>
          <p className="text-gray-300 max-w-xl mb-6">Recruiters spend an average of 7 seconds scanning a CV. Make sure your most impressive achievements are at the top and clearly visible.</p>
          <Link to="/dashboard/resume-builder" className="inline-flex items-center space-x-2 bg-white text-[#3B2F2F] px-6 py-3 rounded-full font-semibold hover:bg-gray-50 transition-colors">
            <span>Continue Editing Resume</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
