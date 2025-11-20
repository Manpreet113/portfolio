export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: string;
  icon?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  image_url?: string;
  github_url?: string;
  demo_url?: string;
}
