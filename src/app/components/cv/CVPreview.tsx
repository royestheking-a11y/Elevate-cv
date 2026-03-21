import { useStore, CVData } from "../../store";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { PremiumTemplates } from "./templates/PremiumTemplates";

export default function CVPreview({ data, templateId, themeColor: customColor }: { data?: CVData, templateId?: string, themeColor?: string } = {}) {
  const storeData = useStore((state) => state.cvData);
  const storeTemplateId = useStore((state) => state.selectedTemplateId);
  const storeThemeColor = useStore((state) => state.themeColor);

  const cvData = data || storeData;
  const selectedTemplateId = templateId || storeTemplateId;
  const themeColor = customColor || storeThemeColor;

  const { personal, summary, experience, education, skills, projects } = cvData as CVData;

  const renderContactInfo = (color = themeColor, justify = "center") => (
    <div className={`flex flex-wrap justify-${justify} gap-x-6 gap-y-2 text-sm text-gray-500`}>
      {personal.email && (
        <div className="flex items-center space-x-1">
          <Mail size={14} style={{ color }} />
          <span>{personal.email}</span>
        </div>
      )}
      {personal.phone && (
        <div className="flex items-center space-x-1">
          <Phone size={14} style={{ color }} />
          <span>{personal.phone}</span>
        </div>
      )}
      {personal.location && (
        <div className="flex items-center space-x-1">
          <MapPin size={14} style={{ color }} />
          <span>{personal.location}</span>
        </div>
      )}
      {personal.website && (
        <div className="flex items-center space-x-1">
          <Globe size={14} style={{ color }} />
          <span>{personal.website.replace(/^https?:\/\//, '')}</span>
        </div>
      )}
    </div>
  );

  // --- NEW PREMIUM TEMPLATES (1-10) ---
  if (selectedTemplateId?.startsWith('premium-')) {
    return (
      <div className="w-full h-full bg-[#f0f0f0] flex justify-center py-10 overflow-auto">
        <div className="bg-white shadow-2xl origin-top scale-[0.8] sm:scale-100 transition-all duration-500">
          <PremiumTemplates templateId={selectedTemplateId} data={cvData as CVData} themeColor={themeColor} />
        </div>
      </div>
    );
  }

  // --- EXISTING TEMPLATES ---

  // 1. Modern Maroon
  if (selectedTemplateId === "modern-maroon") {
    return (
      <div className="w-full h-full bg-[#FAF8F5] text-gray-800 font-serif flex flex-row overflow-hidden shadow-2xl" style={{ minHeight: '297mm' }}>
        <style dangerouslySetInnerHTML={{ __html: `
          .maroon-sidebar { background: #8B1A2B; color: #fff; width: 300px; padding: 40px 30px; flex-shrink: 0; }
          .maroon-main { flex: 1; padding: 50px 45px; background: #FAF8F5; }
          .maroon-sidebar-title { font-size: 11px; letter-spacing: 3px; text-transform: uppercase; font-weight: 700; color: #C9A96E; margin-bottom: 14px; display: flex; align-items: center; gap: 8px; }
          .maroon-sidebar-title::after { content: ''; flex: 1; height: 1px; background: rgba(255,255,255,0.2); }
          .maroon-section-title { font-size: 16px; font-weight: 600; color: #8B1A2B; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 2px solid #8B1A2B; }
          .maroon-skill-bar { height: 3px; background: rgba(255,255,255,0.15); border-radius: 2px; margin-top: 4px; }
          .maroon-skill-fill { height: 100%; background: #C9A96E; border-radius: 2px; }
        `}} />
        <aside className="maroon-sidebar flex flex-col">
          <div className="flex flex-col items-center mb-10">
            <div className={`size-36 bg-white/10 mb-6 flex items-center justify-center overflow-hidden border-4 border-white/30 ${personal.photoShape === 'square' ? 'rounded-2xl' : 'rounded-full'}`}>
               {personal.photoUrl ? <img src={personal.photoUrl} alt="Profile" className="w-full h-full object-cover" /> : <span className="text-4xl text-white/40">👤</span>}
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-normal tracking-[2px] uppercase leading-tight">{personal.fullName.split(' ')[0]}</h1>
              <h1 className="text-2xl font-bold tracking-[2px] uppercase leading-tight">{personal.fullName.split(' ').slice(1).join(' ')}</h1>
              <p className="text-xs tracking-[1.5px] text-white/70 mt-2 uppercase">{personal.jobTitle}</p>
            </div>
          </div>

          <div className="space-y-8">
            <section>
              <div className="maroon-sidebar-title">Contact</div>
              <div className="space-y-3 text-[13px] text-white/85">
                {personal.phone && <div className="flex items-center gap-2"><span>📞</span> {personal.phone}</div>}
                {personal.email && <div className="flex items-center gap-2"><span>✉️</span> {personal.email}</div>}
                {personal.location && <div className="flex items-center gap-2"><span>📍</span> {personal.location}</div>}
              </div>
            </section>

            {skills.length > 0 && (
              <section>
                <div className="maroon-sidebar-title">Skills</div>
                <div className="space-y-4">
                  {skills.map((s) => (
                    <div key={s.id}>
                      <div className="text-[13px] text-white/85">{s.name}</div>
                      <div className="maroon-skill-bar"><div className="maroon-skill-fill" style={{ width: s.level || '80%' }}></div></div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </aside>

        <main className="maroon-main overflow-y-auto">
          {summary && (
            <div className="mb-10">
              <div className="maroon-section-title">About Me</div>
              <p className="text-[13.5px] leading-[1.7] text-gray-600">{summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div className="mb-10">
              <div className="maroon-section-title">Work Experience</div>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-sm font-bold text-gray-900">{exp.title}</h3>
                      <span className="text-xs text-gray-500 whitespace-nowrap">{exp.startDate} – {exp.current ? "Present" : exp.endDate}</span>
                    </div>
                    <div className="text-[13px] font-bold text-[#8B1A2B] mb-2">{exp.company}</div>
                    <p className="text-[13px] leading-[1.65] text-gray-600">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div className="mb-10">
              <div className="maroon-section-title">Education</div>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="flex justify-between items-start">
                    <div>
                      <div className="text-sm font-bold text-gray-900">{edu.degree}</div>
                      <div className="text-[13px] text-[#8B1A2B] font-bold">{edu.school}</div>
                      {edu.description && <p className="text-xs text-gray-500 mt-1">{edu.description}</p>}
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap">{edu.startDate} – {edu.endDate}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }

  // 2. Dark Charcoal
  if (selectedTemplateId === "dark-charcoal") {
    return (
      <div className="w-full h-full bg-[#f0f0f0] text-gray-800 font-sans flex flex-row overflow-hidden shadow-2xl" style={{ minHeight: '297mm' }}>
        <style dangerouslySetInnerHTML={{ __html: `
          .charcoal-sidebar { background: #1E1E1E; color: #fff; width: 280px; padding: 50px 30px; flex-shrink: 0; }
          .charcoal-main { flex: 1; padding: 60px 50px; background: #fff; }
          .charcoal-sidebar-title { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; font-weight: 700; color: #D4AF37; margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px; }
          .charcoal-section-title { font-size: 18px; font-weight: 800; color: #1E1E1E; text-transform: uppercase; margin-bottom: 20px; border-left: 5px solid #1E1E1E; padding-left: 15px; }
          .charcoal-skill-tag { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 4px 10px; border-radius: 4px; font-size: 12px; }
        `}} />
        <aside className="charcoal-sidebar">
          <div className="mb-12">
            <h1 className="text-3xl font-black text-white leading-tight uppercase tracking-tight">{personal.fullName}</h1>
            <p className="text-sm font-medium text-[#D4AF37] mt-2 uppercase tracking-widest">{personal.jobTitle}</p>
          </div>

          <div className="space-y-10">
            <section>
              <div className="charcoal-sidebar-title">Details</div>
              <div className="space-y-4 text-xs text-gray-400">
                {personal.phone && <div><div className="text-gray-500 font-bold uppercase mb-1">Phone</div>{personal.phone}</div>}
                {personal.email && <div><div className="text-gray-500 font-bold uppercase mb-1">Email</div>{personal.email}</div>}
                {personal.location && <div><div className="text-gray-500 font-bold uppercase mb-1">Address</div>{personal.location}</div>}
              </div>
            </section>

            {skills.length > 0 && (
              <section>
                <div className="charcoal-sidebar-title">Expertise</div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((s) => <span key={s.id} className="charcoal-skill-tag">{s.name}</span>)}
                </div>
              </section>
            )}
          </div>
        </aside>

        <main className="charcoal-main">
          {summary && (
            <div className="mb-12">
              <div className="charcoal-section-title">Profile</div>
              <p className="text-sm leading-relaxed text-gray-600 text-justify">{summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div className="mb-12">
              <div className="charcoal-section-title">Experience</div>
              <div className="space-y-8">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-2 before:size-2 before:bg-gray-300 before:rounded-full">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-base font-bold text-gray-900">{exp.title}</h3>
                      <span className="text-[11px] font-bold text-gray-400 uppercase">{exp.startDate} – {exp.current ? "Present" : exp.endDate}</span>
                    </div>
                    <div className="text-sm font-bold text-[#D4AF37] mb-3">{exp.company}</div>
                    <p className="text-sm leading-relaxed text-gray-600">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div>
              <div className="charcoal-section-title">Education</div>
              <div className="space-y-6">
                {education.map((edu) => (
                  <div key={edu.id} className="flex justify-between items-start">
                    <div>
                      <div className="text-base font-bold text-gray-900">{edu.degree}</div>
                      <div className="text-sm font-medium text-gray-500">{edu.school}</div>
                    </div>
                    <span className="text-[11px] font-bold text-gray-400 uppercase">{edu.startDate} – {edu.endDate}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }

  // 3. Navy Executive
  if (selectedTemplateId === "navy-executive") {
    return (
      <div className="w-full h-full bg-white text-gray-800 font-sans p-12 overflow-hidden shadow-2xl" style={{ minHeight: '297mm' }}>
        <style dangerouslySetInnerHTML={{ __html: `
          .navy-header { background: #1A3C5E; color: #fff; padding: 40px; margin: -48px -48px 40px; }
          .navy-section-title { font-size: 14px; font-weight: 800; color: #1A3C5E; text-transform: uppercase; letter-spacing: 2px; border-bottom: 2px solid #1A3C5E; padding-bottom: 5px; margin-bottom: 20px; }
          .navy-exp-item { margin-bottom: 25px; }
          .navy-dot { width: 8px; height: 8px; background: #1A3C5E; border-radius: 50%; margin-top: 6px; flex-shrink: 0; }
        `}} />
        <header className="navy-header text-center">
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">{personal.fullName}</h1>
          <p className="text-xl font-light opacity-80 mb-6 tracking-widest uppercase">{personal.jobTitle}</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm opacity-90">
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>{personal.phone}</span>}
            {personal.location && <span>{personal.location}</span>}
            {personal.website && <span>{personal.website}</span>}
          </div>
        </header>

        <div className="max-w-4xl mx-auto space-y-10">
          {summary && (
            <section>
              <div className="navy-section-title">Professional Summary</div>
              <p className="text-base leading-relaxed text-gray-700">{summary}</p>
            </section>
          )}

          {experience.length > 0 && (
            <section>
              <div className="navy-section-title">Work Experience</div>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id} className="flex gap-4">
                    <div className="navy-dot"></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="text-lg font-bold text-gray-900">{exp.title}</h3>
                        <span className="text-sm font-bold text-[#1A3C5E]">{exp.startDate} – {exp.current ? "Present" : exp.endDate}</span>
                      </div>
                      <div className="text-base font-semibold text-gray-600 mb-2">{exp.company}</div>
                      <p className="text-sm leading-relaxed text-gray-600">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="grid grid-cols-2 gap-12">
            {education.length > 0 && (
              <section>
                <div className="navy-section-title">Education</div>
                <div className="space-y-6">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <div className="text-base font-bold text-gray-900">{edu.degree}</div>
                      <div className="text-sm font-semibold text-gray-500">{edu.school}</div>
                      <div className="text-xs font-bold text-gray-400 mt-1 uppercase">{edu.startDate} – {edu.endDate}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {skills.length > 0 && (
              <section>
                <div className="navy-section-title">Expertise</div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((s) => (
                    <span key={s.id} className="bg-gray-100 px-3 py-1.5 rounded text-sm font-bold text-gray-700">
                      {s.name}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 4. Emerald Corporate
  if (selectedTemplateId === "emerald-corporate") {
    return (
      <div className="w-full h-full bg-white text-gray-800 font-sans flex flex-col overflow-hidden shadow-2xl border-t-[10px] border-[#2D6A4F]" style={{ minHeight: '297mm' }}>
        <style dangerouslySetInnerHTML={{ __html: `
          .emerald-main { display: grid; grid-template-columns: 1fr 280px; flex: 1; }
          .emerald-left { padding: 50px 40px 50px 50px; border-right: 1px solid #E9EDEF; }
          .emerald-right { padding: 50px 40px; background: #F8FAF9; }
          .emerald-section-title { font-size: 13px; font-weight: 900; color: #2D6A4F; text-transform: uppercase; letter-spacing: 2.5px; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; }
          .emerald-section-title::after { content: ''; flex: 1; height: 1.5px; background: #D8F3DC; }
          .emerald-date-chip { background: #D8F3DC; color: #1B4332; font-size: 11px; font-weight: 800; padding: 3px 10px; border-radius: 4px; text-transform: uppercase; }
        `}} />
        <header className="p-12 px-14 flex justify-between items-center bg-white border-b border-gray-100">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight leading-none mb-2">{personal.fullName}</h1>
            <p className="text-xl font-medium text-[#2D6A4F] uppercase tracking-[3px]">{personal.jobTitle}</p>
          </div>
          <div className={`size-32 bg-gray-100 overflow-hidden border-2 border-gray-100 shadow-sm ${personal.photoShape === 'square' ? 'rounded-2xl' : 'rounded-full'}`}>
             {personal.photoUrl ? <img src={personal.photoUrl} alt="Profile" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-300 text-4xl">👤</div>}
          </div>
        </header>

        <div className="emerald-main">
          <div className="emerald-left">
            {summary && (
              <section className="mb-12">
                <div className="emerald-section-title">Professional Narrative</div>
                <p className="text-[14.5px] leading-relaxed text-gray-600 text-justify">{summary}</p>
              </section>
            )}

            {experience.length > 0 && (
              <section className="mb-12">
                <div className="emerald-section-title">Employment History</div>
                <div className="space-y-8">
                  {experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-center mb-2">
                        <div className="emerald-date-chip">{exp.startDate} – {exp.current ? "Present" : exp.endDate}</div>
                        <span className="text-xs font-bold text-gray-400 italic">Experience</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{exp.title}</h3>
                      <div className="text-base font-semibold text-[#2D6A4F] mb-3">{exp.company}</div>
                      <p className="text-[14px] leading-relaxed text-gray-600">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="emerald-right">
            <section className="mb-12">
              <div className="emerald-section-title">Contact</div>
              <div className="space-y-4">
                {personal.email && (
                  <div>
                    <div className="text-[10px] font-black text-gray-400 uppercase mb-1">Email Address</div>
                    <div className="text-sm font-bold text-gray-700">{personal.email}</div>
                  </div>
                )}
                {personal.phone && (
                  <div>
                    <div className="text-[10px] font-black text-gray-400 uppercase mb-1">Mobile Phone</div>
                    <div className="text-sm font-bold text-gray-700">{personal.phone}</div>
                  </div>
                )}
                {personal.location && (
                  <div>
                    <div className="text-[10px] font-black text-gray-400 uppercase mb-1">Location</div>
                    <div className="text-sm font-bold text-gray-700">{personal.location}</div>
                  </div>
                )}
              </div>
            </section>

            {skills.length > 0 && (
              <section className="mb-12">
                <div className="emerald-section-title">Core Skills</div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((s) => (
                    <span key={s.id} className="bg-white border border-[#D8F3DC] px-3 py-1 rounded-md text-sm font-bold text-[#1B4332] shadow-sm">
                      {s.name}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {education.length > 0 && (
              <section>
                <div className="emerald-section-title">Academic</div>
                <div className="space-y-6">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <div className="text-sm font-bold text-gray-900 leading-tight">{edu.degree}</div>
                      <div className="text-xs font-semibold text-[#2D6A4F] mt-1">{edu.school}</div>
                      <div className="text-[10px] font-bold text-gray-400 uppercase mt-2">{edu.startDate} – {edu.endDate}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 5. Luxury Navy Gold
  if (selectedTemplateId === "luxury-navy-gold") {
    return (
      <div className="w-full h-full bg-[#FAFAF8] text-gray-800 font-serif p-16 overflow-hidden shadow-2xl border-[15px] border-[#0D1B2A]" style={{ minHeight: '297mm' }}>
        <style dangerouslySetInnerHTML={{ __html: `
          .luxury-accent { color: #C9A96E; }
          .luxury-border { border-color: #C9A96E; }
          .luxury-bg-dark { background: #0D1B2A; }
          .luxury-section-title { font-size: 14px; font-weight: 700; color: #C9A96E; text-transform: uppercase; letter-spacing: 4px; border-bottom: 1px solid #C9A96E; padding-bottom: 8px; margin-bottom: 25px; text-align: center; }
        `}} />
        <header className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-0.5 bg-[#C9A96E] self-center"></div>
            <div className="mx-6 text-[10px] tracking-[5px] uppercase font-bold text-gray-400">Curriculum Vitae</div>
            <div className="w-20 h-0.5 bg-[#C9A96E] self-center"></div>
          </div>
          <h1 className="text-5xl font-normal tracking-wider text-[#0D1B2A] mb-3">{personal.fullName}</h1>
          <p className="text-sm tracking-[3px] text-[#C9A96E] uppercase font-medium">{personal.jobTitle}</p>
          <div className="mt-8 flex justify-center gap-8 text-[11px] uppercase tracking-widest text-gray-500 border-y border-gray-100 py-4">
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>{personal.phone}</span>}
            {personal.location && <span>{personal.location}</span>}
          </div>
        </header>

        <div className="max-w-3xl mx-auto space-y-14">
          {summary && (
            <section>
              <div className="luxury-section-title">Executive Summary</div>
              <p className="text-base leading-[1.8] text-gray-600 text-center italic px-10">"{summary}"</p>
            </section>
          )}

          {experience.length > 0 && (
            <section>
              <div className="luxury-section-title">Professional Career</div>
              <div className="space-y-10">
                {experience.map((exp) => (
                  <div key={exp.id} className="text-center">
                    <div className="text-xs font-bold text-[#C9A96E] tracking-[2px] uppercase mb-1">{exp.startDate} — {exp.current ? "Present" : exp.endDate}</div>
                    <h3 className="text-xl font-bold text-[#0D1B2A] mb-1">{exp.title}</h3>
                    <div className="text-sm font-medium text-gray-500 italic mb-4">{exp.company}</div>
                    <p className="text-sm leading-relaxed text-gray-600 max-w-2xl mx-auto">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="grid grid-cols-2 gap-16">
            {education.length > 0 && (
              <section>
                <div className="luxury-section-title !text-left !border-b-0 !pb-0 !mb-6">Education</div>
                <div className="space-y-8">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <div className="text-xs font-bold text-[#C9A96E] mb-1">{edu.startDate} — {edu.endDate}</div>
                      <div className="text-base font-bold text-[#0D1B2A] leading-tight">{edu.degree}</div>
                      <div className="text-sm text-gray-500 mt-1">{edu.school}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {skills.length > 0 && (
              <section>
                <div className="luxury-section-title !text-left !border-b-0 !pb-0 !mb-6">Competencies</div>
                <div className="grid grid-cols-1 gap-3">
                  {skills.map((s) => (
                    <div key={s.id} className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
                      <span className="font-medium text-gray-700">{s.name}</span>
                      <span className="text-[10px] uppercase tracking-tighter text-[#C9A96E] font-bold">{s.level || 'Expert'}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 6. Indigo Tech
  if (selectedTemplateId === "indigo-tech") {
    return (
      <div className="w-full h-full bg-[#f8fafc] text-slate-800 font-sans p-12 overflow-hidden shadow-2xl" style={{ minHeight: '297mm' }}>
        <style dangerouslySetInnerHTML={{ __html: `
          .tech-card { background: #fff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 24px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
          .tech-accent { color: #4F46E5; }
          .tech-section-title { font-size: 12px; font-weight: 800; color: #4F46E5; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
          .tech-section-title::before { content: ''; width: 4px; height: 16px; background: #4F46E5; border-radius: 2px; }
          .tech-pill { background: #EEF2FF; color: #4338CA; font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 99px; }
        `}} />
        <div className="max-w-5xl mx-auto grid grid-cols-12 gap-6">
          <header className="col-span-12 tech-card flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-6">
              <div className={`size-24 bg-indigo-600 flex items-center justify-center text-white text-3xl font-black ${personal.photoShape === 'square' ? 'rounded-2xl' : 'rounded-full'}`}>
                 {personal.photoUrl ? <img src={personal.photoUrl} alt="Profile" className="w-full h-full object-cover" /> : personal.fullName.charAt(0)}
              </div>
              <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{personal.fullName}</h1>
                <p className="text-lg font-medium text-indigo-600">{personal.jobTitle}</p>
                <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-500 font-medium">
                  {personal.email && <span>✉️ {personal.email}</span>}
                  {personal.location && <span>📍 {personal.location}</span>}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="tech-pill">Available for remote</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{personal.phone}</div>
            </div>
          </header>

          <aside className="col-span-4 space-y-6">
            <section className="tech-card">
              <div className="tech-section-title">Core Skills</div>
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => <span key={s.id} className="tech-pill">{s.name}</span>)}
              </div>
            </section>

            {education.length > 0 && (
              <section className="tech-card">
                <div className="tech-section-title">Education</div>
                <div className="space-y-6">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <div className="text-sm font-bold text-slate-900 leading-tight">{edu.degree}</div>
                      <div className="text-xs font-medium text-slate-500 mt-1">{edu.school}</div>
                      <div className="text-[10px] font-bold text-slate-400 mt-2 uppercase">{edu.startDate} – {edu.endDate}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </aside>

          <main className="col-span-8 space-y-6">
            {summary && (
              <section className="tech-card">
                <div className="tech-section-title">About</div>
                <p className="text-sm leading-relaxed text-slate-600">{summary}</p>
              </section>
            )}

            {experience.length > 0 && (
              <section className="tech-card">
                <div className="tech-section-title">Experience</div>
                <div className="space-y-8">
                  {experience.map((exp) => (
                    <div key={exp.id} className="group relative pl-6 border-l-2 border-slate-100 hover:border-indigo-100 transition-colors">
                      <div className="absolute -left-[5px] top-1.5 size-2 rounded-full bg-slate-200 group-hover:bg-indigo-400 transition-colors"></div>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-base font-bold text-slate-900">{exp.title}</h3>
                        <span className="text-[11px] font-bold text-slate-400 uppercase">{exp.startDate} — {exp.current ? "Present" : exp.endDate}</span>
                      </div>
                      <div className="text-sm font-bold text-indigo-600 mb-3">{exp.company}</div>
                      <p className="text-sm leading-relaxed text-slate-600">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    );
  }

  // 7. Bold Orange Creative
  if (selectedTemplateId === "bold-orange-creative") {
    return (
      <div className="w-full h-full bg-white text-black font-sans relative overflow-hidden shadow-2xl" style={{ minHeight: '297mm' }}>
        <style dangerouslySetInnerHTML={{ __html: `
           .orange-accent { color: #E85D04; }
           .orange-bg { background: #E85D04; }
           .orange-slash { position: absolute; top: -50px; right: -50px; width: 300px; height: 150px; background: #E85D04; transform: rotate(15deg); }
           .orange-section-num { font-size: 48px; font-weight: 900; color: rgba(232, 93, 4, 0.1); position: absolute; left: -20px; top: -20px; z-index: 0; }
           .orange-section-title { font-size: 20px; font-weight: 900; text-transform: uppercase; margin-bottom: 24px; position: relative; z-index: 1; }
        `}} />
        <div className="orange-slash"></div>
        
        <header className="p-16 pb-12 pt-20 relative">
          <div className="flex items-end gap-6 mb-4">
            <h1 className="text-7xl font-black uppercase tracking-tighter leading-[0.85]">{personal.fullName.split(' ')[0]}<br /><span className="orange-accent">{personal.fullName.split(' ').slice(1).join(' ')}</span></h1>
            {personal.photoUrl && (
               <div className={`size-32 bg-gray-100 border-4 border-black mb-1 overflow-hidden ${personal.photoShape === 'square' ? 'rounded-none' : 'rounded-full'}`}>
                 <img src={personal.photoUrl} alt="Profile" className="w-full h-full object-cover" />
               </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className="h-[3px] w-20 orange-bg"></div>
            <p className="text-xl font-bold uppercase tracking-[4px]">{personal.jobTitle}</p>
          </div>
        </header>

        <div className="grid grid-cols-12 p-16 pt-0 gap-16">
          <div className="col-span-8 space-y-20">
            {experience.length > 0 && (
              <section className="relative">
                <span className="orange-section-num">01</span>
                <h2 className="orange-section-title">Experiences</h2>
                <div className="space-y-12">
                  {experience.map((exp) => (
                    <div key={exp.id} className="grid grid-cols-12 gap-4">
                      <div className="col-span-3 text-sm font-black uppercase tracking-widest pt-1">{exp.startDate}<br />{exp.current ? "Now" : exp.endDate}</div>
                      <div className="col-span-9">
                        <h3 className="text-xl font-black uppercase mb-1">{exp.title}</h3>
                        <div className="text-sm font-bold orange-accent uppercase tracking-widest mb-4">{exp.company}</div>
                        <p className="text-sm leading-relaxed text-gray-600 text-justify">{exp.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {education.length > 0 && (
              <section className="relative">
                <span className="orange-section-num">02</span>
                <h2 className="orange-section-title">Education</h2>
                <div className="space-y-8">
                  {education.map((edu) => (
                    <div key={edu.id} className="grid grid-cols-12 gap-4">
                      <div className="col-span-3 text-sm font-black uppercase tracking-widest pt-1">{edu.startDate}<br />{edu.endDate}</div>
                      <div className="col-span-9">
                        <h3 className="text-xl font-black uppercase mb-1">{edu.degree}</h3>
                        <div className="text-sm font-bold orange-accent uppercase tracking-widest">{edu.school}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="col-span-4 space-y-16">
             <section className="relative">
                <h2 className="orange-section-title !text-sm !tracking-[3px]">Reach Me</h2>
                <div className="space-y-4 text-sm font-bold">
                  {personal.phone && <div><div className="text-[10px] text-gray-400 uppercase mb-1">Phone</div>{personal.phone}</div>}
                  {personal.email && <div><div className="text-[10px] text-gray-400 uppercase mb-1">Email</div>{personal.email}</div>}
                  {personal.location && <div><div className="text-[10px] text-gray-400 uppercase mb-1">Office</div>{personal.location}</div>}
                </div>
             </section>

             {skills.length > 0 && (
               <section className="relative">
                  <h2 className="orange-section-title !text-sm !tracking-[3px]">Expertise</h2>
                  <div className="space-y-3">
                    {skills.map((s) => (
                      <div key={s.id} className="flex flex-col gap-1">
                        <div className="text-xs font-black uppercase tracking-wider">{s.name}</div>
                        <div className="h-1 bg-gray-100"><div className="h-full orange-bg" style={{ width: s.level || '85%' }}></div></div>
                      </div>
                    ))}
                  </div>
               </section>
             )}

             {summary && (
               <section className="relative">
                  <h2 className="orange-section-title !text-sm !tracking-[3px]">About me</h2>
                  <p className="text-xs font-bold leading-loose text-gray-500 uppercase">{summary}</p>
               </section>
             )}
          </aside>
        </div>
      </div>
    );
  }

  // 8. Teal Modern Pro
  if (selectedTemplateId === "teal-modern-pro") {
    return (
      <div className="w-full h-full bg-white text-gray-800 font-sans p-0 overflow-hidden shadow-2xl" style={{ minHeight: '297mm' }}>
        <style dangerouslySetInnerHTML={{ __html: `
          .teal-header { background: #065F46; color: #fff; padding: 40px 60px; }
          .teal-accent { color: #059669; }
          .teal-bg-dim { background: #F0FDF4; }
          .teal-section-title { font-size: 15px; font-weight: 800; color: #065F46; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 25px; border-left: 4px solid #059669; padding-left: 15px; }
          .teal-skill-card { background: #fff; border: 1px solid #E5E7EB; border-left: 4px solid #059669; padding: 12px 16px; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
        `}} />
        <header className="teal-header flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-2 uppercase">{personal.fullName}</h1>
            <p className="text-xl font-medium opacity-80 uppercase tracking-widest">{personal.jobTitle}</p>
          </div>
          <div className="text-right text-sm font-medium space-y-2">
            {personal.email && <div className="flex items-center justify-end gap-2"><span>✉️</span> {personal.email}</div>}
            {personal.phone && <div className="flex items-center justify-end gap-2"><span>📞</span> {personal.phone}</div>}
            {personal.location && <div className="flex items-center justify-end gap-2"><span>📍</span> {personal.location}</div>}
          </div>
        </header>

        <div className="p-12 px-16 space-y-12">
          {summary && (
            <section>
              <div className="teal-section-title">Professional Summary</div>
              <p className="text-base leading-relaxed text-gray-600 border-l-2 border-gray-100 pl-6 py-2">{summary}</p>
            </section>
          )}

          <div className="grid grid-cols-12 gap-12">
            <main className="col-span-8 space-y-12">
              {experience.length > 0 && (
                <section>
                  <div className="teal-section-title">Experience</div>
                  <div className="space-y-8">
                    {experience.map((exp) => (
                      <div key={exp.id} className="relative">
                        <div className="flex justify-between items-baseline mb-2">
                          <h3 className="text-lg font-bold text-gray-900">{exp.title}</h3>
                          <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">{exp.startDate} – {exp.current ? "Present" : exp.endDate}</span>
                        </div>
                        <div className="text-sm font-bold text-emerald-600 mb-4">{exp.company}</div>
                        <p className="text-sm leading-relaxed text-gray-600 text-justify">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </main>

            <aside className="col-span-4 space-y-12">
               {skills.length > 0 && (
                 <section>
                   <div className="teal-section-title">Top Expertise</div>
                   <div className="space-y-3">
                     {skills.map((s) => (
                       <div key={s.id} className="teal-skill-card">
                         <div className="text-sm font-bold text-gray-800">{s.name}</div>
                         <div className="text-[10px] text-emerald-600 font-black uppercase mt-1 tracking-wider">{s.level || 'Professional'}</div>
                       </div>
                     ))}
                   </div>
                 </section>
               )}

               {education.length > 0 && (
                 <section>
                   <div className="teal-section-title">Education</div>
                   <div className="space-y-6">
                     {education.map((edu) => (
                       <div key={edu.id}>
                         <div className="text-sm font-extrabold text-gray-900 leading-tight">{edu.degree}</div>
                         <div className="text-xs font-bold text-emerald-600 mt-1">{edu.school}</div>
                         <div className="text-[10px] font-bold text-gray-400 mt-2 uppercase">{edu.startDate} – {edu.endDate}</div>
                       </div>
                     ))}
                   </div>
                 </section>
               )}
            </aside>
          </div>
        </div>
      </div>
    );
  }

  // 9. Europass Official
  if (selectedTemplateId === "europass-official") {
    return (
      <div className="w-full h-full bg-[#F0F2F5] text-gray-900 font-sans p-8 overflow-hidden shadow-2xl" style={{ minHeight: '297mm' }}>
        <style dangerouslySetInnerHTML={{ __html: `
          .euro-cv { background: #FFFFFF; border-top: 4px solid #003399; }
          .euro-header { display: flex; justify-content: space-between; border-bottom: 2px solid #003399; background: #003399; color: #fff; padding: 18px 30px; }
          .euro-section { display: grid; grid-template-columns: 200px 1fr; border-bottom: 1px solid #C8D0DC; }
          .euro-section-label { background: #003399; color: #FFFFFF; padding: 20px; font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; }
          .euro-section-body { padding: 20px 30px; }
        `}} />
        <div className="euro-cv">
          <header className="euro-header">
            <div>
              <div className="text-xl font-bold tracking-widest uppercase">Curriculum Vitae</div>
              <div className="text-[10px] opacity-60 tracking-[3px] uppercase mt-1">Europass Format</div>
            </div>
            <div className="hidden sm:flex gap-1 items-center">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="size-1.5 bg-[#FFCC00]" style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}></div>
              ))}
            </div>
          </header>

          <div className="grid grid-cols-[auto_1fr] border-b border-[#C8D0DC]">
            <div className="p-6 border-r border-[#C8D0DC]">
               <div className="size-28 bg-gray-50 border-2 border-gray-200 flex items-center justify-center overflow-hidden">
                 {personal.photoUrl ? <img src={personal.photoUrl} alt="Profile" className="w-full h-full object-cover" /> : <span className="text-4xl text-gray-300">👤</span>}
               </div>
            </div>
            <div className="p-6 px-8 space-y-2">
               <div className="grid grid-cols-[140px_1fr] text-[13px]"><span className="text-[#003399] font-bold uppercase tracking-wider text-[11px]">Name</span><span className="font-bold">{personal.fullName}</span></div>
               {personal.location && <div className="grid grid-cols-[140px_1fr] text-[13px]"><span className="text-[#003399] font-bold uppercase tracking-wider text-[11px]">Address</span><span>{personal.location}</span></div>}
               {personal.phone && <div className="grid grid-cols-[140px_1fr] text-[13px]"><span className="text-[#003399] font-bold uppercase tracking-wider text-[11px]">Telephone</span><span>{personal.phone}</span></div>}
               {personal.email && <div className="grid grid-cols-[140px_1fr] text-[13px]"><span className="text-[#003399] font-bold uppercase tracking-wider text-[11px]">Email</span><span>{personal.email}</span></div>}
            </div>
          </div>

          <div className="euro-section">
            <div className="euro-section-label">Desired Position</div>
            <div className="euro-section-body">
              <div className="text-base font-bold text-gray-800">{personal.jobTitle}</div>
            </div>
          </div>

          {experience.length > 0 && (
            <div className="euro-section">
              <div className="euro-section-label">Work Experience</div>
              <div className="euro-section-body space-y-8">
                {experience.map((exp, i) => (
                  <div key={exp.id}>
                    {i > 0 && <div className="border-t border-dashed border-gray-200 my-6"></div>}
                    <div className="text-xs font-bold text-[#003399] mb-1">{exp.startDate} – {exp.current ? "Present" : exp.endDate}</div>
                    <div className="text-sm font-bold text-gray-800">{exp.title}</div>
                    <div className="text-sm text-gray-600 italic mb-3">{exp.company}</div>
                    <p className="text-[13px] leading-relaxed text-gray-600">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div className="euro-section">
              <div className="euro-section-label">Education</div>
              <div className="euro-section-body space-y-8">
                {education.map((edu, i) => (
                  <div key={edu.id}>
                    {i > 0 && <div className="border-t border-dashed border-gray-200 my-6"></div>}
                    <div className="text-xs font-bold text-[#003399] mb-1">{edu.startDate} – {edu.endDate}</div>
                    <div className="text-sm font-bold text-gray-800">{edu.degree}</div>
                    <div className="text-sm text-gray-600 mt-1">{edu.school}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {skills.length > 0 && (
            <div className="euro-section">
              <div className="euro-section-label">Personal Skills</div>
              <div className="euro-section-body">
                <div className="grid grid-cols-1 gap-4">
                  {skills.map((s) => (
                    <div key={s.id} className="grid grid-cols-[140px_1fr] text-[13px]">
                      <span className="text-[#003399] font-bold uppercase tracking-wider text-[11px]">{s.name}</span>
                      <span className="text-gray-600">{s.level || 'Advanced'}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 10. European Modern French
  if (selectedTemplateId === "european-modern-french") {
    return (
      <div className="w-full h-full bg-[#FAF8F4] text-[#1E1B18] font-sans overflow-hidden shadow-2xl" style={{ minHeight: '297mm' }}>
        <style dangerouslySetInnerHTML={{ __html: `
          .french-header { display: grid; grid-template-columns: 220px 1fr; }
          .french-photo { background: #8C1A3C; padding: 40px 30px; display: flex; align-items: center; justify-content: center; }
          .french-info { background: #F5F1EB; padding: 40px; border-bottom: 3px solid #8C1A3C; display: flex; flex-direction: column; justify-content: center; }
          .french-body { display: grid; grid-template-columns: 220px 1fr; }
          .french-sidebar { background: #F5F1EB; padding: 40px 25px; border-right: 1px solid #D5CDC2; }
          .french-main { padding: 40px; background: #FAF8F4; }
          .french-section-title { font-size: 10px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: #8C1A3C; margin-bottom: 15px; border-bottom: 1.5px solid #C4956A; padding-bottom: 5px; }
          .french-main-title { font-family: serif; font-size: 22px; font-weight: 500; margin-bottom: 20px; border-bottom: 1px solid #D5CDC2; padding-bottom: 8px; display: flex; align-items: center; gap: 10px; }
          .french-main-title::before { content: ''; width: 4px; height: 22px; background: #8C1A3C; border-radius: 2px; }
        `}} />
        <header className="french-header">
          <div className="french-photo">
            <div className="size-32 border-2 border-white/20 flex items-center justify-center overflow-hidden">
               {personal.photoUrl ? <img src={personal.photoUrl} alt="Profile" className="w-full h-full object-cover" /> : <span className="text-4xl text-white/30">👤</span>}
            </div>
          </div>
          <div className="french-info">
            <h1 className="text-4xl font-serif text-[#1E1B18] leading-tight capitalize">{personal.fullName.split(' ')[0]} <em className="text-[#8C1A3C] not-italic font-bold">{personal.fullName.split(' ').slice(1).join(' ')}</em></h1>
            <p className="text-[13px] font-bold text-[#C4956A] uppercase tracking-[2px] mt-2">{personal.jobTitle}</p>
            <div className="mt-6 flex flex-wrap gap-4 text-xs text-gray-500 font-medium">
               <span>{personal.email}</span>
               <span>{personal.phone}</span>
               <span>{personal.location}</span>
            </div>
          </div>
        </header>

        <div className="french-body">
          <aside className="french-sidebar space-y-10">
            <section>
              <div className="french-section-title">Details</div>
              <div className="space-y-4">
                <div className="text-[13px] font-medium text-gray-700">{personal.location}</div>
                {personal.website && <div className="text-[13px] font-medium text-gray-700">{personal.website}</div>}
              </div>
            </section>

            {skills.length > 0 && (
              <section>
                <div className="french-section-title">Expertise</div>
                <div className="space-y-4">
                  {skills.map((s) => (
                    <div key={s.id}>
                      <div className="text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">{s.name}</div>
                      <div className="h-0.5 bg-gray-200"><div className="h-full bg-[#8C1A3C]" style={{ width: s.level || '80%' }}></div></div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {education.length > 0 && (
              <section>
                <div className="french-section-title">Education</div>
                <div className="space-y-6">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <div className="text-[11px] font-bold text-[#C4956A] mb-1">{edu.startDate} – {edu.endDate}</div>
                      <div className="text-[13px] font-bold text-gray-800 leading-tight">{edu.degree}</div>
                      <div className="text-[12px] text-gray-500 mt-1 italic">{edu.school}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </aside>

          <main className="french-main">
            {summary && (
              <section className="mb-12">
                <div className="french-main-title font-serif">Profil Professionnel</div>
                <p className="text-[15px] leading-relaxed text-gray-600 font-serif italic text-justify">"{summary}"</p>
              </section>
            )}

            {experience.length > 0 && (
              <section>
                <div className="french-main-title font-serif">Expériences de Travail</div>
                <div className="space-y-8">
                  {experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-base font-bold text-gray-900">{exp.title}</h3>
                        <span className="text-[11px] font-bold text-white bg-[#8C1A3C] px-3 py-1 rounded">{exp.startDate} – {exp.current ? "Présent" : exp.endDate}</span>
                      </div>
                      <div className="text-sm font-serif italic text-[#C4956A] mb-3">{exp.company}</div>
                      <p className="text-sm leading-relaxed text-gray-600">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    );
  }

  // 11. German / Swiss Style
  if (selectedTemplateId === "german-swiss-style") {
    return (
      <div className="w-full h-full bg-white text-[#2C2C2C] font-sans p-16 overflow-hidden shadow-2xl" style={{ minHeight: '297mm' }}>
        <style dangerouslySetInnerHTML={{ __html: `
          .german-header { display: flex; justify-content: space-between; border-bottom: 2px solid #1A3A5C; padding-bottom: 30px; margin-bottom: 40px; }
          .german-section-title { font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #1A3A5C; margin-bottom: 20px; display: flex; align-items: center; gap: 15px; }
          .german-section-title::after { content: ''; flex: 1; height: 1px; background: #DCDCDC; }
          .german-grid-row { display: grid; grid-template-columns: 140px 1fr; gap: 30px; margin-bottom: 25px; }
        `}} />
        <header className="german-header">
           <div className="flex-1">
              <h1 className="text-4xl font-serif font-black text-black leading-tight tracking-tight mb-2">{personal.fullName}</h1>
              <p className="text-sm font-medium text-[#1A3A5C] tracking-widest uppercase">{personal.jobTitle}</p>
           </div>
           <div className="text-right text-[12.5px] text-gray-500 space-y-1">
              <div>{personal.email}</div>
              <div>{personal.phone}</div>
              <div>{personal.location}</div>
           </div>
        </header>

        <div className="space-y-12">
          {summary && (
            <section>
              <div className="german-section-title">Kurzprofil</div>
              <p className="text-[14px] leading-loose text-gray-600 border-l-4 border-[#1A3A5C] pl-6 italic">{summary}</p>
            </section>
          )}

          {experience.length > 0 && (
            <section>
              <div className="german-section-title">Beruflicher Werdegang</div>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id} className="german-grid-row border-b border-gray-50 pb-6 last:border-0">
                    <div className="text-xs font-bold text-gray-400 text-right pt-1">{exp.startDate} – {exp.current ? "Heute" : exp.endDate}</div>
                    <div>
                      <h3 className="text-base font-black text-black mb-1">{exp.title}</h3>
                      <div className="text-[13.5px] font-bold text-[#1A3A5C] mb-3">{exp.company}</div>
                      <p className="text-[13.5px] leading-relaxed text-gray-600">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section>
              <div className="german-section-title">Ausbildung</div>
              <div className="space-y-6">
                {education.map((edu) => (
                  <div key={edu.id} className="german-grid-row">
                    <div className="text-xs font-bold text-gray-400 text-right pt-1">{edu.startDate} – {edu.endDate}</div>
                    <div>
                      <h3 className="text-base font-black text-black mb-1">{edu.degree}</h3>
                      <div className="text-[13.5px] font-bold text-gray-700">{edu.school}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    );
  }

  // 12. French / Belgian Style
  if (selectedTemplateId === "french-belgian-style") {
    return (
      <div className="w-full h-full bg-white text-[#3D3D3D] font-sans overflow-hidden shadow-2xl" style={{ minHeight: '297mm' }}>
        <style dangerouslySetInnerHTML={{ __html: `
          .belgian-header { padding: 50px 60px; border-bottom: 3px solid #1C3A5E; display: grid; grid-template-columns: 1fr auto; gap: 40px; }
          .belgian-body { display: grid; grid-template-columns: 1fr 240px; }
          .belgian-main { padding: 40px 40px 40px 60px; border-right: 1px solid #E0E0E0; }
          .belgian-sidebar { padding: 40px 30px; background: #F9F9F9; }
          .belgian-section-title { font-family: serif; font-size: 14px; font-weight: 600; color: #1C3A5E; border-bottom: 1.5px solid #E0E0E0; padding-bottom: 8px; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; }
          .belgian-section-title::before { content: ''; width: 3px; height: 14px; background: #1C3A5E; border-radius: 1px; }
        `}} />
        <header className="belgian-header">
           <div>
              <h1 className="text-4xl font-serif font-bold text-[#1C1C1C] tracking-tight">{personal.fullName}</h1>
              <p className="text-sm font-medium text-[#1C3A5E] mt-2 italic tracking-wide">{personal.jobTitle}</p>
              <div className="mt-6 space-y-1 text-sm text-gray-500">
                 {personal.email && <div>✉️ {personal.email}</div>}
                 {personal.phone && <div>📞 {personal.phone}</div>}
                 {personal.location && <div>📍 {personal.location}</div>}
              </div>
           </div>
           <div className="size-28 bg-gray-50 border-2 border-gray-100 flex items-center justify-center overflow-hidden">
              {personal.photoUrl ? <img src={personal.photoUrl} alt="Profile" className="w-full h-full object-cover" /> : <span className="text-4xl text-gray-200">👤</span>}
           </div>
        </header>

        <div className="belgian-body">
           <main className="belgian-main space-y-12">
              {summary && (
                <section>
                   <div className="belgian-section-title">Résumé Professionnel</div>
                   <p className="text-[14px] leading-loose text-gray-600">{summary}</p>
                </section>
              )}

              {experience.length > 0 && (
                <section>
                   <div className="belgian-section-title">Expériences Professionnelles</div>
                   <div className="space-y-8">
                      {experience.map((exp) => (
                        <div key={exp.id} className="relative">
                           <div className="flex justify-between items-baseline mb-1">
                              <h3 className="text-base font-bold text-[#1C1C1C]">{exp.title}</h3>
                              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{exp.startDate} – {exp.current ? "Aujourd'hui" : exp.endDate}</span>
                           </div>
                           <div className="text-[14px] font-serif italic text-[#1C3A5E] mb-3">{exp.company}</div>
                           <p className="text-[13.5px] leading-relaxed text-gray-600">{exp.description}</p>
                        </div>
                      ))}
                   </div>
                </section>
              )}
           </main>

           <aside className="belgian-sidebar space-y-10">
              <section>
                 <div className="text-[10px] font-bold tracking-[2px] uppercase text-[#1C3A5E] mb-4 border-b border-gray-200 pb-2">Compétences Clefs</div>
                 <div className="flex flex-wrap gap-2">
                    {skills.map((s) => <span key={s.id} className="bg-white border border-gray-200 px-3 py-1 text-xs font-bold text-gray-600 rounded shadow-sm">{s.name}</span>)}
                 </div>
              </section>

              {education.length > 0 && (
                <section>
                   <div className="text-[10px] font-bold tracking-[2px] uppercase text-[#1C3A5E] mb-4 border-b border-gray-200 pb-2">Formation</div>
                   <div className="space-y-6">
                      {education.map((edu) => (
                        <div key={edu.id}>
                           <div className="text-[13px] font-bold text-[#1C1C1C] leading-tight">{edu.degree}</div>
                           <div className="text-[12px] text-gray-500 mt-1">{edu.school}</div>
                           <div className="text-[10px] font-bold text-gray-400 mt-1 uppercase">{edu.startDate} – {edu.endDate}</div>
                        </div>
                      ))}
                   </div>
                </section>
              )}
           </aside>
        </div>
      </div>
    );
  }

  // 1. Modern Professional
  if (selectedTemplateId === "modern-professional") {
    return (
      <div className="w-full h-full bg-white text-gray-800 font-sans text-[11pt] leading-relaxed flex flex-row">
        <div className="w-[35%] p-8 border-r border-gray-100 flex flex-col h-full" style={{ backgroundColor: `${themeColor}0A` }}>
          <div className="mb-10 text-center">
             <div className={`size-28 mx-auto bg-gray-200 mb-4 border-4 border-white shadow-md overflow-hidden flex items-center justify-center text-gray-400 ${personal.photoShape === 'square' ? 'rounded-xl' : 'rounded-full'}`}>
               {personal.photoUrl ? (
                 <img src={personal.photoUrl} alt="Profile" className="w-full h-full object-cover" />
               ) : (
                 <span className="text-3xl font-serif text-gray-500">{personal.fullName.charAt(0)}</span>
               )}
             </div>
             <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-1" style={{ color: themeColor }}>{personal.fullName}</h1>
             <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">{personal.jobTitle}</p>
          </div>
          <div className="space-y-6">
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest border-b-2 pb-1 mb-3" style={{ borderColor: themeColor, color: themeColor }}>Contact</h2>
              <div className="space-y-3 text-sm flex flex-col items-start">{renderContactInfo(themeColor, "start")}</div>
            </section>
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest border-b-2 pb-1 mb-3" style={{ borderColor: themeColor, color: themeColor }}>Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => <span key={s.id} className="bg-white px-3 py-1 rounded-full text-xs border border-gray-200 shadow-sm">{s.name}</span>)}
              </div>
            </section>
            <section>
               <h2 className="text-sm font-bold uppercase tracking-widest border-b-2 pb-1 mb-3" style={{ borderColor: themeColor, color: themeColor }}>Education</h2>
               <div className="space-y-4">
                 {education.map((edu) => (
                    <div key={edu.id}>
                      <p className="text-xs font-bold text-gray-800">{edu.degree}</p>
                      <p className="text-xs text-gray-600">{edu.school}</p>
                      <p className="text-[10px] text-gray-500 uppercase mt-0.5">{edu.startDate} - {edu.endDate}</p>
                    </div>
                 ))}
               </div>
            </section>
          </div>
        </div>
        <div className="w-[65%] p-10 h-full flex flex-col">
          {summary && (
            <section className="mb-10">
              <h2 className="text-lg font-bold uppercase tracking-widest mb-4 flex items-center" style={{ color: themeColor }}>
                <span className="w-8 h-0.5 mr-3" style={{ backgroundColor: themeColor }}></span>Profile
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed text-justify">{summary}</p>
            </section>
          )}
          <section>
            <h2 className="text-lg font-bold uppercase tracking-widest mb-6 flex items-center" style={{ color: themeColor }}>
               <span className="w-8 h-0.5 mr-3" style={{ backgroundColor: themeColor }}></span>Experience
            </h2>
            <div className="space-y-8">
              {experience.map((exp) => (
                <div key={exp.id} className="relative pl-6 border-l-2" style={{ borderColor: `${themeColor}30` }}>
                  <div className="absolute w-3 h-3 rounded-full -left-[7px] top-1" style={{ backgroundColor: themeColor, boxShadow: `0 0 0 4px white` }}></div>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-sm font-bold text-gray-900">{exp.title}</h3>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${themeColor}15`, color: themeColor }}>
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-500 mb-2">{exp.company}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  // 2. Corporate Standard
  if (selectedTemplateId === "corporate") {
    return (
      <div className="w-full h-full bg-white text-gray-800 font-sans p-10 text-[11pt]">
        <div className="border-b-4 pb-6 mb-6" style={{ borderColor: themeColor }}>
          <h1 className="text-3xl font-black uppercase text-gray-900 tracking-tight">{personal.fullName}</h1>
          <h2 className="text-xl font-medium mt-1 mb-3" style={{ color: themeColor }}>{personal.jobTitle}</h2>
          {renderContactInfo(themeColor, "start")}
        </div>
        {summary && (
          <div className="mb-6">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-2 text-gray-900 border-b border-gray-300 pb-1">Professional Summary</h3>
            <p className="text-sm text-gray-700">{summary}</p>
          </div>
        )}
        <div className="mb-6">
          <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-gray-900 border-b border-gray-300 pb-1">Experience</h3>
          <div className="space-y-5">
            {experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between font-bold text-gray-900">
                  <span>{exp.title}</span>
                  <span>{exp.startDate} - {exp.current ? "Present" : exp.endDate}</span>
                </div>
                <div className="font-medium text-gray-600 italic mb-2">{exp.company}</div>
                <p className="text-sm text-gray-700">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-8">
          <div className="flex-1">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-3 text-gray-900 border-b border-gray-300 pb-1">Education</h3>
            {education.map(edu => (
              <div key={edu.id} className="mb-3">
                <div className="font-bold text-gray-900">{edu.degree}</div>
                <div className="text-sm text-gray-600">{edu.school}</div>
                <div className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</div>
              </div>
            ))}
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-3 text-gray-900 border-b border-gray-300 pb-1">Skills</h3>
            <ul className="list-disc list-inside text-sm text-gray-700 grid grid-cols-2 gap-1">
              {skills.map(s => <li key={s.id}>{s.name}</li>)}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // 3. Creative Modern
  if (selectedTemplateId === "creative") {
    return (
      <div className="w-full h-full bg-[#fcfcfc] text-gray-800 font-sans text-[11pt] flex flex-col">
        <header className="p-10 text-white" style={{ backgroundColor: themeColor }}>
          <h1 className="text-4xl font-light tracking-wide">{personal.fullName}</h1>
          <h2 className="text-lg mt-2 opacity-80 uppercase tracking-widest">{personal.jobTitle}</h2>
        </header>
        <div className="flex flex-row flex-1">
          <div className="w-2/3 p-10 space-y-8">
            {summary && (
              <div>
                <h3 className="text-lg font-semibold mb-3 border-b-2 w-12 pb-1" style={{ borderColor: themeColor, color: themeColor }}>Profile</h3>
                <p className="text-sm leading-relaxed text-gray-600">{summary}</p>
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold mb-5 border-b-2 w-12 pb-1" style={{ borderColor: themeColor, color: themeColor }}>Experience</h3>
              <div className="space-y-6">
                {experience.map(exp => (
                  <div key={exp.id} className="flex gap-4">
                    <div className="w-1/4 text-xs text-gray-400 font-semibold pt-1 text-right">{exp.startDate} - {exp.current ? "Present" : exp.endDate}</div>
                    <div className="w-3/4">
                      <h4 className="font-bold text-gray-800">{exp.title}</h4>
                      <div className="text-sm text-gray-500 mb-1">{exp.company}</div>
                      <p className="text-sm text-gray-600">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-1/3 p-10 bg-gray-50 space-y-8 border-l border-gray-100">
            <div>
              <h3 className="text-lg font-semibold mb-3 border-b-2 w-12 pb-1" style={{ borderColor: themeColor, color: themeColor }}>Details</h3>
              <div className="space-y-3 text-sm text-gray-600 flex flex-col items-start">{renderContactInfo(themeColor, "start")}</div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 border-b-2 w-12 pb-1" style={{ borderColor: themeColor, color: themeColor }}>Skills</h3>
              <div className="flex flex-col gap-2 text-sm text-gray-600">
                {skills.map(s => <span key={s.id}>{s.name}</span>)}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 border-b-2 w-12 pb-1" style={{ borderColor: themeColor, color: themeColor }}>Education</h3>
              <div className="space-y-4">
                {education.map(edu => (
                  <div key={edu.id}>
                    <div className="font-bold text-gray-800 text-sm">{edu.degree}</div>
                    <div className="text-xs text-gray-500">{edu.school}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 4. Sleek Mono
  if (selectedTemplateId === "black-white-modern") {
    return (
      <div className="w-full h-full bg-white text-black font-serif p-12 text-[11pt]">
        <div className="text-center mb-8 border-b border-black pb-8">
          <h1 className="text-5xl font-normal tracking-tighter mb-4">{personal.fullName}</h1>
          <p className="text-xl italic mb-4">{personal.jobTitle}</p>
          <div className="flex justify-center gap-4 text-xs uppercase tracking-widest">{renderContactInfo("#000", "center")}</div>
        </div>
        <div className="flex gap-12">
          <div className="w-1/3 space-y-8">
            <div>
              <h3 className="text-sm uppercase tracking-widest font-bold border-b border-black mb-4 pb-1">Skills</h3>
              <ul className="list-none space-y-1 text-sm">
                {skills.map(s => <li key={s.id}>{s.name}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="text-sm uppercase tracking-widest font-bold border-b border-black mb-4 pb-1">Education</h3>
              <div className="space-y-4 text-sm">
                {education.map(edu => (
                  <div key={edu.id}>
                    <div className="font-bold">{edu.degree}</div>
                    <div className="italic">{edu.school}</div>
                    <div>{edu.startDate} - {edu.endDate}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-2/3 space-y-8">
            {summary && (
              <div>
                <h3 className="text-sm uppercase tracking-widest font-bold border-b border-black mb-4 pb-1">Profile</h3>
                <p className="text-sm leading-relaxed">{summary}</p>
              </div>
            )}
            <div>
              <h3 className="text-sm uppercase tracking-widest font-bold border-b border-black mb-4 pb-1">Experience</h3>
              <div className="space-y-6">
                {experience.map(exp => (
                  <div key={exp.id}>
                    <div className="flex justify-between font-bold text-sm">
                      <span>{exp.title}</span>
                      <span>{exp.startDate} - {exp.current ? "Present" : exp.endDate}</span>
                    </div>
                    <div className="italic text-sm mb-2">{exp.company}</div>
                    <p className="text-sm">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 5. Nature Corporate
  if (selectedTemplateId === "green-modern") {
    return (
      <div className="w-full h-full bg-white font-sans flex">
        <div className="w-[30%] text-white p-8 h-full flex flex-col justify-between" style={{ backgroundColor: themeColor }}>
          <div>
            <div className={`size-24 bg-white/20 mb-6 flex items-center justify-center overflow-hidden border-2 border-white/20 shadow-sm ${personal.photoShape === 'square' ? 'rounded-xl' : 'rounded-full'}`}>
               {personal.photoUrl ? (
                 <img src={personal.photoUrl} alt="Profile" className="w-full h-full object-cover" />
               ) : (
                 <span className="text-3xl">{personal.fullName.charAt(0)}</span>
               )}
            </div>
            <h1 className="text-2xl font-bold mb-2">{personal.fullName}</h1>
            <p className="text-sm text-white/80 mb-8">{personal.jobTitle}</p>
            
            <h2 className="text-sm font-semibold uppercase tracking-wider mb-4 border-b border-white/20 pb-2">Contact</h2>
            <div className="space-y-3 text-sm text-white/80 flex flex-col items-start">{renderContactInfo("white", "start")}</div>
            
            <h2 className="text-sm font-semibold uppercase tracking-wider mb-4 mt-8 border-b border-white/20 pb-2">Skills</h2>
            <div className="space-y-2 text-sm text-white/80">
              {skills.map(s => <div key={s.id}>• {s.name}</div>)}
            </div>
          </div>
        </div>
        <div className="w-[70%] p-10 h-full overflow-hidden text-gray-800">
          {summary && (
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-3" style={{ color: themeColor }}>About Me</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{summary}</p>
            </section>
          )}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4" style={{ color: themeColor }}>Work Experience</h2>
            <div className="space-y-5">
              {experience.map(exp => (
                <div key={exp.id} className="border-l-2 pl-4" style={{ borderColor: `${themeColor}4D` }}>
                  <h3 className="font-bold text-gray-900">{exp.title}</h3>
                  <div className="text-sm font-medium mb-1" style={{ color: themeColor }}>{exp.company} | {exp.startDate} - {exp.current ? "Present" : exp.endDate}</div>
                  <p className="text-sm text-gray-600">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-xl font-bold mb-4" style={{ color: themeColor }}>Education</h2>
            <div className="space-y-4">
              {education.map(edu => (
                <div key={edu.id} className="border-l-2 pl-4" style={{ borderColor: `${themeColor}4D` }}>
                  <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                  <div className="text-sm text-gray-600">{edu.school} | {edu.startDate} - {edu.endDate}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  // 6. Marketing Exec
  if (selectedTemplateId === "blue-white-marketing") {
    return (
      <div className="w-full h-full bg-white font-sans p-10">
        <header className="flex justify-between items-end border-b-2 pb-6 mb-8" style={{ borderColor: themeColor }}>
          <div>
            <h1 className="text-4xl font-extrabold uppercase tracking-tight" style={{ color: themeColor }}>{personal.fullName}</h1>
            <h2 className="text-xl text-gray-600 mt-1">{personal.jobTitle}</h2>
          </div>
          <div className="text-right text-sm text-gray-500 space-y-1 flex flex-col items-end">
            {renderContactInfo(themeColor, "end")}
          </div>
        </header>
        {summary && (
          <p className="text-base text-gray-700 font-medium mb-8 border-l-4 pl-4 py-1" style={{ borderColor: themeColor }}>{summary}</p>
        )}
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 space-y-8">
            <section>
              <h3 className="text-lg font-bold uppercase tracking-wider mb-4 border-b border-gray-200 pb-2" style={{ color: themeColor }}>Professional Experience</h3>
              <div className="space-y-6">
                {experience.map(exp => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-bold text-gray-900 text-lg">{exp.title}</h4>
                      <span className="text-sm font-bold px-2 py-1 rounded" style={{ color: themeColor, backgroundColor: `${themeColor}1A` }}>{exp.startDate} - {exp.current ? "Present" : exp.endDate}</span>
                    </div>
                    <div className="text-gray-600 font-medium mb-2">{exp.company}</div>
                    <p className="text-sm text-gray-700 leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
          <div className="space-y-8">
            <section>
              <h3 className="text-lg font-bold uppercase tracking-wider mb-4 border-b border-gray-200 pb-2" style={{ color: themeColor }}>Core Competencies</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map(s => <span key={s.id} className="bg-gray-100 text-gray-800 text-xs font-bold px-2 py-1 rounded">{s.name}</span>)}
              </div>
            </section>
            <section>
              <h3 className="text-lg font-bold uppercase tracking-wider mb-4 border-b border-gray-200 pb-2" style={{ color: themeColor }}>Education</h3>
              <div className="space-y-4">
                {education.map(edu => (
                  <div key={edu.id}>
                    <h4 className="font-bold text-gray-900">{edu.degree}</h4>
                    <div className="text-sm text-gray-600">{edu.school}</div>
                    <div className="text-xs text-gray-500 mt-1">{edu.startDate} - {edu.endDate}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }

  // 7. Executive Pro
  if (selectedTemplateId === "black-white-pro") {
    return (
      <div className="w-full h-full bg-white text-gray-900 font-sans p-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold uppercase tracking-widest mb-2">{personal.fullName}</h1>
          <p className="text-sm uppercase tracking-widest text-gray-500 mb-4">{personal.jobTitle}</p>
          <div className="flex justify-center text-xs">{renderContactInfo("#000", "center")}</div>
        </div>
        {summary && (
          <div className="mb-8">
            <p className="text-sm text-justify leading-relaxed">{summary}</p>
          </div>
        )}
        <div className="space-y-8">
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest border-t border-b py-2 mb-4 text-center">Professional Experience</h2>
            <div className="space-y-6">
              {experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold">{exp.title}</h3>
                    <span className="text-sm">{exp.startDate} - {exp.current ? "Present" : exp.endDate}</span>
                  </div>
                  <div className="text-sm italic mb-2">{exp.company}</div>
                  <p className="text-sm text-justify leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
          <div className="grid grid-cols-2 gap-8">
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest border-t border-b py-2 mb-4 text-center">Education</h2>
              {education.map(edu => (
                <div key={edu.id} className="text-center mb-4">
                  <div className="font-bold text-sm">{edu.degree}</div>
                  <div className="text-sm italic">{edu.school}</div>
                  <div className="text-xs">{edu.startDate} - {edu.endDate}</div>
                </div>
              ))}
            </section>
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest border-t border-b py-2 mb-4 text-center">Skills</h2>
              <div className="text-center text-sm">
                {skills.map(s => s.name).join(" • ")}
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }

  // 8. Modern Executive
  if (selectedTemplateId === "pro-modern-alt") {
    return (
      <div className="w-full h-full bg-gray-50 font-sans p-10 flex gap-6">
        <div className="w-1/3 bg-white p-6 rounded-2xl shadow-sm h-fit space-y-8">
          <div className="text-center flex flex-col items-center">
            {personal.photoUrl && (
               <div className={`size-24 mb-4 overflow-hidden border-2 border-gray-100 shadow-sm ${personal.photoShape === 'square' ? 'rounded-xl' : 'rounded-full'}`}>
                 <img src={personal.photoUrl} alt="Profile" className="w-full h-full object-cover" />
               </div>
            )}
            <h1 className="text-2xl font-bold text-gray-800">{personal.fullName}</h1>
            <p className="text-sm text-gray-500 font-medium">{personal.jobTitle}</p>
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Contact</h3>
            <div className="space-y-2 flex flex-col items-start">{renderContactInfo(themeColor, "start")}</div>
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map(s => <span key={s.id} className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-700">{s.name}</span>)}
            </div>
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Education</h3>
            <div className="space-y-3">
              {education.map(edu => (
                <div key={edu.id}>
                  <div className="text-sm font-bold text-gray-800">{edu.degree}</div>
                  <div className="text-xs text-gray-500">{edu.school}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-2/3 bg-white p-8 rounded-2xl shadow-sm overflow-auto">
          {summary && (
            <section className="mb-8">
              <h2 className="text-lg font-bold text-gray-800 mb-2">Profile</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{summary}</p>
            </section>
          )}
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-4">Experience</h2>
            <div className="space-y-6">
              {experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between">
                    <h3 className="font-bold text-gray-800">{exp.title}</h3>
                    <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded">{exp.startDate} - {exp.current ? "Present" : exp.endDate}</span>
                  </div>
                  <div className="text-sm font-medium mb-2" style={{ color: themeColor }}>{exp.company}</div>
                  <p className="text-sm text-gray-600 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  // 9. Creative Vision
  if (selectedTemplateId === "pink-maroon-photo") {
    return (
      <div className="w-full h-full font-sans flex" style={{ backgroundColor: `${themeColor}0A` }}>
        <div className="w-1/3 text-white p-8" style={{ backgroundColor: themeColor }}>
          <div className="mb-8 text-center flex flex-col items-center">
            <div className={`size-32 bg-white/20 mb-6 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg ${personal.photoShape === 'square' ? 'rounded-2xl' : 'rounded-full'}`}>
               {personal.photoUrl ? (
                 <img src={personal.photoUrl} alt="Profile" className="w-full h-full object-cover" />
               ) : (
                 <span className="text-4xl">{personal.fullName.charAt(0)}</span>
               )}
            </div>
            <h1 className="text-3xl font-bold mb-2">{personal.fullName}</h1>
            <p className="text-sm text-white/80">{personal.jobTitle}</p>
          </div>
          <div className="space-y-8">
            <section>
              <h2 className="text-sm font-bold uppercase tracking-wider mb-4 border-b border-white/30 pb-2">Contact</h2>
              <div className="flex flex-col items-start space-y-3 text-sm text-white/90">{renderContactInfo("white", "start")}</div>
            </section>
            <section>
              <h2 className="text-sm font-bold uppercase tracking-wider mb-4 border-b border-white/30 pb-2">Skills</h2>
              <div className="space-y-2 text-sm text-white/90">
                {skills.map(s => <div key={s.id}>{s.name}</div>)}
              </div>
            </section>
            <section>
              <h2 className="text-sm font-bold uppercase tracking-wider mb-4 border-b border-white/30 pb-2">Education</h2>
              {education.map(edu => (
                <div key={edu.id} className="mb-4">
                  <div className="font-bold text-sm text-white">{edu.degree}</div>
                  <div className="text-xs text-white/80">{edu.school}</div>
                  <div className="text-xs text-white/70 mt-1">{edu.startDate} - {edu.endDate}</div>
                </div>
              ))}
            </section>
          </div>
        </div>
        <div className="w-2/3 p-10 text-gray-800 h-full overflow-auto bg-white rounded-l-3xl shadow-[-10px_0_20px_rgba(0,0,0,0.05)]">
          {summary && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4" style={{ color: themeColor }}>About Me</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{summary}</p>
            </section>
          )}
          <section>
            <h2 className="text-2xl font-bold mb-6" style={{ color: themeColor }}>Experience</h2>
            <div className="space-y-8">
              {experience.map(exp => (
                <div key={exp.id} className="relative pl-6 border-l-2" style={{ borderColor: `${themeColor}33` }}>
                  <div className="absolute w-3 h-3 rounded-full -left-[7px] top-1" style={{ backgroundColor: themeColor }}></div>
                  <h3 className="font-bold text-gray-900 text-lg">{exp.title}</h3>
                  <div className="text-sm font-medium mb-1" style={{ color: themeColor }}>{exp.company}</div>
                  <div className="text-xs text-gray-400 mb-3">{exp.startDate} - {exp.current ? "Present" : exp.endDate}</div>
                  <p className="text-sm text-gray-600 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  // 10. Default / Minimalist
  if (selectedTemplateId === "minimalist") {
    return (
    <div className="w-full h-full bg-white text-gray-800 font-sans p-12 text-[11pt] leading-relaxed">
      <header className="text-center mb-10 border-b-2 pb-8" style={{ borderColor: `${themeColor}30` }}>
        <h1 className="text-4xl font-bold text-gray-900 mb-2 uppercase tracking-wide" style={{ color: themeColor }}>{personal.fullName}</h1>
        <p className="text-lg text-gray-600 mb-4">{personal.jobTitle}</p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-500">
          {renderContactInfo(themeColor, "center")}
        </div>
      </header>
      {summary && (
        <section className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-3 border-b border-gray-200 pb-1" style={{ color: themeColor }}>Summary</h2>
          <p className="text-sm text-gray-700 leading-relaxed text-justify">{summary}</p>
        </section>
      )}
      <section className="mb-8">
        <h2 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-gray-200 pb-1" style={{ color: themeColor }}>Experience</h2>
        <div className="space-y-6">
          {experience.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-sm font-bold text-gray-900">{exp.title}</h3>
                <span className="text-xs font-medium text-gray-500">{exp.startDate} – {exp.current ? "Present" : exp.endDate}</span>
              </div>
              <p className="text-sm font-medium text-gray-600 mb-2 italic">{exp.company}</p>
              <p className="text-sm text-gray-700 leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>
      <div className="flex gap-8">
        <section className="flex-1">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-gray-200 pb-1" style={{ color: themeColor }}>Education</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <h3 className="text-sm font-bold text-gray-900">{edu.degree}</h3>
                <p className="text-sm text-gray-600">{edu.school}</p>
                <p className="text-xs text-gray-500 mt-1">{edu.startDate} – {edu.endDate}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="flex-1">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-gray-200 pb-1" style={{ color: themeColor }}>Skills</h2>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-700">
            {skills.map(s => <span key={s.id}>{s.name}</span>)}
          </div>
        </section>
      </div>
    </div>
    );
  }

  if (selectedTemplateId === "ats-harvard") {
    return (
      <div className="w-full h-full bg-white text-black font-serif text-[11pt] leading-snug flex flex-col p-[20mm]">
        <div className="text-center mb-6 border-b-[1.5px] border-black pb-4">
          <h1 className="text-3xl font-bold uppercase tracking-wider mb-2">{personal.fullName}</h1>
          <div className="text-[10pt] flex justify-center flex-wrap gap-x-3">
            {personal.location && <span>{personal.location}</span>}
            {personal.phone && <span>• {personal.phone}</span>}
            {personal.email && <span>• {personal.email}</span>}
            {personal.website && <span>• {personal.website}</span>}
          </div>
        </div>
        {summary && (
          <div className="mb-5">
            <h2 className="text-[12pt] font-bold uppercase border-b-[1.5px] border-black mb-2">Professional Summary</h2>
            <p className="text-justify">{summary}</p>
          </div>
        )}
        {experience.length > 0 && (
          <div className="mb-5">
            <h2 className="text-[12pt] font-bold uppercase border-b-[1.5px] border-black mb-2">Experience</h2>
            <div className="space-y-4">
              {experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between font-bold">
                    <span>{exp.title}, {exp.company}</span>
                    <span>{exp.startDate} – {exp.current ? "Present" : exp.endDate}</span>
                  </div>
                  <p className="text-[10.5pt] mt-1 whitespace-pre-wrap">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {education.length > 0 && (
          <div className="mb-5">
            <h2 className="text-[12pt] font-bold uppercase border-b-[1.5px] border-black mb-2">Education</h2>
            <div className="space-y-3">
              {education.map(edu => (
                <div key={edu.id}>
                  <div className="flex justify-between font-bold">
                    <span>{edu.degree}, {edu.school}</span>
                    <span>{edu.startDate} – {edu.endDate}</span>
                  </div>
                  <p className="text-[10.5pt] mt-1">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {skills.length > 0 && (
          <div className="mb-5">
            <h2 className="text-[12pt] font-bold uppercase border-b-[1.5px] border-black mb-2">Skills</h2>
            <p className="text-[10.5pt]">{skills.map(s => s.name).join(", ")}</p>
          </div>
        )}
      </div>
    );
  }

  if (selectedTemplateId === "ats-tech-modern") {
    return (
      <div className="w-full h-full bg-white text-gray-800 font-sans text-[10.5pt] leading-relaxed flex flex-col p-[20mm]">
        <div className="mb-6 flex justify-between items-end border-b-[3px] pb-3" style={{ borderColor: themeColor }}>
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight" style={{ color: themeColor }}>{personal.fullName}</h1>
            <p className="text-lg font-medium text-gray-600 mt-1">{personal.jobTitle}</p>
          </div>
          <div className="text-right text-xs text-gray-500 space-y-1">
            {personal.email && <p>{personal.email}</p>}
            {personal.phone && <p>{personal.phone}</p>}
            {personal.location && <p>{personal.location}</p>}
          </div>
        </div>
        {summary && <div className="mb-6"><p className="text-gray-700 leading-relaxed">{summary}</p></div>}
        {skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wider mb-3 text-gray-400">Technical Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map(s => <span key={s.id} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-semibold">{s.name}</span>)}
            </div>
          </div>
        )}
        {experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wider mb-4 text-gray-400">Experience</h2>
            <div className="space-y-6">
              {experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-gray-900 text-[12pt]">{exp.title}</h3>
                    <span className="text-xs font-bold text-gray-500 bg-gray-50 px-2 py-1 rounded">{exp.startDate} – {exp.current ? "Present" : exp.endDate}</span>
                  </div>
                  <p className="text-sm font-medium text-gray-600 mb-2">{exp.company}</p>
                  <p className="whitespace-pre-wrap text-gray-700">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {education.length > 0 && (
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider mb-4 text-gray-400">Education</h2>
            <div className="space-y-4">
              {education.map(edu => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                    <p className="text-sm text-gray-600">{edu.school}</p>
                  </div>
                  <span className="text-xs font-bold text-gray-500">{edu.startDate} – {edu.endDate}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (selectedTemplateId === "ats-executive") {
    return (
      <div className="w-full h-full bg-white text-gray-900 font-sans text-[11pt] leading-relaxed flex flex-col p-[20mm]">
        <div className="text-center mb-8">
          <h1 className="text-[28pt] font-light tracking-widest uppercase mb-2">{personal.fullName}</h1>
          <p className="text-[12pt] tracking-widest text-gray-500 uppercase mb-4">{personal.jobTitle}</p>
          <div className="flex justify-center gap-4 text-xs font-medium border-y py-2 border-gray-300">
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>{personal.phone}</span>}
            {personal.location && <span>{personal.location}</span>}
          </div>
        </div>
        {summary && <div className="mb-6"><p className="text-justify font-serif text-gray-700">{summary}</p></div>}
        {experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-[11pt] font-bold uppercase tracking-widest border-b-[1.5px] border-gray-300 pb-1 mb-4" style={{ color: themeColor }}>Professional Experience</h2>
            <div className="space-y-6">
              {experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-end mb-1">
                    <h3 className="font-bold text-[12pt]">{exp.title}</h3>
                    <span className="text-sm font-bold text-gray-500">{exp.startDate} – {exp.current ? "Present" : exp.endDate}</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">{exp.company}</p>
                  <p className="whitespace-pre-wrap text-gray-800 text-[10.5pt]">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="grid grid-cols-2 gap-8">
          {education.length > 0 && (
            <div>
              <h2 className="text-[11pt] font-bold uppercase tracking-widest border-b-[1.5px] border-gray-300 pb-1 mb-4" style={{ color: themeColor }}>Education</h2>
              <div className="space-y-4">
                {education.map(edu => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-[11pt]">{edu.degree}</h3>
                    <p className="text-sm text-gray-700">{edu.school}</p>
                    <p className="text-xs text-gray-500 mt-1">{edu.startDate} – {edu.endDate}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {skills.length > 0 && (
            <div>
              <h2 className="text-[11pt] font-bold uppercase tracking-widest border-b-[1.5px] border-gray-300 pb-1 mb-4" style={{ color: themeColor }}>Core Competencies</h2>
              <ul className="list-disc pl-4 space-y-1 text-[10.5pt] text-gray-800">
                {skills.map(s => <li key={s.id}>{s.name}</li>)}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (selectedTemplateId === "ats-finance") {
    return (
      <div className="w-full h-full bg-white text-black font-serif text-[11pt] leading-tight flex flex-col p-[20mm]">
        <div className="text-center mb-6">
          <h1 className="text-[24pt] font-bold mb-1">{personal.fullName}</h1>
          <p className="text-sm mb-1">{personal.jobTitle}</p>
          <p className="text-xs">
            {[personal.location, personal.phone, personal.email].filter(Boolean).join(" | ")}
          </p>
        </div>
        {summary && (
          <div className="mb-4">
            <h2 className="text-[11pt] font-bold uppercase border-b-[1.5px] border-black mb-1 bg-gray-100 pl-1">Summary</h2>
            <p className="text-[10pt] leading-snug">{summary}</p>
          </div>
        )}
        {experience.length > 0 && (
          <div className="mb-4">
            <h2 className="text-[11pt] font-bold uppercase border-b-[1.5px] border-black mb-2 bg-gray-100 pl-1">Experience</h2>
            <div className="space-y-3">
              {experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between font-bold text-[10.5pt]">
                    <span>{exp.company}</span>
                    <span>{exp.startDate} – {exp.current ? "Present" : exp.endDate}</span>
                  </div>
                  <div className="italic text-[10pt] mb-1">{exp.title}</div>
                  <p className="text-[10pt] whitespace-pre-wrap pl-4 border-l-2 border-gray-200">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {education.length > 0 && (
          <div className="mb-4">
            <h2 className="text-[11pt] font-bold uppercase border-b-[1.5px] border-black mb-2 bg-gray-100 pl-1">Education</h2>
            <div className="space-y-2">
              {education.map(edu => (
                <div key={edu.id}>
                  <div className="flex justify-between font-bold text-[10.5pt]">
                    <span>{edu.school}</span>
                    <span>{edu.startDate} – {edu.endDate}</span>
                  </div>
                  <div className="text-[10pt]">{edu.degree}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {skills.length > 0 && (
          <div className="mb-4">
            <h2 className="text-[11pt] font-bold uppercase border-b-[1.5px] border-black mb-2 bg-gray-100 pl-1">Skills & Certifications</h2>
            <p className="text-[10pt]">{skills.map(s => s.name).join(", ")}</p>
          </div>
        )}
      </div>
    );
  }

  if (selectedTemplateId === "ats-creative") {
    return (
      <div className="w-full h-full bg-white text-gray-800 font-sans text-[11pt] leading-relaxed flex flex-col p-[20mm]">
        <div className="mb-8 border-l-[6px] pl-6" style={{ borderColor: themeColor }}>
          <h1 className="text-5xl font-black tracking-tighter text-gray-900 mb-2">{personal.fullName}</h1>
          <p className="text-2xl font-light text-gray-500">{personal.jobTitle}</p>
          <div className="flex gap-4 text-sm font-medium mt-4" style={{ color: themeColor }}>
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>{personal.phone}</span>}
            {personal.location && <span>{personal.location}</span>}
          </div>
        </div>
        {summary && <p className="text-lg font-light leading-relaxed mb-10 text-gray-700">{summary}</p>}
        <div className="flex gap-10">
          <div className="w-2/3">
            {experience.length > 0 && (
              <div className="mb-8">
                <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">Experience</h2>
                <div className="space-y-8">
                  {experience.map(exp => (
                    <div key={exp.id} className="relative">
                      <div className="absolute -left-3 top-2 size-2 rounded-full" style={{ backgroundColor: themeColor }}></div>
                      <div className="pl-4">
                        <h3 className="font-bold text-lg text-gray-900">{exp.title}</h3>
                        <div className="flex gap-2 items-center text-sm font-medium mb-2 text-gray-500">
                          <span>{exp.company}</span>
                          <span>•</span>
                          <span>{exp.startDate} – {exp.current ? "Present" : exp.endDate}</span>
                        </div>
                        <p className="whitespace-pre-wrap text-gray-700">{exp.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="w-1/3 space-y-8">
            {skills.length > 0 && (
              <div>
                <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Expertise</h2>
                <div className="flex flex-col gap-2">
                  {skills.map(s => (
                    <div key={s.id} className="bg-gray-50 px-3 py-2 rounded text-sm font-semibold border-l-2" style={{ borderColor: themeColor }}>
                      {s.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {education.length > 0 && (
              <div>
                <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Education</h2>
                <div className="space-y-4">
                  {education.map(edu => (
                    <div key={edu.id}>
                      <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                      <p className="text-sm text-gray-600">{edu.school}</p>
                      <p className="text-xs font-medium mt-1 text-gray-400">{edu.startDate} – {edu.endDate}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (selectedTemplateId === "ats-consulting") {
    return (
      <div className="w-full h-full bg-white text-gray-900 font-sans text-[10pt] leading-tight flex flex-col p-[20mm]">
        <header className="mb-4 pb-2 border-b-2 border-gray-800 text-center">
          <h1 className="text-2xl font-bold uppercase">{personal.fullName}</h1>
          <p className="text-sm uppercase tracking-wide mt-1">{personal.jobTitle}</p>
          <p className="text-xs mt-1">
            {[personal.email, personal.phone, personal.location].filter(Boolean).join(" | ")}
          </p>
        </header>
        {summary && <p className="mb-4 text-justify">{summary}</p>}
        {experience.length > 0 && (
          <div className="mb-4">
            <h2 className="text-[11pt] font-bold uppercase bg-gray-200 px-2 py-1 mb-2">Professional Experience</h2>
            <div className="space-y-3">
              {experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between font-bold text-[10.5pt]">
                    <span>{exp.company} – {exp.title}</span>
                    <span>{exp.startDate} to {exp.current ? "Present" : exp.endDate}</span>
                  </div>
                  <p className="mt-1 whitespace-pre-wrap pl-2">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {education.length > 0 && (
          <div className="mb-4">
            <h2 className="text-[11pt] font-bold uppercase bg-gray-200 px-2 py-1 mb-2">Education</h2>
            <div className="space-y-2">
              {education.map(edu => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <span className="font-bold">{edu.degree}</span>, {edu.school}
                  </div>
                  <span className="font-bold">{edu.startDate} – {edu.endDate}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {skills.length > 0 && (
          <div className="mb-4">
            <h2 className="text-[11pt] font-bold uppercase bg-gray-200 px-2 py-1 mb-2">Skills</h2>
            <p className="pl-2 font-medium">{skills.map(s => s.name).join(" • ")}</p>
          </div>
        )}
      </div>
    );
  }

  if (selectedTemplateId === "ats-startup") {
    return (
      <div className="w-full h-full bg-white text-gray-800 font-sans text-[11pt] leading-relaxed flex flex-col p-[20mm]">
        <div className="flex items-center gap-6 mb-8">
          <div className="size-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white shadow-md" style={{ backgroundColor: themeColor }}>
            {personal.fullName.charAt(0)}
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">{personal.fullName}</h1>
            <p className="text-lg font-medium text-gray-500">{personal.jobTitle}</p>
          </div>
          <div className="ml-auto text-right text-xs space-y-1 font-medium text-gray-500">
            {personal.email && <p>{personal.email}</p>}
            {personal.phone && <p>{personal.phone}</p>}
            {personal.location && <p>{personal.location}</p>}
          </div>
        </div>
        {summary && <p className="text-[11pt] font-medium text-gray-600 mb-8 border-l-2 pl-4" style={{ borderColor: themeColor }}>{summary}</p>}
        {skills.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {skills.map(s => (
                <span key={s.id} className="px-3 py-1.5 border rounded-full text-xs font-bold" style={{ borderColor: themeColor, color: themeColor }}>
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}
        {experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Experience</h2>
            <div className="space-y-6">
              {experience.map(exp => (
                <div key={exp.id} className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{exp.title}</h3>
                      <p className="text-sm font-bold text-gray-500">{exp.company}</p>
                    </div>
                    <span className="text-xs font-bold px-2 py-1 bg-white rounded shadow-sm text-gray-600">{exp.startDate} – {exp.current ? "Present" : exp.endDate}</span>
                  </div>
                  <p className="whitespace-pre-wrap text-gray-700 text-sm mt-3">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {education.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-900">Education</h2>
            <div className="grid grid-cols-2 gap-4">
              {education.map(edu => (
                <div key={edu.id} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <h3 className="font-bold text-gray-900 text-sm">{edu.degree}</h3>
                  <p className="text-xs text-gray-600 my-1">{edu.school}</p>
                  <p className="text-xs font-bold text-gray-400">{edu.startDate} – {edu.endDate}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (selectedTemplateId === "ats-healthcare") {
    return (
      <div className="w-full h-full bg-white text-gray-800 font-sans text-[11pt] leading-relaxed flex flex-col p-[20mm]">
        <div className="p-8 text-white rounded-t-xl mb-6" style={{ backgroundColor: themeColor }}>
          <h1 className="text-3xl font-bold mb-1">{personal.fullName}</h1>
          <p className="text-lg opacity-90">{personal.jobTitle}</p>
          <div className="flex gap-6 mt-4 text-sm opacity-80">
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>{personal.phone}</span>}
            {personal.location && <span>{personal.location}</span>}
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-6">
          {summary && (
            <section>
              <h2 className="text-lg font-bold border-b-2 mb-2 pb-1 text-gray-900" style={{ borderBottomColor: themeColor }}>Professional Profile</h2>
              <p className="text-gray-700 text-justify">{summary}</p>
            </section>
          )}
          {experience.length > 0 && (
            <section>
              <h2 className="text-lg font-bold border-b-2 mb-4 pb-1 text-gray-900" style={{ borderBottomColor: themeColor }}>Clinical & Professional Experience</h2>
              <div className="space-y-5">
                {experience.map(exp => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-center bg-gray-50 px-3 py-1 rounded">
                      <h3 className="font-bold text-gray-900">{exp.title}, <span className="font-normal">{exp.company}</span></h3>
                      <span className="text-sm font-bold text-gray-600">{exp.startDate} – {exp.current ? "Present" : exp.endDate}</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-700 px-3 whitespace-pre-wrap">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
          <div className="grid grid-cols-2 gap-8">
            {education.length > 0 && (
              <section>
                <h2 className="text-lg font-bold border-b-2 mb-4 pb-1 text-gray-900" style={{ borderBottomColor: themeColor }}>Education & Credentials</h2>
                <div className="space-y-3">
                  {education.map(edu => (
                    <div key={edu.id} className="text-sm">
                      <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                      <p className="text-gray-700">{edu.school}</p>
                      <p className="text-gray-500 text-xs">{edu.startDate} – {edu.endDate}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
            {skills.length > 0 && (
              <section>
                <h2 className="text-lg font-bold border-b-2 mb-4 pb-1 text-gray-900" style={{ borderBottomColor: themeColor }}>Core Competencies</h2>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                  {skills.map(s => <li key={s.id}>{s.name}</li>)}
                </ul>
              </section>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (selectedTemplateId === "ats-engineering") {
    return (
      <div className="w-full h-full bg-white text-gray-900 font-sans text-[10.5pt] leading-normal flex flex-col p-[20mm]">
        <header className="mb-6">
          <h1 className="text-4xl font-bold mb-1 tracking-tight text-gray-900">{personal.fullName}</h1>
          <p className="text-xl text-gray-600 mb-3">{personal.jobTitle}</p>
          <div className="flex gap-4 text-sm font-medium text-gray-500">
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>{personal.phone}</span>}
            {personal.location && <span>{personal.location}</span>}
          </div>
        </header>
        {summary && <p className="mb-6 text-gray-700 leading-relaxed">{summary}</p>}
        {skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-[12pt] font-bold uppercase tracking-wider mb-2 border-b-2" style={{ borderBottomColor: themeColor }}>Technical Arsenal</h2>
            <p className="text-[10.5pt] font-mono bg-gray-50 p-3 rounded text-gray-800">
              {skills.map(s => s.name).join("  •  ")}
            </p>
          </div>
        )}
        {experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-[12pt] font-bold uppercase tracking-wider mb-4 border-b-2" style={{ borderBottomColor: themeColor }}>Experience</h2>
            <div className="space-y-5">
              {experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold text-[11.5pt] text-gray-900">{exp.title}</h3>
                    <span className="text-sm font-medium text-gray-500">{exp.startDate} – {exp.current ? "Present" : exp.endDate}</span>
                  </div>
                  <p className="text-sm font-bold text-gray-600 mb-2">{exp.company}</p>
                  <p className="whitespace-pre-wrap text-gray-700 pl-3 border-l-[3px] border-gray-200">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-[12pt] font-bold uppercase tracking-wider mb-3 border-b-2" style={{ borderBottomColor: themeColor }}>Education</h2>
            <div className="grid grid-cols-2 gap-4">
              {education.map(edu => (
                <div key={edu.id}>
                  <h3 className="font-bold text-[11pt]">{edu.degree}</h3>
                  <p className="text-sm text-gray-600">{edu.school}</p>
                  <p className="text-xs text-gray-500">{edu.startDate} – {edu.endDate}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (selectedTemplateId === "ats-legal") {
    return (
      <div className="w-full h-full bg-white text-black font-serif text-[11pt] leading-snug flex flex-col p-[20mm]">
        <div className="mb-8 border-b-2 border-black pb-4 text-center">
          <h1 className="text-3xl font-bold uppercase mb-2 tracking-widest">{personal.fullName}</h1>
          <p className="text-sm uppercase tracking-widest mb-3">{personal.jobTitle}</p>
          <p className="text-xs">
            {[personal.email, personal.phone, personal.location].filter(Boolean).join("  |  ")}
          </p>
        </div>
        {summary && (
          <div className="mb-6">
            <h2 className="text-[11pt] font-bold uppercase mb-2 text-center tracking-widest">Profile</h2>
            <p className="text-justify indent-8">{summary}</p>
          </div>
        )}
        {experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-[11pt] font-bold uppercase mb-4 text-center tracking-widest border-b border-black pb-1">Legal Experience</h2>
            <div className="space-y-5">
              {experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between font-bold text-[11pt] mb-1">
                    <span>{exp.company}</span>
                    <span>{exp.startDate} – {exp.current ? "Present" : exp.endDate}</span>
                  </div>
                  <div className="italic mb-2">{exp.title}</div>
                  <p className="text-[10pt] whitespace-pre-wrap text-justify">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-[11pt] font-bold uppercase mb-4 text-center tracking-widest border-b border-black pb-1">Education</h2>
            <div className="space-y-4">
              {education.map(edu => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-[11pt]">{edu.school}</div>
                    <div className="italic">{edu.degree}</div>
                    {edu.description && <div className="text-[10pt] mt-1">{edu.description}</div>}
                  </div>
                  <div className="font-bold">{edu.startDate} – {edu.endDate}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-[11pt] font-bold uppercase mb-3 text-center tracking-widest border-b border-black pb-1">Admissions & Skills</h2>
            <p className="text-center text-[10pt]">{skills.map(s => s.name).join("  |  ")}</p>
          </div>
        )}
      </div>
    );
  }

  // --- NEW PREMIUM TEMPLATES ---

  // template-1: Executive Noir
  if (selectedTemplateId === "template-1") {
    return (
      <div className="w-full h-full bg-[#2a2a2a] flex flex-col items-center p-5 font-['Montserrat',sans-serif]" style={{ minHeight: '100vh', textAlign: 'left' }}>
        <style dangerouslySetInnerHTML={{ __html: `
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
          .template-1 {
            --c1: ${themeColor || '#B8960C'};
            --c2: #1A1A1A;
            --c3: #F5F0E8;
            width: 794px;
            min-height: 1123px;
            background: var(--c3);
            display: grid;
            grid-template-columns: 260px 1fr;
            box-shadow: 0 30px 80px rgba(0,0,0,.6);
            position: relative;
            overflow: hidden;
            text-align: left;
          }
          .template-1::before {
            content: '';
            position: absolute;
            top: 0; left: 260px;
            width: 4px;
            height: 100%;
            background: var(--c1);
            z-index: 10;
          }
          .t1-sidebar { background: var(--c2); padding: 44px 28px 40px; display: flex; flex-direction: column; gap: 28px; position: relative; }
          .t1-photo-ring { width: 120px; height: 120px; border-radius: 50%; border: 2px solid var(--c1); display: flex; align-items: center; justify-content: center; overflow: hidden; background: rgba(255,255,255,.05); margin: 0 auto; }
          .t1-name-block { text-align: center; }
          .t1-first-name { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 300; color: rgba(255,255,255,.7); letter-spacing: 3px; text-transform: uppercase; line-height: 1; }
          .t1-last-name { font-family: 'Cormorant Garamond', serif; font-size: 32px; font-weight: 700; color: #fff; letter-spacing: 2px; text-transform: uppercase; line-height: 1.1; }
          .t1-job-title { font-size: 9px; font-weight: 500; color: var(--c1); letter-spacing: 3px; text-transform: uppercase; margin-top: 8px; padding: 5px 0; border-top: 1px solid rgba(255,255,255,.1); border-bottom: 1px solid rgba(255,255,255,.1); }
          .t1-s-title { font-size: 8px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; color: var(--c1); margin-bottom: 12px; display: flex; align-items: center; gap: 8px; }
          .t1-s-title::after { content:''; flex:1; height:1px; background: rgba(255,255,255,.1); }
          .t1-contact-item { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 9px; }
          .t1-c-icon { width: 20px; height: 20px; border: 1px solid var(--c1); border-radius: 3px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 9px; color: var(--c1); }
          .t1-c-text { font-size: 11px; color: rgba(255,255,255,.65); line-height: 1.45; }
          .t1-main { padding: 40px 36px 36px 40px; display: flex; flex-direction: column; gap: 22px; }
          .t1-sec-title { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 600; color: var(--c2); letter-spacing: .5px; line-height: 1; }
          .t1-sec-head { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
          .t1-sec-rule { flex:1; height: 1px; background: linear-gradient(90deg, var(--c1), transparent); }
          .t1-sec-dot { width: 6px; height: 6px; background: var(--c1); border-radius: 50%; flex-shrink: 0; }
          .t1-exp-item { margin-bottom: 16px; padding-bottom: 16px; position: relative; padding-left: 14px; text-align: left; }
          .t1-exp-item::before { content:''; position:absolute; left:0; top:5px; width:4px; height:4px; background:var(--c1); border-radius:50%; }
          .t1-exp-role { font-size: 12.5px; font-weight: 600; color: var(--c2); }
          .t1-exp-period { font-size: 9.5px; color: var(--c1); font-weight: 600; letter-spacing: .5px; }
          .t1-exp-company { font-family: 'Cormorant Garamond', serif; font-size: 13px; font-style: italic; color: #777; margin-bottom: 5px; }
          .t1-skill-fill { height: 100%; background: var(--c1); border-radius: 1px; }
          .t1-skill-track { height: 2px; background: rgba(255,255,255,.08); border-radius: 1px; width: 100%; }
        `}} />
        <div className="template-1">
          <aside className="t1-sidebar">
            <div className="t1-photo-ring">
              {personal.photoUrl ? (
                <img src={personal.photoUrl} alt={personal.fullName} className="w-full h-full object-cover" />
              ) : (
                <span className="font-family-['Cormorant Garamond'] text-[42px] font-light text-[var(--c1)]">
                  {personal.fullName.split(' ').map(n => n[0]).join('')}
                </span>
              )}
            </div>
            <div className="t1-name-block">
              <div className="t1-first-name">{personal.fullName.split(' ')[0]}</div>
              <div className="t1-last-name">{personal.fullName.split(' ').slice(1).join(' ')}</div>
              <div className="t1-job-title">{personal.jobTitle}</div>
            </div>
            <div className="t1-s-section">
              <div className="t1-s-title">Contact</div>
              {personal.email && <div className="t1-contact-item"><div className="t1-c-icon">✉</div><div className="t1-c-text">{personal.email}</div></div>}
              {personal.phone && <div className="t1-contact-item"><div className="t1-c-icon">☎</div><div className="t1-c-text">{personal.phone}</div></div>}
              {personal.location && <div className="t1-contact-item"><div className="t1-c-icon">⌂</div><div className="t1-c-text">{personal.location}</div></div>}
            </div>
            {skills.length > 0 && (
              <div className="t1-s-section">
                <div className="t1-s-title">Expertise</div>
                {skills.slice(0, 5).map(skill => (
                  <div key={skill.id} className="mb-2">
                    <div className="flex justify-between text-[10.5px] text-white/70 mb-1">
                      <span>{skill.name}</span>
                      <span className="text-[var(--c1)]">{skill.level || '85%'}</span>
                    </div>
                    <div className="t1-skill-track"><div className="t1-skill-fill" style={{ width: skill.level || '85%' }}></div></div>
                  </div>
                ))}
              </div>
            )}
          </aside>
          <main className="t1-main">
            {summary && (
              <div className="t1-section">
                <div className="t1-sec-head"><div className="t1-sec-dot"></div><div className="t1-sec-title">Profile</div><div className="t1-sec-rule"></div></div>
                <p className="text-[11.5px] leading-[1.75] text-[#555] font-light">{summary}</p>
              </div>
            )}
            {experience.length > 0 && (
              <div className="t1-section">
                <div className="t1-sec-head"><div className="t1-sec-dot"></div><div className="t1-sec-title">Experience</div><div className="t1-sec-rule"></div></div>
                {experience.map(exp => (
                  <div key={exp.id} className="t1-exp-item">
                    <div className="flex justify-between items-start">
                      <div className="t1-exp-role">{exp.title}</div>
                      <div className="t1-exp-period">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</div>
                    </div>
                    <div className="t1-exp-company">{exp.company}</div>
                    <ul className="pl-3 mt-1 list-none">
                      {exp.description.split('\n').map((line, i) => (
                        <li key={i} className="text-[11px] text-[#555] leading-[1.6] mb-1 font-light opacity-80 text-left">• {line.replace(/^[•\-\*]\s*/, '')}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
            {education.length > 0 && (
              <div className="t1-section">
                <div className="t1-sec-head"><div className="t1-sec-dot"></div><div className="t1-sec-title">Education</div><div className="t1-sec-rule"></div></div>
                {education.map(edu => (
                  <div key={edu.id} className="flex gap-3 mb-3 text-left">
                    <div className="text-[9.5px] font-semibold text-[var(--c1)] tracking-[.5px] min-w-[70px] pt-0.5 whitespace-nowrap">{edu.startDate} – {edu.endDate}</div>
                    <div>
                      <div className="text-[12px] font-semibold text-[var(--c2)] leading-[1.3]">{edu.degree}</div>
                      <div className="text-[11px] text-[#888] italic">{edu.school}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    );
  }

  // template-2: Swiss Grid
  if (selectedTemplateId === "template-2") {
    return (
      <div className="w-full h-full bg-[#CFCFCF] flex flex-col items-center p-5 font-['Barlow',sans-serif]" style={{ minHeight: '100vh', textAlign: 'left' }}>
        <style dangerouslySetInnerHTML={{ __html: `
          @import url('https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&family=Barlow+Condensed:wght@300;500;700&display=swap');
          .template-2 {
            --accent: ${themeColor || '#E63312'};
            --ink: #111111;
            --paper: #FFFFFF;
            width: 794px;
            min-height: 1123px;
            background: var(--paper);
            display: flex;
            flex-direction: column;
            box-shadow: 0 20px 60px rgba(0,0,0,.3);
          }
          .t2-top-bar { background: var(--ink); height: 8px; }
          .t2-accent-bar { background: var(--accent); height: 4px; }
          .t2-header { padding: 36px 50px 28px; display: grid; grid-template-columns: 1fr auto; gap: 30px; border-bottom: 1px solid #E0E0E0; }
          .t2-name { font-family: 'Barlow Condensed', sans-serif; font-size: 58px; font-weight: 700; color: var(--ink); line-height: .9; letter-spacing: -1px; text-transform: uppercase; }
          .t2-name span { color: var(--accent); }
          .t2-title { font-size: 12px; font-weight: 500; color: var(--accent); letter-spacing: 4px; text-transform: uppercase; margin-top: 10px; }
          .t2-body { display: grid; grid-template-columns: 1fr 220px; flex: 1; }
          .t2-main { padding: 30px 40px 30px 50px; border-right: 1px solid #E8E8E8; }
          .t2-sec-head { display: flex; align-items: center; gap: 0; margin-bottom: 14px; }
          .t2-sec-num { font-family: 'Barlow Condensed', sans-serif; font-size: 11px; font-weight: 700; color: var(--accent); letter-spacing: 2px; width: 28px; }
          .t2-sec-title { font-family: 'Barlow Condensed', sans-serif; font-size: 14px; font-weight: 700; letter-spacing: 4px; text-transform: uppercase; color: var(--ink); flex: 1; }
          .t2-sec-line { flex: 1; height: 1px; background: #E0E0E0; }
          .t2-exp-block { margin-bottom: 18px; display: grid; grid-template-columns: 80px 1fr; gap: 0 16px; text-align: left; }
          .t2-exp-dates { font-size: 10px; font-weight: 600; color: var(--accent); letter-spacing: .5px; line-height: 1.4; }
          .t2-exp-company-sm { font-size: 10px; color: #888; margin-top: 3px; line-height: 1.3; }
          .t2-exp-right { border-left: 2px solid var(--accent); padding-left: 14px; }
          .t2-side { padding: 30px 28px 30px 24px; }
          .t2-s-title { font-family: 'Barlow Condensed', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: var(--ink); border-bottom: 2px solid var(--accent); padding-bottom: 5px; margin-bottom: 12px; }
          .t2-skill-tag { display: inline-block; font-size: 10px; font-weight: 500; padding: 3px 8px; border: 1px solid var(--accent); color: var(--accent); margin: 2px 2px 2px 0; letter-spacing: .5px; }
        `}} />
        <div className="template-2">
          <div className="t2-top-bar"></div>
          <div className="t2-accent-bar"></div>
          <header className="t2-header">
            <div>
              <div className="t2-name">{personal.fullName.split(' ')[0]}<br /><span>{personal.fullName.split(' ').slice(1).join(' ')}</span></div>
              <div className="t2-title">{personal.jobTitle}</div>
            </div>
            <div className="flex flex-col gap-1 justify-end text-right">
              {personal.email && <div className="text-[11.5px] text-[#555]">{personal.email}</div>}
              {personal.phone && <div className="text-[11.5px] text-[#555]">{personal.phone}</div>}
              {personal.location && <div className="text-[11.5px] text-[#555]">{personal.location}</div>}
            </div>
          </header>
          <div className="t2-body">
            <main className="t2-main">
              {summary && (
                <div className="mb-6">
                  <div className="t2-sec-head">
                    <div className="t2-sec-num">01</div>
                    <div className="t2-sec-title">About</div>
                    <div className="t2-sec-line"></div>
                  </div>
                  <p className="text-[12px] leading-[1.75] text-[#444] font-light">{summary}</p>
                </div>
              )}
              {experience.length > 0 && (
                <div className="mb-6">
                  <div className="t2-sec-head">
                    <div className="t2-sec-num">02</div>
                    <div className="t2-sec-title">Experience</div>
                    <div className="t2-sec-line"></div>
                  </div>
                  {experience.map(exp => (
                    <div key={exp.id} className="t2-exp-block">
                      <div className="t2-exp-left">
                        <div className="t2-exp-dates">
                           <div>{exp.startDate}</div>
                           <div>{exp.current ? 'Present' : exp.endDate}</div>
                        </div>
                        <div className="t2-exp-company-sm">{exp.company}</div>
                      </div>
                      <div className="t2-exp-right">
                        <div className="t2-exp-role">{exp.title}</div>
                        <ul className="list-none p-0 m-0">
                          {exp.description.split('\n').map((line, i) => (
                            <li key={i} className="text-[11px] text-[#555] leading-[1.6] mb-1 relative pl-3 text-left">• {line.replace(/^[•\-\*]\s*/, '')}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </main>
            <aside className="t2-side">
              {education.length > 0 && (
                <div className="mb-6">
                  <div className="t2-s-title">Education</div>
                  {education.map(edu => (
                    <div key={edu.id} className="mb-3 text-left">
                      <div className="text-[10px] font-semibold text-[var(--accent)]">{edu.startDate} – {edu.endDate}</div>
                      <div className="text-[12px] font-semibold text-[var(--ink)] leading-[1.3]">{edu.degree}</div>
                      <div className="text-[11px] text-[#777] italic">{edu.school}</div>
                    </div>
                  ))}
                </div>
              )}
              {skills.length > 0 && (
                <div className="mb-6 text-left">
                  <div className="t2-s-title">Skills</div>
                  <div className="flex flex-wrap">
                    {skills.map(skill => (
                      <span key={skill.id} className="t2-skill-tag">{skill.name}</span>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>
    );
  }

  // template-3: Architect
  if (selectedTemplateId === "template-3") {
    return (
      <div className="w-full h-full bg-[#D8D8D8] flex flex-col items-center p-5 font-['DM Sans',sans-serif]" style={{ minHeight: '100vh', textAlign: 'left' }}>
        <style dangerouslySetInnerHTML={{ __html: `
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
          .template-3 {
            --a: ${themeColor || '#C0392B'};
            --ink: #1C1C1C;
            --bg: #FAFAFA;
            width: 794px;
            min-height: 1123px;
            background: var(--bg);
            box-shadow: 0 20px 60px rgba(0,0,0,.25);
            display: grid;
            grid-template-columns: 6px 210px 1fr;
          }
          .t3-stripe { background: var(--a); }
          .t3-sidebar { background: #F2F2F2; padding: 44px 22px 40px 24px; border-right: 1px solid #E5E5E5; }
          .t3-photo-sq { width: 100%; aspect-ratio: 1; background: #E0E0E0; display: flex; align-items: center; justify-content: center; margin-bottom: 22px; position: relative; overflow: hidden; }
          .t3-photo-sq::after { content: ''; position: absolute; bottom: 0; left: 0; width: 100%; height: 4px; background: var(--a); }
          .t3-name { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: var(--ink); line-height: 1.2; margin-bottom: 4px; }
          .t3-role { font-size: 10px; color: var(--a); letter-spacing: 2.5px; text-transform: uppercase; font-weight: 500; margin-bottom: 20px; }
          .t3-s-head { font-size: 8.5px; font-weight: 500; letter-spacing: 2.5px; text-transform: uppercase; color: var(--a); margin-bottom: 10px; padding-bottom: 5px; border-bottom: 1px solid #DDD; }
          .t3-main { padding: 44px 44px 36px 36px; }
          .t3-sh { font-family: 'Playfair Display', serif; font-size: 17px; font-weight: 700; color: var(--ink); margin-bottom: 2px; display: flex; align-items: baseline; gap: 10px; }
          .t3-sh::after { content:''; flex:1; height:1px; background:#E0E0E0; margin-left:4px; }
          .t3-sh-accent { width: 24px; height: 2px; background: var(--a); margin-bottom: 14px; }
          .t3-job-date { font-size: 10px; color: var(--a); font-weight: 500; background: rgba(192,57,43,.07); padding: 2px 7px; border-radius: 2px; }
        `}} />
        <div className="template-3">
          <div className="t3-stripe"></div>
          <aside className="t3-sidebar text-left">
            <div className="t3-photo-sq">
              {personal.photoUrl ? (
                <img src={personal.photoUrl} alt={personal.fullName} className="w-full h-full object-cover" />
              ) : (
                <span className="font-family-['Playfair Display'] text-[40px] text-[#BBB] font-bold">
                  {personal.fullName.split(' ').map(n => n[0]).join('')}
                </span>
              )}
            </div>
            <div className="t3-name">{personal.fullName.split(' ')[0]}<br />{personal.fullName.split(' ').slice(1).join(' ')}</div>
            <div className="t3-role">{personal.jobTitle}</div>
            <div className="mb-5">
              <div className="t3-s-head">Contact</div>
              <div className="flex flex-col gap-1 text-[10.5px] text-[#555]">
                {personal.email && <div><span className="text-[8.5px] font-bold text-[var(--a)] uppercase tracking-[.5px] min-w-[36px] inline-block">Email</span> {personal.email}</div>}
                {personal.phone && <div><span className="text-[8.5px] font-bold text-[var(--a)] uppercase tracking-[.5px] min-w-[36px] inline-block">Phone</span> {personal.phone}</div>}
                {personal.location && <div><span className="text-[8.5px] font-bold text-[var(--a)] uppercase tracking-[.5px] min-w-[36px] inline-block">City</span> {personal.location}</div>}
              </div>
            </div>
            {education.length > 0 && (
              <div className="mb-5">
                <div className="t3-s-head">Education</div>
                {education.map(edu => (
                  <div key={edu.id} className="mb-3">
                    <div className="text-[11px] font-medium text-[var(--ink)] leading-[1.3]">{edu.degree}</div>
                    <div className="text-[10px] text-[#777]">{edu.school}</div>
                    <div className="text-[9.5px] text-[var(--a)] font-medium mt-0.5">{edu.startDate} – {edu.endDate}</div>
                  </div>
                ))}
              </div>
            )}
            {skills.length > 0 && (
              <div className="mb-5">
                <div className="t3-s-head">Expertise</div>
                <div className="flex flex-col gap-1.5">
                  {skills.slice(0, 6).map(skill => (
                    <div key={skill.id} className="flex justify-between items-center text-[10.5px] text-[#555]">
                      <span>{skill.name}</span>
                      <div className="w-[60px] h-0.5 bg-[#DDD]"><div className="h-full bg-[var(--a)]" style={{ width: skill.level || '80%' }}></div></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </aside>
          <main className="t3-main">
            {summary && (
              <div className="mb-5">
                <div className="t3-sh">Profile</div>
                <div className="t3-sh-accent"></div>
                <p className="text-[12px] leading-[1.8] text-[#555] font-light">{summary}</p>
              </div>
            )}
            {experience.length > 0 && (
              <div className="mb-5">
                <div className="t3-sh">Experience</div>
                <div className="t3-sh-accent"></div>
                {experience.map(exp => (
                  <div key={exp.id} className="mb-4">
                    <div className="flex justify-between items-start mb-0.5">
                      <div className="text-[12.5px] font-medium text-[var(--ink)]">{exp.title}</div>
                      <div className="t3-job-date">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</div>
                    </div>
                    <div className="font-family-['Playfair Display'] italic text-[12px] text-[#888] mb-1">{exp.company}</div>
                    <ul className="pl-3.5 list-none m-0">
                      {exp.description.split('\n').map((line, i) => (
                        <li key={i} className="text-[11px] text-[#555] leading-[1.6] mb-0.5 font-light text-left">• {line.replace(/^[•\-\*]\s*/, '')}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    );
  }


  // template-2: Swiss Grid
  if (selectedTemplateId === "template-2") {
    return (
      <div className="w-full h-full bg-[#CFCFCF] flex flex-col items-center p-5 font-['Barlow',sans-serif]" style={{ minHeight: '100vh', textAlign: 'left' }}>
        <style dangerouslySetInnerHTML={{ __html: `
          @import url('https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&family=Barlow+Condensed:wght@300;500;700&display=swap');
          .template-2 {
            --accent: ${themeColor || '#E63312'};
            --ink: #111111;
            --paper: #FFFFFF;
            width: 794px;
            min-height: 1123px;
            background: var(--paper);
            display: flex;
            flex-direction: column;
            box-shadow: 0 20px 60px rgba(0,0,0,.3);
            text-align: left;
          }
          .t2-top-bar { background: var(--ink); height: 8px; }
          .t2-accent-bar { background: var(--accent); height: 4px; }
          .t2-header { padding: 36px 50px 28px; display: grid; grid-template-columns: 1fr auto; gap: 30px; border-bottom: 1px solid #E0E0E0; }
          .t2-name { font-family: 'Barlow Condensed', sans-serif; font-size: 58px; font-weight: 700; color: var(--ink); line-height: .9; letter-spacing: -1px; text-transform: uppercase; }
          .t2-name span { color: var(--accent); }
          .t2-title { font-size: 12px; font-weight: 500; color: var(--accent); letter-spacing: 4px; text-transform: uppercase; margin-top: 10px; }
          .t2-body { display: grid; grid-template-columns: 1fr 220px; flex: 1; }
          .t2-main { padding: 30px 40px 30px 50px; border-right: 1px solid #E8E8E8; }
          .t2-sec-head { display: flex; align-items: center; gap: 0; margin-bottom: 14px; }
          .t2-sec-num { font-family: 'Barlow Condensed', sans-serif; font-size: 11px; font-weight: 700; color: var(--accent); letter-spacing: 2px; width: 28px; }
          .t2-sec-title { font-family: 'Barlow Condensed', sans-serif; font-size: 14px; font-weight: 700; letter-spacing: 4px; text-transform: uppercase; color: var(--ink); flex: 1; }
          .t2-sec-line { flex: 1; height: 1px; background: #E0E0E0; }
          .t2-exp-block { margin-bottom: 18px; display: grid; grid-template-columns: 80px 1fr; gap: 0 16px; text-align: left; }
          .t2-exp-dates { font-size: 10px; font-weight: 600; color: var(--accent); letter-spacing: .5px; line-height: 1.4; }
          .t2-exp-company-sm { font-size: 10px; color: #888; margin-top: 3px; line-height: 1.3; }
          .t2-exp-right { border-left: 2px solid var(--accent); padding-left: 14px; }
          .t2-exp-role { font-size: 13px; font-weight: 600; color: var(--ink); margin-bottom: 4px; }
          .t2-side { padding: 30px 28px 30px 24px; }
          .t2-s-title { font-family: 'Barlow Condensed', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: var(--ink); border-bottom: 2px solid var(--accent); padding-bottom: 5px; margin-bottom: 12px; }
          .t2-skill-tag { display: inline-block; font-size: 10px; font-weight: 500; padding: 3px 8px; border: 1px solid var(--accent); color: var(--accent); margin: 2px 2px 2px 0; letter-spacing: .5px; }
        `}} />
        <div className="template-2">
          <div className="t2-top-bar"></div>
          <div className="t2-accent-bar"></div>
          <header className="t2-header">
            <div>
              <div className="t2-name">{personal.fullName.split(' ')[0]}<br /><span>{personal.fullName.split(' ').slice(1).join(' ')}</span></div>
              <div className="t2-title">{personal.jobTitle}</div>
            </div>
            <div className="flex flex-col gap-1 justify-end text-right">
              {personal.email && <div className="text-[11.5px] text-[#555]">{personal.email}</div>}
              {personal.phone && <div className="text-[11.5px] text-[#555]">{personal.phone}</div>}
              {personal.location && <div className="text-[11.5px] text-[#555]">{personal.location}</div>}
            </div>
          </header>
          <div className="t2-body">
            <main className="t2-main">
              {summary && (
                <div className="mb-6">
                  <div className="t2-sec-head">
                    <div className="t2-sec-num">01</div>
                    <div className="t2-sec-title">About</div>
                    <div className="t2-sec-line"></div>
                  </div>
                  <p className="text-[12px] leading-[1.75] text-[#444] font-light">{summary}</p>
                </div>
              )}
              {experience.length > 0 && (
                <div className="mb-6">
                  <div className="t2-sec-head">
                    <div className="t2-sec-num">02</div>
                    <div className="t2-sec-title">Experience</div>
                    <div className="t2-sec-line"></div>
                  </div>
                  {experience.map(exp => (
                    <div key={exp.id} className="t2-exp-block">
                      <div className="t2-exp-left">
                        <div className="t2-exp-dates">
                           <div>{exp.startDate}</div>
                           <div>{exp.current ? 'Present' : exp.endDate}</div>
                        </div>
                        <div className="t2-exp-company-sm">{exp.company}</div>
                      </div>
                      <div className="t2-exp-right">
                        <div className="t2-exp-role">{exp.title}</div>
                        <ul className="list-none p-0 m-0">
                          {exp.description.split('\n').map((line, i) => (
                            <li key={i} className="text-[11px] text-[#555] leading-[1.6] mb-1 relative pl-3 text-left">• {line.replace(/^[•\-\*]\s*/, '')}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </main>
            <aside className="t2-side">
              {education.length > 0 && (
                <div className="mb-6">
                  <div className="t2-s-title">Education</div>
                  {education.map(edu => (
                    <div key={edu.id} className="mb-3 text-left">
                      <div className="text-[10px] font-semibold text-[var(--accent)]">{edu.startDate} – {edu.endDate}</div>
                      <div className="text-[12px] font-semibold text-[var(--ink)] leading-[1.3]">{edu.degree}</div>
                      <div className="text-[11px] text-[#777] italic">{edu.school}</div>
                    </div>
                  ))}
                </div>
              )}
              {skills.length > 0 && (
                <div className="mb-6 text-left">
                  <div className="t2-s-title">Skills</div>
                  <div className="flex flex-wrap">
                    {skills.map(skill => (
                      <span key={skill.id} className="t2-skill-tag">{skill.name}</span>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>
    );
  }

  // template-3: Architect
  if (selectedTemplateId === "template-3") {
    return (
      <div className="w-full h-full bg-[#D8D8D8] flex flex-col items-center p-5 font-['DM Sans',sans-serif]" style={{ minHeight: '100vh', textAlign: 'left' }}>
        <style dangerouslySetInnerHTML={{ __html: `
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
          .template-3 {
            --a: ${themeColor || '#C0392B'};
            --ink: #1C1C1C;
            --bg: #FAFAFA;
            width: 794px;
            min-height: 1123px;
            background: var(--bg);
            box-shadow: 0 20px 60px rgba(0,0,0,.25);
            display: grid;
            grid-template-columns: 6px 210px 1fr;
            text-align: left;
          }
          .t3-stripe { background: var(--a); }
          .t3-sidebar { background: #F2F2F2; padding: 44px 22px 40px 24px; border-right: 1px solid #E5E5E5; }
          .t3-photo-sq { width: 100%; aspect-ratio: 1; background: #E0E0E0; display: flex; align-items: center; justify-content: center; margin-bottom: 22px; position: relative; overflow: hidden; }
          .t3-photo-sq::after { content: ''; position: absolute; bottom: 0; left: 0; width: 100%; height: 4px; background: var(--a); }
          .t3-name { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: var(--ink); line-height: 1.2; margin-bottom: 4px; }
          .t3-role { font-size: 10px; color: var(--a); letter-spacing: 2.5px; text-transform: uppercase; font-weight: 500; margin-bottom: 20px; }
          .t3-s-head { font-size: 8.5px; font-weight: 500; letter-spacing: 2.5px; text-transform: uppercase; color: var(--a); margin-bottom: 10px; padding-bottom: 5px; border-bottom: 1px solid #DDD; }
          .t3-main { padding: 44px 44px 36px 36px; }
          .t3-sh { font-family: 'Playfair Display', serif; font-size: 17px; font-weight: 700; color: var(--ink); margin-bottom: 2px; display: flex; align-items: baseline; gap: 10px; }
          .t3-sh::after { content:''; flex:1; height:1px; background:#E0E0E0; margin-left:4px; }
          .t3-sh-accent { width: 24px; height: 2px; background: var(--a); margin-bottom: 14px; }
          .t3-job-date { font-size: 10px; color: var(--a); font-weight: 500; background: rgba(192,57,43,.07); padding: 2px 7px; border-radius: 2px; }
        `}} />
        <div className="template-3">
          <div className="t3-stripe"></div>
          <aside className="t3-sidebar text-left">
            <div className="t3-photo-sq">
              {personal.photoUrl ? (
                <img src={personal.photoUrl} alt={personal.fullName} className="w-full h-full object-cover" />
              ) : (
                <span className="font-family-['Playfair Display'] text-[40px] text-[#BBB] font-bold">
                  {personal.fullName.split(' ').map(n => n[0]).join('')}
                </span>
              )}
            </div>
            <div className="t3-name">{personal.fullName.split(' ')[0]}<br />{personal.fullName.split(' ').slice(1).join(' ')}</div>
            <div className="t3-role">{personal.jobTitle}</div>
            <div className="mb-5">
              <div className="t3-s-head">Contact</div>
              <div className="flex flex-col gap-1 text-[10.5px] text-[#555]">
                {personal.email && <div><span className="text-[8.5px] font-bold text-[var(--a)] uppercase tracking-[.5px] min-w-[36px] inline-block">Email</span> {personal.email}</div>}
                {personal.phone && <div><span className="text-[8.5px] font-bold text-[var(--a)] uppercase tracking-[.5px] min-w-[36px] inline-block">Phone</span> {personal.phone}</div>}
                {personal.location && <div><span className="text-[8.5px] font-bold text-[var(--a)] uppercase tracking-[.5px] min-w-[36px] inline-block">City</span> {personal.location}</div>}
              </div>
            </div>
            {education.length > 0 && (
              <div className="mb-5">
                <div className="t3-s-head">Education</div>
                {education.map(edu => (
                  <div key={edu.id} className="mb-3">
                    <div className="text-[11px] font-medium text-[var(--ink)] leading-[1.3]">{edu.degree}</div>
                    <div className="text-[10px] text-[#777]">{edu.school}</div>
                    <div className="text-[9.5px] text-[var(--a)] font-medium mt-0.5">{edu.startDate} – {edu.endDate}</div>
                  </div>
                ))}
              </div>
            )}
            {skills.length > 0 && (
              <div className="mb-5">
                <div className="t3-s-head">Expertise</div>
                <div className="flex flex-col gap-1.5">
                  {skills.slice(0, 6).map(skill => (
                    <div key={skill.id} className="flex justify-between items-center text-[10.5px] text-[#555]">
                      <span>{skill.name}</span>
                      <div className="w-[60px] h-0.5 bg-[#DDD]"><div className="h-full bg-[var(--a)]" style={{ width: skill.level || '80%' }}></div></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </aside>
          <main className="t3-main">
            {summary && (
              <div className="mb-5">
                <div className="t3-sh">Profile</div>
                <div className="t3-sh-accent"></div>
                <p className="text-[12px] leading-[1.8] text-[#555] font-light">{summary}</p>
              </div>
            )}
            {experience.length > 0 && (
              <div className="mb-5">
                <div className="t3-sh">Experience</div>
                <div className="t3-sh-accent"></div>
                {experience.map(exp => (
                  <div key={exp.id} className="mb-4">
                    <div className="flex justify-between items-start mb-0.5">
                      <div className="text-[12.5px] font-medium text-[var(--ink)]">{exp.title}</div>
                      <div className="t3-job-date">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</div>
                    </div>
                    <div className="font-family-['Playfair Display'] italic text-[12px] text-[#888] mb-1">{exp.company}</div>
                    <ul className="pl-3.5 list-none m-0">
                      {exp.description.split('\n').map((line, i) => (
                        <li key={i} className="text-[11px] text-[#555] leading-[1.6] mb-0.5 font-light text-left">• {line.replace(/^[•\-\*]\s*/, '')}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    );
  }

  // template-4: Minimalist
  if (selectedTemplateId === "template-4") {
    return (
      <div className="w-full h-full bg-[#f9f9fb] flex flex-col items-center p-5 font-['Inter',sans-serif]" style={{ minHeight: '100vh', textAlign: 'left' }}>
        <style dangerouslySetInnerHTML={{ __html: `
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          .template-4 {
            --primary: ${themeColor || '#2563eb'};
            --text-main: #1e293b;
            --text-light: #64748b;
            --bg: #ffffff;
            width: 794px;
            min-height: 1123px;
            background: var(--bg);
            box-shadow: 0 10px 30px rgba(0,0,0,.1);
            padding: 60px 50px;
            display: flex;
            flex-direction: column;
            gap: 30px;
            text-align: left;
          }
          .t4-header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #f1f5f9; padding-bottom: 30px; }
          .t4-name { font-size: 32px; font-weight: 700; color: var(--text-main); letter-spacing: -0.025em; }
          .t4-job { font-size: 16px; color: var(--primary); font-weight: 500; margin-top: 4px; }
          .t4-contact { display: flex; flex-wrap: wrap; gap: 15px; margin-top: 15px; }
          .t4-contact-item { font-size: 13px; color: var(--text-light); display: flex; align-items: center; gap: 6px; }
          .t4-section-title { font-size: 14px; font-weight: 700; color: var(--primary); text-transform: uppercase; letter-spacing: 0.1em; border-left: 3px solid var(--primary); padding-left: 12px; margin-bottom: 20px; }
          .t4-exp-item { margin-bottom: 25px; }
          .t4-exp-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px; }
          .t4-exp-role { font-size: 15px; font-weight: 600; color: var(--text-main); }
          .t4-exp-company { font-size: 14px; color: var(--text-light); font-weight: 500; }
          .t4-exp-date { font-size: 12px; color: var(--text-light); font-weight: 400; }
          .t4-skill-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
          .t4-skill-bubble { font-size: 12px; background: #f8fafc; border: 1px solid #e2e8f0; color: var(--text-main); padding: 6px 12px; border-radius: 6px; }
        `}} />
        <div className="template-4">
          <header className="t4-header">
            <div>
              <div className="t4-name">{personal.fullName}</div>
              <div className="t4-job">{personal.jobTitle}</div>
              <div className="t4-contact">
                {personal.email && <div className="t4-contact-item"><span>✉</span> {personal.email}</div>}
                {personal.phone && <div className="t4-contact-item"><span>☎</span> {personal.phone}</div>}
                {personal.location && <div className="t4-contact-item"><span>⌂</span> {personal.location}</div>}
              </div>
            </div>
            {personal.photoUrl && (
              <img src={personal.photoUrl} alt={personal.fullName} className="w-24 h-24 rounded-xl object-cover border-2 border-slate-100" />
            )}
          </header>

          {summary && (
            <section>
              <div className="t4-section-title">Summary</div>
              <p className="text-[14px] leading-relaxed text-[#475569]">{summary}</p>
            </section>
          )}

          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-8">
              {experience.length > 0 && (
                <section>
                  <div className="t4-section-title">Experience</div>
                  {experience.map(exp => (
                    <div key={exp.id} className="t4-exp-item text-left">
                      <div className="t4-exp-header">
                        <div className="t4-exp-role">{exp.title}</div>
                        <div className="t4-exp-date">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</div>
                      </div>
                      <div className="t4-exp-company">{exp.company}</div>
                      <ul className="mt-3 space-y-2">
                        {exp.description.split('\n').map((line, i) => (
                          <li key={i} className="text-[13px] text-[#475569] leading-relaxed relative pl-4 text-left">
                            <span className="absolute left-0 top-2 w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
                            {line.replace(/^[•\-\*]\s*/, '')}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
              )}
            </div>
            <div className="col-span-4 space-y-8">
              {skills.length > 0 && (
                <section>
                  <div className="t4-section-title">Skills</div>
                  <div className="flex flex-wrap gap-2">
                    {skills.map(skill => (
                      <span key={skill.id} className="t4-skill-bubble">{skill.name}</span>
                    ))}
                  </div>
                </section>
              )}
              {education.length > 0 && (
                <section>
                  <div className="t4-section-title">Education</div>
                  {education.map(edu => (
                    <div key={edu.id} className="mb-4 text-left">
                      <div className="text-[14px] font-semibold text-[#1e293b]">{edu.degree}</div>
                      <div className="text-[13px] text-[#64748b]">{edu.school}</div>
                      <div className="text-[12px] text-[#94a3b8]">{edu.startDate} – {edu.endDate}</div>
                    </div>
                  ))}
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // template-5: Creative Pulse
  if (selectedTemplateId === "template-5") {
    return (
      <div className="w-full h-full bg-[#111] flex flex-col items-center p-5 font-['Plus Jakarta Sans',sans-serif]" style={{ minHeight: '100vh', textAlign: 'left' }}>
        <style dangerouslySetInnerHTML={{ __html: `
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
          .template-5 {
            --gradient: linear-gradient(135deg, ${themeColor || '#6366f1'} 0%, #a855f7 100%);
            --glass: rgba(255, 255, 255, 0.03);
            --border: rgba(255, 255, 255, 0.1);
            width: 794px;
            min-height: 1123px;
            background: #0a0a0a;
            color: #fff;
            padding: 50px;
            box-shadow: 0 40px 100px rgba(0,0,0,0.8);
            position: relative;
            overflow: hidden;
            text-align: left;
          }
          .t5-bg-glow { position: absolute; top: -100px; right: -100px; width: 400px; height: 400px; background: var(--gradient); filter: blur(150px); opacity: 0.15; z-index: 0; }
          .t5-header { position: relative; z-index: 1; margin-bottom: 50px; }
          .t5-name { font-size: 48px; font-weight: 800; letter-spacing: -0.04em; background: var(--gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent; line-height: 1; }
          .t5-job { font-size: 18px; font-weight: 500; color: #94a3b8; margin-top: 12px; letter-spacing: 0.05em; text-transform: uppercase; }
          .t5-contact-bar { display: flex; gap: 24px; margin-top: 24px; padding: 16px; background: var(--glass); border: 1px solid var(--border); border-radius: 12px; backdrop-filter: blur(10px); }
          .t5-contact-item { font-size: 12px; color: #cbd5e1; display: flex; align-items: center; gap: 8px; }
          .t5-section-head { font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.2em; color: #6366f1; margin-bottom: 24px; display: flex; align-items: center; gap: 12px; }
          .t5-section-head::after { content: ''; flex: 1; height: 1px; background: var(--border); }
          .t5-grid { display: grid; grid-template-columns: 1fr 280px; gap: 40px; }
          .t5-card { background: var(--glass); border: 1px solid var(--border); border-radius: 16px; padding: 24px; margin-bottom: 24px; }
          .t5-exp-item { margin-bottom: 30px; position: relative; padding-left: 24px; }
          .t5-exp-item::before { content: ''; position: absolute; left: 0; top: 8px; width: 8px; height: 8px; border-radius: 50%; background: var(--gradient); }
          .t5-exp-role { font-size: 18px; font-weight: 700; color: #fff; }
          .t5-exp-company { font-size: 14px; color: #94a3b8; margin-top: 4px; }
          .t5-exp-date { font-size: 12px; padding: 4px 12px; background: var(--border); border-radius: 20px; color: #e2e8f0; display: inline-block; margin-top: 8px; }
          .t5-skill-tag { padding: 6px 14px; background: var(--glass); border: 1px solid var(--border); border-radius: 8px; font-size: 12px; color: #e2e8f0; transition: all 0.3s ease; }
        `}} />
        <div className="template-5">
          <div className="t5-bg-glow"></div>
          <header className="t5-header">
            <div className="t5-name">{personal.fullName}</div>
            <div className="t5-job">{personal.jobTitle}</div>
            <div className="t5-contact-bar">
              {personal.email && <div className="t5-contact-item"><span>✉</span> {personal.email}</div>}
              {personal.phone && <div className="t5-contact-item"><span>☎</span> {personal.phone}</div>}
              {personal.location && <div className="t5-contact-item"><span>⌂</span> {personal.location}</div>}
            </div>
          </header>

          <div className="t5-grid">
            <main>
              {summary && (
                <section className="mb-10">
                  <div className="t5-section-head">Profile</div>
                  <p className="text-[14px] leading-relaxed text-[#94a3b8] italic text-left">"{summary}"</p>
                </section>
              )}

              {experience.length > 0 && (
                <section>
                  <div className="t5-section-head">Experience</div>
                  {experience.map(exp => (
                    <div key={exp.id} className="t4-exp-item text-left">
                      <div className="t5-exp-role">{exp.title}</div>
                      <div className="t5-exp-company">{exp.company}</div>
                      <div className="t5-exp-date">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</div>
                      <ul className="mt-4 space-y-2">
                        {exp.description.split('\n').map((line, i) => (
                          <li key={i} className="text-[13px] text-[#cbd5e1] leading-relaxed opacity-80 pl-2 border-l border-[#333] text-left">
                            {line.replace(/^[•\-\*]\s*/, '')}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
              )}
            </main>

            <aside>
              {skills.length > 0 && (
                <section className="t5-card">
                  <div className="t5-section-head">Skills</div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {skills.map(skill => (
                      <span key={skill.id} className="t5-skill-tag">{skill.name}</span>
                    ))}
                  </div>
                </section>
              )}

              {education.length > 0 && (
                <section className="t5-card">
                  <div className="t5-section-head">Education</div>
                  {education.map(edu => (
                    <div key={edu.id} className="mb-6 text-left">
                      <div className="text-[15px] font-bold text-white leading-tight">{edu.degree}</div>
                      <div className="text-[13px] text-[#94a3b8] mt-1">{edu.school}</div>
                      <div className="text-[12px] text-[#6366f1] font-semibold mt-1">{edu.startDate} – {edu.endDate}</div>
                    </div>
                  ))}
                </section>
              )}
            </aside>
          </div>
        </div>
      </div>
    );
  }

  // template-6: Serenity
  if (selectedTemplateId === "template-6") {
    return (
      <div className="w-full h-full bg-[#fdfbf7] flex flex-col items-center p-5 font-['Georgia',serif]" style={{ minHeight: '100vh', textAlign: 'left' }}>
        <style dangerouslySetInnerHTML={{ __html: `
          .template-6 {
            --accent: ${themeColor || '#7c9a92'};
            --bg: #ffffff;
            --text: #2c3e50;
            width: 794px;
            min-height: 1123px;
            background: var(--bg);
            padding: 80px 70px;
            box-shadow: 0 10px 40px rgba(0,0,0,.08);
            text-align: left;
          }
          .t6-header { text-align: center; margin-bottom: 60px; }
          .t6-name { font-size: 38px; color: var(--text); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px; font-weight: 400; }
          .t6-job { font-size: 14px; color: var(--accent); letter-spacing: 4px; text-transform: uppercase; font-family: sans-serif; }
          .t6-sep { width: 40px; height: 1px; background: var(--accent); margin: 24px auto; }
          .t6-contact { display: flex; justify-content: center; gap: 30px; font-size: 11px; color: #7f8c8d; font-family: sans-serif; letter-spacing: 1px; }
          .t6-section { margin-bottom: 45px; }
          .t6-section-title { font-size: 13px; color: var(--accent); text-transform: uppercase; letter-spacing: 3px; font-weight: 700; margin-bottom: 24px; text-align: center; font-family: sans-serif; }
          .t6-exp-item { margin-bottom: 30px; position: relative; }
          .t6-exp-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px; font-family: sans-serif; }
          .t6-exp-role { font-size: 15px; font-weight: 600; color: var(--text); }
          .t6-exp-date { font-size: 12px; font-style: italic; color: #95a5a6; }
          .t6-exp-company { font-size: 13px; color: var(--accent); margin-bottom: 12px; font-family: sans-serif; }
        `}} />
        <div className="template-6">
          <header className="t6-header">
            <div className="t6-name">{personal.fullName}</div>
            <div className="t6-job">{personal.jobTitle}</div>
            <div className="t6-sep"></div>
            <div className="t6-contact">
              {personal.email && <div>{personal.email.toUpperCase()}</div>}
              {personal.phone && <div>{personal.phone}</div>}
              {personal.location && <div>{personal.location.toUpperCase()}</div>}
            </div>
          </header>

          {summary && (
            <section className="t6-section">
              <div className="t6-section-title">Professional Summary</div>
              <p className="text-[14px] leading-[1.8] text-[#555] text-center max-w-[600px] mx-auto italic">
                {summary}
              </p>
            </section>
          )}

          {experience.length > 0 && (
            <section className="t6-section">
              <div className="t6-section-title">Experience</div>
              {experience.map(exp => (
                <div key={exp.id} className="t6-exp-item text-left">
                  <div className="t6-exp-header">
                    <div className="t6-exp-role">{exp.title}</div>
                    <div className="t6-exp-date">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</div>
                  </div>
                  <div className="t6-exp-company">{exp.company}</div>
                  <ul className="mt-3 space-y-2">
                    {exp.description.split('\n').map((line, i) => (
                      <li key={i} className="text-[13px] text-[#555] leading-[1.7] pl-4 relative text-left">
                        <span className="absolute left-0 top-2 w-[3px] h-[3px] bg-[#bdc3c7] rounded-full"></span>
                        {line.replace(/^[•\-\*]\s*/, '')}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          )}

          <div className="grid grid-cols-2 gap-16">
            {skills.length > 0 && (
              <section className="t6-section">
                <div className="t6-section-title">Expertise</div>
                <div className="flex flex-col gap-3">
                  {skills.slice(0, 6).map(skill => (
                    <div key={skill.id} className="flex justify-between items-center">
                      <span className="text-[12px] text-[#555] uppercase tracking-wider">{skill.name}</span>
                      <div className="w-24 h-[1px] bg-[#eee]"><div className="h-full bg-[var(--accent)]" style={{ width: skill.level || '80%' }}></div></div>
                    </div>
                  ))}
                </div>
              </section>
            )}
            {education.length > 0 && (
              <section className="t6-section">
                <div className="t6-section-title">Education</div>
                {education.map(edu => (
                  <div key={edu.id} className="mb-6 text-left">
                    <div className="text-[14px] font-semibold text-[#2c3e50]">{edu.degree}</div>
                    <div className="text-[12px] text-[#7f8c8d] italic mt-1">{edu.school}</div>
                    <div className="text-[11px] text-[var(--accent)] mt-1 uppercase tracking-wider">{edu.startDate} – {edu.endDate}</div>
                  </div>
                ))}
              </section>
            )}
          </div>
        </div>
      </div>
    );
  }

  // template-7: Velocity
  if (selectedTemplateId === "template-7") {
    return (
      <div className="w-full h-full bg-[#f0f0f0] flex flex-col items-center p-5 font-['Outfit',sans-serif]" style={{ minHeight: '100vh', textAlign: 'left' }}>
        <style dangerouslySetInnerHTML={{ __html: `
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
          .template-7 {
            --v-blue: ${themeColor || '#0ea5e9'};
            --v-dark: #0f172a;
            width: 794px;
            min-height: 1123px;
            background: #ffffff;
            display: grid;
            grid-template-columns: 80px 1fr;
            box-shadow: 0 30px 60px rgba(0,0,0,0.15);
            text-align: left;
           }
          .t7-sidebar { background: var(--v-dark); display: flex; flex-direction: column; align-items: center; padding-top: 40px; color: #ffffff; gap: 40px; }
          .t7-vertical-text { writing-mode: vertical-rl; transform: rotate(180deg); font-size: 11px; font-weight: 700; letter-spacing: 5px; text-transform: uppercase; color: rgba(255,255,255,0.3); }
          .t7-main { padding: 60px 60px 60px 50px; }
          .t7-header { margin-bottom: 50px; }
          .t7-name { font-size: 56px; font-weight: 800; color: var(--v-dark); line-height: 1; letter-spacing: -2px; }
          .t7-name span { color: var(--v-blue); }
          .t7-job { font-size: 16px; font-weight: 500; color: #64748b; margin-top: 12px; letter-spacing: 2px; text-transform: uppercase; }
          .t7-section-label { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 4px; color: var(--v-blue); margin-bottom: 12px; }
          .t7-grid { display: grid; grid-template-columns: 1fr 240px; gap: 50px; }
          .t7-exp-item { margin-bottom: 36px; }
          .t7-exp-role { font-size: 18px; font-weight: 700; color: var(--v-dark); display: flex; align-items: center; gap: 12px; }
          .t7-exp-role::after { content: ''; flex: 1; height: 1px; background: #f1f5f9; }
          .t7-exp-company { font-size: 14px; font-weight: 600; color: var(--v-blue); margin-top: 4px; }
          .t7-exp-date { font-size: 12px; color: #94a3b8; font-weight: 500; margin-top: 2px; }
          .t7-skill-bar { height: 4px; background: #f1f5f9; border-radius: 2px; margin-top: 8px; overflow: hidden; }
          .t7-skill-fill { height: 100%; background: var(--v-blue); border-radius: 2px; }
        `}} />
        <div className="template-7">
          <aside className="t7-sidebar">
            <div className="text-2xl font-black italic text-[var(--v-blue)]">V/</div>
            <div className="t7-vertical-text">ELEVATECV PREMIUM</div>
          </aside>
          <main className="t7-main">
            <header className="t7-header">
              <div className="t7-name">{personal.fullName.split(' ')[0]} <span>{personal.fullName.split(' ').slice(1).join(' ')}</span></div>
              <div className="t7-job">{personal.jobTitle}</div>
              <div className="flex gap-6 mt-8 font-medium text-[13px] text-slate-500">
                {personal.email && <div>✉ {personal.email}</div>}
                {personal.phone && <div>☎ {personal.phone}</div>}
                {personal.location && <div>⌂ {personal.location}</div>}
              </div>
            </header>

            <div className="t7-grid">
              <section>
                <div className="t7-section-label">EXPERIENCE</div>
                {experience.map(exp => (
                  <div key={exp.id} className="t7-exp-item text-left">
                    <div className="t7-exp-role">{exp.title}</div>
                    <div className="t7-exp-company">{exp.company}</div>
                    <div className="t7-exp-date">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</div>
                    <ul className="mt-4 space-y-2">
                      {exp.description.split('\n').map((line, i) => (
                        <li key={i} className="text-[14px] text-slate-600 leading-relaxed font-light text-left pl-2 border-l-2 border-slate-100">
                          {line.replace(/^[•\-\*]\s*/, '')}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>

              <aside className="space-y-12">
                {summary && (
                  <section>
                    <div className="t7-section-label">BIO</div>
                    <p className="text-[14px] text-slate-600 leading-[1.8] font-light italic">"{summary}"</p>
                  </section>
                )}
                {skills.length > 0 && (
                  <section>
                    <div className="t7-section-label">SKILLS</div>
                    <div className="space-y-4">
                      {skills.map(skill => (
                        <div key={skill.id}>
                          <div className="flex justify-between text-[12px] font-bold text-slate-700">
                            <span>{skill.name.toUpperCase()}</span>
                            <span>{skill.level || '80%'}</span>
                          </div>
                          <div className="t7-skill-bar"><div className="t7-skill-fill" style={{ width: skill.level || '80%' }}></div></div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
                {education.length > 0 && (
                  <section>
                    <div className="t7-section-label">EDUCATION</div>
                    {education.map(edu => (
                      <div key={edu.id} className="mb-6 text-left">
                        <div className="text-[14px] font-bold text-slate-800">{edu.degree}</div>
                        <div className="text-[13px] font-medium text-[var(--v-blue)]">{edu.school}</div>
                        <div className="text-[12px] text-slate-400 mt-1">{edu.startDate} – {edu.endDate}</div>
                      </div>
                    ))}
                  </section>
                )}
              </aside>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // template-8: Legacy
  if (selectedTemplateId === "template-8") {
    return (
      <div className="w-full h-full bg-[#fdfdfd] flex flex-col items-center p-5 font-['Times New Roman',serif]" style={{ minHeight: '100vh', textAlign: 'left' }}>
        <style dangerouslySetInnerHTML={{ __html: `
          .template-8 {
            --accent: ${themeColor || '#2c3e50'};
            --bg: #ffffff;
            width: 794px;
            min-height: 1123px;
            background: var(--bg);
            padding: 70px 60px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.05);
            text-align: left;
           }
          .t8-header { border-bottom: 3px double #000; padding-bottom: 20px; margin-bottom: 30px; text-align: center; }
          .t8-name { font-size: 34px; font-weight: bold; color: #000; text-transform: uppercase; margin-bottom: 10px; }
          .t8-contact { font-size: 12px; color: #555; }
          .t8-section { margin-bottom: 25px; }
          .t8-section-title { font-size: 14px; font-weight: bold; border-bottom: 1px solid #000; text-transform: uppercase; margin-bottom: 12px; padding-bottom: 3px; }
          .t8-exp-header { display: flex; justify-content: space-between; font-weight: bold; font-size: 13px; }
        `}} />
        <div className="template-8">
          <header className="t8-header text-center">
            <div className="t8-name">{personal.fullName}</div>
            <div className="t8-contact">
              {personal.location} | {personal.phone} | {personal.email}
            </div>
          </header>

          {summary && (
            <section className="t8-section">
              <div className="t8-section-title">Professional Summary</div>
              <p className="text-[13px] leading-[1.6] text-[#333] text-left">{summary}</p>
            </section>
          )}

          {experience.length > 0 && (
            <section className="t8-section">
              <div className="t8-section-title">Professional Experience</div>
              {experience.map(exp => (
                <div key={exp.id} className="mb-4 text-left">
                  <div className="t8-exp-header">
                    <span>{exp.company.toUpperCase()}</span>
                    <span>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <div className="text-[13px] italic font-semibold">{exp.title}</div>
                  <ul className="mt-1 list-disc pl-5">
                    {exp.description.split('\n').map((line, i) => (
                      <li key={i} className="text-[12.5px] text-[#333] leading-normal text-left mb-0.5">{line.replace(/^[•\-\*]\s*/, '')}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          )}

          {education.length > 0 && (
            <section className="t8-section">
              <div className="t8-section-title">Education</div>
              {education.map(edu => (
                <div key={edu.id} className="mb-3 text-left">
                  <div className="flex justify-between font-bold text-[13px]">
                    <span>{edu.school.toUpperCase()}</span>
                    <span>{edu.startDate} – {edu.endDate}</span>
                  </div>
                  <div className="text-[13.5px] italic">{edu.degree}</div>
                </div>
              ))}
            </section>
          )}

          {skills.length > 0 && (
            <section className="t8-section">
              <div className="t8-section-title">Skills & Certifications</div>
              <p className="text-[12.5px] leading-[1.6] text-[#333] text-left">
                <strong>Technical Skills:</strong> {skills.map(s => s.name).join(', ')}
              </p>
            </section>
          )}
        </div>
      </div>
    );
  }

  // template-9: Modern Edge
  if (selectedTemplateId === "template-9") {
    return (
      <div className="w-full h-full bg-[#121212] flex flex-col items-center p-5 font-['Syncopate',sans-serif]" style={{ minHeight: '100vh', textAlign: 'left' }}>
        <style dangerouslySetInnerHTML={{ __html: `
          @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
          .template-9 {
            --neon: ${themeColor || '#00ffcc'};
            --bg: #121212;
            --surface: #1e1e1e;
            width: 794px;
            min-height: 1123px;
            background: var(--bg);
            color: #ffffff;
            padding: 60px;
            box-shadow: 0 0 50px rgba(0,255,204,0.1);
            position: relative;
            font-family: 'Space Grotesk', sans-serif;
            text-align: left;
          }
          .t9-header { border-left: 5px solid var(--neon); padding-left: 30px; margin-bottom: 60px; }
          .t9-name { font-family: 'Syncopate', sans-serif; font-size: 40px; font-weight: 700; letter-spacing: -2px; text-transform: uppercase; line-height: 1; }
          .t9-job { font-size: 14px; font-weight: 700; color: var(--neon); margin-top: 15px; letter-spacing: 5px; text-transform: uppercase; }
          .t9-contact { display: flex; gap: 30px; margin-top: 30px; font-size: 11px; opacity: 0.6; font-weight: 500; }
          .t9-section-title { font-family: 'Syncopate', sans-serif; font-size: 12px; font-weight: 700; color: var(--neon); text-transform: uppercase; margin-bottom: 30px; letter-spacing: 4px; display: flex; align-items: center; gap: 15px; }
          .t9-section-title::after { content: ''; flex: 1; height: 1px; background: rgba(255,255,255,0.1); }
          .t9-exp-item { margin-bottom: 40px; background: var(--surface); padding: 30px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.05); }
          .t9-exp-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 15px; }
          .t9-exp-role { font-size: 18px; font-weight: 700; }
          .t9-exp-date { font-size: 12px; color: var(--neon); font-weight: 600; }
          .t9-exp-company { font-size: 14px; opacity: 0.6; margin-bottom: 20px; }
          .t9-skill-tag { padding: 8px 16px; background: rgba(0,255,204,0.05); border: 1px solid rgba(0,255,204,0.2); border-radius: 2px; font-size: 12px; color: var(--neon); }
        `}} />
        <div className="template-9">
          <header className="t9-header">
            <div className="t9-name">{personal.fullName}</div>
            <div className="t9-job">{personal.jobTitle}</div>
            <div className="t9-contact">
              {personal.email && <div>{personal.email}</div>}
              {personal.phone && <div>{personal.phone}</div>}
              {personal.location && <div>{personal.location}</div>}
            </div>
          </header>

          <div className="grid grid-cols-1 gap-12">
            {summary && (
              <section>
                <div className="t9-section-title">Profile</div>
                <p className="text-[15px] leading-relaxed opacity-80 font-light max-w-[650px]">{summary}</p>
              </section>
            )}

            {experience.length > 0 && (
              <section>
                <div className="t9-section-title">Experience</div>
                {experience.map(exp => (
                  <div key={exp.id} className="t9-exp-item text-left">
                    <div className="t9-exp-header">
                      <div className="t9-exp-role">{exp.title}</div>
                      <div className="t9-exp-date">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</div>
                    </div>
                    <div className="t9-exp-company">{exp.company}</div>
                    <ul className="mt-4 space-y-3">
                      {exp.description.split('\n').map((line, i) => (
                        <li key={i} className="text-[14px] opacity-70 leading-relaxed pl-5 relative text-left">
                          <span className="absolute left-0 top-[10px] w-2 h-[1px] bg-[var(--neon)]"></span>
                          {line.replace(/^[•\-\*]\s*/, '')}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            )}

            <div className="grid grid-cols-2 gap-12">
              {skills.length > 0 && (
                <section>
                  <div className="t9-section-title">Skills</div>
                  <div className="flex flex-wrap gap-2">
                    {skills.map(skill => (
                      <span key={skill.id} className="t9-skill-tag">{skill.name}</span>
                    ))}
                  </div>
                </section>
              )}
              {education.length > 0 && (
                <section>
                  <div className="t9-section-title">Education</div>
                  {education.map(edu => (
                    <div key={edu.id} className="mb-6 text-left">
                      <div className="text-[16px] font-bold">{edu.degree}</div>
                      <div className="text-[14px] opacity-60 mt-1">{edu.school}</div>
                      <div className="text-[12px] color-[var(--neon)] mt-2 font-semibold tracking-wider">{edu.startDate} – {edu.endDate}</div>
                    </div>
                  ))}
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // template-10: Chroma
  if (selectedTemplateId === "template-10") {
    return (
      <div className="w-full h-full bg-[#f8f9fa] flex flex-col items-center p-5 font-['Cabinet Grotesk',sans-serif]" style={{ minHeight: '100vh', textAlign: 'left' }}>
        <style dangerouslySetInnerHTML={{ __html: `
          @import url('https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@100,200,300,400,500,700,800,900&display=swap');
          .template-10 {
            --c-main: ${themeColor || '#f97316'};
            --c-dark: #18181b;
            --c-light: #f4f4f5;
            width: 794px;
            min-height: 1123px;
            background: #ffffff;
            display: flex;
            flex-direction: column;
            box-shadow: 0 50px 100px rgba(0,0,0,0.1);
            position: relative;
            text-align: left;
          }
          .t10-top { height: 120px; background: var(--c-dark); display: flex; align-items: center; justify-content: center; position: relative; }
          .t10-avatar { width: 140px; height: 140px; background: #fff; border: 8px solid #fff; border-radius: 50%; box-shadow: 0 10px 30px rgba(0,0,0,0.1); position: absolute; bottom: -70px; overflow: hidden; display: flex; align-items: center; justify-content: center; }
          .t10-header { padding: 90px 60px 40px; text-align: center; }
          .t10-name { font-size: 42px; font-weight: 900; color: var(--c-dark); letter-spacing: -2px; text-transform: lowercase; }
          .t10-job { font-size: 14px; font-weight: 700; color: var(--c-main); text-transform: uppercase; letter-spacing: 4px; margin-top: 8px; }
          .t10-body { padding: 0 60px 60px; display: grid; grid-template-columns: 1fr 240px; gap: 50px; }
          .t10-section-h { font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 3px; color: #a1a1aa; margin-bottom: 24px; border-bottom: 1px solid #e4e4e7; padding-bottom: 8px; }
          .t10-exp-item { margin-bottom: 30px; padding: 24px; background: #fafafa; border-radius: 12px; transition: all 0.3s ease; }
          .t10-exp-item:hover { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
          .t10-exp-role { font-size: 18px; font-weight: 800; color: var(--c-dark); }
          .t10-exp-company { font-size: 13px; font-weight: 700; color: var(--c-main); margin-top: 4px; }
          .t10-exp-date { font-size: 11px; color: #71717a; margin-top: 2px; }
          .t10-skill-dot { width: 8px; height: 8px; background: var(--c-main); border-radius: 50%; }
        `}} />
        <div className="template-10">
          <div className="t10-top">
            <div className="t10-avatar">
              {personal.photoUrl ? (
                <img src={personal.photoUrl} alt={personal.fullName} className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl font-black text-[var(--c-dark)]">{personal.fullName.charAt(0)}</span>
              )}
            </div>
          </div>
          <header className="t10-header">
            <div className="t10-name">{personal.fullName}</div>
            <div className="t10-job">{personal.jobTitle}</div>
            <div className="flex justify-center gap-6 mt-6 text-[13px] font-medium text-slate-400">
              {personal.email && <div>{personal.email}</div>}
              {personal.phone && <div>{personal.phone}</div>}
              {personal.location && <div>{personal.location}</div>}
            </div>
          </header>

          <div className="t10-body">
            <main>
              {experience.length > 0 && (
                <section>
                  <div className="t10-section-h">Experience</div>
                  {experience.map(exp => (
                    <div key={exp.id} className="t10-exp-item text-left">
                      <div className="t10-exp-role">{exp.title}</div>
                      <div className="t10-exp-company">{exp.company}</div>
                      <div className="t10-exp-date">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</div>
                      <ul className="mt-4 space-y-2">
                        {exp.description.split('\n').map((line, i) => (
                          <li key={i} className="text-[14px] text-slate-600 leading-relaxed text-left pl-3 border-l-2 border-slate-100">
                            {line.replace(/^[•\-\*]\s*/, '')}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
              )}
            </main>

            <aside className="space-y-10">
              {summary && (
                <section>
                  <div className="t10-section-h">About</div>
                  <p className="text-[14px] text-slate-500 leading-relaxed font-medium italic">"{summary}"</p>
                </section>
              )}
              {skills.length > 0 && (
                <section>
                  <div className="t10-section-h">Skills</div>
                  <div className="flex flex-wrap gap-2">
                    {skills.map(skill => (
                      <span key={skill.id} className="px-3 py-1 bg-slate-100 rounded-full text-[11px] font-bold text-slate-600 uppercase tracking-tight">{skill.name}</span>
                    ))}
                  </div>
                </section>
              )}
              {education.length > 0 && (
                <section>
                  <div className="t10-section-h">Education</div>
                  {education.map(edu => (
                    <div key={edu.id} className="mb-6 text-left">
                      <div className="text-[14px] font-extrabold text-slate-800">{edu.degree}</div>
                      <div className="text-[12px] font-bold text-[var(--c-main)] mt-1">{edu.school}</div>
                      <div className="text-[11px] text-slate-400 mt-1">{edu.startDate} – {edu.endDate}</div>
                    </div>
                  ))}
                </section>
              )}
            </aside>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-white">
      <p className="text-gray-500">Template "{selectedTemplateId}" not found.</p>
    </div>
  );
}
