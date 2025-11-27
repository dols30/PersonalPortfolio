export interface Skill {
  name: string;
  level: number; // 0 to 100
  iconName: string; // Name of the icon to use with lucide-react
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
  iconName: string; // Name of the icon to use with lucide-react
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
