export interface Skill {
  name: string;
  level: number; // 0 to 100
  icon: string;
  category: "language" | "technology";
  proficiency: "Beginner" | "Intermediate" | "Advanced";
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  githubLink: string;
  liveLink?: string;
  technologies: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface ContactInfo {
  email: string;
  location: string;
  university: string;
}

export interface Stat {
  value: string;
  label: string;
}
