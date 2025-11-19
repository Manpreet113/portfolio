import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([
    "Error: 404_ROUTE_NOT_FOUND",
    "The requested resource could not be located in the virtual file system.",
    "Type 'help' for available commands.",
  ]);

  const handleCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    const newHistory = [...history, `visitor@manpreet:~/404$ ${cmd}`];

    switch (cleanCmd) {
      case "help":
        newHistory.push(
          "Available commands:",
          "  ls      - List available pages",
          "  cd home - Return to homepage",
          "  clear   - Clear terminal",
          "  whoami  - Display current user"
        );
        break;
      case "ls":
        newHistory.push("drwxr-xr-x  home/", "drwxr-xr-x  projects/", "drwxr-xr-x  skills/", "drwxr-xr-x  contact/");
        break;
      case "cd home":
      case "cd ..":
      case "cd /":
        newHistory.push("Navigating to home...");
        setTimeout(() => navigate("/"), 800);
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      case "whoami":
        newHistory.push("guest_user (restricted access)");
        break;
      case "sudo rm -rf /":
        newHistory.push("Nice try. Permission denied.");
        break;
      default:
        if (cleanCmd) newHistory.push(`Command not found: ${cleanCmd}`);
    }

    setHistory(newHistory);
    setInput("");
  };

  useEffect(() => {
    const terminal = document.getElementById("terminal-content");
    if (terminal) terminal.scrollTop = terminal.scrollHeight;
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div 
      className="min-h-screen bg-background font-mono p-4 md:p-10 flex flex-col"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="max-w-3xl w-full mx-auto border border-border bg-card/50 rounded-lg shadow-lg flex flex-col flex-1 md:max-h-[600px] overflow-hidden relative">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
          <span className="ml-2 text-xs text-muted-foreground">bash — 80x24</span>
        </div>
        <div 
          id="terminal-content"
          className="flex-1 p-4 overflow-y-auto space-y-2 text-sm md:text-base"
        >
          {history.map((line, i) => (
            <div key={i} className="break-words whitespace-pre-wrap">
              {line.startsWith("Error") ? <span className="text-red-400">{line}</span> : line}
            </div>
          ))}
          
          <div className="flex items-center gap-2">
            <span className="text-green-500">visitor@manpreet:~/404$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCommand(input)}
              className="flex-1 bg-transparent outline-none border-none text-foreground caret-primary"
              autoFocus
              autoComplete="off"
            />
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <Button variant="outline" onClick={() => navigate("/")}>
          GUI Fallback (Go Home)
        </Button>
      </div>
    </div>
  );
};

export default NotFound;