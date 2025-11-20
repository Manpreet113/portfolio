import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import { TechnicalCard } from "./TechnicalCard";
import { api } from "@/lib/api";

interface Project {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  github_url?: string;
  demo_url?: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get("/projects");
        setProjects(response.data);
      } catch (error) {
        console.error("Failed to fetch projects", error);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-4 mb-12">
          <div className="font-mono text-sm text-muted-foreground">
            <span className="text-foreground">$</span> cat projects/README.md
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Small experiments and learning projects. Nothing groundbreaking yet,
            but each one taught me something valuable about engineering and
            problem-solving.
          </p>
        </div>

        <TechnicalCard>
          {projects.map((project) => (
            <div
              key={project.id}
              className="border border-border bg-card p-6 md:p-8 hover:border-foreground/20 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <h3 className="text-2xl font-bold">{project.title}</h3>
                <div className="flex gap-3">
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="View on GitHub"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {project.demo_url && (
                    <a
                      href={project.demo_url}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="View live demo"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tech_stack.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="font-mono text-xs"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </TechnicalCard>
      </div>
    </section>
  );
};

export default Projects;
