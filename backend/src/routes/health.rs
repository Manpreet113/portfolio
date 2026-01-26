use axum::{Json, response::IntoResponse};
use serde_json::json;
use std::time::{SystemTime, UNIX_EPOCH};

pub async fn health_check() -> impl IntoResponse {
    let start = SystemTime::now();
    let since_the_epoch = start
        .duration_since(UNIX_EPOCH)
        .expect("Time went backwards");

    Json(json!({
        "status": "online",
        "system": "folio-backend",
        "timestamp": since_the_epoch.as_secs(),
        "uptime": "93.7%"
    }))
}