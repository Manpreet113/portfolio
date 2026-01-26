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

fn is_authorized(req: &Request, env: &Env) -> bool {
    let secret = env.secret("ADMIN_SECRET")
        .map(|s| s.to_string())
        .unwrap_or_else(|_| "disable_if_not_set".to_string());

    let header = req.headers().get("x-admin-secret")
        .ok().flatten().unwrap_or_default();

    secret == header && secret != "disable_if_not_set"
}

#[event(fetch)]
pub async fn main(req: Request, env: Env, _ctx: Context) -> Result<Response> {
    let router = Router::new();

    router
        .get("/", |_, _| Response::ok("System Operational"))
        
        .get("/health", |_, _| Response::ok("OK"))
        .get_async("/api/projects", |_, ctx| async move {
            let d1 = ctx.env.d1("DB")?;
            let statement = d1.prepare("SELECT * FROM projects ORDER BY id DESC");
            let result = statement.all().await?;
            let projects: Vec<Project> = result.results()?;
            Response::from_json(&projects)
        })
        .get_async("/api/skills", |_, ctx| async move {
            let d1 = ctx.env.d1("DB")?;
            let statement = d1.prepare("SELECT * FROM skills");
            let result = statement.all().await?;
            let skills: Vec<Skill> = result.results()?;
            Response::from_json(&skills)
        })
        .post_async("/api/projects", |mut req, ctx| async move {
            if !is_authorized(&req, &ctx.env) { return Response::error("Unauthorized", 401); }

            let p: Project = req.json().await?;
            let d1 = ctx.env.d1("DB")?;
            
            let query = "INSERT INTO projects (title, description, tech_stack, github_url, demo_url) VALUES (?, ?, ?, ?, ?)";
            let _ = d1.prepare(query)
                .bind(&[
                    p.title.into(), 
                    p.description.into(), 
                    p.tech_stack.into(), 
                    p.github_url.into(), 
                    p.demo_url.into()
                ])?
                .run().await?;

            Response::ok("Project Created")
        })
        .delete_async("/api/projects/:id", |req, ctx| async move {
            if !is_authorized(&req, &ctx.env) { return Response::error("Unauthorized", 401); }
            
            if let Some(id) = ctx.param("id") {
                let d1 = ctx.env.d1("DB")?;
                let _ = d1.prepare("DELETE FROM projects WHERE id = ?").bind(&[id.into()])?.run().await?;
                Response::ok("Project Deleted")
            } else {
                Response::error("Missing ID", 400)
            }
        })

        .run(req, env)
        .await
}