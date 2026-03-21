import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { cvAPI } from "../../lib/api";
import CVPreview from "../cv/CVPreview";
import { Loader2, AlertCircle, Download, Share2 } from "lucide-react";
import { Logo } from "../ui/Logo";

export default function PublicCVPage() {
  const { id } = useParams<{ id: string }>();
  const [cvData, setCvData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPublicCV = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const response = await cvAPI.getPublic(id);
        setCvData(response.data);
      } catch (err: any) {
        console.error("Error fetching public CV:", err);
        setError(err.response?.data?.message || "Failed to load CV. It might be private or deleted.");
      } finally {
        setLoading(false);
      }
    };

    fetchPublicCV();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFBF7]">
        <Loader2 className="size-12 text-[#D6A85F] animate-spin mb-4" />
        <p className="text-[#3B2F2F] font-medium">Fetching professional resume...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFBF7] p-6 text-center">
        <div className="size-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
          <AlertCircle className="size-8 text-red-600" />
        </div>
        <h1 className="text-2xl font-bold text-[#3B2F2F] mb-2">Resume Not Found</h1>
        <p className="text-gray-600 mb-8 max-w-md">{error}</p>
        <Link 
          to="/" 
          className="px-6 py-3 bg-[#3B2F2F] text-white rounded-full font-medium hover:bg-[#2B2222] transition-all"
        >
          Create Your Own Resume
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Public Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Logo className="size-7" />
            <span className="font-bold text-[#3B2F2F] hidden sm:inline">ElevateCV</span>
          </Link>
          
          <div className="flex items-center space-x-3">
            <span className="text-xs text-gray-400 hidden md:inline mr-2 italic">
              View only mode
            </span>
            <Link 
              to="/signup" 
              className="text-sm font-medium text-[#3B2F2F] hover:text-[#D6A85F] transition-colors px-4 py-2 border border-gray-200 rounded-full bg-white shadow-sm"
            >
              Build your own
            </Link>
            <button 
              onClick={() => window.print()}
              className="flex items-center space-x-2 px-4 py-2 bg-[#3B2F2F] text-white rounded-full text-sm font-medium hover:bg-black transition-all shadow-sm active:scale-95"
            >
              <Download className="size-4" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* CV Preview Area */}
      <main className="flex-1 overflow-y-auto py-8 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white shadow-2xl rounded-sm overflow-hidden transform transition-all">
            <CVPreview 
              data={cvData} 
              templateId={cvData.selectedTemplateId} 
              themeColor={cvData.themeColor} 
            />
          </div>
          
          {/* Public Footer / Branding */}
          <div className="mt-12 mb-8 text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white rounded-full border border-[#D6A85F]/20 shadow-sm">
              <span className="text-xs text-gray-500 font-medium">Built with</span>
              <Logo className="size-4" />
              <span className="text-xs font-bold text-[#3B2F2F]">ElevateCV</span>
            </div>
            <p className="mt-4 text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
              The smartest way to landing your dream job
            </p>
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          header, footer, .no-print { display: none !important; }
          body, main { background: white !important; padding: 0 !important; margin: 0 !important; }
          .max-w-5xl { max-width: none !important; }
          .shadow-2xl { shadow: none !important; }
        }
      `}} />
    </div>
  );
}
