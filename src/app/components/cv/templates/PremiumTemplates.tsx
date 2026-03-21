import { CVData } from "../../../store";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

interface PremiumTemplateProps {
  data: CVData;
  templateId: string;
  themeColor: string;
}

export function PremiumTemplates({ data, templateId, themeColor }: PremiumTemplateProps) {
  const { personal, summary, experience, education, skills } = data;

  // 1. Executive Noir
  if (templateId === "premium-1") {
    return (
      <div id="t1" className="w-[794px] min-h-[1123px] grid grid-cols-[260px_1fr] relative overflow-hidden bg-[#F5F0E8] shadow-2xl" style={{ 
        ['--c1' as any]: themeColor,
        ['--c2' as any]: '#1A1A1A',
        ['--c3' as any]: '#F5F0E8'
      }}>
        <style dangerouslySetInnerHTML={{ __html: `
          #t1::before { content:''; position:absolute; top:0; left:260px; width:4px; height:100%; background:var(--c1); z-index:10; }
          #t1 .sb { background:var(--c2); padding:44px 28px 40px; display:flex; flex-direction:column; gap:24px; position:relative; color: #fff; }
          #t1 .sb::after { content:''; position:absolute; bottom:0; right:0; width:70px; height:70px; border-right:2px solid var(--c1); border-bottom:2px solid var(--c1); opacity:.3; }
          #t1 .ph { width:110px; height:110px; border-radius:50%; border:2px solid var(--c1); display:flex; align-items:center; justify-content:center; margin:0 auto; background:rgba(255,255,255,.04); overflow:hidden; }
          #t1 .ph-init { font-family:'Cormorant Garamond',serif; font-size:38px; color:var(--c1); font-weight:300; }
          #t1 .fn { font-family:'Cormorant Garamond',serif; font-size:24px; font-weight:300; color:rgba(255,255,255,.7); letter-spacing:3px; text-transform:uppercase; text-align:center; }
          #t1 .ln { font-family:'Cormorant Garamond',serif; font-size:30px; font-weight:700; color:#fff; letter-spacing:2px; text-transform:uppercase; text-align:center; }
          #t1 .jt-box { font-size:8.5px; font-weight:500; color:var(--c1); letter-spacing:3px; text-transform:uppercase; text-align:center; padding:5px 0; border-top:1px solid rgba(255,255,255,.1); border-bottom:1px solid rgba(255,255,255,.1); margin-top:4px; }
          #t1 .st { font-size:7.5px; font-weight:700; letter-spacing:3px; text-transform:uppercase; color:var(--c1); margin-bottom:10px; display:flex; align-items:center; gap:7px; }
          #t1 .st::after { content:''; flex:1; height:1px; background:rgba(255,255,255,.1); }
          #t1 .ci { display:flex; align-items:flex-start; gap:9px; margin-bottom:8px; }
          #t1 .ci-ic { width:18px; height:18px; border:1px solid var(--c1); border-radius:2px; display:flex; align-items:center; justify-content:center; font-size:8px; color:var(--c1); flex-shrink:0; }
          #t1 .ci-tx { font-size:10.5px; color:rgba(255,255,255,.6); line-height:1.4; }
          #t1 .sr { margin-bottom:8px; }
          #t1 .sr-top { display:flex; justify-content:space-between; font-size:10px; color:rgba(255,255,255,.65); margin-bottom:3px; }
          #t1 .sr-pct { font-size:8.5px; color:var(--c1); }
          #t1 .sr-tr { height:2px; background:rgba(255,255,255,.08); border-radius:1px; }
          #t1 .sr-fi { height:100%; background:var(--c1); border-radius:1px; }
          #t1 .li { display:flex; justify-content:space-between; margin-bottom:6px; }
          #t1 .li-n { font-size:10.5px; color:rgba(255,255,255,.65); }
          #t1 .li-d { display:flex; gap:3px; }
          #t1 .ld { width:6px; height:6px; border-radius:50%; background:rgba(255,255,255,.12); }
          #t1 .ld.on { background:var(--c1); }
          #t1 .mn { padding:36px 34px 32px 38px; display:flex; flex-direction:column; gap:18px; background: var(--c3); }
          #t1 .sh { display:flex; align-items:center; gap:9px; margin-bottom:12px; }
          #t1 .sh-d { width:5px; height:5px; background:var(--c1); border-radius:50%; flex-shrink:0; }
          #t1 .sh-t { font-family:'Cormorant Garamond',serif; font-size:18px; font-weight:600; color:var(--c2); }
          #t1 .sh-r { flex:1; height:1px; background:linear-gradient(90deg,var(--c1),transparent); }
          #t1 .ab { font-size:11px; line-height:1.75; color:#555; font-weight:300; }
          #t1 .ej { margin-bottom:14px; padding-bottom:14px; padding-left:12px; position:relative; }
          #t1 .ej::before { content:''; position:absolute; left:0; top:4px; width:3.5px; height:3.5px; background:var(--c1); border-radius:50%; }
          #t1 .ej-t { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:1px; }
          #t1 .ej-r { font-size:12px; font-weight:600; color:var(--c2); }
          #t1 .ej-d { font-size:9px; color:var(--c1); font-weight:600; white-space:nowrap; }
          #t1 .ej-c { font-family:'Cormorant Garamond',serif; font-size:12px; font-style:italic; color:#777; margin-bottom:4px; }
          #t1 .ej-b { padding-left:10px; list-style: none; }
          #t1 .ej-b li { font-size:10.5px; color:#555; line-height:1.6; margin-bottom:2px; font-weight:300; position: relative; padding-left: 12px; }
          #t1 .ej-b li::before { content: '•'; position: absolute; left: 0; color: var(--c1); }
          #t1 .edu { display:flex; gap:12px; margin-bottom:10px; }
          #t1 .edu-y { font-size:9px; font-weight:600; color:var(--c1); min-width:65px; padding-top:2px; }
          #t1 .edu-d { font-size:11.5px; font-weight:600; color:var(--c2); }
          #t1 .edu-s { font-size:10.5px; color:#888; font-style:italic; }
        `}} />
        <aside className="sb">
          <div className="ph">
            {personal.photoUrl ? (
              <img src={personal.photoUrl} alt="" className="w-full h-full object-cover" />
            ) : (
              <span className="ph-init">{personal.fullName.charAt(0)}</span>
            )}
          </div>
          <div className="name-box">
            <div className="fn">{personal.fullName.split(' ')[0]}</div>
            <div className="ln">{personal.fullName.split(' ').slice(1).join(' ')}</div>
            <div className="jt-box">{personal.jobTitle}</div>
          </div>

          <div className="contact-bl">
            <div className="st">Contact</div>
            {personal.email && (
              <div className="ci">
                <div className="ci-ic"><Mail size={10} /></div>
                <div className="ci-tx">{personal.email}</div>
              </div>
            )}
            {personal.phone && (
              <div className="ci">
                <div className="ci-ic"><Phone size={10} /></div>
                <div className="ci-tx">{personal.phone}</div>
              </div>
            )}
            {personal.location && (
              <div className="ci">
                <div className="ci-ic"><MapPin size={10} /></div>
                <div className="ci-tx">{personal.location}</div>
              </div>
            )}
            {personal.website && (
              <div className="ci">
                <div className="ci-ic"><Globe size={10} /></div>
                <div className="ci-tx">{personal.website.replace(/^https?:\/\//, '')}</div>
              </div>
            )}
          </div>

          {skills.length > 0 && (
            <div className="skills-bl">
              <div className="st">Expertise</div>
              {skills.map(s => (
                <div className="sr" key={s.id}>
                  <div className="sr-top">
                    <span>{s.name}</span>
                    <span className="sr-pct">{s.level || '85%'}</span>
                  </div>
                  <div className="sr-tr">
                    <div className="sr-fi" style={{ width: s.level || '85%' }}></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </aside>

        <main className="mn">
          {summary && (
            <section>
              <div className="sh">
                <div className="sh-d"></div>
                <div className="sh-t">Executive Summary</div>
                <div className="sh-r"></div>
              </div>
              <p className="ab">{summary}</p>
            </section>
          )}

          {experience.length > 0 && (
            <section>
              <div className="sh">
                <div className="sh-d"></div>
                <div className="sh-t">Professional Experience</div>
                <div className="sh-r"></div>
              </div>
              <div className="exp-list">
                {experience.map(exp => (
                  <div className="ej" key={exp.id}>
                    <div className="ej-t">
                      <div className="ej-r">{exp.title}</div>
                      <div className="ej-d">{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</div>
                    </div>
                    <div className="ej-c">{exp.company}</div>
                    <ul className="ej-b">
                      {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                        <li key={i}>{line.replace(/^[•\-\*]\s*/, '')}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section>
              <div className="sh">
                <div className="sh-d"></div>
                <div className="sh-t">Education</div>
                <div className="sh-r"></div>
              </div>
              <div className="edu-list">
                {education.map(edu => (
                  <div className="edu" key={edu.id}>
                    <div className="edu-y">{edu.startDate} — {edu.endDate}</div>
                    <div>
                      <div className="edu-d">{edu.degree}</div>
                      <div className="edu-s">{edu.school}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    );
  }

  // 2. Swiss Grid
  if (templateId === "premium-2") {
    return (
      <div id="t2" className="w-[794px] min-h-[1123px] bg-white shadow-2xl flex flex-col pt-0" style={{ ['--ac' as any]: themeColor }}>
        <style dangerouslySetInnerHTML={{ __html: `
          #t2 .top-bar { background:#111; height:7px; }
          #t2 .ac-bar { background:var(--ac); height:3px; }
          #t2 .hd { padding:30px 50px 24px; display:grid; grid-template-columns:1fr auto; gap:24px; border-bottom:1px solid #E0E0E0; }
          #t2 .h-name { font-family:'Barlow Condensed',sans-serif; font-size:52px; font-weight:700; color:#111; line-height:.9; letter-spacing:-1px; text-transform:uppercase; }
          #t2 .h-name span { color:var(--ac); }
          #t2 .h-sub { font-size:11px; font-weight:500; color:var(--ac); letter-spacing:3.5px; text-transform:uppercase; margin-top:8px; }
          #t2 .h-rt { text-align:right; display:flex; flex-direction:column; gap:4px; justify-content:flex-end; }
          #t2 .hc { font-size:11px; color:#555; }
          #t2 .bd { display:grid; grid-template-columns:1fr 200px; flex:1; }
          #t2 .mn-inner { padding:26px 36px 26px 50px; border-right:1px solid #EBEBEB; }
          #t2 .sec-hd { display:flex; align-items:center; gap:0; margin-bottom:12px; }
          #t2 .sn { font-family:'Barlow Condensed',sans-serif; font-size:10px; font-weight:700; color:var(--ac); letter-spacing:2px; width:26px; }
          #t2 .st { font-family:'Barlow Condensed',sans-serif; font-size:13px; font-weight:700; letter-spacing:3.5px; text-transform:uppercase; color:#111; flex:1; }
          #t2 .sl { flex:1; height:1px; background:#E0E0E0; margin-left:8px; }
          #t2 .sec-box { margin-bottom:20px; }
          #t2 .ab-text { font-size:11.5px; line-height:1.75; color:#444; font-weight:300; }
          #t2 .eb-box { margin-bottom:16px; display:grid; grid-template-columns:76px 1fr; gap:0 14px; }
          #t2 .eb-dt { font-size:9.5px; font-weight:600; color:var(--ac); line-height:1.4; }
          #t2 .eb-co { font-size:9px; color:#999; margin-top:2px; line-height:1.3; }
          #t2 .eb-r { border-left:2px solid var(--ac); padding-left:12px; }
          #t2 .eb-ro { font-size:12.5px; font-weight:600; color:#111; margin-bottom:4px; }
          #t2 .eb-pts { list-style:none; }
          #t2 .eb-pts li { font-size:10.5px; color:#555; line-height:1.6; margin-bottom:2px; padding-left:10px; list-style:none; position:relative; }
          #t2 .eb-pts li::before { content:'—'; position:absolute; left:0; color:var(--ac); font-size:9px; top:1px; }
          #t2 .sd-inner { padding:26px 24px 26px 20px; }
          #t2 .ss-box { margin-bottom:20px; }
          #t2 .ss-t { font-family:'Barlow Condensed',sans-serif; font-size:11px; font-weight:700; letter-spacing:2.5px; text-transform:uppercase; color:#111; border-bottom:2px solid var(--ac); padding-bottom:4px; margin-bottom:10px; }
          #t2 .edu-e { margin-bottom:10px; }
          #t2 .edu-y { font-size:9.5px; font-weight:600; color:var(--ac); }
          #t2 .edu-d { font-size:11.5px; font-weight:600; color:#111; line-height:1.3; }
          #t2 .edu-s { font-size:10.5px; color:#777; font-style:italic; }
          #t2 .sk-tg { display:inline-block; font-size:9.5px; font-weight:600; padding:2px 7px; border:1px solid var(--ac); color:var(--ac); margin:2px 2px 2px 0; letter-spacing:.3px; }
        `}} />
        <div className="top-bar"></div><div className="ac-bar"></div>
        <header className="hd">
          <div>
            <div className="h-name">{personal.fullName.split(' ')[0]}<br/><span>{personal.fullName.split(' ').slice(1).join(' ')}</span></div>
            <div className="h-sub">{personal.jobTitle}</div>
          </div>
          <div className="h-rt">
            {personal.email && <div className="hc">{personal.email}</div>}
            {personal.phone && <div className="hc">{personal.phone}</div>}
            {personal.location && <div className="hc">{personal.location}</div>}
            {personal.website && <div className="hc">{personal.website.replace(/^https?:\/\//, '')}</div>}
          </div>
        </header>
        <div className="bd">
          <main className="mn-inner">
            {summary && (
              <div className="sec-box">
                <div className="sec-hd"><div className="sn">01</div><div className="st">About</div><div className="sl"></div></div>
                <p className="ab-text">{summary}</p>
              </div>
            )}
            {experience.length > 0 && (
              <div className="sec-box">
                <div className="sec-hd"><div className="sn">02</div><div className="st">Experience</div><div className="sl"></div></div>
                {experience.map(exp => (
                  <div className="eb-box" key={exp.id}>
                    <div className="eb-l">
                      <div className="eb-dt">{exp.startDate}<br/>{exp.current ? "Present" : exp.endDate}</div>
                      <div className="eb-co">{exp.company}</div>
                    </div>
                    <div className="eb-r">
                      <div className="eb-ro">{exp.title}</div>
                      <ul className="eb-pts">
                        {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                          <li key={i}>{line.replace(/^[•\-\*]\s*/, '')}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
          <aside className="sd-inner">
            {education.length > 0 && (
              <div className="ss-box">
                <div className="ss-t">Education</div>
                {education.map(edu => (
                  <div className="edu-e" key={edu.id}>
                    <div className="edu-y">{edu.startDate} – {edu.endDate}</div>
                    <div className="edu-d">{edu.degree}</div>
                    <div className="edu-s">{edu.school}</div>
                  </div>
                ))}
              </div>
            )}
            {skills.length > 0 && (
              <div className="ss-box">
                <div className="ss-t">Expertise</div>
                {skills.map(s => <span className="sk-tg" key={s.id}>{s.name}</span>)}
              </div>
            )}
          </aside>
        </div>
      </div>
    );
  }

  // 3. Architect
  if (templateId === "premium-3") {
    return (
      <div id="t3" className="w-[794px] min-h-[1123px] bg-[#FAFAFA] shadow-2xl grid grid-cols-[6px_200px_1fr]" style={{ ['--a' as any]: themeColor }}>
        <style dangerouslySetInnerHTML={{ __html: `
          #t3 .stripe { background:var(--a); }
          #t3 .sb-arch { background:#F2F2F2; padding:40px 20px 36px 22px; border-right:1px solid #E5E5E5; }
          #t3 .ph-sq { width:100%; aspect-ratio:1; background:#E0E0E0; display:flex; align-items:center; justify-content:center; margin-bottom:18px; position:relative; overflow:hidden; }
          #t3 .ph-sq::after { content:''; position:absolute; bottom:0; left:0; width:100%; height:3px; background:var(--a); }
          #t3 .ph-lt { font-family:'Playfair Display',serif; font-size:34px; color:#BBB; font-weight:700; }
          #t3 .cv-n { font-family:'Playfair Display',serif; font-size:19px; font-weight:700; color:#1C1C1C; line-height:1.2; margin-bottom:3px; }
          #t3 .cv-r { font-size:9px; color:var(--a); letter-spacing:2px; text-transform:uppercase; font-weight:500; margin-bottom:16px; }
          #t3 .sb-bl { margin-bottom:18px; }
          #t3 .sb-hd { font-size:8px; font-weight:600; letter-spacing:2px; text-transform:uppercase; color:var(--a); margin-bottom:9px; padding-bottom:4px; border-bottom:1px solid #DDD; }
          #t3 .cr-arch { font-size:10px; color:#555; line-height:1.45; margin-bottom:6px; display:flex; gap:5px; }
          #t3 .cr-lb { font-size:8px; font-weight:700; color:var(--a); text-transform:uppercase; letter-spacing:.4px; min-width:32px; }
          #t3 .edu-dg { font-size:10.5px; font-weight:500; color:#1C1C1C; line-height:1.3; }
          #t3 .edu-sc { font-size:9.5px; color:#777; }
          #t3 .edu-yr { font-size:9px; color:var(--a); font-weight:500; margin-top:1px; }
          #t3 .sl-r-arch { display:flex; justify-content:space-between; align-items:center; margin-bottom: 5px; }
          #t3 .sl-n { font-size:10px; color:#555; }
          #t3 .sl-b { width:55px; height:2.5px; background:#DDD; border-radius:1px; }
          #t3 .sl-f { height:100%; background:var(--a); border-radius:1px; }
          #t3 .mn-arch { padding:40px 40px 32px 32px; }
          #t3 .sh-arch { font-family:'Playfair Display',serif; font-size:16px; font-weight:700; color:#1C1C1C; margin-bottom:2px; display:flex; align-items:baseline; gap:8px; }
          #t3 .sh-arch::after { content:''; flex:1; height:1px; background:#E0E0E0; margin-left:4px; }
          #t3 .sh-ac { width:20px; height:2px; background:var(--a); margin-bottom:12px; }
          #t3 .sec-arch { margin-bottom:20px; }
          #t3 .pr-arch { font-size:11.5px; line-height:1.78; color:#555; font-weight:300; }
          #t3 .jb-arch { margin-bottom:14px; }
          #t3 .jb-t { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:1px; }
          #t3 .jb-ro { font-size:12px; font-weight:500; color:#1C1C1C; }
          #t3 .jb-dt { font-size:9.5px; color:var(--a); font-weight:500; background:rgba(var(--a-rgb),.07); padding:1px 6px; border-radius:2px; }
          #t3 .jb-co { font-family:'Playfair Display',serif; font-style:italic; font-size:11.5px; color:#888; margin-bottom:4px; }
          #t3 .jb-pt { padding-left:12px; list-style: none; }
          #t3 .jb-pt li { font-size:10.5px; color:#555; line-height:1.6; margin-bottom:2px; font-weight:300; position: relative; padding-left: 10px; }
          #t3 .jb-pt li::before { content: '•'; position: absolute; left: 0; color: var(--a); }
          #t3 .cps-arch { display:flex; flex-wrap:wrap; gap:4px; }
          #t3 .cp-arch { font-size:9.5px; color:#555; background:#EFEFEF; border-radius:2px; padding:3px 8px; font-weight:500; }
        `}} />
        <div className="stripe"></div>
        <aside className="sb-arch">
          <div className="ph-sq">
            {personal.photoUrl ? (
              <img src={personal.photoUrl} alt="" className="w-full h-full object-cover" />
            ) : (
              <span className="ph-lt">{personal.fullName.charAt(0)}</span>
            )}
          </div>
          <div className="cv-n">{personal.fullName.split(' ')[0]}<br/>{personal.fullName.split(' ').slice(1).join(' ')}</div>
          <div className="cv-r">{personal.jobTitle}</div>
          <div className="sb-bl">
            <div className="sb-hd">Contact</div>
            {personal.email && <div className="cr-arch"><span className="cr-lb">Email</span>{personal.email}</div>}
            {personal.phone && <div className="cr-arch"><span className="cr-lb">Phone</span>{personal.phone}</div>}
            {personal.location && <div className="cr-arch"><span className="cr-lb">City</span>{personal.location}</div>}
            {personal.website && <div className="cr-arch"><span className="cr-lb">Web</span>{personal.website.replace(/^https?:\/\//, '')}</div>}
          </div>
          {education.length > 0 && (
            <div className="sb-bl">
              <div className="sb-hd">Education</div>
              {education.map(edu => (
                <div className="edu-e" key={edu.id}>
                  <div className="edu-dg">{edu.degree}</div>
                  <div className="edu-sc">{edu.school}</div>
                  <div className="edu-yr">{edu.startDate} – {edu.endDate}</div>
                </div>
              ))}
            </div>
          )}
          {skills.length > 0 && (
            <div className="sb-bl">
              <div className="sb-hd">Expertise</div>
              {skills.map(s => (
                <div className="sl-r-arch" key={s.id}>
                  <span className="sl-n">{s.name}</span>
                  <div className="sl-b"><div className="sl-f" style={{ width: s.level || '85%' }}></div></div>
                </div>
              ))}
            </div>
          )}
        </aside>
        <main className="mn-arch">
          {summary && (
            <div className="sec-arch">
              <div className="sh-arch">Profile</div>
              <div className="sh-ac"></div>
              <p className="pr-arch">{summary}</p>
            </div>
          )}
          {experience.length > 0 && (
            <div className="sec-arch">
              <div className="sh-arch">Experience</div>
              <div className="sh-ac"></div>
              {experience.map(exp => (
                <div className="jb-arch" key={exp.id}>
                  <div className="jb-t">
                    <div className="jb-ro">{exp.title}</div>
                    <div className="jb-dt" style={{ backgroundColor: `${themeColor}12` }}>{exp.startDate} – {exp.current ? "Now" : exp.endDate}</div>
                  </div>
                  <div className="jb-co">{exp.company}</div>
                  <ul className="jb-pt">
                    {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                      <li key={i}>{line.replace(/^[•\-\*]\s*/, '')}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
          {skills.length > 5 && (
             <div className="sec-arch">
                <div className="sh-arch">Competencies</div>
                <div className="sh-ac"></div>
                <div className="cps-arch">
                   {skills.map(s => <span className="cp-arch" key={s.id}>{s.name}</span>)}
                </div>
             </div>
          )}
        </main>
      </div>
    );
  }

  // 4. Gradient Modern
  if (templateId === "premium-4") {
    return (
      <div id="t4" className="w-[794px] min-h-[1123px] bg-[#F7F8FC] shadow-2xl flex flex-col overflow-hidden" style={{ 
        ['--g1' as any]: '#0F2027',
        ['--g2' as any]: '#203A43',
        ['--g3' as any]: '#2C5364',
        ['--ac' as any]: themeColor 
      }}>
        <style dangerouslySetInnerHTML={{ __html: `
          #t4 .hd { background:linear-gradient(135deg, var(--g1), var(--g2), var(--g3)); padding:40px 50px; position:relative; overflow:hidden; }
          #t4 .hd::before { content:''; position:absolute; top:-50px; right:-50px; width:200px; height:200px; background:rgba(255,255,255,.03); border-radius:50%; }
          #t4 .h-nm { font-family:'Plus Jakarta Sans',sans-serif; font-size:38px; font-weight:800; color:#fff; line-height:1; letter-spacing:-1px; }
          #t4 .h-nm span { color:var(--ac); }
          #t4 .h-sub { font-size:11px; font-weight:600; color:rgba(255,255,255,.5); letter-spacing:3px; text-transform:uppercase; margin-top:8px; display:flex; align-items:center; gap:10px; }
          #t4 .h-sub::after { content:''; height:1px; width:40px; background:var(--ac); }
          #t4 .h-rt { margin-top:24px; display:flex; flex-wrap:wrap; gap:15px; }
          #t4 .hc { font-size:11px; color:rgba(255,255,255,.7); display:flex; align-items:center; gap:6px; }
          #t4 .fc { background:#fff; padding:20px 50px; display:flex; justify-content:space-between; align-items:center; box-shadow:0 10px 30px rgba(0,0,0,.04); z-index:10; }
          #t4 .fc-st { text-align:center; }
          #t4 .fc-n { font-family:'Plus Jakarta Sans',sans-serif; font-size:22px; font-weight:800; color:#1A1A1A; line-height:1; }
          #t4 .fc-n span { color:var(--ac); }
          #t4 .fc-l { font-size:9px; font-weight:600; color:#999; text-transform:uppercase; letter-spacing:1px; margin-top:4px; }
          #t4 .fc-dv { width:1px; height:30px; background:#EEE; }
          #t4 .bd { display:grid; grid-template-columns:1fr 240px; flex:1; }
          #t4 .mn { padding:32px 40px 32px 50px; }
          #t4 .sec { margin-bottom:24px; }
          #t4 .sc-t { font-family:'Plus Jakarta Sans',sans-serif; font-size:10px; font-weight:800; letter-spacing:2.5px; text-transform:uppercase; color:#1A1A1A; margin-bottom:14px; display:flex; align-items:center; gap:10px; }
          #t4 .sc-t::before { content:''; width:4px; height:14px; background:var(--ac); border-radius:2px; }
          #t4 .ab { font-size:12px; line-height:1.75; color:#555; }
          #t4 .jc { background:#fff; border-radius:12px; padding:18px; margin-bottom:12px; border:1px solid #F0F0F0; transition:all .3s; }
          #t4 .jc-t { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:4px; }
          #t4 .jc-r { font-size:13px; font-weight:700; color:#1A1A1A; }
          #t4 .jc-d { font-size:9.5px; font-weight:700; color:var(--ac); }
          #t4 .jc-c { font-size:11px; color:#888; font-weight:500; margin-bottom:8px; }
          #t4 .jc-p { padding-left:14px; list-style: none; }
          #t4 .jc-p li { font-size:11px; color:#666; line-height:1.6; margin-bottom:4px; position:relative; }
          #t4 .jc-p li::before { content:'•'; position:absolute; left:-14px; color:var(--ac); font-weight:800; }
          #t4 .sd { background:#F1F3F9; padding:32px 30px; }
          #t4 .ss-t { font-family:'Plus Jakarta Sans',sans-serif; font-size:9px; font-weight:800; letter-spacing:2px; text-transform:uppercase; color:#1A1A1A; margin-bottom:12px; }
          #t4 .e-e { margin-bottom:14px; }
          #t4 .e-d { font-size:12px; font-weight:700; color:#1A1A1A; line-height:1.3; }
          #t4 .e-s { font-size:10.5px; color:#777; margin:2px 0; }
          #t4 .e-y { font-size:9.5px; font-weight:700; color:var(--ac); }
          #t4 .sk-wp { display:flex; flex-wrap:wrap; gap:6px; }
          #t4 .sk-p { font-size:10px; font-weight:600; padding:4px 10px; background:#fff; border-radius:6px; color:#444; border:1px solid #E5E7EB; }
        `}} />
        <header className="hd">
          <div className="h-nm">{personal.fullName.split(' ')[0]} <span>{personal.fullName.split(' ').slice(1).join(' ')}</span></div>
          <div className="h-sub">{personal.jobTitle}</div>
          <div className="h-rt">
            {personal.email && <div className="hc"><Mail size={12} /> {personal.email}</div>}
            {personal.phone && <div className="hc"><Phone size={12} /> {personal.phone}</div>}
            {personal.location && <div className="hc"><MapPin size={12} /> {personal.location}</div>}
            {personal.website && <div className="hc"><Globe size={12} /> {personal.website.replace(/^https?:\/\//, '')}</div>}
          </div>
        </header>
        <div className="fc">
           <div className="fc-st"><div className="fc-n">{experience.length}<span>+</span></div><div className="fc-l">Roles</div></div>
           <div className="fc-dv"></div>
           <div className="fc-st"><div className="fc-n">{skills.length}</div><div className="fc-l">Skills</div></div>
           <div className="fc-dv"></div>
           <div className="fc-st"><div className="fc-n">100<span>%</span></div><div className="fc-l">Commitment</div></div>
        </div>
        <div className="bd">
          <main className="mn">
            {summary && (
              <section className="sec">
                <div className="sc-t">Professional Profile</div>
                <p className="ab">{summary}</p>
              </section>
            )}
            {experience.length > 0 && (
              <section className="sec">
                <div className="sc-t">Work History</div>
                {experience.map(exp => (
                  <div className="jc" key={exp.id}>
                    <div className="jc-t">
                      <div className="jc-r">{exp.title}</div>
                      <div className="jc-d">{exp.startDate} – {exp.current ? "Now" : exp.endDate}</div>
                    </div>
                    <div className="jc-c">{exp.company}</div>
                    <ul className="jc-p">
                      {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                        <li key={i}>{line.replace(/^[•\-\*]\s*/, '')}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            )}
          </main>
          <aside className="sd">
            {education.length > 0 && (
              <div className="ss">
                <div className="ss-t">Education</div>
                {education.map(edu => (
                  <div className="e-e" key={edu.id}>
                    <div className="e-d">{edu.degree}</div>
                    <div className="e-s">{edu.school}</div>
                    <div className="e-y">{edu.startDate} – {edu.endDate}</div>
                  </div>
                ))}
              </div>
            )}
            {skills.length > 0 && (
              <div className="ss">
                <div className="ss-t">Core Skills</div>
                <div className="sk-wp">
                  {skills.map(s => <span className="sk-p" key={s.id}>{s.name}</span>)}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    );
  }

  // 5. Timeline Pro
  if (templateId === "premium-5") {
    return (
      <div id="t5" className="w-[794px] min-h-[1123px] bg-white shadow-2xl grid grid-cols-[250px_1fr] overflow-hidden" style={{ 
        ['--p' as any]: themeColor,
        ['--pk' as any]: `${themeColor}12`
      }}>
        <style dangerouslySetInnerHTML={{ __html: `
          #t5 .sb { background:#111827; padding:40px 24px; color:#fff; display:flex; flex-direction:column; gap:24px; }
          #t5 .av { width:100px; height:100px; border-radius:50%; border:3px solid var(--p); margin:0 auto 12px; background:rgba(255,255,255,.05); display:flex; align-items:center; justify-content:center; overflow:hidden; }
          #t5 .av-i { font-family:'Barlow',sans-serif; font-size:36px; color:var(--p); font-weight:700; }
          #t5 .sb-nm { font-family:'Barlow',sans-serif; font-size:24px; font-weight:700; text-align:center; line-height:1.1; }
          #t5 .sb-ro { font-size:9.5px; color:var(--p); text-transform:uppercase; letter-spacing:2px; text-align:center; margin-top:6px; font-weight:600; }
          #t5 .s-h { font-size:8px; font-weight:700; letter-spacing:2.5px; text-transform:uppercase; color:rgba(255,255,255,.3); margin-bottom:12px; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:4px; }
          #t5 .ci { font-size:10.5px; color:rgba(255,255,255,.65); margin-bottom:8px; display:flex; gap:8px; }
          #t5 .ci-d { width:4px; height:4px; border-radius:50%; background:var(--p); margin-top:6px; flex-shrink:0; }
          #t5 .pr-r { margin-bottom:10px; }
          #t5 .pr-t { display:flex; justify-content:space-between; font-size:10px; color:rgba(255,255,255,.7); margin-bottom:4px; }
          #t5 .pr-p { font-size:8.5px; color:var(--p); }
          #t5 .pr-tr { height:2px; background:rgba(255,255,255,.1); border-radius:1px; }
          #t5 .pr-fi { height:100%; background:var(--p); border-radius:1px; }
          #t5 .mn { padding:44px 38px 32px 34px; background:#fff; }
          #t5 .m-hd { margin-bottom:28px; }
          #t5 .m-nm { font-family:'Barlow',sans-serif; font-size:36px; font-weight:800; color:#111827; line-height:1; }
          #t5 .m-nm em { font-style:normal; color:var(--p); }
          #t5 .m-ti { font-size:11px; color:#6B7280; letter-spacing:1.5px; text-transform:uppercase; margin-top:8px; font-weight:600; }
          #t5 .m-sum { font-size:12px; line-height:1.75; color:#4B5563; margin-top:12px; }
          #t5 .sc-l { font-family:'Barlow',sans-serif; font-size:13px; font-weight:800; color:#111827; text-transform:uppercase; letter-spacing:3px; margin-bottom:20px; display:flex; align-items:center; gap:10px; }
          #t5 .sc-l::after { content:''; flex:1; height:1px; background:#E5E7EB; }
          #t5 .tl { position:relative; padding-left:24px; }
          #t5 .tl::before { content:''; position:absolute; left:0; top:8px; bottom:0; width:1px; background:#E5E7EB; }
          #t5 .tl-i { position:relative; margin-bottom:20px; }
          #t5 .tl-dt { position:absolute; left:-28.5px; top:6px; width:10px; height:10px; border-radius:50%; background:#fff; border:2px solid #E5E7EB; }
          #t5 .tl-dt.f { border-color:var(--p); background:var(--p); }
          #t5 .tl-tp { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:3px; }
          #t5 .tl-ro { font-size:13px; font-weight:700; color:#111827; }
          #t5 .tl-da { font-size:10px; font-weight:700; color:var(--p); }
          #t5 .tl-co { font-size:11px; color:#6B7280; font-weight:600; margin-bottom:6px; }
          #t5 .tl-pt { padding-left:0; list-style: none; }
          #t5 .tl-pt li { font-size:11px; color:#4B5563; line-height:1.6; margin-bottom:4px; position:relative; padding-left:14px; }
          #t5 .tl-pt li::before { content:'›'; position:absolute; left:0; color:var(--p); font-weight:800; font-size:14px; line-height:1; top:-1px; }
          #t5 .eg { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
          #t5 .ec-d { font-size:12px; font-weight:700; color:#111827; }
          #t5 .ec-s { font-size:10.5px; color:#6B7280; margin:2px 0; }
          #t5 .ec-y { font-size:10px; font-weight:700; color:var(--p); }
          #t5 .sk-rw { display:flex; flex-wrap:wrap; gap:6px; }
          #t5 .sk { font-size:10.5px; font-weight:600; padding:4px 12px; background:var(--pk); color:var(--p); border-radius:4px; }
        `}} />
        <aside className="sb">
          <div className="sb-top">
             <div className="av">
               {personal.photoUrl ? (
                 <img src={personal.photoUrl} alt="" className="w-full h-full object-cover" />
               ) : (
                 <span className="av-i">{personal.fullName.charAt(0)}</span>
               )}
             </div>
             <div className="sb-nm">{personal.fullName.split(' ')[0]}<br/>{personal.fullName.split(' ').slice(1).join(' ')}</div>
             <div className="sb-ro">{personal.jobTitle}</div>
          </div>
          <div className="sb-bd">
             <div className="s-h">Contact</div>
             {personal.email && <div className="ci"><div className="ci-d"></div>{personal.email}</div>}
             {personal.phone && <div className="ci"><div className="ci-d"></div>{personal.phone}</div>}
             {personal.location && <div className="ci"><div className="ci-d"></div>{personal.location}</div>}
             {personal.website && <div className="ci"><div className="ci-d"></div>{personal.website.replace(/^https?:\/\//, '')}</div>}
          </div>
          {skills.length > 0 && (
            <div className="sb-bd">
              <div className="s-h">Proficiency</div>
              {skills.slice(0, 5).map(s => (
                <div className="pr-r" key={s.id}>
                  <div className="pr-t"><span>{s.name}</span><span className="pr-p">{s.level || '85%'}</span></div>
                  <div className="pr-tr"><div className="pr-fi" style={{ width: s.level || '85%' }}></div></div>
                </div>
              ))}
            </div>
          )}
        </aside>
        <main className="mn">
          <div className="m-hd">
             <div className="m-nm">{personal.fullName.split(' ')[0]} <em>{personal.fullName.split(' ').slice(1).join(' ')}</em></div>
             <div className="m-ti">{personal.jobTitle}</div>
             {summary && <p className="m-sum">{summary}</p>}
          </div>

          {experience.length > 0 && (
            <section className="sec">
              <div className="sc-l">Experience</div>
              <div className="tl">
                {experience.map((exp, idx) => (
                  <div className="tl-i" key={exp.id}>
                    <div className={`tl-dt ${idx === 0 ? 'f' : ''}`}></div>
                    <div className="tl-tp">
                      <div className="tl-ro">{exp.title}</div>
                      <div className="tl-da">{exp.startDate} – {exp.current ? "Present" : exp.endDate}</div>
                    </div>
                    <div className="tl-co">{exp.company}</div>
                    <ul className="tl-pt">
                      {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                        <li key={i}>{line.replace(/^[•\-\*]\s*/, '')}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section className="sec">
              <div className="sc-l">Education</div>
              <div className="eg">
                {education.map(edu => (
                  <div className="ec" key={edu.id}>
                    <div className="ec-d">{edu.degree}</div>
                    <div className="ec-s">{edu.school}</div>
                    <div className="ec-y">{edu.startDate} – {edu.endDate}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    );
  }

  // 6. Minimal Ink
  if (templateId === "premium-6") {
    return (
      <div id="t6" className="w-[794px] min-h-[1123px] bg-[#FFFEF9] shadow-2xl flex flex-col pt-0" style={{ ['--a' as any]: themeColor }}>
        <style dangerouslySetInnerHTML={{ __html: `
          #t6 .hd { padding:50px 60px 30px; border-bottom:1px solid #EEE; }
          #t6 .cv-n { font-family:'Playfair Display',serif; font-size:44px; font-weight:700; color:#111; line-height:1; margin-bottom:10px; }
          #t6 .cv-n span { color:var(--a); }
          #t6 .h-rt { display:flex; flex-wrap:wrap; gap:20px; margin-top:15px; }
          #t6 .cl { font-size:11px; color:#666; display:flex; align-items:center; gap:6px; }
          #t6 .cv-ti { font-size:11px; font-weight:600; color:var(--a); letter-spacing:2px; text-transform:uppercase; margin-bottom:4px; }
          #t6 .bd { display:grid; grid-template-columns:1fr 200px; flex:1; }
          #t6 .main { padding:30px 40px 32px 60px; border-right:1px solid #EEE; }
          #t6 .sec { margin-bottom:24px; }
          #t6 .sh { font-family:'Playfair Display',serif; font-size:16px; font-weight:700; color:#111; margin-bottom:14px; position:relative; }
          #t6 .sh span { color:var(--a); font-style:italic; margin-right:8px; }
          #t6 .pp { font-size:12px; line-height:1.8; color:#444; }
          #t6 .jb { margin-bottom:18px; }
          #t6 .jt { display:flex; justify-content:space-between; align-items:baseline; margin-bottom:2px; }
          #t6 .jr { font-size:13px; font-weight:700; color:#111; }
          #t6 .jd { font-size:11px; color:var(--a); font-weight:500; }
          #t6 .jco { font-size:11.5px; color:#888; margin-bottom:6px; }
          #t6 .jpt { padding-left:14px; list-style: none; }
          #t6 .jpt li { font-size:11px; color:#444; line-height:1.7; margin-bottom:4px; position:relative; }
          #t6 .jpt li::before { content:'•'; position:absolute; left:-14px; color:var(--a); }
          #t6 .cp-wr { display:flex; flex-wrap:wrap; gap:6px; }
          #t6 .cp { font-size:10.5px; color:#555; background:#F5F5F0; padding:4px 10px; border-radius:2px; }
          #t6 .sd { background:#FFFEF9; padding:30px 30px 32px 25px; }
          #t6 .sb { margin-bottom:24px; }
          #t6 .sb-t { font-size:9px; font-weight:800; letter-spacing:2px; text-transform:uppercase; color:#AAA; margin-bottom:12px; }
          #t6 .ee { margin-bottom:14px; }
          #t6 .ee-d { font-size:11.5px; font-weight:700; color:#111; line-height:1.3; }
          #t6 .ee-s { font-size:10.5px; color:#777; margin:2px 0; }
          #t6 .ee-y { font-size:10px; color:var(--a); font-weight:600; }
          #t6 .ce { font-size:10.5px; color:#555; margin-bottom:6px; display:flex; gap:6px; }
          #t6 .ce::before { content:'✓'; color:var(--a); }
          #t6 .sk { font-size:11px; color:#555; margin-bottom:5px; }
          #t6 .lr { display:flex; justify-content:space-between; margin-bottom:5px; }
          #t6 .ln { font-size:11px; color:#444; }
          #t6 .ll { font-size:10px; color:#AAA; }
        `}} />
        <header className="hd">
          <div className="cv-n">{personal.fullName.split(' ')[0]} <span>{personal.fullName.split(' ').slice(1).join(' ')}</span></div>
          <div className="h-rt">
            {personal.email && <div className="cl">{personal.email}</div>}
            {personal.phone && <div className="cl">{personal.phone}</div>}
            {personal.location && <div className="cl">{personal.location}</div>}
            {personal.website && <div className="cl">{personal.website.replace(/^https?:\/\//, '')}</div>}
          </div>
        </header>
        <div className="bd">
          <main className="main">
            {summary && (
              <section className="sec">
                <div className="sh"><span>§</span> Profile</div>
                <p className="pp">{summary}</p>
              </section>
            )}
            {experience.length > 0 && (
              <section className="sec">
                <div className="sh"><span>§</span> Experience</div>
                {experience.map(exp => (
                  <div className="jb" key={exp.id}>
                    <div className="jt">
                      <div className="jr">{exp.title}</div>
                      <div className="jd">{exp.startDate} – {exp.current ? "Present" : exp.endDate}</div>
                    </div>
                    <div className="jco">{exp.company}</div>
                    <ul className="jpt">
                      {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                        <li key={i}>{line.replace(/^[•\-\*]\s*/, '')}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            )}
            {skills.length > 5 && (
              <section className="sec">
                <div className="sh"><span>§</span> Competencies</div>
                <div className="cp-wr">
                  {skills.map(s => <span className="cp" key={s.id}>{s.name}</span>)}
                </div>
              </section>
            )}
          </main>
          <aside className="sd">
            {education.length > 0 && (
              <div className="sb">
                <div className="sb-t">Education</div>
                {education.map(edu => (
                  <div className="ee" key={edu.id}>
                    <div className="ee-d">{edu.degree}</div>
                    <div className="ee-s">{edu.school}</div>
                    <div className="ee-y">{edu.startDate} – {edu.endDate}</div>
                  </div>
                ))}
              </div>
            )}
            {skills.length > 0 && (
               <div className="sb">
                  <div className="sb-t">Skills</div>
                  {skills.slice(0, 10).map(s => <div className="sk" key={s.id}>{s.name}</div>)}
               </div>
            )}
          </aside>
        </div>
      </div>
    );
  }

  // 7. Horizon
  if (templateId === "premium-7") {
    return (
      <div id="t7" className="w-[794px] min-h-[1123px] bg-[#F9FAFB] shadow-2xl flex flex-col overflow-hidden" style={{ 
        ['--h' as any]: themeColor,
        ['--hl' as any]: `${themeColor}12`
      }}>
        <style dangerouslySetInnerHTML={{ __html: `
          #t7 .hd { background:#1C2B3A; padding:32px 46px; display:flex; justify-content:space-between; align-items:center; position:relative; overflow:hidden; }
          #t7 .hd::before { content:''; position:absolute; right:-36px; top:-36px; width:160px; height:160px; border-radius:50%; background:rgba(255,255,255,.03); }
          #t7 .h-ph { width:70px; height:70px; border-radius:50%; border:2px solid var(--h); background:rgba(255,255,255,.05); display:flex; align-items:center; justify-content:center; overflow:hidden; flex-shrink:0; }
          #t7 .h-i { font-size:24px; color:rgba(255,255,255,.3); font-family:'Playfair Display',serif; }
          #t7 .h-md { flex:1; padding:0 24px; }
          #t7 .cv-n { font-family:'Lora',serif; font-size:30px; font-weight:700; color:#fff; line-height:1.1; }
          #t7 .cv-n span { color:var(--h); }
          #t7 .cv-ti { font-size:10px; color:rgba(255,255,255,.4); letter-spacing:2px; text-transform:uppercase; margin-top:4px; font-weight:600; }
          #t7 .h-ct { display:flex; flex-direction:column; gap:4px; align-items:flex-end; }
          #t7 .hc { font-size:10.5px; color:rgba(255,255,255,.5); }
          #t7 .ac-s { height:4px; background:linear-gradient(90deg, var(--h), transparent); }
          #t7 .bd { display:grid; grid-template-columns:1fr 220px; flex:1; }
          #t7 .mn { padding:30px 32px 30px 46px; }
          #t7 .sec { margin-bottom:24px; }
          #t7 .sc-h { font-size:10px; font-weight:800; letter-spacing:2.5px; text-transform:uppercase; color:var(--h); margin-bottom:14px; display:flex; align-items:center; gap:10px; }
          #t7 .sc-h::after { content:''; flex:1; height:1px; background:#E5E7EB; }
          #t7 .pt { font-size:12px; line-height:1.8; color:#4B5563; }
          #t7 .jb { display:grid; grid-template-columns:70px 1fr; gap:0 18px; margin-bottom:16px; }
          #t7 .jb-l { text-align:right; padding-top:2px; }
          #t7 .jb-dt { font-size:10px; font-weight:700; color:var(--h); line-height:1.4; }
          #t7 .jb-co { font-size:9.5px; color:#9CA3AF; margin-top:3px; line-height:1.3; font-weight:600; }
          #t7 .jb-r { border-left:2px solid var(--h); padding-left:14px; }
          #t7 .jb-ro { font-size:13.5px; font-weight:700; color:#1C2B3A; margin-bottom:4px; }
          #t7 .jb-p { padding-left:0; list-style: none; }
          #t7 .jb-p li { font-size:11px; color:#555; line-height:1.65; margin-bottom:3px; position:relative; padding-left:12px; }
          #t7 .jb-p li::before { content:'›'; position:absolute; left:0; color:var(--h); font-weight:800; font-size:15px; top:-2px; }
          #t7 .s2c { display:grid; grid-template-columns:1fr 1fr; gap:8px 20px; }
          #t7 .sk-r { display:flex; align-items:center; gap:8px; }
          #t7 .sk-l { font-size:11px; color:#555; min-width:85px; flex-shrink:0; }
          #t7 .sk-b { flex:1; height:3px; background:#E5E7EB; border-radius:2px; }
          #t7 .sk-f { height:100%; background:var(--h); border-radius:2px; }
          #t7 .sd { background:var(--hl); padding:30px 24px 30px 22px; border-left:1px solid rgba(0,0,0,0.05); }
          #t7 .ss { margin-bottom:22px; }
          #t7 .ss-t { font-size:9px; font-weight:800; letter-spacing:2px; text-transform:uppercase; color:var(--h); margin-bottom:12px; padding-bottom:5px; border-bottom:1px solid rgba(0,0,0,0.08); }
          #t7 .e-e { margin-bottom:12px; }
          #t7 .e-d { font-size:12px; font-weight:700; color:#1C2B3A; line-height:1.3; }
          #t7 .e-s { font-size:11px; color:#6B7280; }
          #t7 .e-y { font-size:10px; color:var(--h); font-weight:700; margin-top:1px; }
          #t7 .t-wr { display:flex; flex-wrap:wrap; gap:5px; }
          #t7 .tg { font-size:10px; font-weight:600; padding:3px 9px; background:#fff; border:1px solid #E5E7EB; color:#1C2B3A; border-radius:4px; }
        `}} />
        <header className="hd">
          <div className="h-ph">
            {personal.photoUrl ? (
              <img src={personal.photoUrl} alt="" className="w-full h-full object-cover" />
            ) : (
              <span className="h-i">{personal.fullName.charAt(0)}</span>
            )}
          </div>
          <div className="h-md">
            <div className="cv-n">{personal.fullName.split(' ')[0]} <span>{personal.fullName.split(' ').slice(1).join(' ')}</span></div>
            <div className="cv-ti">{personal.jobTitle}</div>
          </div>
          <div className="h-ct">
            {personal.email && <div className="hc">{personal.email}</div>}
            {personal.phone && <div className="hc">{personal.phone}</div>}
            {personal.location && <div className="hc">{personal.location}</div>}
            {personal.website && <div className="hc">{personal.website.replace(/^https?:\/\//, '')}</div>}
          </div>
        </header>
        <div className="ac-s"></div>
        <div className="bd">
          <main className="mn">
            {summary && (
              <section className="sec">
                <div className="sc-h">Professional Summary</div>
                <p className="pt">{summary}</p>
              </section>
            )}
            {experience.length > 0 && (
              <section className="sec">
                <div className="sc-h">Experience</div>
                {experience.map(exp => (
                  <div className="jb" key={exp.id}>
                    <div className="jb-l">
                      <div className="jb-dt">{exp.startDate}<br/>{exp.current ? "Now" : exp.endDate}</div>
                      <div className="jb-co">{exp.company}</div>
                    </div>
                    <div className="jb-r">
                      <div className="jb-ro">{exp.title}</div>
                      <ul className="jb-p">
                        {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                          <li key={i}>{line.replace(/^[•\-\*]\s*/, '')}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </section>
            )}
            {skills.length > 0 && (
              <section className="sec">
                <div className="sc-h">Expertise</div>
                <div className="s2c">
                  {skills.slice(0, 8).map(s => (
                    <div className="sk-r" key={s.id}>
                      <span className="sk-l">{s.name}</span>
                      <div className="sk-b"><div className="sk-f" style={{ width: s.level || '85%' }}></div></div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </main>
          <aside className="sd">
            {education.length > 0 && (
              <div className="ss">
                <div className="ss-t">Education</div>
                {education.map(edu => (
                  <div className="e-e" key={edu.id}>
                    <div className="e-d">{edu.degree}</div>
                    <div className="e-s">{edu.school}</div>
                    <div className="e-y">{edu.startDate} – {edu.endDate}</div>
                  </div>
                ))}
              </div>
            )}
            {skills.length > 8 && (
              <div className="ss">
                 <div className="ss-t">More Skills</div>
                 <div className="t-wr">
                    {skills.slice(8).map(s => <span className="tg" key={s.id}>{s.name}</span>)}
                 </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    );
  }

  // 8. Diamond Cut
  if (templateId === "premium-8") {
    return (
      <div id="t8" className="w-[794px] min-h-[1123px] bg-[#FEFEFE] shadow-2xl grid grid-cols-[244px_1fr] overflow-hidden" style={{ 
        ['--p' as any]: themeColor,
        ['--pl' as any]: `${themeColor}12`
      }}>
        <style dangerouslySetInnerHTML={{ __html: `
          #t8 .sb { background:var(--p); padding:42px 24px 38px; display:flex; flex-direction:column; gap:0; position:relative; overflow:hidden; color: #fff; }
          #t8 .sb::before { content:''; position:absolute; bottom:-55px; right:-55px; width:180px; height:180px; border-radius:50%; border:36px solid rgba(255,255,255,.05); }
          #t8 .sb-ph { width:96px; height:96px; border-radius:50%; border:2.5px solid rgba(255,255,255,.3); background:rgba(255,255,255,.1); display:flex; align-items:center; justify-content:center; margin:0 auto 14px; overflow:hidden; }
          #t8 .sb-i { font-family:'Lora',serif; font-size:32px; color:rgba(255,255,255,.45); font-weight:700; }
          #t8 .sb-n { text-align:center; margin-bottom:24px; }
          #t8 .sb-fn { font-family:'Raleway',sans-serif; font-size:20px; font-weight:800; color:#fff; text-transform:uppercase; letter-spacing:.8px; line-height:1.1; }
          #t8 .sb-ro { font-size:8.5px; color:rgba(255,255,255,.5); letter-spacing:2.5px; text-transform:uppercase; margin-top:6px; }
          #t8 .sb-dv { width:26px; height:2px; background:rgba(255,255,255,.28); margin:0 auto 6px; }
          #t8 .sb-s { margin-bottom:20px; }
          #t8 .sb-t { font-size:7.5px; font-weight:700; letter-spacing:2.5px; text-transform:uppercase; color:rgba(255,255,255,.35); margin-bottom:9px; display:flex; align-items:center; gap:5px; }
          #t8 .sb-t::after { content:''; flex:1; height:1px; background:rgba(255,255,255,.1); }
          #t8 .ci { font-size:10.5px; color:rgba(255,255,255,.65); margin-bottom:7px; display:flex; gap:7px; align-items:flex-start; }
          #t8 .ci-ic { width:15px; flex-shrink:0; margin-top:1px; font-size:9.5px; color:rgba(255,255,255,.35); }
          #t8 .e-e { margin-bottom:11px; }
          #t8 .e-d { font-size:11px; font-weight:600; color:#fff; line-height:1.3; }
          #t8 .e-s { font-size:10px; color:rgba(255,255,255,.5); }
          #t8 .e-y { font-size:9.5px; color:rgba(255,255,255,.32); margin-top:1px; }
          #t8 .sk-r { margin-bottom:7px; }
          #t8 .sk-tp { display:flex; justify-content:space-between; font-size:9.5px; color:rgba(255,255,255,.6); margin-bottom:2px; }
          #t8 .sk-pc { font-size:8.5px; color:#fff; opacity:0.8; }
          #t8 .sk-tr { height:2px; background:rgba(255,255,255,.1); border-radius:1px; }
          #t8 .sk-fi { height:100%; background:rgba(255,255,255,.5); border-radius:1px; }
          #t8 .mn { padding:38px 38px 32px 36px; }
          #t8 .m-tp { margin-bottom:20px; padding-bottom:18px; border-bottom:1px solid #EBEBEB; }
          #t8 .m-n { font-family:'Lora',serif; font-size:36px; font-weight:700; color:#18181B; line-height:1; letter-spacing:-.4px; }
          #t8 .m-n em { color:var(--p); font-style:normal; }
          #t8 .m-ti { font-size:10px; color:#888; letter-spacing:2px; text-transform:uppercase; margin-top:5px; }
          #t8 .m-sum { font-size:11px; line-height:1.75; color:#555; margin-top:9px; font-weight:400; }
          #t8 .sec { margin-bottom:18px; }
          #t8 .sc-t { font-size:9px; font-weight:700; letter-spacing:2.5px; text-transform:uppercase; color:var(--p); display:flex; align-items:center; gap:7px; margin-bottom:11px; }
          #t8 .sc-t::after { content:''; flex:1; height:1px; background:#EBEBEB; }
          #t8 .jb { background:var(--pl); border-radius:7px; padding:10px 13px; margin-bottom:8px; }
          #t8 .jt { display:flex; justify-content:space-between; margin-bottom:1px; }
          #t8 .jr { font-size:12.5px; font-weight:700; color:#18181B; }
          #t8 .jd { font-size:9.5px; font-weight:600; color:var(--p); }
          #t8 .jco { font-size:10.5px; color:#888; margin-bottom:4px; font-style:italic; }
          #t8 .jp { padding-left:0; list-style: none; }
          #t8 .jp li { font-size:10.5px; color:#555; line-height:1.6; margin-bottom:2px; padding-left:9px; position:relative; }
          #t8 .jp li::before { content:'▸'; position:absolute; left:0; color:var(--p); font-size:8px; top:1px; }
          #t8 .cps { display:flex; flex-wrap:wrap; gap:4px; }
          #t8 .cp { font-size:10px; padding:3px 9px; background:#F4F4F5; border-radius:4px; color:#444; font-weight:500; }
        `}} />
        <aside className="sb">
          <div className="sb-ph">
            {personal.photoUrl ? (
              <img src={personal.photoUrl} alt="" className="w-full h-full object-cover" />
            ) : (
              <span className="sb-i">{personal.fullName.charAt(0)}</span>
            )}
          </div>
          <div className="sb-n">
            <div className="sb-fn">{personal.fullName}</div>
            <div className="sb-ro">{personal.jobTitle}</div>
          </div>
          <div className="sb-s">
            <div className="sb-t">Contact</div>
            {personal.email && <div className="ci"><div className="ci-ic"><Mail size={10} /></div>{personal.email}</div>}
            {personal.phone && <div className="ci"><div className="ci-ic"><Phone size={10} /></div>{personal.phone}</div>}
            {personal.location && <div className="ci"><div className="ci-ic"><MapPin size={10} /></div>{personal.location}</div>}
          </div>
          {education.length > 0 && (
            <div className="sb-s">
              <div className="sb-t">Education</div>
              {education.map(edu => (
                <div className="e-e" key={edu.id}>
                  <div className="e-d">{edu.degree}</div>
                  <div className="e-s">{edu.school}</div>
                  <div className="e-y">{edu.startDate} – {edu.endDate}</div>
                </div>
              ))}
            </div>
          )}
          {skills.length > 0 && (
            <div className="sb-s">
              <div className="sb-t">Expertise</div>
              {skills.slice(0, 5).map(s => (
                <div className="sk-r" key={s.id}>
                  <div className="sk-tp">
                    <span>{s.name}</span>
                    <span className="sk-pc">{s.level || '85%'}</span>
                  </div>
                  <div className="sk-tr">
                    <div className="sk-fi" style={{ width: s.level || '85%' }}></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </aside>
        <main className="mn">
          <header className="m-tp">
            <div className="m-n">{personal.fullName.split(' ')[0]} <em>{personal.fullName.split(' ').slice(1).join(' ')}</em></div>
            <div className="m-ti">{personal.jobTitle}</div>
            {summary && <p className="m-sum">{summary}</p>}
          </header>

          {experience.length > 0 && (
            <section className="sec">
              <div className="sc-t">Professional Experience</div>
              {experience.map(exp => (
                <div className="jb" key={exp.id}>
                  <div className="jt">
                    <div className="jr">{exp.title}</div>
                    <div className="jd">{exp.startDate} – {exp.current ? "Present" : exp.endDate}</div>
                  </div>
                  <div className="jco">{exp.company}</div>
                  <ul className="jp">
                    {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                      <li key={i}>{line.replace(/^[•\-\*]\s*/, '')}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          )}

          {skills.length > 5 && (
            <section className="sec">
              <div className="sc-t">Additional Skills</div>
              <div className="cps">
                {skills.slice(5).map(s => <span className="cp" key={s.id}>{s.name}</span>)}
              </div>
            </section>
          )}
        </main>
      </div>
    );
  }

  // 9. Mono Block
  if (templateId === "premium-9") {
    return (
      <div id="t9" className="w-[794px] min-h-[1123px] bg-[#FEFEFE] shadow-2xl flex flex-col pt-0" style={{ 
        ['--a' as any]: themeColor,
        ['--al' as any]: `${themeColor}12`
      }}>
        <style dangerouslySetInnerHTML={{ __html: `
          #t9 { font-family:'Space Grotesk',sans-serif; }
          #t9 .hd { padding:32px 50px 26px; display:grid; grid-template-columns:1fr auto; align-items:end; border-bottom:3px solid #0C0C0C; }
          #t9 .cv-n { font-family:'Playfair Display',serif; font-size:48px; font-weight:700; color:#0C0C0C; line-height:.95; letter-spacing:-1.5px; }
          #t9 .cv-n span { display:block; font-size:32px; color:var(--a); letter-spacing:-1px; }
          #t9 .h-rt { text-align:right; display:flex; flex-direction:column; gap:4px; }
          #t9 .cv-ti { font-size:10px; font-weight:600; color:var(--a); letter-spacing:2px; text-transform:uppercase; }
          #t9 .hc { font-size:10.5px; color:#666; }
          #t9 .ss-strip { background:#0C0C0C; padding:10px 50px; display:flex; gap:28px; align-items:center; color: #fff; }
          #t9 .st-item { display:flex; align-items:center; gap:7px; }
          #t9 .st-n { font-size:16px; font-weight:700; color:var(--a); line-height:1; }
          #t9 .st-l { font-size:8.5px; color:rgba(255,255,255,.45); text-transform:uppercase; letter-spacing:.8px; line-height:1.3; }
          #t9 .st-d { width:1px; height:20px; background:rgba(255,255,255,.13); }
          #t9 .bd { display:grid; grid-template-columns:1fr 218px; flex:1; }
          #t9 .mn { padding:24px 32px 28px 50px; border-right:1px solid #E8E8E8; }
          #t9 .sec { margin-bottom:20px; }
          #t9 .sc-hd { display:flex; align-items:flex-end; gap:9px; margin-bottom:11px; }
          #t9 .sc-n { font-size:28px; font-weight:700; color:#EEEEEE; line-height:1; flex-shrink:0; font-family:'Playfair Display',serif; }
          #t9 .sc-t { font-size:9.5px; font-weight:700; letter-spacing:2.5px; text-transform:uppercase; color:#0C0C0C; margin-bottom:3px; }
          #t9 .sc-rl { flex:1; height:1px; background:#E8E8E8; margin-bottom:3px; }
          #t9 .ab { font-size:11.5px; line-height:1.77; color:#444; }
          #t9 .jb { background:var(--al); border:1px solid rgba(0,0,0,0.05); border-left:3px solid var(--a); padding:10px 13px; margin-bottom:8px; }
          #t9 .jt { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:1px; }
          #t9 .jr { font-size:12.5px; font-weight:600; color:#0C0C0C; }
          #t9 .jd { font-size:9.5px; font-weight:600; color:var(--a); }
          #t9 .jco { font-size:11px; color:#888; margin-bottom:4px; }
          #t9 .jp { padding-left:0; list-style: none; }
          #t9 .jp li { font-size:10.5px; color:#555; line-height:1.6; margin-bottom:2px; position:relative; padding-left:12px; }
          #t9 .jp li::before { content:'→'; position:absolute; left:0; color:var(--a); font-size:9.5px; top:1px; }
          #t9 .sd { padding:24px 26px 28px 22px; }
          #t9 .ss2 { margin-bottom:18px; }
          #t9 .ss2-t { font-size:8.5px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:#0C0C0C; border-left:3px solid var(--a); padding-left:7px; margin-bottom:10px; }
          #t9 .e-e { margin-bottom:10px; }
          #t9 .e-d { font-size:12px; font-weight:600; color:#0C0C0C; line-height:1.3; }
          #t9 .e-s { font-size:10.5px; color:#888; }
          #t9 .e-y { font-size:9.5px; color:var(--a); font-weight:600; margin-top:1px; }
          #t9 .sk-gd { display:flex; flex-wrap:wrap; gap:4px; }
          #t9 .sk { font-size:10px; font-weight:600; padding:3px 9px; border:1px solid #E0E0E0; color:#555; border-radius:3px; }
        `}} />
        <header className="hd">
          <div className="cv-n">{personal.fullName.split(' ')[0]} <span>{personal.fullName.split(' ').slice(1).join(' ')}</span></div>
          <div className="h-rt">
            <div className="cv-ti">{personal.jobTitle}</div>
            {personal.email && <div className="hc">{personal.email}</div>}
            {personal.phone && <div className="hc">{personal.phone}</div>}
          </div>
        </header>
        <div className="ss-strip">
          <div className="st-item">
            <div className="st-n">{experience.length}</div>
            <div className="st-l">Years<br/>Exp.</div>
          </div>
          <div className="st-d"></div>
          <div className="st-item">
            <div className="st-n">{skills.length}</div>
            <div className="st-l">Professional<br/>Skills</div>
          </div>
          <div className="st-d"></div>
          <div className="st-item">
            <div className="st-n">100%</div>
            <div className="st-l">Dedication<br/>Level</div>
          </div>
        </div>
        <div className="bd">
          <main className="mn">
            {summary && (
              <section className="sec">
                <div className="sc-hd"><div className="sc-n">01</div><div className="flex-1">
                  <div className="sc-t">Profile</div><div className="sc-rl"></div>
                </div></div>
                <p className="ab">{summary}</p>
              </section>
            )}
            {experience.length > 0 && (
              <section className="sec">
                <div className="sc-hd"><div className="sc-n">02</div><div className="flex-1">
                  <div className="sc-t">Experience</div><div className="sc-rl"></div>
                </div></div>
                {experience.map(exp => (
                  <div className="jb" key={exp.id}>
                    <div className="jt">
                      <div className="jr">{exp.title}</div>
                      <div className="jd">{exp.startDate} – {exp.current ? "Present" : exp.endDate}</div>
                    </div>
                    <div className="jco">{exp.company}</div>
                    <ul className="jp">
                      {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                        <li key={i}>{line.replace(/^[•\-\*]\s*/, '')}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            )}
          </main>
          <aside className="sd">
            {education.length > 0 && (
              <div className="ss2">
                <div className="ss2-t">Education</div>
                {education.map(edu => (
                  <div className="e-e" key={edu.id}>
                    <div className="e-d">{edu.degree}</div>
                    <div className="e-s">{edu.school}</div>
                    <div className="e-y">{edu.startDate} – {edu.endDate}</div>
                  </div>
                ))}
              </div>
            )}
            {skills.length > 0 && (
              <div className="ss2">
                <div className="ss2-t">Skills</div>
                <div className="sk-gd">
                  {skills.map(s => <span className="sk" key={s.id}>{s.name}</span>)}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    );
  }

  // 10. Soft Premium
  if (templateId === "premium-10") {
    return (
      <div id="t10" className="w-[794px] min-h-[1123px] bg-[#FDFAF6] shadow-2xl grid grid-cols-[230px_1fr] overflow-hidden" style={{ 
        ['--a' as any]: themeColor,
        ['--al' as any]: `${themeColor}12`,
        ['--side' as any]: '#F5F0E8'
      }}>
        <style dangerouslySetInnerHTML={{ __html: `
          #t10 { font-family:'Gantari',sans-serif; }
          #t10 .sb { background:var(--side); padding:42px 22px 38px; display:flex; flex-direction:column; gap:22px; border-right:1px solid rgba(0,0,0,0.05); }
          #t10 .sb-ph { width:102px; height:102px; border-radius:50%; border:2px solid var(--a); margin:0 auto; background:rgba(255,255,255,0.2); display:flex; align-items:center; justify-content:center; overflow:hidden; }
          #t10 .sb-i { font-size:34px; color:var(--a); opacity:.45; font-family:'Lora',serif; font-weight:700; }
          #t10 .sb-tp { text-align:center; }
          #t10 .sb-n { font-family:'Lora',serif; font-size:22px; font-weight:700; color:#1C1917; line-height:1.2; }
          #t10 .sb-ro { font-size:8.5px; font-weight:500; color:var(--a); letter-spacing:2px; text-transform:uppercase; margin-top:5px; }
          #t10 .s-bl { }
          #t10 .s-t { font-size:7.5px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:#999; margin-bottom:9px; padding-bottom:4px; border-bottom:1px solid rgba(0,0,0,.07); }
          #t10 .ci { display:flex; gap:7px; align-items:flex-start; margin-bottom:7px; }
          #t10 .ci-l { font-size:8.5px; font-weight:700; color:var(--a); text-transform:uppercase; letter-spacing:.4px; min-width:30px; padding-top:1px; }
          #t10 .ci-v { font-size:10.5px; color:#666; line-height:1.4; }
          #t10 .e-e { margin-bottom:11px; }
          #t10 .e-d { font-size:11px; font-weight:600; color:#1C1917; line-height:1.3; }
          #t10 .e-s { font-size:10.5px; color:#888; font-style:italic; }
          #t10 .e-y { font-size:9.5px; color:var(--a); font-weight:500; margin-top:1px; }
          #t10 .sk-i { display:flex; justify-content:space-between; align-items:center; margin-bottom:7px; }
          #t10 .sk-n { font-size:10.5px; color:#555; }
          #t10 .sk-b { width:62px; height:2.5px; background:rgba(0,0,0,.08); border-radius:1.5px; }
          #t10 .sk-f { height:100%; background:var(--a); border-radius:1.5px; }
          #t10 .la-r { display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; }
          #t10 .l-n { font-size:11px; color:#555; }
          #t10 .l-ps { display:flex; gap:2px; }
          #t10 .lp { width:6.5px; height:6.5px; border-radius:50%; background:rgba(0,0,0,0.1); }
          #t10 .lp.on { background:var(--a); }
          #t10 .mn { padding:38px 40px 32px 34px; }
          #t10 .m-hd { margin-bottom:20px; padding-bottom:16px; border-bottom:1px solid rgba(0,0,0,.07); }
          #t10 .m-n { font-family:'Lora',serif; font-size:38px; font-weight:700; color:#1C1917; line-height:1; letter-spacing:-.4px; }
          #t10 .m-n em { color:var(--a); font-style:italic; }
          #t10 .m-sub { font-size:10px; color:#999; letter-spacing:2px; text-transform:uppercase; margin-top:4px; }
          #t10 .m-tl { font-family:'Lora',serif; font-size:13.5px; color:#777; line-height:1.7; margin-top:9px; font-style:italic; border-left:2px solid var(--a); padding-left:11px; }
          #t10 .sec { margin-bottom:18px; }
          #t10 .sh { font-size:9px; font-weight:700; letter-spacing:2.5px; text-transform:uppercase; color:var(--a); margin-bottom:11px; display:flex; align-items:center; gap:7px; }
          #t10 .sh::after { content:''; flex:1; height:1px; background:rgba(0,0,0,.07); }
          #t10 .jc { border:1px solid rgba(0,0,0,0.05); border-radius:7px; background:var(--al); padding:11px 13px; margin-bottom:8px; }
          #t10 .jt { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:1px; }
          #t10 .jr { font-size:13px; font-weight:600; color:#1C1917; }
          #t10 .jd { font-size:9.5px; font-weight:600; color:var(--a); background:rgba(0,0,0,0.05); padding:1px 7px; border-radius:20px; }
          #t10 .jco { font-family:'Lora',serif; font-style:italic; font-size:12px; color:#999; margin-bottom:5px; }
          #t10 .jp { padding-left:0; list-style: none; }
          #t10 .jp li { font-size:10.5px; color:#555; line-height:1.6; margin-bottom:2px; position:relative; padding-left:12px; }
          #t10 .jp li::before { content:'◦'; position:absolute; left:0; color:var(--a); font-weight:800; }
          #t10 .cps { display:flex; flex-wrap:wrap; gap:4px; }
          #t10 .cp { font-size:10px; padding:3px 10px; background:rgba(0,0,0,0.03); border:1px solid rgba(0,0,0,0.08); color:#1C1917; border-radius:20px; font-weight:500; }
        `}} />
        <aside className="sb">
          <div className="sb-ph">
            {personal.photoUrl ? (
              <img src={personal.photoUrl} alt="" className="w-full h-full object-cover" />
            ) : (
              <span className="sb-i">{personal.fullName.charAt(0)}</span>
            )}
          </div>
          <div className="sb-tp">
            <div className="sb-n">{personal.fullName}</div>
            <div className="sb-ro">{personal.jobTitle}</div>
          </div>
          <div className="s-bl">
            <div className="s-t">Contact</div>
            {personal.email && <div className="ci"><span className="ci-l">Email</span><span className="ci-v">{personal.email}</span></div>}
            {personal.phone && <div className="ci"><span className="ci-l">Phone</span><span className="ci-v">{personal.phone}</span></div>}
            {personal.location && <div className="ci"><span className="ci-l">City</span><span className="ci-v">{personal.location}</span></div>}
          </div>
          {education.length > 0 && (
            <div className="s-bl">
              <div className="s-t">Education</div>
              {education.map(edu => (
                <div className="e-e" key={edu.id}>
                  <div className="e-d">{edu.degree}</div>
                  <div className="e-s">{edu.school}</div>
                  <div className="e-y">{edu.startDate} – {edu.endDate}</div>
                </div>
              ))}
            </div>
          )}
          {skills.length > 0 && (
            <div className="s-bl">
              <div className="s-t">Expertise</div>
              {skills.slice(0, 5).map(s => (
                <div className="sk-i" key={s.id}>
                  <span className="sk-n">{s.name}</span>
                  <div className="sk-b"><div className="sk-f" style={{ width: s.level || '85%' }}></div></div>
                </div>
              ))}
            </div>
          )}
        </aside>
        <main className="mn">
          <header className="m-hd">
            <div className="m-n">{personal.fullName.split(' ')[0]} <em>{personal.fullName.split(' ').slice(1).join(' ')}</em></div>
            <div className="m-ti">{personal.jobTitle}</div>
            {summary && <div className="m-tl">{summary}</div>}
          </header>

          {experience.length > 0 && (
            <section className="sec">
              <div className="sh">Experience</div>
              {experience.map(exp => (
                <div className="jc" key={exp.id}>
                  <div className="jt">
                    <div className="jr">{exp.title}</div>
                    <div className="jd">{exp.startDate} – {exp.current ? "Present" : exp.endDate}</div>
                  </div>
                  <div className="jco">{exp.company}</div>
                  <ul className="jp">
                    {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                      <li key={i}>{line.replace(/^[•\-\*]\s*/, '')}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          )}

          {skills.length > 5 && (
            <section className="sec">
              <div className="sh">Competencies</div>
              <div className="cps">
                {skills.slice(5).map(s => <span className="cp" key={s.id}>{s.name}</span>)}
              </div>
            </section>
          )}
        </main>
      </div>
    );
  }

  return null;
}
