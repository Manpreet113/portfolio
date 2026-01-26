use worker::*;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct Project {
    id: i32,
    title: String,
    description: String,
    tech_stack: String, 
    github_url: Option<String>,
    demo_url: Option<String>,
}

#[derive(Serialize, Deserialize)]
struct Skill {
    id: i32,
    name: String,
    category: String,
    proficiency: String,
}

#[event(fetch)]
pub async fn main(req: Request, env: Env, _ctx: Context) -> Result<Response> {
    let router = Router::new();

    router
        .get("/", |_, _| Response::ok("System Operational"))
        
        .get("/health", |_, _| Response::ok("OK"))
        
        // PROJECTS
        .get_async("/api/projects", |_, ctx| async move {
            let d1 = ctx.env.d1("DB")?;
            let statement = d1.prepare("SELECT * FROM projects ORDER BY id DESC");
            let result = statement.all().await?;
            let projects: Vec<Project> = result.results()?;
            Response::from_json(&projects)
        })

        // SKILLS
        .get_async("/api/skills", |_, ctx| async move {
            let d1 = ctx.env.d1("DB")?;
            let statement = d1.prepare("SELECT * FROM skills");
            let result = statement.all().await?;
            let skills: Vec<Skill> = result.results()?;
            Response::from_json(&skills)
        })

        .run(req, env)
        .await
}