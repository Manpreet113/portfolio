DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS skills;

CREATE TABLE projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    tech_stack TEXT NOT NULL,
    image_url TEXT,
    github_url TEXT,
    demo_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    proficiency TEXT NOT NULL,
    icon TEXT
);

INSERT INTO projects (title, description, tech_stack, github_url) 
VALUES ('NoteHole', 'Spatial, intent-driven architecture', 'Rust,Tauri', 'https://github.com/manpreet113/notehole');

INSERT INTO skills (name, category, proficiency) 
VALUES ('Rust', 'Kernel', 'High'), ('Linux', 'Kernel', 'High');