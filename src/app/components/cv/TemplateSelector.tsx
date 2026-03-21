import { useStore } from "../../store";
import { CheckCircle2, Sparkles } from "lucide-react";
import CVPreview from "./CVPreview";
import { DUMMY_CV_DATA } from "../../lib/dummyData";
import { memo } from "react";

const TEMPLATES = [
  { id: "modern-maroon", name: "Modern Maroon", desc: "Modern layout with a touch of maroon elegance." },
  { id: "dark-charcoal", name: "Dark Charcoal", desc: "Sleek and professional dark-themed layout." },
  { id: "navy-executive", name: "Navy Executive", desc: "Deep navy accents for an executive look." },
  { id: "emerald-corporate", name: "Emerald Corporate", desc: "Clean, fresh, and professional emerald finish." },
  { id: "luxury-navy-gold", name: "Luxury Navy Gold", desc: "Premium navy background with gold highlights." },
  { id: "indigo-tech", name: "Indigo Tech", desc: "Modern tech-focused indigo design." },
  { id: "bold-orange-creative", name: "Bold Orange Creative", desc: "Vibrant and energetic creative design." },
  { id: "teal-modern-pro", name: "Teal Modern Pro", desc: "Professional teal header with a clean grid." },
  { id: "europass-official", name: "Europass Official", desc: "Standard European Union format." },
  { id: "european-modern-french", name: "European Modern French", desc: "Elegant French-style modern European CV." },
  { id: "german-swiss-style", name: "German / Swiss Style", desc: "Structured and formal German/Swiss layout." },
  { id: "french-belgian-style", name: "French / Belgian Style", desc: "Classic Franco-Belgian professional style." },
  { id: "modern-professional", name: "Modern Professional", desc: "Two-column layout, clean structure." },
  { id: "minimalist", name: "Classic Minimalist", desc: "Traditional top-down layout, ATS optimized." },
  { id: "corporate", name: "Corporate Standard", desc: "Professional ATS-friendly." },
  { id: "creative", name: "Creative Modern", desc: "Slightly bold, good for design." },
  { id: "black-white-modern", name: "Sleek Mono", desc: "Clean typography focused." },
  { id: "green-modern", name: "Nature Corporate", desc: "Fresh take on standard layouts." },
  { id: "blue-white-marketing", name: "Marketing Exec", desc: "Focus on results and metrics." },
  { id: "black-white-pro", name: "Executive Pro", desc: "Strictly professional layout." },
  { id: "pro-modern-alt", name: "Modern Executive", desc: "Strong headings and dividers." },
  { id: "pink-maroon-photo", name: "Creative Vision", desc: "Stand out with bold colors." },
  { id: "ats-harvard", name: "ATS Harvard", desc: "Classic academic serif style." },
  { id: "ats-tech-modern", name: "ATS Tech Modern", desc: "Clean sans-serif, perfect for tech." },
  { id: "ats-executive", name: "ATS Executive", desc: "Direct and highly professional." },
  { id: "ats-finance", name: "ATS Finance Strict", desc: "No fluff, standard alignment." },
  { id: "ats-creative", name: "ATS Creative Clean", desc: "Minimalist with subtle color." },
  { id: "ats-consulting", name: "ATS Consulting Pro", desc: "Dense but highly readable." },
  { id: "ats-startup", name: "ATS Startup Agile", desc: "Modern bullets and spacing." },
  { id: "ats-healthcare", name: "ATS Healthcare Standard", desc: "Robust section blocks." },
  { id: "ats-engineering", name: "ATS Engineering Focused", desc: "Emphasis on skills mapping." },
  { id: "ats-legal", name: "ATS Legal Formal", desc: "Strictly structured, left-aligned." },
  { id: "premium-1", name: "Executive Noir", desc: "Sophisticated dark sidebar with gold accents." },
  { id: "premium-2", name: "Swiss Grid", desc: "Clean, minimalist design following Swiss principles." },
  { id: "premium-3", name: "Architect", desc: "Structured elegance with serif typography." },
  { id: "premium-4", name: "Gradient Modern", desc: "Contemporary look with subtle teal gradients." },
  { id: "premium-5", name: "Timeline Pro", desc: "Focus on career progression with a vertical timeline." },
  { id: "premium-6", name: "Minimal Ink", desc: "Clean, high-contrast monochrome design." },
  { id: "premium-7", name: "Horizon", desc: "Balanced teal layout with optimized readability." },
  { id: "premium-8", name: "Diamond Cut", desc: "Geometric-inspired layout with purple accents." },
  { id: "premium-9", name: "Mono Block", desc: "Bold industrial design with large typography." },
  { id: "premium-10", name: "Soft Premium", desc: "Warm cream-toned design with serif elegance." }
];

const TemplatePreview = memo(({ templateId }: { templateId: string }) => {
  return (
    <div className="w-full h-full relative overflow-hidden bg-white">
      <div 
        className="absolute top-0 left-0 w-[794px] h-[1123px] origin-top-left pointer-events-none select-none"
        style={{ transform: 'scale(0.24)' }}
      >
        <CVPreview templateId={templateId} data={DUMMY_CV_DATA} />
      </div>
      {/* Overlay to prevent interaction and add depth */}
      <div className="absolute inset-0 bg-transparent" />
    </div>
  );
});

export default function TemplateSelector() {
  const selectedTemplateId = useStore((state) => state.selectedTemplateId);
  const setSelectedTemplateId = useStore((state) => state.setSelectedTemplateId);

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-[#3B2F2F] flex items-center gap-2">
          <Sparkles className="size-5 text-[#D6A85F]" />
          Choose Template
        </h2>
        <p className="text-sm text-gray-500 mt-1">Select a original structure. Your content auto-fits to any design.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 pb-10">
        {TEMPLATES.map((template) => {
          const isSelected = selectedTemplateId === template.id;
          const isPremium = template.id.startsWith('premium-');
          
          return (
            <button
              key={template.id}
              onClick={() => setSelectedTemplateId(template.id)}
              className={`relative group text-left transition-all duration-300 rounded-2xl overflow-hidden border-2 flex flex-col ${isSelected ? 'border-[#D6A85F] ring-4 ring-[#D6A85F]/10 shadow-lg' : 'border-transparent hover:border-gray-200'}`}
            >
              <div className="aspect-[1/1.4] w-full bg-white overflow-hidden relative border-b border-gray-100">
                <TemplatePreview templateId={template.id} />
                
                <div className={`absolute inset-0 transition-opacity duration-300 ${isSelected ? 'bg-[#D6A85F]/5' : 'bg-black/0 group-hover:bg-black/5'}`} />
                
                {isPremium && (
                  <div className="absolute top-3 left-3 px-2 py-0.5 bg-[#3B2F2F] text-[#D6A85F] text-[9px] font-black uppercase tracking-widest rounded-md shadow-lg border border-[#D6A85F]/20">
                    Premium
                  </div>
                )}

                {isSelected && (
                  <div className="absolute top-3 right-3 bg-[#D6A85F] rounded-full shadow-lg p-1 animate-in zoom-in-50 duration-300">
                    <CheckCircle2 className="size-5 text-white" />
                  </div>
                )}
              </div>
              
              <div className={`p-4 bg-white transition-colors ${isSelected ? 'bg-[#D6A85F]/5' : ''}`}>
                <h3 className="font-bold text-xs text-[#3B2F2F] truncate uppercase tracking-tight">{template.name}</h3>
                <p className="text-[10px] text-gray-400 truncate mt-1 leading-none">{template.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
