import { Code2, Terminal, Globe, GitBranch, Database, Boxes } from "lucide-react";
import { TechnicalCard } from "./TechnicalCard";

const skills = [
  {
    name: "Python",
    icon: Code2,
    status: "Intermediate",
    description: "Backend scripting, data structures, automation",
  },
  {
    name: "Rust",
    icon: Boxes,
    status: "Learning",
    description: "Systems programming, memory safety, performance",
  },
  {
    name: "Web Development",
    icon: Globe,
    status: "Intermediate",
    description: "TypeScript, React, Astro, Tailwind CSS",
  },
  {
    name: "Git & Version Control",
    icon: GitBranch,
    status: "Intermediate",
    description: "GitHub workflows, branching strategies, collaboration",
  },
  {
    name: "Linux & Terminal",
    icon: Terminal,
    status: "Intermediate",
    description: "Command line proficiency, shell scripting, system tools",
  },
  {
    name: "Backend Concepts",
    icon: Database,
    status: "Learning",
    description: "APIs, databases, server-side architecture",
  },
];

const Skills = () => {
  return (
    <section id="skills" className="min-h-screen flex flex-col justify-center py-24 px-6 bg-muted/30 snap-start">
      <div className="max-w-6xl mx-auto w-full">
        <div className="space-y-4 mb-12">
          <div className="font-mono text-sm text-muted-foreground">
            <span className="text-foreground">$</span> ls skills/
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Technical Skills
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Currently building expertise across multiple domains. Honest about
            my learning journey—no pretense of mastery, just consistent
            progress.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <TechnicalCard
              key={skill.name}
              className="group hover:border-foreground/20 transition-all duration-300 bg-card"
            >
              <div className="flex items-start justify-between mb-4">
                <skill.icon className="w-8 h-8 text-foreground" />
                <span className="text-xs font-mono text-muted-foreground px-2 py-1 border border-border">
                  {skill.status}
                </span>
              </div>

              <h3 className="text-lg font-semibold mb-2">{skill.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {skill.description}
              </p>
            </TechnicalCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
