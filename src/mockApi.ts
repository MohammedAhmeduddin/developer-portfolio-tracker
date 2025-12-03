import type { Developer, Skill } from "./types";

// Mock data
let developers: Developer[] = [
  {
    id: 1,
    name: "Ahmeduddin Mohammed",
    email: "ahmed@example.com",
    title: "Full-Stack Engineer",
    bio: "Working on secure user management, AI/ML, and cloud-native apps.",
    location: "Harrison, NJ",
    skills: ["React", "TypeScript", "Python", "SQL", "Docker"],
    yearsExperience: 2,
    githubUrl: "https://github.com/MohammedAhmeduddin",
    linkedinUrl: "https://linkedin.com",
    isProfessional: true,
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jane@example.com",
    title: "Frontend Developer",
    bio: "Loves building clean UIs and design systems.",
    location: "New York, NY",
    skills: ["React", "JavaScript", "TypeScript"],
    yearsExperience: 1,
    isProfessional: false,
  },
];

let nextId = developers.length + 1;


// Mock login
export async function loginMock(email: string, _password: string) {
  const user = developers.find((d) => d.email === email);
  if (!user) throw new Error("Invalid credentials");
  return { user };
}

// Get all developers
export async function getDevelopersMock(): Promise<Developer[]> {
  return developers;
}

// Get single developer
export async function getDeveloperMock(id: number): Promise<Developer | undefined> {
  return developers.find((d) => d.id === id);
}

export async function createDeveloperMock(
  data: Omit<Developer, "id">
): Promise<Developer> {
  const newDev: Developer = {
    ...data,
    id: nextId++,
  };
  developers.push(newDev);
  return newDev;
}

// Update developer
export async function updateDeveloperMock(updated: Developer): Promise<Developer> {
  developers = developers.map((d) => (d.id === updated.id ? updated : d));
  return updated;
}

export async function deleteDeveloperMock(id: number): Promise<void> {
  developers = developers.filter((dev) => dev.id !== id);
}


// Counts of skills for dashboard
export function getSkillCounts(devs: Developer[]): Record<Skill, number> {
  const result = {
    React: 0,
    TypeScript: 0,
    JavaScript: 0,
    Python: 0,
    "Node.js": 0,
    SQL: 0,
    Docker: 0,
  };

  devs.forEach((dev) => {
    dev.skills.forEach((skill) => {
      result[skill] += 1;
    });
  });

  return result;
}
