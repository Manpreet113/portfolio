import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-6 pt-16"
    >
      <div className="max-w-4xl w-full">
        <div className="space-y-6">
          {/* Terminal-style prefix */}
          <div className="font-mono text-sm text-muted-foreground">
            <span className="text-foreground">$</span> whoami
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
            Computer Science Student
            <br />
            <span className="text-muted-foreground">
              Aspiring Systems & Backend Engineer
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Building foundational skills in backend development, systems
            programming, and web technologies. Currently exploring Rust, Python,
            and modern web frameworks while maintaining a curious mindset toward
            engineering fundamentals.
          </p>

          {/* Terminal cursor effect */}
          <div className="flex items-center gap-2 font-mono text-sm text-muted-foreground pt-4">
            <span>Status:</span>
            <span className="text-foreground">Learning & Building</span>
            <span className="terminal-cursor">▊</span>
          </div>

          {/* CTA */}
          <div className="pt-6">
            <Button
              onClick={scrollToProjects}
              size="lg"
              className="font-medium"
            >
              View My Projects
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
