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

const API_URL = import.meta.env.PUBLIC_API_URL || "http://127.0.0.1:8787";

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

    const rawProjects = await projectsRes.json();
    const projects = rawProjects.map((p: any) => ({
      ...p,
      tech_stack: typeof p.tech_stack === 'string' 
        ? p.tech_stack.split(',') 
        : (p.tech_stack || [])
    }));

    const skills = skillsRes.ok ? await skillsRes.json() : [];

    return { 
      projects, 
      skills, 
      isOffline: false, 
      error: null 
    };

  } catch (e: any) {
    console.error(`[API Error] Failed to fetch from ${API_URL}:`, e.message);
    
    return { 
      projects: [], 
      skills: [], 
      isOffline: true, 
      error: e.cause?.code === 'ECONNREFUSED' 
        ? "Connection Refused - Backend is down" 
        : (e.message || "Unknown Error")
    };
  }
}