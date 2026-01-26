use worker::*;
use serde::{Deserialize, Serialize};

// --- STRUCTS ---
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

// --- CORS HELPERS ---

fn apply_cors(response: Response) -> Response {
    let mut response = response;
    let headers = response.headers_mut();
    
    // NUCLEAR OPTION: Allow * for now to rule out origin mismatch
    // (If this still fails, we will switch to echoing the origin)
    let _ = headers.set("Access-Control-Allow-Origin", "*");
    let _ = headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    let _ = headers.set("Access-Control-Allow-Headers", "Content-Type, x-admin-secret");
    let _ = headers.set("Access-Control-Max-Age", "86400"); // Cache preflight for 1 day
    
    response
}

// --- AUTH HELPER ---
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
    // 0. PANIC HOOK (Logs crashes to Cloudflare dashboard instead of silent 500s)
    console_error_panic_hook::set_once();

    // 1. GLOBAL PREFLIGHT INTERCEPT
    // If browser asks "Can I?", we immediately say "YES" and exit.
    if req.method() == Method::Options {
        let resp = Response::empty()?;
        return Ok(apply_cors(resp));
    }

    let router = Router::new();

    let response_result = router
        .get("/", |_, _| Response::ok("System Operational"))
        .get("/health", |_, _| Response::ok("OK"))
        
        // --- PUBLIC READ ---
        .get_async("/api/projects", |_, ctx| async move {
            let d1 = ctx.env.d1("DB").expect("DB binding failed");
            let statement = d1.prepare("SELECT * FROM projects ORDER BY id DESC");
            let result = statement.all().await?;
            let projects: Vec<Project> = result.results()?;
            Response::from_json(&projects)
        })
        .get_async("/api/skills", |_, ctx| async move {
            let d1 = ctx.env.d1("DB").expect("DB binding failed");
            let statement = d1.prepare("SELECT * FROM skills");
            let result = statement.all().await?;
            let skills: Vec<Skill> = result.results()?;
            Response::from_json(&skills)
        })

        // --- PRIVATE WRITE ---
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
        .await;

    // 2. ATTACH HEADERS TO EVERYTHING
    // This catches both Success (Ok) and Runtime Errors (Err)
    match response_result {
        Ok(resp) => Ok(apply_cors(resp)),
        Err(e) => {
            // If the worker crashes, valid HTML is returned which browsers BLOCK.
            // We force a JSON error with headers so you can actually read it in console.
            let err_resp = Response::error(format!("Worker Error: {}", e), 500)?;
            Ok(apply_cors(err_resp))
        }
    }
}