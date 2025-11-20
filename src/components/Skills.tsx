import { Code2, Terminal, Globe, GitBranch, Database, Boxes, LucideIcon } from "lucide-react";
import { TechnicalCard } from "./TechnicalCard";
import { api } from "@/lib/api";
import { Skill } from "@/types";
import { useQuery } from "@tanstack/react-query";
import SkillSkeleton from "./SkillSkeleton";

const iconMap: Record<string, LucideIcon> = {
  Code2,
  Terminal,
  Globe,
  GitBranch,
  Database,
  Boxes,
};

const Skills = () => {
  const { data: skills = [], isLoading, isError } = useQuery({
    queryKey: ['skills'],
    queryFn: async () => {
      const response = await api.get("/skills");
      return response.data;
    },
  });

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

        {isLoading && <SkillSkeleton />}

        {isError && (
          <div className="border border-destructive bg-destructive/10 p-6 rounded-lg">
            <div className="font-mono text-sm">
              <p className="text-destructive">$ connection refused</p>
              <p className="text-destructive mt-2">ERROR: Unable to fetch skills. Backend may be offline.</p>
            </div>
          </div>
        )}

        {!isLoading && !isError && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill) => {
              const Icon = (skill.icon && iconMap[skill.icon]) || Terminal;
              return (
                <TechnicalCard
                  key={skill.id}
                  className="group hover:border-foreground/20 transition-all duration-300 bg-card"
                >
                  <div className="flex items-start justify-between mb-4">
                    <Icon className="w-8 h-8 text-foreground" />
                    <span className="text-xs font-mono text-muted-foreground px-2 py-1 border border-border">
                      {skill.proficiency}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold mb-2">{skill.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {skill.category}
                  </p>
                </TechnicalCard>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
