import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Mail } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-24 px-6 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-4 mb-12">
          <div className="font-mono text-sm text-muted-foreground">
            <span className="text-foreground">$</span> ./contact.sh
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Get In Touch
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Open to conversations about technology, projects, learning
            opportunities, or just interesting technical discussions. Always
            happy to connect with fellow engineers and learners.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                required
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="What would you like to discuss?"
                required
                rows={5}
                className="bg-background resize-none"
              />
            </div>

            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>

          {/* Direct Contact Links */}
          <div className="space-y-6">
            <div className="border border-border bg-card p-6">
              <h3 className="text-xl font-semibold mb-4">Direct Contact</h3>
              <div className="space-y-4">
                <a
                  href="https://github.com/manpreet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <Github className="w-5 h-5" />
                  <span className="group-hover:underline">
                    github.com/manpreet
                  </span>
                </a>
                <a
                  href="mailto:manpreet@example.com"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <Mail className="w-5 h-5" />
                  <span className="group-hover:underline">
                    manpreet@example.com
                  </span>
                </a>
              </div>
            </div>

            <div className="border border-border bg-card p-6">
              <h3 className="text-xl font-semibold mb-3">Response Time</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Typically respond within 24-48 hours. Currently managing
                coursework and projects, but I make time for meaningful
                conversations.
              </p>
            </div>

            <div className="border border-border bg-card p-6">
              <h3 className="text-xl font-semibold mb-3">Open To</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>→ Technical discussions</li>
                <li>→ Learning opportunities</li>
                <li>→ Project collaborations</li>
                <li>→ Feedback on my work</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
