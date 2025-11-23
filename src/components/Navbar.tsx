import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "./ui/theme-toggle";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = ["skills", "projects", "contact"];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-xs border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => scrollToSection("hero")}
            className="text-lg font-semibold tracking-tight hover:opacity-70 transition-opacity"
          >
            Manpreet
          </button>
          {/* Desktop nav links */}
          <div className="hidden md:flex md:gap-8">
            {navLinks.map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground transition-all group-hover:w-full" />
              </button>
            ))}
            <ThemeToggle/>
          </div>
          {/* Mobile nav links */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="pt-16">
                <nav className="grid gap-1 text-center text-lg font-medium">
                  {navLinks.map((section) => (
                    <SheetClose asChild key={section}>
                      <button
                        onClick={() => scrollToSection(section)}
                        className="group relative inline-flex justify-center items-center text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <span className="font-mono text-foreground opacity-0 transition-opacity group-hover:opacity-100 mr-2">
                          {">"}
                        </span>
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-foreground transition-all group-hover:w-1/5" />
                      </button>
                    </SheetClose>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
