import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import { TechnicalCard } from "./TechnicalCard";

const projects = [
  {
    title: "Terminal Portfolio Site",
    description:
      "Built this minimal portfolio using React and TypeScript. Focused on clean design, responsive layout, and semantic HTML. Learning deployment and optimization along the way.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    problem: "Need a professional web presence to showcase projects",
    learned: "Component architecture, responsive design, modern CSS",
    github: "#",
    demo: "#",
  },
  {
    title: "CLI Task Manager",
    description:
      "Python-based command-line tool for managing daily tasks and notes. Implemented file I/O, argument parsing, and basic data persistence. Simple but functional.",
    tech: ["Python", "argparse", "JSON"],
    problem: "Wanted a lightweight task tracker without GUI overhead",
    learned: "CLI design patterns, file handling, user input validation",
    github: "#",
  },
  {
    title: "Algorithm Visualizer",
    description:
      "Interactive web app visualizing sorting algorithms. Helped solidify understanding of time complexity and algorithm behavior through visual representation.",
    tech: ["JavaScript", "Canvas API", "CSS"],
    problem: "Difficulty grasping abstract algorithm concepts",
    learned: "Animation logic, algorithm implementation, visual feedback",
    github: "#",
    demo: "#",
  },
  {
    title: "Rust Systems Experiments",
    description:
      "Learning Rust through small projects: file utilities, basic HTTP parser, memory-safe data structures. Still early in the journey but enjoying the challenge.",
    tech: ["Rust", "Systems Programming"],
    problem: "Want to understand low-level systems and memory management",
    learned: "Ownership model, error handling, performance optimization",
    github: "#",
  },
];

const Projects = () => {
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
          {projects.map((project, index) => (
            <div
              key={index}
              className="border border-border bg-card p-6 md:p-8 hover:border-foreground/20 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <h3 className="text-2xl font-bold">{project.title}</h3>
                <div className="flex gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="View on GitHub"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
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

              <div className="space-y-3 mb-4">
                <div className="flex items-start gap-2">
                  <span className="text-sm font-mono text-muted-foreground min-w-[90px]">
                    Problem:
                  </span>
                  <span className="text-sm">{project.problem}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-sm font-mono text-muted-foreground min-w-[90px]">
                    Learned:
                  </span>
                  <span className="text-sm">{project.learned}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
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
