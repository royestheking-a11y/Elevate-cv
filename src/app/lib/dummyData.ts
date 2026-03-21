import { CVData } from "../store";

export const DUMMY_CV_DATA: CVData = {
  personal: {
    fullName: "Jonathan Doe",
    jobTitle: "Senior Software Engineer",
    email: "j.doe@example.com",
    phone: "+1 (555) 000-1111",
    website: "www.johndoe.dev",
    location: "New York, USA",
    photoUrl: "", // Keep it empty for generic previews
    photoShape: "circle",
  },
  summary: "Results-driven Senior Software Engineer with 8+ years of experience in building scalable web applications. Expert in React, Node.js, and cloud architecture. Proven track record of leading cross-functional teams and delivering high-impact technical solutions.",
  skills: [
    { id: "s1", name: "React & Next.js", level: "95%" },
    { id: "s2", name: "TypeScript", level: "90%" },
    { id: "s3", name: "Node.js", level: "85%" },
    { id: "s4", name: "AWS / Cloud", level: "80%" },
    { id: "s5", name: "System Design", level: "85%" },
    { id: "s6", name: "Team Leadership", level: "90%" },
  ],
  experience: [
    {
      id: "e1",
      title: "Senior Software Engineer",
      company: "TechCorp Solutions",
      startDate: "2020",
      endDate: "Present",
      current: true,
      description: "Leading the frontend team in architecting a modern SaaS platform using Next.js and GraphQL. Reduced bundle size by 40% and improved lighthouse scores by 25 points."
    },
    {
      id: "e2",
      title: "Full Stack Developer",
      company: "Innovation Lab",
      startDate: "2017",
      endDate: "2020",
      current: false,
      description: "Developed and maintained multiple client-facing applications. Implemented real-time features using WebSockets and optimized database queries for 2x performance gain."
    }
  ],
  education: [
    {
      id: "edu1",
      degree: "B.Sc. in Computer Science",
      school: "Stanford University",
      startDate: "2013",
      endDate: "2017",
      description: "Focused on Software Engineering and Artificial Intelligence."
    }
  ],
  projects: [
    {
      id: "p1",
      name: "OpenEase OS",
      url: "github.com/doe/openease",
      description: "A lightweight open-source operating system written in Rust."
    }
  ]
};
