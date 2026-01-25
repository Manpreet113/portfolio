export type Project = {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  github_url?: string;
  demo_url?: string;
};

export type Skill = {
  id: string;
  name: string;
  category: string;
  proficiency: string;
};

const API_URL = import.meta.env.PUBLIC_API_URL || "http://localhost:8080";

export async function getPortfolioData() {
  try {
    const [projectsRes, skillsRes] = await Promise.all([
      fetch(`${API_URL}/projects`),
      fetch(`${API_URL}/skills`)
    ]);
    const projects = projectsRes.ok ? await projectsRes.json() : [];
    const skills = skillsRes.ok ? await skillsRes.json() : [];

    return { projects, skills, isOffline: !projectsRes.ok };
  } catch (e) {
    console.error("Backend unavailable", e);
    return { projects: [], skills: [], isOffline: true };
  }
}