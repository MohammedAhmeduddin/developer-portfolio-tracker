export type Skill =
  | "React"
  | "TypeScript"
  | "JavaScript"
  | "Python"
  | "Node.js"
  | "SQL"
  | "Docker";

export interface Developer {
  id: number;
  name: string;
  email: string;
  title: string;
  bio?: string;
  location?: string;
  skills: Skill[];
  yearsExperience: number;
  githubUrl?: string;
  linkedinUrl?: string;
  isProfessional?: boolean;
}
