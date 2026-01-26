use crate::config::AppState;
use axum::{Router, routing::get, routing::post};
use std::sync::Arc;
use tower_governor::{GovernorLayer, governor::GovernorConfigBuilder};

mod auth;
mod contact;
mod content;
mod health;

use crate::auth_middleware::auth_middleware;
use axum::middleware;

pub fn create_router(state: Arc<AppState>) -> Router {
    let governor_conf = GovernorConfigBuilder::default()
        .per_second(10)
        .burst_size(50)
        .use_headers()
        .finish()
        .unwrap();

    let protected_routes = Router::new()
        .route("/api/skills", post(content::create_skill))
        .route("/api/skills/:id", axum::routing::delete(content::delete_skill).put(content::update_skill),)
        .route("/api/projects", post(content::create_project))
        .route("/api/projects/:id",axum::routing::delete(content::delete_project).put(content::update_project),)
        .layer(middleware::from_fn(auth_middleware));

    let api_routes = Router::new()
        .route("/contact", post(contact::contact_handler))
        .route("/skills", get(content::get_skills))
        .route("/projects", get(content::get_projects))
        .route("/login", post(auth::login_handler))
        .layer(GovernorLayer {
            config: Arc::new(governor_conf),
        });

    let health_route = Router::new()
        .route("/health", get(health::health_check));

    Router::new()
        .nest("/api", api_routes)
        .merge(health_route)
        .merge(protected_routes)
        .with_state(state)
}
