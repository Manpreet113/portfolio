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

const API_URL = import.meta.env.PUBLIC_API_URL || "http://0.0.0.0:3001";

export async function getPortfolioData() {
  try {
    const healthRes = await fetch(`${API_URL}/health`).catch(() => null);

    if (!healthRes || !healthRes.ok) {
      throw new Error("System Health Check Failed");
    }

    const [projectsRes, skillsRes] = await Promise.all([
      fetch(`${API_URL}/api/projects`),
      fetch(`${API_URL}/api/skills`)
    ]);

    if (!projectsRes.ok) throw new Error(`Projects API Error: ${projectsRes.statusText}`);

    const projects = await projectsRes.json();
    const skills = skillsRes.ok ? await skillsRes.json() : [];

    return { 
      projects, 
      skills, 
      isOffline: false, 
      error: null 
    };

  } catch (e: any) {
    return { 
      projects: [], 
      skills: [], 
      isOffline: true, 
      error: e.message || "Connection Refused (os error 111)" 
    };
  }
}